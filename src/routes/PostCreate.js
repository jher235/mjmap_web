import React, { useState,useEffect } from "react";
import axios from "axios";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom"
import "../css/createpost.css";
import {Tooltip} from 'bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle.min';

const {kakao} = window
const markerList = []

function PostCreate(props){
    const firstLat = 37.222000
    const firstLong = 127.186729 
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");
    const [nickname, setNickname] = useState("");
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [map,setMap] = useState();
    const [maplevel,setMaplevel] = useState(4);
    const [loading, setLoading] = useState(true);
    const [maplat,setMaplat] = useState(37.222000)
    const [maplong,setMaplong] = useState(127.186729)
    const [showMap, setShowMap] = useState(false);
    const [markerCount, setMarkerCount] = useState(1);
    const [markerLat, setMarkerLat] = useState("")
    const [markerLon, setMarkerLon] = useState("")
    const [markerContent, setMarkerContent] = useState("")
    const [markerList, setMarkerList] = useState([])
    const [postNum, setPostNum] = useState("")
    const [loadMap, setLoadMap] = useState(false)
    
    
 

  

    const navigate = useNavigate();

  const handlePostNum = (event) =>{
      setPostNum(event.data.pk);
      
  }

  const handleDeleteMarker = (event)=>{
    event.preventDefault();
    var index = parseInt(event.target.getAttribute('markerIndex'),10);


    //var copyMarkerList = markerList;
    if(!isNaN(index)){
    const copyMarkerList = markerList.filter((value,idx)=>idx!==index);
    setMarkerList(copyMarkerList);
    }
  }
  
  const handleMarkerList = (event)=>{
    event.preventDefault();
    var  markercontent = [markerContent, markerLat, markerLon]
    setMarkerList((prevMarkerList)=>[...prevMarkerList, markercontent])
    console.log(markerList);
    setMarkerContent("");

  }

  const handleShowMap = (event)=>{
    event.preventDefault();
      setShowMap(!showMap);
  }


    useEffect(()=>{
      if(localStorage.getItem("token") === null){
          alert("권한이 없습니다");
        navigate("/");
      }
  },[])

    
  const handleChange = (event) => {
    const target = event.target;
    if (target.name === "title") {
      setTitle(target.value);
    } else if (target.name === "content") {
      setContent(target.value);
    }  else if (target.name === "image"){
        setImage(target.files);
    }   else if (target.name === "tag"){
        setTag(target.value);
    } else if (target.name === "file"){
      setFile(target.files)
    } else if(target.name = "markerContent"){
      setMarkerContent(target.value);
    }
        
  };
  
 

  const handleSubmit = (event) => {
    event.preventDefault();

    
  

  const requestdata = new FormData();


  requestdata.append("title",title);
  requestdata.append("body", content);
  requestdata.append("tag", tag);

  

  if (image !==null && image.length!==0 ){
    for(let i=0; i<image.length; i++)
    requestdata.append("image", image[i]);
  }
  if (file !== null && file.length !==0){
    for(let i=0; i<file.length; i++)
    requestdata.append("file", file[i]);
  }
  

  



    console.log("[Register.js] handleSubmit");
    axios
      .post("https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/posts/", requestdata,{
        headers:{
          'Content-Type': "multipart/form-data",
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      })
      .then((response) => {
        if (response.status < 300) {
          console.log("[Register.js] Call props.doRegister");
          if (props.doLogin) {
            props.doLogin();
          }
          handlePostNum(response)
          
          console.log(markerList)

                  
              for(var i = 0; i<markerList.length; i++){
                axios
                  .post("https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/markers/",{
                    post: response.data.pk,
                    name: markerList[i][0],
                    latitude: markerList[i][1],
                    longitude: markerList[i][2]
                  },{
                    headers:{
                      'Content-Type': "multipart/form-data",
                      //'Content-Type': "application/json",
                      'Authorization': 'Token ' + localStorage.getItem("token")
                    }
                  })
                  .then((response)=>{
                    if(response.status<300){
                        console.log(response.data)
                        //navigate(`/posts/${postNum}`)
                    }
                  })
                  .catch((e)=>{
                    console.log(e);
                  })
              }
              navigate(`/posts/${postNum}`)
              
        }
      })
      .catch((error)=>{
        console.error("Error:",error);
        
        console.log(error.response);
        if(error.response.data){
        const errorData = error.response.data
        const errorText = error.response.statusText
        alert(errorData)
        
      }})


      
  
    
  };

  // useEffect(()=>{
  //   const script = document.createElement("script");
  //   script.src = `${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
  //   document.head.appendChild(script);
  // },[])


  useEffect(()=>{
    try{
     
     
        const container = document.getElementById('map')
          const mapOptions = {
            center: new kakao.maps.LatLng(maplat, maplong), // 지도의 중심좌표
            level: maplevel, // 지도의 확대 레벨
            mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
          };
            
        console.log(container)
        if(container){
          const map = new kakao.maps.Map(container, mapOptions);
          
          setLoading(false); 
          setMap(map)

          var marker = new kakao.maps.Marker({
            position: map.getCenter()
          });
          marker.setMap(map);

          kakao.maps.event.addListener(map, 'click', function(mouseEvent){
            var latLng = mouseEvent.latLng;
            console.log(latLng)
            setMarkerLat(mouseEvent.latLng.Ma)
            setMarkerLon(mouseEvent.latLng.La)
            marker.setPosition(latLng);

          })
        
      }
      
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
  
  
}catch(e){
  console.log(e)}}

  ,[showMap,loadMap ])






  return (
    <div className="body">
    <main className="form-signup ">
    <form onSubmit={handleSubmit}>
      
      <h1 className=" mb-3 fw-normal logintext">Create Post</h1>
      <div className="form-floating">
        <textarea
          type="text"
          className="form-control"
          name="title"
          id="floatingTitle"
          placeholder="Id"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingTitle">Title</label>
      </div>
      <div className="form-floating">
        <textarea
          type="text"
          className="form-control"
          name="content"
          id="floatingContent"
          placeholder="Content"
          onChange={handleChange}
          required
        />
        <label htmlFor="floatingContent">Content</label>
      </div>

      <div className="form-floating">
        <input
          type="file"
          className="form-control"
          name="image"
          id="floatingImage"
          placeholder="Image"
          onChange={handleChange}
         multiple 
         accept="image/*"
        />
        <label htmlFor="floatingImage">Image</label>
      </div>
      

      <div className="form-floating">
        <input
          type="file"
          className="form-control"
          name="file"
          id="floatingFile"
          placeholder="file"
          onChange={handleChange}
          multiple
       />
        <label htmlFor="floatingFile">File</label>
      </div>


      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          name="tag"
          id="floatingTag"
          placeholder="Tag"
          data-bs-toggle="tooltip" 
          data-bs-placement="right"
          data-bs-custom-class="custom-tooltip"
          data-bs-title=",나 ;를 통해 여러 개의 태그를 등록하세요"
          onChange={handleChange}
          
        />
        <label htmlFor="floatingCategory">Tag</label>
      </div>
     

      <div>
        <button className="btn btn-light mt-4" type="button" onClick={handleShowMap}>위치표시</button>
      </div>
      {showMap?
      <>
       <div id="map" className='ms-5'></div>
       <button type="button" className="btn btn-light mt-5" data-bs-toggle="modal" data-bs-target="#mapInfoModal">위치추가</button>
  
       </>
       :null
      }

    <div className="marker-list mt-2">
      {markerList.map((value, index)=>(
          <div key={index}>
          <span type="button" className="badge text-bg-light me-2" >{value[0]}  <FontAwesomeIcon className="ms-1" icon={faXmark} markerIndex={index} onClick={handleDeleteMarker}/> </span>
          </div>
        ))}
    </div>
      


          
<div className="modal fade" id="mapInfoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="loginModalLabel">  Position information</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      

       <text className="profileModalWord">Content-Name</text>
       <br/>
       <input 
       className="" 
       type='text'
       onChange={handleChange}
       name="markerContent"
       value={markerContent}
       maxLength={30}
       ></input>


      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary me-auto" data-bs-dismiss="modal" href="#">Cancel</button>
        <button type="button" className="btn btn-secondary" onClick={handleMarkerList} data-bs-dismiss="modal">등록</button>
      </div>
    </div>
  </div>
    </div>



      <div className="checkbox mb-3">


   
      </div>
      <button className="w-50 uploadbt btn btn-lg btn-light" type="submit">
        Upload Post
      </button>
      <div className="pluslink ">
        <Link to="/" className="homelink">Home</Link>
        <Link to="/posts" className="homelink">Back</Link>
      </div>
      
    </form>
  </main>
  </div>
  );
}

export default PostCreate;