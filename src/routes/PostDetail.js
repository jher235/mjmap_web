import { React,Fragment,useState,useEffect } from "react";
import "../css/postdetail.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen} from "@fortawesome/free-solid-svg-icons";
import { useNavigate,Link,useParams } from "react-router-dom";
import axios from "axios";
import PostNavi from "./PostNavi";
import { Fade } from "react-bootstrap";



function PostDetail(){
    const navigate = useNavigate()
    const [post,setPost] = useState({})
    const [page,setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous,setPrevious] = useState(null)
    const [reason,setReason] = useState(null)
    const postid = useParams();
  
  
  

  
    useEffect(()=>{
      console.log(postid.postId);
      axios
      .get(`http://127.0.0.1:8000/posts/${postid.postId}/`,{
  
      })
      .then(response=>{
        if(response.status<300){
          setPost(response.data);
          console.log(response);
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
  }, [post]);


  return(
   <div>
   <div className="bgb">   
    <PostNavi/>
    
    <div className="btn-container">
      <button className="btn btn-light deletebtn me-3">삭제하기</button>
      <Link to={`/posts/${postid.postId}/post_modify`} className="btn btn-light createbtn me-3"><FontAwesomeIcon icon={faPen}/> 수정하기</Link>
    </div>

   {post !=={} ? 
  

      <div className=" post">
        <div className="col-md-9 ">
          <div className="post-head ">
            <h4 className="post-title ">{post.title}</h4>
            
                <div className="post-author">
                <div className="post-date ms-3"> {new Date(post.published_date).toLocaleString()}</div>
                 <div>
                    by 
                    {post.profile?
                    <>
                        <img src={post.profile.image} className="profile-image  img-fluid ms-3 me-3" width="40" height="40"/>
                        {post.profile.nickname}
                    </>
                    :<a>Loading...</a>
                    }
                  </div>
                </div>
            
          </div>
          <hr className="featurette-divider"/>
          <div className="post-mainimage">
            {post.image?
            <>
            <img className="post-image" src={post.image}/>
            <hr className="featurette-divider"/> 
            </>
            : <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid post-noimage" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>
            }
          </div>

          <p className="lead post-body">{post.body}</p>
          
          
        {post.file!==null?
          <>
            <hr className="featurette-divider"/>
            <a href={post.file} target="_blank" download rel="noopener noreferrer">파일</a>
          </>
          :null
        }
                <hr className="featurette-divider"/>
                  <div className="comment-title">comment</div> 
                   
                {post.comments? post.comments.map((value)=>(
                   <Fragment key={value.pk}>
                    <div  className="comment-container ms-3">
                        <div className="comment-profile">
                          <img src={value.profile.image} className="nprofile-image  img-fluid ms-3 me-3" width="40" height="40"/>
                          {value.profile.nickname}
                          <div className="comment-date ms-4">{new Date(value.date).toLocaleString()}</div>
                      
                        </div>
                        <a className="comment-text ms-3">{value.text}</a>
                    </div>
                    </Fragment>
                )):
                    <h2>No comment</h2>
                }
                <form className="comment-form">
                  <textarea className="comment-input" placeholder="매너 채팅 부탁드립니다 ㅎㅎ"></textarea>
                  <button className="btn btn-secondary ">제출</button>
                </form>  
        </div>
       
      </div>
      
     
  :reason?
      <div className="loading-container"><h1 className="loading"> {reason}</h1></div>
      :<div className="loading-container"><h1 className="loading">Loading...</h1></div>
      }
         
    </div>
    </div>
        
  
  )}
  



// {
//     const navigate = useNavigate();







//     return(
//         <div className="container">
//             <PostNavi/>
//             <div>title</div>
//             <hr/>
//             <div>image</div>
//             <hr/>
//             <div>body</div>
//             <hr/>
//             <div>comment</div>


//        </div> 
//     )
// }



export default PostDetail;