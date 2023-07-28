import { React,Fragment,useState,useEffect } from "react";
import "../css/postdetail.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen, faTrashCan, faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate,Link,useParams } from "react-router-dom";
import axios from "axios";
import PostNavi from "./PostNavi";
import { Fade,Modal } from "react-bootstrap";
import Footer from "./Footer"



function PostDetail(){
    const navigate = useNavigate()
    const postid = useParams();

    const [post,setPost] = useState({})
    const [page,setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous,setPrevious] = useState(null)
    const [reason,setReason] = useState(null)
    const [deletePost,setDeletePost] = useState(false)
    const [postAuthor, setPostAuthor] = useState("")
    const [comment,setComment] = useState("")
    const [postnum, setPostnum] = useState("")
    const [reComment, setReComment] = useState("")
    const [commentPk, setCommentPk] = useState("")


    

    const handleStartCommentModify=(event)=>{
      const commentText = event.currentTarget.getAttribute('data-comment-text')
      setCommentPk(event.currentTarget.getAttribute('data-comment-pk'))
      setReComment(commentText);
    }

    const handleCommentModify=(event)=>{
   

       
        axios
        .put(`http://127.0.0.1:8000/comments/${commentPk}/`,{
          post:postid.postId,
          text:reComment
        },{
          headers:{
            'Authorization': 'Token ' + localStorage.getItem("token")
          }
        })
        .then((response)=>{
          if(response.status<300){
            window.location.assign(`/posts/${postid.postId}`);
          }
        })
        .catch((error)=>{
          console.log(error);
        })
    }

    const handleCommentDelete=(event)=>{
      // console.log(event)
      // console.log(event.currentTarget);
      const commentPk = event.currentTarget.getAttribute("data-comment-pk")
      console.log(commentPk)
      axios
      .delete(`http://127.0.0.1:8000/comments/${commentPk}/`,{
        headers:{
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      }).then((response)=>{
        if(response.status<300){
          window.location.assign(`/posts/${postid.postId}`);
        }
      })
      .catch((error)=>{
        console.log(error);
      })
    }


    const handleChange=(event)=>{
      const target = event.target;
      if(target.name="comment"){
        setComment(target.value);
      }
      if(target.name="commentModify"){
        setReComment(target.value);
      }

    }

    const handleComment=(event)=>{
      axios
        .post(`http://127.0.0.1:8000/comments/`,
          {
            post:parseInt(postnum,10),
            text:comment
          },
          {
            headers:{
              'Authorization': 'Token ' + localStorage.getItem("token")
            }
          })
          .then((response)=>{
            if(response.status<300){
              navigate(`/posts/${postid.postId}`)
            }
          })
          .catch((error)=>{
            console.log(error);
            
          })
        
        }
    
  
    const handledeletePost=(event)=>{
      
      axios
      .delete(`http://127.0.0.1:8000/posts/${postid.postId}/`,{
        headers:{
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      })
      .then((response)=>{
        if(response.status<300){
          navigate('/posts')
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  
    useEffect(()=>{
      console.log(postid.postId);
      axios
      .get(`http://127.0.0.1:8000/posts/${postid.postId}/`,{
  
      })
      .then(response=>{
        if(response.status<300){
          setPost(response.data);
          console.log(response);
          setPostAuthor(response.data.profile.user);
          setPostnum(response.data.pk);

        }
      })
      .catch((error)=>{
          console.log(error);
          setReason(error.message);
          console.log(reason);
      })
    },[])
  
    useEffect(() => {
      // post 상태 업데이트 후 출력
      console.log("2  " + JSON.stringify(post));
      console.log(postAuthor);
      console.log(postnum);
      
  }, [post]);


  return(
   <div>
   <div className="bgb">   
    <PostNavi/>
    
    {parseInt(postAuthor,10) === parseInt(localStorage.getItem("usernum"),10)?
      <div className="btn-container">
        <button className="btn btn-light deletebtn me-3" onClick={()=>handledeletePost()}><FontAwesomeIcon icon={faTrashCan} /> 삭제하기</button>
        <Link to={`/posts/${postid.postId}/post_modify`} className="btn btn-light createbtn me-3"><FontAwesomeIcon icon={faPen}/> 수정하기</Link>
      </div>
      :<div className="justwatch"></div>
    }
   {post !=={} ? 
  

      <div className=" post">
        <div className="col-md-9 ">
          <div className="post-head ">
            <h4 className="post-title ">{post.title}</h4>
            
                <div className="post-author" >
                <div className="post-date ms-3"> {new Date(post.published_date).toLocaleString()}</div>
                
                {/* <div href={`/profile/${post.profile.user}`}> */}
                  <div>
                    
                    {post.profile?
                    
                    <>
                      <a href={`/profile/${post.profile.user}`} className="postdetail-profile-text">
                          by 
                          <img src={post.profile.image} className="profile-image  img-fluid ms-3 me-3" width="40" height="40"/>
                          {post.profile.nickname}
                      </a>
                    </>
                    :<a>Loading...</a>
                    }
                  </div>
                </div>
            
          </div>
          <hr className="pd-featurette-divider"/>
          <div className="post-mainimage">
            {post.image?
            <>
            <img className="post-image" src={post.image}/>
            </>
            : <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid post-noimage ms-4" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>
            }
            <hr className="pd-featurette-divider"/>
          </div>

          <p className="lead post-body">{post.body}</p>
          
          
        {post.file!==null?
          <>
            <hr className="pd-featurette-divider"/>
            <a href={post.file} target="_blank" download rel="noopener noreferrer" className="ms-5 post-file"><FontAwesomeIcon icon={faPaperclip}/> 첨부파일</a>
          </>
          :null
        }
                <hr className="pd-featurette-divider"/>
                  <div className="comment-title">comment</div> 
                   
                {post.comments? post.comments.map((value)=>(
                   <Fragment key={value.pk}>
                    <div  className="comment-container ms-3">
                        <div className="comment-profile">
                          <img src={value.profile.image} className="profile-image  img-fluid ms-3 me-3" width="40" height="40"/>
                          {value.profile.nickname}
                          {value.profile?
                          <>
                              {parseInt(localStorage.getItem("usernum"),10)===value.profile.user?
                              <>      
                                <button className="btn btn-light ms-5"   data-bs-toggle="modal" data-bs-target="#commentModifyModal"  data-comment-pk={value.pk} data-comment-text={value.text} onClick={handleStartCommentModify}><FontAwesomeIcon icon={faPen}/></button>
                                <button className="btn btn-light ms-2" data-comment-pk={value.pk} onClick={handleCommentDelete}><FontAwesomeIcon icon={faXmark}/></button>
                              </>
                              :
                              null
                              }
                          </>
                          :null}
                          <div className="comment-date ms-4">{new Date(value.date).toLocaleString()}</div>
                              
                        </div>
                        <a className="comment-text ms-3">{value.text}</a>
                    </div>
                    </Fragment>
                )):
                    <h2>No comment</h2>
                }
                  {localStorage.getItem('token')?
                    <form className="comment-form" onSubmit={(event)=>handleComment(event)}>
                      <textarea className="comment-input" placeholder="매너 채팅 부탁드립니다 ㅎㅎ" name="comment" onChange={(event)=>handleChange(event)}></textarea>
                      <button className="btn btn-secondary">제출</button>
                    </form> 
                    : 
                      <div className="commentpermission-none ms-5" >로그인하여 댓글을 작성해주세요 !
                        <Link to="/login" className="nav-link btn btn-light ms-5" > <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2"/> Log In</Link>
                       </div> 
                }
                
        </div>
      </div>
      
     
  :reason?
      <div className="loading-container"><h1 className="loading"> {reason}</h1></div>
      :<div className="loading-container"><h1 className="loading">Loading...</h1></div>
      }
         
         <Footer/>
    </div>

    <div className="modal fade" id="commentModifyModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="loginModalLabel"><FontAwesomeIcon icon={faPen}/>   Comment Modify</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body"> 

       <text className="profileModalWord">Comment-Text</text>
       <input 
       className="loginInput" 
       type='text'
       defaultValue={reComment}
        onChange={handleChange}
        value={reComment}
       name="commentModify"
       ></input>
       
      </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary me-auto"  aria-label="Close" data-bs-dismiss="modal" href="#">Cancel</button>
          <button type="button" className="btn btn-secondary"  onClick={handleCommentModify} >Modify</button>
        </div>
      </div>
    </div>
  </div>  
    
  {/* <button className="btn btn-danger" onClick={handleShow}>
        Open Modal
      </button>

      <Modal show={true} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your modal content goes here.</Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button  onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal> */}
    
  


</div>
        
        
  
  )}
  


export default PostDetail;