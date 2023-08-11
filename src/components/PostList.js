import PropTypes from "prop-types"
import {Link, useNavigate} from "react-router-dom"
import styles from "../css/postlist.css"
import { useState } from "react"




function PostList({id,title,body,tag,created_at,modified_at,profile,image}){
    const navigate = useNavigate()
    
   

    function handlePostDetail(postId){
        navigate(`/posts/${postId}`);
        
      }
    function handleTagPost(event,tagId){

        event.stopPropagation(); //버블링 중단
        navigate(`/posts/tag/${tagId}`)
    }

    return(

    <div> 
      <hr className="featurette-divider"/>
     
        <div className="row post" onClick={()=>handlePostDetail(id)}>
          <div className="col-md-5 order-md-2">
            <h4 className="post-title">{title}  {tag.slice(0,3).map((t)=> <span className="badge bg-light postlist-tag ms-1" onClick={(event)=>handleTagPost(event,t.id)}>{t.name}</span> ) }</h4>
            <p className="lead post-body">{body.length<150? body: body.slice(0,150)+'...'}</p>
          </div>
          <div className="col-md-3 order-md-1">
            {image?<img src={image} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5"  width="150" height="150"/>
              :<svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid ms-5" width="150" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: no-image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text font-size="50%" x="50%" y="50%" fill="#aaa" dy=".3em">No-Image</text></svg>
            }
          </div>
          <div className="col-md-4 order-md-2 post-sub">
            <a className="post-author">
            <div>
                        by 
                        {profile?
                        <>
                            <img src={profile.image} className="profile-image  img-fluid ms-3 me-3" width="40" height="40"/>
                            {profile.nickname}
                        </>
                        :<a>Loading...</a>
                        }
                      </div>
              </a>
              <br/>
              <br/>
            <a className="post-date"> {new Date(created_at).toLocaleString()}</a>
            {created_at.substring(0,19)!==modified_at.substring(0,19)?
            <>
              <br/>
            <a className="post-date"> 수정됨 - {new Date(modified_at).toLocaleString()}</a>
            </>
            :null
            }
          </div>
        </div>
        </div> 
        

    )
}

export default PostList;