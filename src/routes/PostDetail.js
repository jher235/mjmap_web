import { React,Fragment,useState,useEffect } from "react";
import "../css/postdetail.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen, faTrashCan, faPaperclip, faXmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import {faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate,Link,useParams } from "react-router-dom";
import axios from "axios";
import PostNavi from "./PostNavi";
import Footer from "./Footer"


const {kakao} = window

function PostDetail(){
    const navigate = useNavigate()
    const postid = useParams();

    const [post,setPost] = useState({})
    const [reason,setReason] = useState(null)
    const [deletePost,setDeletePost] = useState(false)
    const [postAuthor, setPostAuthor] = useState("")
    const [comment,setComment] = useState("")
    const [postnum, setPostnum] = useState("")
    const [reComment, setReComment] = useState("")
    const [commentPk, setCommentPk] = useState("")
    const [map, setMap] = useState("")
    const [maplevel,setMaplevel] = useState(4);
    const [showMap, setShowMap] = useState(false)
    const [mapLat, setMapLat] = useState(37.222000)
    const [mapLon, setMapLon] = useState(127.186729) 
    const [markerExist, setMarkerExist] = useState(false)
    const [markerValue, setMarkerValue] = useState([]) 
    const [likeCount, setLikeCount] = useState(0)
    const [userNum, setUserNum] = useState(0)
    const [iLiked, setILiked] = useState(false)
    
    const markerLatList = []
    const markerLonList = []
    const markerNameList = []
 
    

    const handleHeartClick = ()=>{
      
      if(localStorage.getItem('token')){
        setILiked(!iLiked);
        axios
        .get(`http://127.0.0.1:8000/like/${postid.postId}/`,{
          headers:{
            'Authorization': 'Token ' + localStorage.getItem("token")
          }
        })
        .then((response)=>{
          console.log(response)
          if(response.status<300){
            setLikeCount(response.data.count)
          }
        })
        .catch((error)=>{
          console.log(error);
        })
      }
      else{
        alert("로그인 후 이용할 수 있습니다 :)");
      }
    }

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
      if(target.name==="comment"){
        setComment(target.value);
      }
      if(target.name==="commentModify"){
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
    
      if(localStorage.usernum ){
        setUserNum(localStorage.getItem('usernum'))
        console.log(localStorage.getItem('usernum'))
      }

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
          if(response.data.markers.length !==0 ){
              setMarkerExist(true)
              setMapLat(response.data.markers[0].latitude)
              setMapLon(response.data.markers[0].longitude)
              setMarkerValue(response.data.markers) 

              response.data.markers.map((value)=>{
                markerLatList.push(value.latitude);
                markerLonList.push(value.longitude)
                markerNameList.push(value.name)
              })
          }
          if(response.data.likes){
            
            setLikeCount(response.data.likes.length);
            if(response.data.likes.includes(parseInt(localStorage.getItem('usernum'),10))){
              setILiked(true);
            }
           
          }
        
          console.log(markerValue);
       
          console.log(iLiked)
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
      console.log(post);
      console.log(postAuthor);
      console.log(postnum);
      
  }, [post]);


    


      useEffect(()=>{
        try{
          const container = document.getElementById('postdetail-map')
            const mapOptions = {
              center: new kakao.maps.LatLng(mapLat, mapLon),
              level: maplevel, 
              mapTypeId: kakao.maps.MapTypeId.ROADMAP 
            };
          console.log(container)
          if(container){
            const map = new kakao.maps.Map(container, mapOptions);

              setMap(map)
              
              //console.log(mapLat, mapLon)
              //console.log(markerValue)
              
                
                const markerPositions = markerValue.map((value)=>
                  //console.log(value.latitude, value.longitude)
                  new kakao.maps.LatLng(value.latitude, value.longitude)

                 )
                  
                const markerMessages = markerValue.map((value)=>
                  `${value.name}`
                )
                
                console.log(markerPositions)
                 if(markerExist){
                markerPositions.forEach((value,index)=>{

                  const marker = new kakao.maps.Marker({
                    map:map,
                    position:value
                  })
                  
                  const infowindow = new kakao.maps.InfoWindow({
                    content: `<div class="infowindow"><span class="infowindow-content">${markerMessages[index]}</span></div>`
                  })

                  kakao.maps.event.addListener(marker,"mouseover",function(){
                    infowindow.open(map, marker)
                   
                  })

                  kakao.maps.event.addListener(marker,"mouseout",function(){
                    infowindow.close()
                 
                  })
                  
                
                  
                })
                }
            

          }}catch(e){
            console.log(e)}}

        ,[ markerValue])




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
            <h4 className="post-title ">{post.title}{post.tag?post.tag.map((t)=> <span className="badge bg-light postdetail-tag ms-1">{t.name}</span> ):null }</h4>
            
                <div className="post-author" >
                
                {
                post&&post.modified_at&&post.created_at?
                    (
                      post.modified_at.substring(0,19)!==post.created_at.substring(0,19) 
                      ?<div className="post-date ms-3">{new Date(post.modified_at).toLocaleString()} - 수정됨 - </div>
                      :<div className="post-date ms-3"> {new Date(post.created_at).toLocaleString()}</div>
                      )
                :null
                }
               

                  <div>
                    {post.profile?
                    
                    <>
                      <a href={`/profile/${post.profile.user}`} className="postdetail-profile-text">
                          by 
                          <img src={post.profile.image} className="profile-image  img-fluid ms-3 me-3" width="40" height="40" alt="프로필이미지"/>
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
            <img className="post-image" src={post.image} alt=""/>
            </>
            : <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid post-noimage ms-4" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>
            }
            <hr className="pd-featurette-divider"/>
          </div>
         
            {markerExist? 
              <>
              <div id="postdetail-map" className=""></div>
              {/* {setShowMap(true)} */}
              <hr className="pd-featurette-divider"/>
              </>
              :null
            }

          <p className="lead post-body">{post.body}</p>
          <div className="postdetail-heart-container " onClick={handleHeartClick}>
            <div className=" postdetail-heartset">
              {iLiked ? <FontAwesomeIcon className=" ms-3" icon={ faHeart}/> : <FontAwesomeIcon className=" ms-3" icon={ regularHeart}/>}
              <span className=" ms-4 me-3">{likeCount}</span>
            </div>
          </div>
          
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
                          <img src={value.profile.image} className="profile-image  img-fluid ms-3 me-3" width="40" height="40" alt="프로필이미지"/>
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
          <button type="button" className="btn btn-secondary me-auto"  aria-label="Close" data-bs-dismiss="modal" >Cancel</button>
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