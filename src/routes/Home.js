import 'bootstrap/dist/css/bootstrap.min.css';
import {Fragment, useEffect,useState,} from 'react';
import '../css/home.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faPen, faXmark} from "@fortawesome/free-solid-svg-icons";
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
  const [showBusStopStation, setShowBusStopStation] = useState(false)
  const [showBusStopDowntown, setShowBusStopDowntown] = useState(false)



  const handleShowBusStopDowntown = ()=>{
    setShowConvenience(false);
    setFindMyLectureRoom(false);
    setShowCafeteria(false);
    setShowBusStopStation(false);

    setShowBusStopDowntown(!showBusStopDowntown);
  }

  const handleShowBusStopStation = ()=>{
    setShowConvenience(false);
    setFindMyLectureRoom(false);
    setShowCafeteria(false);
    setShowBusStopDowntown(false);

    setShowBusStopStation(!showBusStopStation);

  }

  const handleShowCafeteria=()=>{
    setShowBusStopDowntown(false);
    setShowBusStopStation(false);
    setShowConvenience(false);
    setFindMyLectureRoom(false);
    
    
    setShowCafeteria(!showCafeteria);
  }

  const handleShowConvenience =()=>{
    
    setFindMyLectureRoom(false);
    setShowCafeteria(false);
    setShowBusStopStation(false);
    setShowBusStopDowntown(false);

    setShowConvenience(!showConvenience);

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
  setShowBusStopDowntown(false);
  setShowBusStopStation(false);
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
  setShowBusStopDowntown(false);
  setShowBusStopStation(false);
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


    
  }

  
  if(showConvenience){
    const markerPositions=[
      new kakao.maps.LatLng(37.222135, 127.188526),
      new kakao.maps.LatLng(37.223388, 127.187222),
      new kakao.maps.LatLng(37.2192, 127.18255),
      new kakao.maps.LatLng(37.221188, 127.188584),
      new kakao.maps.LatLng(37.224024, 127.181838),
      new kakao.maps.LatLng(37.223814, 127.183199),
      new kakao.maps.LatLng(37.223105, 127.186841),
    ];
    
    
    const markerMessages = [
      'B1층 세븐일레븐, GS편의점',
      '1층 세븐일레븐',
      '1층 GS편의점,<br/>B1층 이마트24',
      '3층 세븐일레븐',
      '1층 세븐일레븐',
      '1층 이마트24',
      '2층 CU편의점',
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
      'B1층 명진당',
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

    
  }

  if(showBusStopDowntown){
    const markerPositions = [
      new kakao.maps.LatLng(37.222292, 127.189000),
      new kakao.maps.LatLng(37.221600, 127.188363),
      new kakao.maps.LatLng(37.222691, 127.186712),
      new kakao.maps.LatLng(37.219900, 127.185341),
      new kakao.maps.LatLng(37.219479, 127.183947),
      new kakao.maps.LatLng(37.224288, 127.187727),
      new kakao.maps.LatLng(37.230496, 127.188230),
      new kakao.maps.LatLng(37.233993, 127.188850),
      

      new kakao.maps.LatLng(37.234786, 127.198828),
      new kakao.maps.LatLng(37.235444,127.206617 ),
      new kakao.maps.LatLng(37.234133, 127.208845 ),
      


      new kakao.maps.LatLng(37.233969, 127.188554),
      new kakao.maps.LatLng(37.231395, 127.188159),
    ]
    
    const markerMessages = [
      "-명진당-<br/>차고지 방면",
      "-함박관-<br/>차고지 방면",
      "-1공학관-<br/>3공학관 방면",
      "-건축관-<br/>3공학관 방면",
      "-3공학관-<br/>회차지점",
      "-차고지-<br/>기종점",

      "-이마트,상공회의소-<br/>용인터미널 방면",
      "-역북동행정복지센터,럭스나인-<br/>용인터미널 방면",

      "-중앙지구대-<br/>용인터미널 방면",
      "-용인시장-<br/>용인터미널 방면",
      "-용인터미널-<br/>회차지점",

      "-역북동행정복지센터,럭스나인-<br/>3공학관 방면",
      "-이마트,상공회의소-<br/>3공학관 방면"
    ]

    markerPositions.forEach((value, index)=>{
      const marker = new kakao.maps.Marker({
        map:map,
        position:value
      })

      const infowindow = new kakao.maps.InfoWindow({
        content:`<div class="infowindow"><span class="infowindow-content">${markerMessages[index]}</span></div>`
      })

      kakao.maps.event.addListener(marker,'mouseover',function(){
        infowindow.open(map,marker);
      })
    
      kakao.maps.event.addListener(marker,'mouseout',function(){
        infowindow.close();
      })

    })

    var linePath = [

  
      new kakao.maps.LatLng(37.224307,127.187719 ),
      new kakao.maps.LatLng(37.224521,127.1878941 ),
      new kakao.maps.LatLng(37.224894, 127.187853),
      new kakao.maps.LatLng(37.224953,127.187864 ),
      new kakao.maps.LatLng(37.225025,127.187870 ),
      new kakao.maps.LatLng(37.225601,127.188052 ),
      new kakao.maps.LatLng(37.227386, 127.187650 ),
      new kakao.maps.LatLng(37.227737,127.187640 ),
      new kakao.maps.LatLng(37.229039,127.187885 ),
      new kakao.maps.LatLng(37.230651, 127.188165),
      new kakao.maps.LatLng(37.231030,127.188285 ),
      new kakao.maps.LatLng(37.231773, 127.188416),
      new kakao.maps.LatLng(37.231953,127.188439 ),
      new kakao.maps.LatLng(37.235245,127.188960 ),
      new kakao.maps.LatLng(37.236067,127.189213 ),
      new kakao.maps.LatLng(37.235009, 127.194439),
      new kakao.maps.LatLng(37.234611,127.195571),
      new kakao.maps.LatLng( 37.234772, 127.196253),
      new kakao.maps.LatLng(37.234895, 127.203297),
      new kakao.maps.LatLng(37.23497, 127.203888 ),


      new kakao.maps.LatLng(37.235555,127.2070683 ),
      new kakao.maps.LatLng(37.235586,127.207643 ),
      new kakao.maps.LatLng(37.235503,127.208713 ),
      new kakao.maps.LatLng(37.23379, 127.208956),
      new kakao.maps.LatLng(37.2332052,127.209017 ),
      new kakao.maps.LatLng( 37.233029, 127.206182),
      new kakao.maps.LatLng(37.232955,127.204779 ),
      new kakao.maps.LatLng(37.232968,127.200080),
      new kakao.maps.LatLng(37.2330138, 127.199787),
      new kakao.maps.LatLng(37.233204,127.199201 ),
      new kakao.maps.LatLng(37.234872, 127.195357),
      new kakao.maps.LatLng(37.2350449, 127.1948567),
      new kakao.maps.LatLng(37.236239,127.189123 ),
      
      //new kakao.maps.LatLng(, ),
  
 
   
     new kakao.maps.LatLng(37.235246, 127.1888479 ),
      new kakao.maps.LatLng( 37.231967,127.188304 ),
      new kakao.maps.LatLng(37.231777, 127.188315),
      new kakao.maps.LatLng(37.231012, 127.188155),
      new kakao.maps.LatLng( 37.230706,127.188070 ),
      new kakao.maps.LatLng(37.228111,127.187590 ),
      new kakao.maps.LatLng(37.227346, 127.1875436),
      new kakao.maps.LatLng(37.225856,127.187863 ),
      new kakao.maps.LatLng(37.225588,127.187936 ),
      new kakao.maps.LatLng(37.225460, 127.1879051),
      new kakao.maps.LatLng(37.225036,127.187746),
      new kakao.maps.LatLng(37.225000,127.187701),
      new kakao.maps.LatLng(37.224917,127.187709),
      new kakao.maps.LatLng(37.224705, 127.187756 ),
      new kakao.maps.LatLng(37.224507, 127.187801),
      new kakao.maps.LatLng( 37.223328, 127.188085),
      new kakao.maps.LatLng(37.222506, 127.186419),
      new kakao.maps.LatLng(37.222184,127.186666 ),

      new kakao.maps.LatLng(37.2218874,127.186434 ),
      new kakao.maps.LatLng(37.22184,127.1864145 ),
      new kakao.maps.LatLng(37.221792,  127.186408),
      new kakao.maps.LatLng(37.221738, 127.186422 ),
      new kakao.maps.LatLng( 37.221042,127.186818 ),
      

       new kakao.maps.LatLng(37.220956, 127.1867475 ),
       new kakao.maps.LatLng(37.220830, 127.186741),
      new kakao.maps.LatLng(37.220461, 127.186740 ),
      new kakao.maps.LatLng(37.2203733, 127.1866898),
      new kakao.maps.LatLng(37.2201394, 127.186416 ),
      new kakao.maps.LatLng( 37.220067,  127.186210),
      new kakao.maps.LatLng(37.2196831,127.184344 ),
      new kakao.maps.LatLng(37.219521, 127.183824),
      new kakao.maps.LatLng(37.219479, 127.183947),
      new kakao.maps.LatLng(37.2195306, 127.1839104),
      new kakao.maps.LatLng(37.219563, 127.1840401),
      new kakao.maps.LatLng(37.2196874,127.1845051),
      new kakao.maps.LatLng(37.220005, 127.186218),
      new kakao.maps.LatLng( 37.220129,127.186495),
      new kakao.maps.LatLng(37.2201955, 127.186571),
      new kakao.maps.LatLng(37.220355,127.186734 ),
      new kakao.maps.LatLng(37.2204790, 127.186788 ),
      new kakao.maps.LatLng(37.220895,127.186786 ),
      
      new kakao.maps.LatLng(37.220976, 127.186803),
      new kakao.maps.LatLng(37.2210915, 127.1869112 ),
      new kakao.maps.LatLng(37.2212280, 127.1874693),
      new kakao.maps.LatLng(37.221663,127.1883859 ),
      new kakao.maps.LatLng(37.221670, 127.1884929),
      new kakao.maps.LatLng(37.221918, 127.188998),
      new kakao.maps.LatLng(37.222027, 127.189172),
      new kakao.maps.LatLng(37.223299,127.188161 ),
      new kakao.maps.LatLng(37.224441, 127.187902),
      new kakao.maps.LatLng(37.224307,127.187719 ),







      
  ];
  
  // 지도에 표시할 선을 생성합니다
  var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: '#FFAE00', // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid' // 선의 스타일입니다
  });
  
  // 지도에 선을 표시합니다 
  polyline.setMap(map);  
  

   


  }


  if(showBusStopStation){
    const markerPositions = [
      new kakao.maps.LatLng(37.222292, 127.188851),
      new kakao.maps.LatLng(37.221600, 127.188363),
      new kakao.maps.LatLng(37.219900, 127.185341),
      new kakao.maps.LatLng(37.219479, 127.183947),
      new kakao.maps.LatLng(37.224288, 127.187727),
      new kakao.maps.LatLng(37.230496, 127.188230),
      new kakao.maps.LatLng(37.233993, 127.188850),
      new kakao.maps.LatLng(37.238497, 127.189563),
      new kakao.maps.LatLng(37.233969, 127.188554),
      new kakao.maps.LatLng(37.231395, 127.188159),
    ]
    
    const markerMessages = [
      "-명진당-<br/>3공학관 방면",
      "-함박관-<br/>차고지 방면",
      "-건축관-<br/>3공학관 방면",
      "-3공학관-<br/>회차지점",
      "-차고지-<br/>기종점",
      "-이마트,상공회의소-<br/>명지대역 방면",
      "-역북동행정복지센터,럭스나인-<br/>명지대역 방면",
      "-명지대역-<br/>회차지점",
      "-역북동행정복지센터,럭스나인-<br/>3공학관 방면",
      "-이마트,상공회의소-<br/>3공학관 방면"
    ]

    markerPositions.forEach((value, index)=>{
      const marker = new kakao.maps.Marker({
        map:map,
        position:value
      })

      const infowindow = new kakao.maps.InfoWindow({
        content:`<div class="infowindow"><span class="infowindow-content">${markerMessages[index]}</span></div>`
      })

      kakao.maps.event.addListener(marker,'mouseover',function(){
        infowindow.open(map,marker);
      })
    
      kakao.maps.event.addListener(marker,'mouseout',function(){
        infowindow.close();
      })

    })

    var linePath = [

  
      new kakao.maps.LatLng(37.224307,127.187719 ),
      new kakao.maps.LatLng(37.224521,127.1878941 ),
      new kakao.maps.LatLng(37.224894, 127.187853),
      new kakao.maps.LatLng(37.224953,127.187864 ),
      new kakao.maps.LatLng(37.225025,127.187870 ),
      new kakao.maps.LatLng(37.225601,127.188052 ),
      new kakao.maps.LatLng(37.227386, 127.187650 ),
      new kakao.maps.LatLng(37.227737,127.187640 ),
      new kakao.maps.LatLng(37.229039,127.187885 ),
      new kakao.maps.LatLng(37.230651, 127.188165),
      new kakao.maps.LatLng(37.231030,127.188285 ),
      new kakao.maps.LatLng(37.231773, 127.188416),
      new kakao.maps.LatLng(37.231953,127.188439 ),
      new kakao.maps.LatLng(37.235245,127.188960 ),
      new kakao.maps.LatLng(37.237947,127.189778 ),
      new kakao.maps.LatLng(37.238362, 127.189954),
      new kakao.maps.LatLng(37.238525, 127.189222),
      new kakao.maps.LatLng(37.238635,  127.188236),
      new kakao.maps.LatLng(37.238800,  127.186129),
      new kakao.maps.LatLng(37.236932, 127.1850712),
      new kakao.maps.LatLng( 37.236088,127.189058 ),
      new kakao.maps.LatLng(37.235246, 127.1888479 ),
      new kakao.maps.LatLng( 37.231967,127.188304 ),
      new kakao.maps.LatLng(37.231777, 127.188315),
      new kakao.maps.LatLng(37.231012, 127.188155),
      new kakao.maps.LatLng( 37.230706,127.188070 ),
      new kakao.maps.LatLng(37.228111,127.187590 ),
      new kakao.maps.LatLng(37.227346, 127.1875436),
      new kakao.maps.LatLng(37.225856,127.187863 ),
      new kakao.maps.LatLng(37.225588,127.187936 ),
      new kakao.maps.LatLng(37.225460, 127.1879051),
      new kakao.maps.LatLng(37.225036,127.187746),
      new kakao.maps.LatLng(37.225000,127.187701),
      new kakao.maps.LatLng(37.224917,127.187709),
      new kakao.maps.LatLng(37.224705, 127.187756 ),
      new kakao.maps.LatLng(37.224507, 127.187801),
      new kakao.maps.LatLng( 37.223328, 127.188085),
      new kakao.maps.LatLng(37.222047,127.1891051 ),
      new kakao.maps.LatLng(37.220994,127.190012 ),
      new kakao.maps.LatLng(37.220847,127.190026 ),
      new kakao.maps.LatLng(37.220710, 127.189913),
      new kakao.maps.LatLng( 37.220685, 127.189867 ),
      new kakao.maps.LatLng( 37.220438,127.188346 ),
      new kakao.maps.LatLng(37.220362, 127.188072),
      new kakao.maps.LatLng(37.220267,  127.187990),
      new kakao.maps.LatLng(37.22004037,127.187829 ),
      new kakao.maps.LatLng(37.220015,127.187779 ),
      new kakao.maps.LatLng(37.2200157,127.1877311 ),
      new kakao.maps.LatLng(37.2204877, 127.1869802),
      new kakao.maps.LatLng(37.221022,127.186818 ),
      new kakao.maps.LatLng(37.220956, 127.1867475 ),
      new kakao.maps.LatLng(37.220830, 127.186741),
      new kakao.maps.LatLng(37.220461, 127.186740 ),
      new kakao.maps.LatLng(37.2203733, 127.1866898),
      new kakao.maps.LatLng(37.2201394, 127.186416 ),
      new kakao.maps.LatLng( 37.220067,  127.186210),
      new kakao.maps.LatLng(37.2196831,127.184344 ),
      new kakao.maps.LatLng(37.219521, 127.183824),
      new kakao.maps.LatLng(37.219479, 127.183947),
      new kakao.maps.LatLng(37.2195306, 127.1839104),
      new kakao.maps.LatLng(37.219563, 127.1840401),
      new kakao.maps.LatLng(37.2196874,127.1845051),
      new kakao.maps.LatLng(37.220005, 127.186218),
      new kakao.maps.LatLng( 37.220129,127.186495),
      new kakao.maps.LatLng(37.2201955, 127.186571),
      new kakao.maps.LatLng(37.220355,127.186734 ),
      new kakao.maps.LatLng(37.2204790, 127.186788 ),
      new kakao.maps.LatLng(37.220895,127.186786 ),
      
      new kakao.maps.LatLng(37.220976, 127.186803),
      new kakao.maps.LatLng(37.2210915, 127.1869112 ),
      new kakao.maps.LatLng(37.2212280, 127.1874693),
      new kakao.maps.LatLng(37.221663,127.1883859 ),
      new kakao.maps.LatLng(37.221670, 127.1884929),
      new kakao.maps.LatLng(37.221918, 127.188998),
      new kakao.maps.LatLng(37.222027, 127.189172),
      new kakao.maps.LatLng(37.223299,127.188161 ),
      new kakao.maps.LatLng(37.224441, 127.187902),
      new kakao.maps.LatLng(37.224307,127.187719 ),



      // new kakao.maps.LatLng( 37.221042,127.186818 ),
      // new kakao.maps.LatLng(37.221738, 127.186422 ),
      // new kakao.maps.LatLng(37.221792,  127.186408),
      // new kakao.maps.LatLng(37.22184,127.1864145 ),
      // new kakao.maps.LatLng(, ),




      
  ];
  
  // 지도에 표시할 선을 생성합니다
  var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: '#FFAE00', // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid' // 선의 스타일입니다
  });
  
  // 지도에 선을 표시합니다 
  polyline.setMap(map);  
  

   


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
},[customOveray,buildNum,dormitory,showConvenience, showCafeteria, showBusStopStation, showBusStopDowntown, findMyLectureRoom])






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
  <div className='home-content'>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  
    {/* <Link to="/" class="nav-link ms-4 me-3"><a class="nav-link font-dokdo " ><h1>명지도</h1></a></Link> */}
     <Link to="/" class="nav-link ms-4 me-3"><img className='titlePlus' width="70px" height="65px" src={"../../mjmapMark.png"}/></Link> 

    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
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
            <li><a class="dropdown-item" onClick={handleShowBusStopStation} >명지대역 셔틀</a></li>
            <li><a class="dropdown-item" onClick={handleShowBusStopDowntown} >시내 셔틀</a></li>
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
                  <li><Link to={`/profile/${localStorage.getItem("usernum")}`} class="dropdown-item" >Profile</Link></li>
                  <li><a class="dropdown-item" onClick={handleLogout}>Log Out</a></li>
                  <li><Link to={`/posts/likes/${localStorage.getItem("usernum")}`} class="dropdown-item">Liked Posts</Link></li>
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
                      <a className='btn btn-light map-dropdown-delete-btn' deletepk={event.pk} onClick={handleStarDelete}><FontAwesomeIcon icon={faXmark}/></a>
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
      :<div id="map" className='map-unlogin' ></div>
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
  
<div className='mt-5'>
      <Footer />
    </div>
    </div>
    
    

    </div>
  
  );
}

export default Home;
