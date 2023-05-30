import './App.css';
import {useEffect,useState,} from 'react';


const {kakao} = window;



function App() {
  const [loading,setLoading] = useState(true)
  const [customOveray,setCustomOveray] = useState(true)
  const [mylat,setMylat] = useState('')
  const [mylong,setMylong] = useState('')
  const [maplat,setMaplat] = useState(37.22100)
  const [maplong,setMaplong] = useState(127.18803)
  const [map,setMap] = useState()
  const [maplevel,setMaplevel] = useState(4)
  const [inputText,setInputText] = useState()
  const [buildNum,setBuildNum] = useState('')
  const [buildPosition,setBuildPosition] = useState()
  const [floor,setFloor] = useState()
  const [dormitory,setDormitory] = useState(true)


  const test=()=>
  {
    setDormitory(!dormitory);
  }

  const onsubmit=(event)=>{
    event.preventDefault();
    if(inputText!==""){
     console.log("submit",inputText);
     if(inputText.length===3){
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
     
    setInputText("");
    }
    

  }
  const customOverayonoff=()=>{
    console.log("level=",maplevel, "mapposition=",maplat,maplong)
    //   setMaplat(map.getCenter().La)
    //   setMaplong(map.getCenter().Ma)
     setCustomOveray(!customOveray)
 
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
  navigator.geolocation.getCurrentPosition(geoOk,geoError);
  console.log(mylat,mylong);

 if (mylat && mylong && map){
  var my = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div id="user">MY</div>', 
    position: new kakao.maps.LatLng(mylat,mylong), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의  = new kakao.maps.CustomOverlay({
  })}}
  ,[mylat, mylong, map]);

  if(map){
    console.log("lat",map.getCenter().La)
    console.log("lon",map.getCenter().Ma)
  }



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
      var y10 = new kakao.maps.CustomOverlay({
        map: map,
        content: '<div class="customOveray Dormitory">Y10_선수숙소</div>', 
        position: new kakao.maps.LatLng(37.221533, 127.19169), // 커스텀 오버레이를 표시할 좌표
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
    //console.log("build",buildNum)
   console.log("build",eval(buildNum).getPosition())
    map.setCenter(eval(buildNum).getPosition())


    

    if(dormitory){
    var dormitoryElements = document.querySelectorAll(".Dormitory");
    for (var i = 0; i < dormitoryElements.length; i++) {
      var element = dormitoryElements[i];
      element.classList.toggle("Dormitory"); // "hidden" 클래스를 토글하여 숨기기/보이기 상태 전환
    }}

  }
 
  var marker = new kakao.maps.Marker({
    position: eval(buildNum).getPosition()
  });
  marker.setMap(map); //표시 버튼에 같이 사라지지 않도록

}  

}catch(e){
console.log(e)}
},[customOveray,buildNum,dormitory])






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
    
    <div className='app-container'>
      <div className='title'>
       <h1>명지도</h1>
       <button onClick={customOverayonoff}>표시</button>
       <button onClick={find_my_position}>내 위치</button>
       <text>Y_</text>
       <form onSubmit={onsubmit}>
       <input type='text' value={inputText} onChange={(event)=>setInputText(event.target.value)} placeholder="강의실 번호 검색" />
      <button onClick={onsubmit}>검색</button>
      </form>
      <button onClick={test}>test</button>
      {floor?<text>{floor}층</text>:null}
      </div>
      <div className='title2'><button>편의점</button><button>식당</button><button>카페</button></div>
      <div id="map"></div>
      {loading? <h1 className='loading'>Loading...</h1>:null}
       
     
    </div>
    
  );
}

export default App;
