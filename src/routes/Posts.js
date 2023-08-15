import {Fragment, React, useEffect, useState} from "react"
import "../css/posts.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate,Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen,faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostNavi from "./PostNavi";
import PostDetail from "./PostDetail";
import Footer from "./Footer"
import PostList from "../components/PostList"


function Posts(){
  const navigate = useNavigate()
  const [post,setPost] = useState({results:[]})
  const [page,setPage] = useState(1)
  const [next, setNext] = useState(null)
  const [previous,setPrevious] = useState(null)
  const [reason,setReason] = useState(null)
  const [postId, setPostId] = useState("")



 function handlePostDetail(postId){
    navigate(`/posts/${postId}`);

  }

  const handleLogout=()=>{
    localStorage.clear();
    navigate('/posts');
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
    axios
    .get(`http://127.0.0.1:8000/posts/?page=${page}`,{

    })
    .then(response=>{
      if(response.status<300){
        setPost(response.data);
        console.log(response.data);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        console.log(next, previous)
        console.log("page"+page)
      }
    })
    .catch((error)=>{
        console.log(error);
        setReason(error.message);
        console.log(reason);
    })
  },[page])

return(
 <div className="app-container">
 <div className="post-bg">  
 <div className="post-content">  
  <PostNavi/>
  { localStorage.getItem('token')?
  <Link to="/post_create" className="btn btn-light createbt"><FontAwesomeIcon icon={faPen}/> 글쓰기</Link>
  :null
  }
 {post.results.length!=0 ? post.results.map((value)=>(


    <PostList
      id={value.pk}
      key={value.pk}
      title={value.title}
      body = {value.body}
      image = {value.image}
      profile = {value.profile}
      created_at = {value.created_at}
      modified_at = {value.modified_at}
      tag = {value.tag}
      
    />
  //   <Fragment key={value.pk}>
      
  // <hr className="featurette-divider"/>
 
  //   <div className="row post" onClick={()=>handlePostDetail(value.pk)}>
  //     <div className="col-md-5 order-md-2">
  //       <h4 className="post-title">{value.title}  {value.tag.slice(0,3).map((t)=> <span className="badge bg-light postlist-tag ms-1">{t.name}</span> ) }</h4>
  //       <p className="lead post-body">{value.body.length<150? value.body: value.body.slice(0,150)+'...'}</p>
  //     </div>
  //     <div className="col-md-3 order-md-1">
  //       {value.image?<img src={value.image} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5"  width="150" height="150"/>
  //         :<svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>
  //       }
  //     </div>
  //     <div className="col-md-4 order-md-2 post-sub">
  //       <a className="post-author">
  //       <div>
  //                   by 
  //                   {value.profile?
  //                   <>
  //                       <img src={value.profile.image} className="profile-image  img-fluid ms-3 me-3" width="40" height="40"/>
  //                       {value.profile.nickname}
  //                   </>
  //                   :<a>Loading...</a>
  //                   }
  //                 </div>
  //         </a>
  //         <br/>
  //         <br/>
  //       <a className="post-date"> {new Date(value.created_at).toLocaleString()}</a>
  //       {value.created_at.substring(0,19)!==value.modified_at.substring(0,19)?
  //       <>
  //         <br/>
  //       <a className="post-date"> 수정됨 - {new Date(value.modified_at).toLocaleString()}</a>
  //       </>
  //       :null
  //       }
  //     </div>
  //   </div>
  //   </Fragment>
   
)):reason?
    <div className="loading-container"><h1 className="loading"> {reason}</h1></div>
    :<div className="loading-container"><h1 className="loading">Loading...</h1></div>
    }
        <div className="pagebt">
        <button className="btn btn-light" onClick={later}><FontAwesomeIcon icon={faAngleLeft} /></button>
        <block className="btn btn-secondary pgblock">{page}</block>
         <button className="btn btn-light" onClick={older}><FontAwesomeIcon icon={faAngleRight} /></button>
      </div>

    </div> 
       <Footer/>
  </div>

    
  </div>
      

)}




export default Posts;