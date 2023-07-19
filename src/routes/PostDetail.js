import { React,Fragment,useState,useEffect } from "react";
import "../css/postdetail.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen} from "@fortawesome/free-solid-svg-icons";
import { useNavigate,Link,useParams } from "react-router-dom";
import axios from "axios";
import PostNavi from "./PostNavi";



function PostDetail(){
    const navigate = useNavigate()
    const [post,setPost] = useState({})
    const [page,setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous,setPrevious] = useState(null)
    const [reason,setReason] = useState(null)
    const postid = useParams();
  
  
    const handleLogout=()=>{
      localStorage.clear();
      navigate('/post_list');
    }
  
    const older=()=>{
      if(next !== null)
      setPage(page+1);
    }
    const later=()=>{
      if(previous !== null){
      setPage(page-1);
      }
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
          console.log(post);
         
          
        }
      })
      .catch((error)=>{
          console.log(error);
          setReason(error.message);
          console.log(reason);
      })
    },[page])
  
  return(
   <div>
   <div className="bgb">   
    <PostNavi/>
  
    <Link to="/post_create" className="btn btn-light createbt"><FontAwesomeIcon icon={faPen}/> 수정하기</Link>
    
   {/* {post.results.length!=0 ? post.results.map((value)=>(
  
      <Fragment key={value.pk}>
    <hr className="featurette-divider"/>
    
      <div className="row post">
        <div className="col-md-5 order-md-2">
          <h4 className="post-title">{value.title}</h4>
          <p className="lead post-body">{value.body}</p>
        </div>
        <div className="col-md-3 order-md-1">
          <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>
  
        </div>
        <div className="col-md-4 order-md-2 post-sub">
          <a className="post-author">by 
          <svg className="profile-image  img-fluid ms-3 me-3" width="40" height="40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/>{value.profile.image? <image>{value.profile.image}</image>:<text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text>}</svg>
              {value.profile.nickname}
            </a>
            <br/>
            <br/>
          <a className="post-date"> {new Date(value.published_date).toLocaleString()}</a>
        </div>
      </div>
      </Fragment>
     
  )):reason?
      <div className="loading-container"><h1 className="loading"> {reason}</h1></div>
      :<div className="loading-container"><h1 className="loading">Loading...</h1></div>
      }
          <div className="pagebt">
          <button className="btn btn-light" onClick={later}>l</button>
          <block className="btn btn-secondary pgblock">{page}</block>
           <button className="btn btn-light" onClick={older}>r</button>
        </div> */}
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