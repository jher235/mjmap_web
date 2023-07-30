import 'bootstrap/dist/css/bootstrap.min.css';
import {Fragment, useEffect,useState,} from 'react';
import '../css/home.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen} from "@fortawesome/free-solid-svg-icons";
import {Button,Navbar} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'

import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import Footer from "./Footer"

<script src="https://kit.fontawesome.com/51ed27ab31"></script>

const {kakao} = window;

const firstLat = 37.222000
const firstLong = 127.186729

function Home() {
  const [loading,setLoading] = useState(true)
  const [customOveray,setCustomOveray] = useState(true)
  const [mylat,setMylat] = useState('')
  const [mylong,setMylong] = useState('')
  const [maplat,setMaplat] = useState(firstLat)
  const [maplong,setMaplong] = useState(firstLong)
  const [map,setMap] = useState()
  const [maplevel,setMaplevel] = useState(4)
  const [inputText,setInputText] = useState("")
  const [buildNum,setBuildNum] = useState('')
  const [buildPosition,setBuildPosition] = useState()
  const [floor,setFloor] = useState()
  const [dormitory,setDormitory] = useState(false)
  const [amenity, setAmenity] = useState(false)
  const [showConvenience,setShowConvenience] = useState(false)
  const [myOverlay,setMyOverlay] = useState("")
  const navigate = useNavigate()
  const [myNickname, setMyNickname] = useState("")
  const [myImage, setMyImage] = useState("")
  const [myUsernum, setMyUsernum] = useState("")
  const [myStars, setMyStars] = useState("")
  const [starNum,setStarNum] = useState("")
  const [starName, setStarName] = useState("")
  const [targetRoom, setTargetRoom] = useState("")
  const [aboutEvent, setAboutEvent] = useState("")
  const [currnetClass, setCurrentClass] = useState("")
  const [findMyLectureRoom, setFindMyLectureRoom] = useState(false)
  const [showCafeteria, setShowCafeteria] = useState(false)
  const markers = [];



  const handleShowCafeteria=()=>{
    
    setShowConvenience(false);
    setFindMyLectureRoom(false);
    
    setShowCafeteria(!showCafeteria);
  }

  const handleShowConvenience =()=>{
    setShowConvenience(!showConvenience);
  
    setFindMyLectureRoom(false);
    setShowCafeteria(false);
    

  }

  const handleFindMyLectureRoom= (event)=>{
    const mylectureroom = event.target.getAttribute('mylectureroom');
    setAboutEvent(event)
 
    setTargetRoom(mylectureroom);

  }
  

  useEffect(()=>{
      if(targetRoom!=="" && aboutEvent!==""){
        handleSearch2(aboutEvent)
      }
      
  },[targetRoom,aboutEvent])


  const handleStarDelete = (event) =>{
    const deletenum = event.target.getAttribute('deletepk')
    axios
    .delete(`http://127.0.0.1:8000/users/stars/${deletenum}`,{
      headers:{
        'Authorization': 'Token ' + localStorage.getItem("token")
      }
    })
    .then((response)=>{
      if(response.status<300){
        window.location.assign(`/`);
      }
    })
    .catch((error)=>{
      console.log(error);
      console.log(event);
      console.log(event.target.getAttribute('data-event-id'))
    })
  }

  const handleStarSubmit = (event)=>{
    axios
    .post(`http://127.0.0.1:8000/users/stars/`,{
      classnum : starNum,
      classname : starName
    },
    {headers:{
      'Authorization': 'Token ' + localStorage.getItem("token")
    }}
    ).then((response)=>{
      if(response.status<300){

        window.location.assign(`/`);
      }
    })
    .catch((error)=>{
      console.log(error);
      console.log(starName, starNum)
    })
  }

  const handleChange = (event)=>{
    const target = event.target;
    if(target.name==="classname"){
      setStarName(target.value);
    }
    if(target.name ==="classnum"){
      setStarNum(target.value);
    }
  }

  const findCampus = ()=>{
    if(map){
    
     var move = new kakao.maps.LatLng(firstLat,firstLong)
       map.setCenter(move)
      
    }
  }


  const handleLogout=()=>{ //로그아웃
    localStorage.clear();
    window.location.assign(`/`);
  }
  const veiwDomitory=()=>
  {
    setDormitory(!dormitory);
  }


const handleSearch=(event)=>{         //강의실 검색
  event.preventDefault();
  console.log(event)

  if(inputText.length!==0){                  
   console.log("submit",inputText);
   if(inputText.length<3 || inputText.length>6){
    alert("강의실 번호를 제대로 입력해주세요! :(")
   }
  else if(inputText.length===3){
   setBuildNum('y');
   setFloor(inputText[0]);
   }
   else if(inputText.length===4){
  setBuildNum('y'+inputText[0]);
  setFloor(inputText[1]);
   }
   else if(inputText.length===5){
    setBuildNum('y'+inputText[0]+inputText[1]);
    setFloor(inputText[2]);
   }
   
   console.log("buildNum",buildNum)
   setMaplevel(3)
   
  setCurrentClass("Y"+inputText); 
  setInputText("");
  setAboutEvent("");
  setShowCafeteria(false)
  setShowConvenience(false);
  setFindMyLectureRoom(true);
  }
  else{
   alert("빈칸은 입력할 수 없습니다 :(")
  }
};

const handleSearch2=(event)=>{         //강의실 검색
  event.preventDefault();
  console.log(event)

  if(targetRoom.length!==0){                  
   console.log("submit",targetRoom);
   if(targetRoom.length<3 || targetRoom.length>6){
    alert("강의실 번호를 제대로 입력해주세요! :(")
   }
  else if(targetRoom.length===3){
   setBuildNum('y');
   setFloor(targetRoom[0]);
   }
   else if(targetRoom.length===4){
  setBuildNum('y'+targetRoom[0]);
  setFloor(targetRoom[1]);
   }
   else if(targetRoom.length===5){
    setBuildNum('y'+targetRoom[0]+targetRoom[1]);
    setFloor(targetRoom[2]);
   }
   
   console.log("buildNum",buildNum)
   setMaplevel(3)
   
  setCurrentClass("Y"+targetRoom); 
  setTargetRoom("");
  setAboutEvent("");
  setShowCafeteria(false)
  setShowConvenience(false);
  setFindMyLectureRoom(true);
  }
  else{
   alert("빈칸은 입력할 수 없습니다 :(")
  }
};
 



  const customOverayonoff=()=>{
    console.log("level=",maplevel, "mapposition=",maplat,maplong)
    //   setMaplat(map.getCenter().La)
    //   setMaplong(map.getCenter().Ma)
     setCustomOveray(!customOveray)
     var move = new kakao.maps.LatLng(mylat,mylong)
  }

  const find_my_position=()=>{
    if(map){
        if(mylong && mylat){
          var move = new kakao.maps.LatLng(mylat,mylong)
            map.setCenter(move)
        }
        else{
          alert("위치정보가 없습니다")
        }
     }
  }
  console.log(inputText)
  const geoOk=(position)=>{
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    setMylat(position.coords.latitude);
    setMylong(position.coords.longitude);
  }
  const geoError=()=>{
    console.log("위치를 알 수 없습니다")
  }
  useEffect(()=>{
    const watchId = navigator.geolocation.watchPosition(geoOk,geoError);
    console.log(mylat,mylong);

      if (mylat && mylong && map){
        if (myOverlay){
          myOverlay.setMap(null);
        }
        var me = new kakao.maps.CustomOverlay({
          map: map,
          content: '<div id="user">Me</div>', 
          position: new kakao.maps.LatLng(mylat,mylong), // 커스텀 오버레이를 표시할 좌표
          xAnchor: 0.5, // 컨텐츠의 x 위치
          yAnchor: 0.5 // 컨텐츠의  = new kakao.maps.CustomOverlay({
        })
        setMyOverlay(me)
      }

      return()=>{
        navigator.geolocation.clearWatch(watchId)
      }
  },[mylat, mylong, map]);

  if(map){
    console.log("lat",map.getCenter().La)
    console.log("lon",map.getCenter().Ma)
  }


    useEffect(()=>{
        axios
        .get(`http://127.0.0.1:8000/users/profile/${localStorage.getItem("usernum")}/`,{})
        .then((response)=>{
          if(response.status<300){
            setMyStars(response.data.stars);
            console.log(response);
          }
        })
        .catch((error)=>{
          console.log(error);
        })
    },[myUsernum])
  

  useEffect(()=>{
    axios
    .get(`http://127.0.0.1:8000/users/profile/${localStorage.getItem('usernum')}/`,{})
    .then((response)=>{
      if(response.status<300){
          setMyNickname(response.data.nickname);
          setMyImage(response.data.image);
          setMyUsernum(localStorage.getItem('usernum'));
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])



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
  // console.log("lat",map.getCenter().La)
  // console.log("lon",map.getCenter().Ma)

  if(customOveray){
    var y83 = new kakao.maps.CustomOverlay({
      map: map,
      content: '<div class="customOveray">:Y83_모형실험동`${maplevel}`</div>',
      position: new kakao.maps.LatLng(37.21878, 127.183336), // 커스텀 오버레이를 표시할 좌표
      xAnchor: 0.5, // 컨텐츠의 x 위치
      yAnchor: 0.5 // 컨텐츠의  = new kakao.maps.CustomOverlay({
    })
      var y82 = new kakao.maps.CustomOverlay({
      map: map,
      content: '<div class="customOveray">Y82_온실</div>', 
      position: new kakao.maps.LatLng(37.223865, 127.185108), // 커스텀 오버레이를 표시할 좌표
      xAnchor: 0.5, // 컨텐츠의 x 위치
      yAnchor: 0.5 // 컨텐츠의 y  = new kakao.maps.CustomOverlay({
    })
      var y = new kakao.maps.CustomOverlay({
      map: map,
        content: '<div class="customOveray">Y_1공학관</div>', 
        position: new kakao.maps.LatLng(37.222494, 127.187176), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y  = new kakao.maps.CustomOverlay({
      })
      var y1 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y1_학생회관</div>', 
        position: new kakao.maps.LatLng(37.223388, 127.187222), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y2 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y2_창조예술관</div>', 
        position: new kakao.maps.LatLng(37.223029, 127.189612), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y3 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y3_명진당</div>', 
        position: new kakao.maps.LatLng(37.222135, 127.188526), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y5 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y5_5공학관</div>', 
        position: new kakao.maps.LatLng(37.22202, 127.18766), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y  = new kakao.maps.CustomOverlay({
    });
    var y6 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y6_예체능관</div>', 
        position: new kakao.maps.LatLng(37.222104, 127.190734), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y  = new kakao.maps.CustomOverlay({
        });
    var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y7_체육관</div>', 
        position: new kakao.maps.LatLng(37.22180, 127.19020), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y8 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y8_2공학관</div>', 
        position: new kakao.maps.LatLng(37.22155, 127.18684), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y9 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y9_함박관</div>', 
        position: new kakao.maps.LatLng(37.221188, 127.188584), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      
      var y11 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y11_학군단</div>', 
        position: new kakao.maps.LatLng(37.222380, 127.191587), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y12 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y12_디자인조형센터</div>', 
        position: new kakao.maps.LatLng(37.22040, 127.18545), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y  = new kakao.maps.CustomOverlay({
      })
    var y13 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y13_4공학관</div>', 
        position: new kakao.maps.LatLng(37.218912, 127.183763), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y14 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y14_구조재료실험동</div>', 
        position: new kakao.maps.LatLng(37.218386, 127.183799), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y15 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y15_수리모형실습동</div>', 
        position: new kakao.maps.LatLng(37.21870, 127.18449), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y16 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y16_방목기념관</div>', 
        position: new kakao.maps.LatLng(37.220977, 127.187413), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y17 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y17_산업협력관</div>', 
        position: new kakao.maps.LatLng(37.22086, 127.18794), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y18 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y18_공동실험동</div>', 
        position: new kakao.maps.LatLng(37.222800, 127.186006), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y19 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y19_3공학관</div>', 
        position: new kakao.maps.LatLng(37.2192, 127.18255), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y20 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y20_건축도시설계원</div>', 
        position: new kakao.maps.LatLng(37.219985, 127.184922), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y21 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y21_학생복지관</div>', 
        position: new kakao.maps.LatLng(37.223105, 127.186841), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y22 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y22_채플관</div>', 
        position: new kakao.maps.LatLng(37.223817, 127.186890), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y23 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y23_차세대과학관</div>', 
        position: new kakao.maps.LatLng(37.221361, 127.189275), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y24 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray">Y24_하이브리드구조실험센터</div>', 
        position: new kakao.maps.LatLng(37.217733, 127.185047), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      if(dormitory){
      var y10 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray Dormitory">Y10_선수숙소</div>', 
        position: new kakao.maps.LatLng(37.221533, 127.19169), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y30 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray Dormitory">Y30_명현관</div>', 
        position: new kakao.maps.LatLng(37.22342, 127.181766), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y31 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray Dormitory">Y31_명덕관</div>', 
        position: new kakao.maps.LatLng(37.224024, 127.181838), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y32 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray Dormitory">Y32_3동</div>', 
        position: new kakao.maps.LatLng(37.223312, 127.183261), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y33 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray Dormitory">Y33_4동</div>', 
        position: new kakao.maps.LatLng(37.223747, 127.183826), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y34  = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray Dormitory">Y34_5동</div>', 
        position: new kakao.maps.LatLng(37.223716, 127.182789), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
      var y35 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray Dormitory">Y35_복지동</div>', 
        position: new kakao.maps.LatLng(37.223814, 127.183199), // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 0.5 // 컨텐츠의 y 위치
      });
    
    }

    // if(showConvenience){
    // var con1 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.222135, 127.188526),  
    // });

    // var con2 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.223388, 127.187222), 
    // });
    // var con3 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.2192, 127.18255),
    // });
    // var con4 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.221188, 127.188584),
    // });
    // var con5 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.224024, 127.181838),
    // });
    // var con6 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.223814, 127.183199), 
    // });
   
    // const infowindow = new kakao.maps.InfoWindow({
    //   content: '<div style="padding:5px;">학생회관</div>',
    // });

    // kakao.maps.event.addListener(con1, 'mouseover', function() {
      
    //   infowindow.open(map, con1 )
    // });
    // kakao.maps.event.addListener(con1, 'mouseout', function() {
     
    //   infowindow.close(map, con1 )
    // });
    // kakao.maps.event.addListener(con2, 'click', function() {
    //   alert('학생회관');
    // });
    // kakao.maps.event.addListener(con3, 'click', function() {
    //   alert('3공학관 이마트24');
    // });
    // kakao.maps.event.addListener(con4, 'click', function() {
    //   alert('함박관 세븐일레븐');
    // });
    // kakao.maps.event.addListener(con5, 'click', function() {
    //   alert('명덕관 1층');
    // });
    // kakao.maps.event.addListener(con6, 'click', function() {
    //   alert('기숙사 매점 2층');
    // });
    
    // }


    // if (showConvenience) {
    //   const markerPositions = [
    //     new kakao.maps.LatLng(37.222135, 127.188526),
    //     new kakao.maps.LatLng(37.223388, 127.187222),
    //     new kakao.maps.LatLng(37.2192, 127.18255),
    //     new kakao.maps.LatLng(37.221188, 127.188584),
    //     new kakao.maps.LatLng(37.224024, 127.181838),
    //     new kakao.maps.LatLng(37.223814, 127.183199),
    //   ];
    
    //   const markerMessages = [
    //     '명진당 지하1층 세븐일레븐',
    //     '학생회관',
    //     '3공학관 이마트24',
    //     '함박관 세븐일레븐',
    //     '명덕관 1층',
    //     '기숙사 매점 2층',
    //   ];
    
    //   markerPositions.forEach((position, index) => {
    //     const marker = new kakao.maps.Marker({
    //       map: map,
    //       position: position,
    //     });
    
    //     const infowindow = new kakao.maps.InfoWindow({
    //       content: `<div style="padding:5px;">${markerMessages[index]}</div>`,
    //     });
    
    //     // 마우스 오버 시 인포윈도우 열기
    //     kakao.maps.event.addListener(marker, 'mouseover', function () {
    //       infowindow.open(map, marker);
    //     });
    
    //     // 마우스 아웃 시 인포윈도우 닫기
    //     kakao.maps.event.addListener(marker, 'mouseout', function () {
    //       infowindow.close();
    //     });
    //   });
    // }

    

    if(showConvenience){
      const markerPositions=[
        new kakao.maps.LatLng(37.222135, 127.188526),
        new kakao.maps.LatLng(37.223388, 127.187222),
        new kakao.maps.LatLng(37.2192, 127.18255),
        new kakao.maps.LatLng(37.221188, 127.188584),
        new kakao.maps.LatLng(37.224024, 127.181838),
        new kakao.maps.LatLng(37.223814, 127.183199),
      ];
      
      const markerMessages = [
        '명진당 지하1층 세븐일레븐',
        '학생회관',
        '3공학관 이마트24',
        '함박관 세븐일레븐',
        '명덕관 1층',
        '기숙사 매점 2층',
      ];
    

      markerPositions.forEach((position, index) => {
          const marker = new kakao.maps.Marker({
            map: map,
            position: position,
          });
        
        const infowindow = new kakao.maps.InfoWindow({
          content:  `<div class="infowindow"><span class="infowindow-content ">${markerMessages[index]}</span></div>`
        })

        kakao.maps.event.addListener(marker,"mouseover",function(){
          infowindow.open(map, marker)
         
        })

        kakao.maps.event.addListener(marker,"mouseout",function(){
          infowindow.close()
       
        })

          
      });
    }
    

  
    //console.log("build",buildNum)
  
    if(showCafeteria){

     const markerPositions = [
        new kakao.maps.LatLng(37.222135, 127.188526), 
        new kakao.maps.LatLng(37.223814, 127.183199), 
        new kakao.maps.LatLng(37.223388, 127.187222),
        new kakao.maps.LatLng(37.220977, 127.187413),
      ]

      const markerMessages = [
        '지하1층 명진당',
        '1층 기숙사식당',
        '1층 학생회관',
        '4층 교직원식당'
      ]
      

      markerPositions.forEach((value, index)=>{
        const marker = new kakao.maps.Marker({
          map:map,
          position:value
        })
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div class="infowindow"><span class="infowindow-content">${markerMessages[index]}</span></div>`
        })

        kakao.maps.event.addListener(marker,"mouseover",function(){
          infowindow.open(map, marker);
        })

        kakao.maps.event.addListener(marker,"mouseout",function(){
          infowindow.close();
        })
      })


      // var cafeteria1 = new kakao.maps.Marker({
      //   map: map,
      //   position: new kakao.maps.LatLng(37.222135, 127.188526), 
      // });
      // var cafeteria2 = new kakao.maps.Marker({
      //   map: map,
      //   position: new kakao.maps.LatLng(37.223814, 127.183199), 
      // });
      // var cafeteria3 = new kakao.maps.Marker({
      //   map: map,
      //   position: new kakao.maps.LatLng(37.223388, 127.187222),
      // });
      // var cafeteria4 = new kakao.maps.Marker({
      //   map: map,
      //   position: new kakao.maps.LatLng(37.220977, 127.187413),
      // });
      


      // kakao.maps.event.addListener(cafeteria1, 'click', function() {
      //   alert('명진당 지하1층');
      // });
      // kakao.maps.event.addListener(cafeteria2, 'click', function() {
      //   alert('기숙사식당 1층');
      // });
      // kakao.maps.event.addListener(cafeteria3, 'click', function() {
      //   alert('학생회관 1층');
      // });
      // kakao.maps.event.addListener(cafeteria4, 'click', function() {
      //   alert('교직원식당 4층');
      // });
      
    }

  

    
  }

  if(findMyLectureRoom){
  console.log("build",eval(buildNum).getPosition())
  map.setCenter(eval(buildNum).getPosition())

  var myLectureRoom = new kakao.maps.Marker({
    map: map,
    position: eval(buildNum).getPosition()
  });
  const infowindow = new kakao.maps.InfoWindow({
    
    content: `<div class="infowindow"><span class="infowindow-content">${floor === "0"?"지하1":floor} 층 </span></div>`
  })
  kakao.maps.event.addListener(myLectureRoom, "mouseover", function(){
    infowindow.open(map, myLectureRoom);
  })

  kakao.maps.event.addListener(myLectureRoom, "mouseout", function(){
    infowindow.close();
  })

  myLectureRoom.setMap(map); //표시 버튼에 같이 사라지지 않도록
  }


  console.log("showConvenience"+showConvenience, "showCafeteria"+ showCafeteria,"findMyLectureRoom", findMyLectureRoom )
 

}  

}catch(e){
console.log(e)}
},[customOveray,buildNum,dormitory,showConvenience, showCafeteria, findMyLectureRoom])






if(map){
kakao.maps.event.addListener(map, 'center_changed', function() {
  // setMaplat(map.getCenter().La)
  // setMaplong(map.getCenter().Ma)
  const center = map.getCenter()
      setMaplat(center.getLat());
    setMaplong(center.getLng());

  setMaplevel(map.getLevel())
  console.log("level=",maplevel, "mapposition=",maplat,maplong)
});
}

return (

    <div   className='app-container'>


   
    
{/*       
    <div  className='title'>


<h1>명지도</h1>
<button onClick={customOverayonoff}>표시</button>
<button onClick={find_my_position}>내 위치</button>
<text>Y_</text>
<form onSubmit={onsubmit}>
<input type='number' value={inputText} onChange={(event)=>setInputText(event.target.value)} placeholder="강의실 번호 검색" />
<button onClick={onsubmit}>검색</button>
</form>
<button onClick={test}>test</button>
<button onClick={veiwDomitory}>기숙사</button>
{floor?<text>{floor}층</text>:null}
</div> */}

      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link to="/" class="nav-link ms-4 me-3"><a class="nav-link titlePlus " ><h1>명지도</h1></a></Link>


    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
        <li class="nav-item">
          <a role="button" class="nav-link" onClick={findCampus}>자연캠</a>
        </li>
        <li class="nav-item">
          <a role="button" class="nav-link" onClick={find_my_position} >내 위치</a>
        </li>
        <li class="nav-item">
          <a role="button" class="nav-link" onClick={customOverayonoff}>건물번호</a>
        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            편의시설
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" onClick={handleShowCafeteria}>교내식당</a></li>
            <li><a class="dropdown-item" onClick={handleShowConvenience}>편의점</a></li>
            <li><a class="dropdown-item"  >도서관&서점</a></li>
            <li><a class="dropdown-item" onClick={veiwDomitory}>기숙사</a></li>
          </ul>
        </li>
        <li>
          <Link to="posts" class="nav-link">게시판</Link>
        </li>
      </ul>

        

      <div class="search floor" >
      <text class="floor">Y_</text>
      <form onSubmit={handleSearch}>
      <input class='search1'type='number' value={inputText} onChange={(event)=>setInputText(event.target.value)} placeholder="강의실 번호 검색" />
      <button class='search1 btn-sm btn-block' onClick={handleSearch} >검색</button>
      {currnetClass!=="" ? <text className='ms-4'>{currnetClass}</text>:null }
      {floor?(<text className="floor ms-3">{floor==="0"? "지하 1층" : floor +"층"}</text>):null}
      </form>
      
      </div>
      
      <ul class="navbar-nav ms-auto login-margin ">
        
          {/* <a class="nav-link btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" href="#">Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></a>
           */}
           {localStorage.getItem("token") ? 
             <li class="nav-item dropdown ">
                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {myNickname!==""?
                  <>
                    <img src={myImage} className="profile-image  img-fluid ms-3 me-3" width="40" height="40"/>
                     {myNickname}
                  </>
                  :<a>Loading..</a>}
                </a>
              <ul class="dropdown-menu ">
                  <li><Link to={`/profile/${localStorage.getItem("usernum")}`} class="dropdown-item" href="#">Profile</Link></li>
                  <li><a class="dropdown-item" onClick={handleLogout}>Log Out</a></li>
              </ul>
            </li>  : 
             <li class="nav-item"> <Link to="/login" class="nav-link btn btn-light" >Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></Link></li>
           }
          
          
        
      </ul>
      
     
    </div>
  </div>
</nav>

      
    {localStorage.getItem("token")?
      <>
      <div className='map-dropdown-container'>
        <div id="map" className='ms-5'></div>
        <div className="dropdown-center map-dropdown-main">
            <button className="btn btn-light dropdown-toggle me-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              내 강의실
            </button>
            <ul className="dropdown-menu">
              {myStars!==""?
                myStars.map((event)=>(
                <Fragment>
                  <li >
                    <div className="dropdown-item map-dropdown-menu" mylectureroom={event.classnum} onClick={handleFindMyLectureRoom}>
                      <a className='map-dropdown-classnum' mylectureroom={event.classnum} onClick={handleFindMyLectureRoom}>{event.classname}</a>
                      <a className='btn btn-light map-dropdown-delete-btn' deletepk={event.pk} onClick={handleStarDelete}>x</a>
                    </div>
                  </li>
                </Fragment>
                ))
                :null
              }
              <li><hr class="dropdown-divider"/></li>
              <li className='dropdown-item' data-bs-toggle="modal" data-bs-target="#profileModifyModal"><a>내 강의실 추가</a></li>

            </ul>
          </div>
      </div>
      </>
      :<div id="map" ></div>
    }
      {loading? <h1 className='loading'>Loading...</h1>:null}
       
     
<div className="modal fade" id="profileModifyModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="loginModalLabel"><FontAwesomeIcon icon={faPen}/>   Add My Lecture</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <text className="profileModalWord">Class Number</text><br/>
       <input 
       className=""
       type="number"
       name="classnum"
       onChange={handleChange}
       ></input>
       <br/>
       <br/>
       <text className="profileModalWord">Class Name</text>
       <input 
       className="loginInput" 
       type='text'
      onChange={handleChange}
       name="classname"
       ></input>
       
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary me-auto" data-bs-dismiss="modal" href="#">Cancel</button>
        <button type="button" className="btn btn-secondary" onClick={handleStarSubmit}>등록</button>
      </div>
    </div>
  </div>
    </div>
      
    <Footer/>

    </div>
  
  );
}

export default Home;
