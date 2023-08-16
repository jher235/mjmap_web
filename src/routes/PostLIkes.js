import {React, useEffect, useState} from "react"
import "../css/posts.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate,Link,useParams } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen,faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostNavi from "./PostNavi";
import Footer from "./Footer"
import PostList from "../components/PostList"


function PostLikes() {
  const navigate = useNavigate()
  const [post,setPost] = useState({results:[]})
  const [page,setPage] = useState(1)
  const [next, setNext] = useState(null)
  const [previous,setPrevious] = useState(null)
  const [reason,setReason] = useState(null)
  const [postId, setPostId] = useState("")
  const usernum = useParams();




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
    .get(`http://127.0.0.1:8000/posts/?page=${page}&likes=${usernum.userId}`,{

    })
    .then(response=>{
      if(response.status<300){
        setPost(response.data);
        console.log(response.data);
        setNext(response.data.next);
        setPrevious(response.data.previous);
     
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

  <Link to="/post_create" className="btn btn-light createbt"><FontAwesomeIcon icon={faPen}/> 글쓰기</Link>
  
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




export default PostLikes;