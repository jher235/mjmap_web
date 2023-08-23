import React, { useState,useEffect } from "react";
import axios from "axios";
import {  faXmark,faCirclePlus  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate, useParams} from "react-router-dom"
import "../css/postmodify.css";
import {Tooltip} from 'bootstrap'


const {kakao} = window

function PostModify(props){
    
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
    const [newMarkerList, setNewMarkerList] = useState([])
    const [postNum, setPostNum] = useState("")
    const [loadMap, setLoadMap] = useState(false)
    const [deleteMaker, setDeleteMarker] = useState([])
    const [imageList, setImageList] = useState([])
    const [fileList, setFileList] = useState([])
    const [deleteImageList, setDeleteImageList] = useState([])
    const [deleteFileList, setDeleteFileList] = useState([])
    const [preImageList, setPreImageList] = useState([]);
    const [preFileList, setPreFileList] = useState([]);


    const navigate = useNavigate();
    const postid = useParams();

  
    useEffect(()=>{
      if(localStorage.getItem("token") === null){
          alert("권한이 없습니다");
        navigate("/");
      }
    },[])



    useEffect(()=>{
        axios
            .get(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/posts/${postid.postId}/`,{})
            .then((response)=>{
                if(response.status <300){
                    console.log(response);
                    setTitle(response.data.title);
                    setContent(response.data.body);
                    setTag(response.data.tag.map((t)=>`${t.name}`));
                    setPreImageList(response.data.image);
                    setPreFileList(response.data.file);
                    
                    
                    setMarkerList(response.data.markers.map((marker)=>[ marker.name, marker.latitude, marker.longitude, marker.pk]))
                    setMarkerCount(response.data.markers.length)
                }
            })
            .catch((error)=>{
                console.log("에러발생!"+error);
            })
    },[])
   


    const handleFileList =  (event) =>{
      event.preventDefault();
      var  filecontent = file
      setFileList((prevFileList)=>[...prevFileList, filecontent])
      console.log(fileList);
      setFile(null);
    }

    

    const handleDeleteFile=(event)=>{
      event.preventDefault();
      var index = parseInt(event.target.getAttribute('fileIndex'),10);

  
      if(!isNaN(index)){
      const copyFileList = fileList.filter((value,idx)=>idx!==index);
      setFileList(copyFileList);
      }
    }

    const handleDeletePreFile=(event)=>{
      event.preventDefault();
      var index = parseInt(event.target.getAttribute('fileIndex'),10);
      var filepk = parseInt(event.target.getAttribute('prefileId'),10);

      if(filepk){
        setDeleteFileList((prevDeleteFileList)=>[...prevDeleteFileList, filepk])
      }
  
      if(!isNaN(index)){
      const copyFileList = preFileList.filter((value,idx)=>idx!==index);
      setPreFileList(copyFileList);
      }
    }



    const handleImageList =  (event) =>{
      event.preventDefault();
      var  imagecontent = image
      setImageList((prevImageList)=>[...prevImageList, imagecontent])
      console.log(imageList);
      setImage(null);
    }


    const handleDeleteImage=(event)=>{
      event.preventDefault();
      var index = parseInt(event.target.getAttribute('imageIndex'),10);
     
      if(!isNaN(index)){
      const copyImageList = imageList.filter((value,idx)=>idx!==index);
      setImageList(copyImageList);
      }
    }

    const handleDeletePreImage=(event)=>{
      event.preventDefault();
      var index = parseInt(event.target.getAttribute('imageIndex'),10);
      var imagepk = parseInt(event.target.getAttribute('preimageId'),10);

      if(imagepk){
        setDeleteImageList((prevDeleteImageList)=>[...prevDeleteImageList, imagepk])
      }

      if(!isNaN(index)){
      const copyImageList = preImageList.filter((value,idx)=>idx!==index);
      setPreImageList(copyImageList);
      }
    }
  


    const handleDeleteMarker = (event)=>{
      event.preventDefault();
      var index = parseInt(event.target.getAttribute('markerIndex'),10);
      var markerpk = parseInt(event.target.getAttribute('markerPk'))
      
      if(markerpk){
        setDeleteMarker((prevDeleteMarker)=>[...prevDeleteMarker, markerpk])
      }
      console.log(markerpk)
      console.log(deleteMaker)
      
      if(!isNaN(index)){
      const copyMarkerList = markerList.filter((value,idx)=>idx!==index);
      setMarkerList(copyMarkerList);

      }
    }

    const handleDeleteNewMarker = (event)=>{
      event.preventDefault();
      var index = parseInt(event.target.getAttribute('markerIndex'),10);
     

    
      
      if(!isNaN(index)){

      const copyNewMarkerList = newMarkerList.filter((value,idx)=>idx!==index);
      setNewMarkerList(copyNewMarkerList);
      }
    }


    const handleMarkerList = (event)=>{
      event.preventDefault();
      var  markercontent = [markerContent, markerLat, markerLon]
      //setMarkerList((prevMarkerList)=>[...prevMarkerList, markercontent])
      setNewMarkerList((prevNewMarkerList)=>[...prevNewMarkerList, markercontent])
      console.log(newMarkerList);
      setMarkerContent("");
  
    }
  


    const handleShowMap = (event)=>{
      event.preventDefault();
        setShowMap(!showMap);
    }


  
 
    
  const handleChange = (event) => {
    const target = event.target;
    if (target.name === "title") {
      setTitle(target.value);
    } else if (target.name === "content") {
      setContent(target.value);
    }  else if (target.name === "image"){
        setImage(target.files);
        console.log(image);
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

  // if (image !==null && image.length!==0 ){
  //   for(let i=0; i<image.length; i++)
  //   requestdata.append("image", image[i]);
  // }
  // if (file !== null && file.length !==0){
  //   for(let i=0; i<file.length; i++)
  //   requestdata.append("file", file[i]);
  // }
  // if(preImage===true){
  //   requestdata.append("remove_image",preImage);
  // }
  // if(preFile===true){
  //   requestdata.append("remove_file", preFile);
  // }
 
  



   
   
    const response = axios
      .put(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/posts/${postid.postId}/`, requestdata,{
        headers:{
          'Content-Type': "multipart/form-data",
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      })
      .then(async(response) => {
        if (response.status < 300) {

                  const newImagePromises = imageList.map(([image])=>{
                    axios
                      .post("https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/images/",{
                        post: response.data.pk,
                        image:image
                      },{
                        headers:{
                          // 'Content-Type': "multipart/form-data",
                          'Content-Type': "multipart/form-data",
                          'Authorization': 'Token ' + localStorage.getItem("token")
                        }
                      })
                      .then((response)=>{
                        if(response.status<300){
                            console.log(response)
                        }
                      })
                      .catch((e)=>{
                        console.log(e);
                      })
                  })

                const deleteImagePromises = deleteImageList.map((num)=>  
                  axios
                    .delete(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/images/${num}`,{
                      headers:{
                      // 'Content-Type': "multipart/form-data",
                      'Content-Type': "application/json",
                      'Authorization': 'Token ' + localStorage.getItem("token")
                      }
                    })
                    .then((response)=>{
                      if(response.status){
                        console.log(response)
                      }
                    })
                    .catch((e)=>{
                      console.log(e);
                    })
                )

                const newFilePromises = fileList.map(([file])=>{
                  axios
                    .post("https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/files/",{
                      post: response.data.pk,
                      file:file
                    },{
                      headers:{
                        // 'Content-Type': "multipart/form-data",
                        'Content-Type': "multipart/form-data",
                        'Authorization': 'Token ' + localStorage.getItem("token")
                      }
                    })
                    .then((response)=>{
                      if(response.status<300){
                          console.log(response)
                      }
                    })
                    .catch((e)=>{
                      console.log(e);
                    })
                })

              const deleteFilePromises = deleteFileList.map((num)=>  
                axios
                  .delete(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/files/${num}`,{
                    headers:{
                    // 'Content-Type': "multipart/form-data",
                    'Content-Type': "application/json",
                    'Authorization': 'Token ' + localStorage.getItem("token")
                    }
                  })
                  .then((response)=>{
                    if(response.status){
                      console.log(response)
                    }
                  })
                  .catch((e)=>{
                    console.log(e);
                  })
              )
                  


              const newMarkerPromises = newMarkerList.map(([name, latitude, longitude])=>{
                      axios
                        .post("https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/markers/",{
                          post: response.data.pk,
                          name: name,
                          latitude: latitude,
                          longitude: longitude
                        },{
                          headers:{
                            // 'Content-Type': "multipart/form-data",
                            'Content-Type': "application/json",
                            'Authorization': 'Token ' + localStorage.getItem("token")
                          }
                        })
                        .then((response)=>{
                          if(response.status<300){
                              console.log(response)
                          }
                        })
                        .catch((e)=>{
                          console.log(e);
                        })
                    })

                  const deleteMarkerPromises = deleteMaker.map((num)=>  
                    axios
                      .delete(`https://port-0-mjmap-drf-20zynm2mljtk8awd.sel4.cloudtype.app/markers/${num}`,{
                        headers:{
                        // 'Content-Type': "multipart/form-data",
                        'Content-Type': "application/json",
                        'Authorization': 'Token ' + localStorage.getItem("token")
                        }
                      })
                      .then((response)=>{
                        if(response.status){
                          console.log(response)
                        }
                      })
                      .catch((e)=>{
                        console.log(e);
                      })
                  )

                  // for(var i = 0; i<newMarkerList.length; i++){
                  //   axios
                  //     .post("http://localhost:8000/markers/",{
                  //       post: response.data.pk,
                  //       name: newMarkerList[i][0],
                  //       latitude: newMarkerList[i][1],
                  //       longitude: newMarkerList[i][2]
                  //     },{
                  //       headers:{
                  //         // 'Content-Type': "multipart/form-data",
                  //         'Content-Type': "application/json",
                  //         'Authorization': 'Token ' + localStorage.getItem("token")
                  //       }
                  //     })
                  //     .then((response)=>{
                  //       if(response.status<300){
                  //           console.log(response.data)
                  //       }
                  //     })
                  //     .catch((e)=>{
                  //       console.log(e);
                  //     })
                  // }
                  
                 

                  const allPromises = [...newMarkerPromises, ...deleteMarkerPromises, ...newImagePromises, ...deleteImagePromises, ...newFilePromises, deleteFilePromises];
                  try {
                    await Promise.all(allPromises);
                    navigate(`/posts/${postid.postId}`);
                  } catch (error) {
                    console.log("Error in Marker manipulation:", error);
                  }
                

    
         
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
      
      <h1 className=" mb-3 fw-normal logintext">Modify Post</h1>
      <div className="form-floating">
        <textarea
          type="text"
          className="form-control"
          name="title"
          id="floatingTitle"
          placeholder="Id"
          onChange={handleChange}
          required
          defaultValue={title}
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
          defaultValue={content}
          required
        />
        <label htmlFor="floatingContent">Content</label>
      </div>

    {/* <div className="img-container">
      <div className="form-floating">
        <input
          type="file"
          className="form-control"
          name="image"
          id="floatingImage"
          placeholder="Image"
          onChange={handleChange}
          defaultValue={image}
         multiple 
         accept="image/*"
        />
        <label htmlFor="floatingImage">Image</label>
      </div>
      {existPreImage? <button className="btn btn-light deletedefaultbtn"  onClick={deletepreimage}>기존 이미지 삭제</button>:null}
      </div> */}
      <div>
      <button type="button" className="btn btn-light mt-4" data-bs-toggle="modal" data-bs-target="#InfoModal-image" >Image <FontAwesomeIcon className="ms-1" icon={faCirclePlus} /></button>
        <div className="marker-list mt-2">
        {preImageList.map((value, index)=>(
            <div key={index}>
            <span type="button" className="badge text-bg-light me-2" >{"image"+(index+1)}  <FontAwesomeIcon className="ms-1" icon={faXmark} imageIndex={index} preimageId={value.id} onClick={handleDeletePreImage}/> </span>
            </div>
          ))}
           {imageList.map((value, index)=>(
            <div key={index}>
            <span type="button" className="badge text-bg-light me-2" >{"new image"+(index+1)}  <FontAwesomeIcon className="ms-1" icon={faXmark} imageIndex={index} onClick={handleDeleteImage}/> </span>
            </div>
          ))}
        </div>
      </div>


      {/* <div className="img-container">
      <div className="form-floating">
        <input
          type="file"
          className="form-control"
          name="file"
          id="floatingFile"
          placeholder="file"
          onChange={handleChange}
          defaultValue={file}
          multiple
       />
        <label htmlFor="floatingFile">File</label>
      </div>
       {existPreFile? <button className="btn btn-light deletedefaultbtn" onClick={deleteprefile}>기존 첨부파일 삭제</button>:null}
       </div> */}

       <div>
      <button type="button" className="btn btn-light mt-4" data-bs-toggle="modal" data-bs-target="#InfoModal-file" >File <FontAwesomeIcon className="ms-1" icon={faCirclePlus} /></button>
        <div className="marker-list mt-2">
        {preFileList.map((value, index)=>(
            <div key={index}>
            <span type="button" className="badge text-bg-light me-2" >{"file"+(index+1)}  <FontAwesomeIcon className="ms-1" icon={faXmark} fileIndex={index} prefileId={value.id} onClick={handleDeletePreFile}/> </span>
            </div>
          ))}
          {fileList.map((value, index)=>(
            <div key={index}>
            <span type="button" className="badge text-bg-light me-2" >{"new file"+(index+1)}  <FontAwesomeIcon className="ms-1" icon={faXmark} fileIndex={index}  onClick={handleDeleteFile}/> </span>
            </div>
          ))}
        </div>
      </div>



     <div className="form-floating mt-4">
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
          defaultValue={tag}
          
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
          <span type="button" className="badge text-bg-light me-2" >{value[0]}  <FontAwesomeIcon className="ms-1" icon={faXmark} markerIndex={index} markerPk={value[3]} onClick={handleDeleteMarker}/> </span>
          
          </div>
        ))}
        {newMarkerList.map((value, index)=>(
          <div key={index}>
          <span type="button" className="badge text-bg-light me-2" >{value[0]}  <FontAwesomeIcon className="ms-1" icon={faXmark} markerIndex={index} markerPk={value[3]} onClick={handleDeleteNewMarker}/> </span>
          </div>
        ))}

    </div>
      



          
    <div className="modal fade" id="InfoModal-image" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="loginModalLabel">  Position information</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      

       <text className="profileModalWord">Add - Image</text>
       <br/>
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

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary me-auto" data-bs-dismiss="modal" href="#">Cancel</button>
        <button type="button" className="btn btn-secondary" onClick={handleImageList} data-bs-dismiss="modal">등록</button>
      </div>
    </div>
  </div>
    </div>



    <div className="modal fade" id="InfoModal-file" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="loginModalLabel">  Position information</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      

       <text className="profileModalWord">Add - File</text>
       <br/>
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
       


      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary me-auto" data-bs-dismiss="modal" href="#">Cancel</button>
        <button type="button" className="btn btn-secondary" onClick={handleFileList} data-bs-dismiss="modal">등록</button>
      </div>
    </div>
  </div>
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
           Update Post  
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

export default PostModify;