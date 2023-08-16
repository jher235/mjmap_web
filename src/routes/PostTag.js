import {React, useEffect, useState} from "react";
import styles from"../css/posttag.module.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate,Link,useParams } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPen,faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostNavi from "./PostNavi";
import Footer from "./Footer"
import PostList from "../components/PostList"


function PostTag(){
  const tagId = useParams();
  const navigate = useNavigate()
  const [post,setPost] = useState({results:[]})
  const [page,setPage] = useState(1)
  const [next, setNext] = useState(null)
  const [previous,setPrevious] = useState(null)
  const [reason,setReason] = useState(null)
  const [postId, setPostId] = useState("")
  const [tagName, setTagName] = useState("")
  

   


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
    .get(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/posts/?page=${page}&tag=${tagId.tagId}`,{

    })
    .then(response=>{
      if(response.status<300){
        
        setPost(response.data);
        console.log(response.data);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        console.log(next, previous)
        console.log("page"+page)
        for(var i=0;i<response.data.results[0].tag.length;i++)
            if(parseInt(response.data.results[0].tag[i].id,10)===parseInt(tagId.tagId,10)){
                setTagName(response.data.results[0].tag[i].name);
                break;
            }
        }
        
        console.log(tagName)
    })
    .catch((error)=>{
        console.log(error);
        setReason(error.message);
        console.log(reason);
    })
  },[page,tagId])

return(
 <div className="app-container">
 <div className={styles.postTagBack}>   
 <div className={styles.postContent}>
  <PostNavi/>

  <Link to="/post_create" className="btn btn-light createbt"><FontAwesomeIcon icon={faPen}/> 글쓰기</Link>
  <h1 className={styles.title}>About Tag -<span className= {`badge bg-light ms-3 ${styles.mainTagName}`}>{tagName}</span></h1>
  {console.log(tagName)}
 {post.results.length!==0 ? post.results.map((value)=>(


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
    :<div className="loading-container"><h1 className="loading">Post does <br/>not exist</h1></div>
    }

    <div className={styles.pageBtnWrapper}>
      <div className={styles.pageBtn}>
        <button className="btn btn-light" onClick={later}><FontAwesomeIcon icon={faAngleLeft} /></button>
        <block className="btn btn-secondary pgblock">{page}</block>
         <button className="btn btn-light" onClick={older}><FontAwesomeIcon icon={faAngleRight} /></button>
      </div>
    </div>

    </div>
     <Footer/>  
  </div>

 
  </div>
      

)}




export default PostTag;