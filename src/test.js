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

  const customOverayonoff=()=>{
   
    //   setMaplat(map.getCenter().La)
    //   setMaplong(map.getCenter().Ma)
    // if (map) {
    //     const center = map.getCenter();
    //     setMaplat(center.getLat());
    //     setMaplong(center.getLng());
    //   }
    // console.log("level=",maplevel, "mapposition=",maplat,maplong)
     console.log("hi")
    // setCustomOveray(!customOveray)
  }
  
  const geoOk=(position)=>{
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    setMylat(position.coords.latitude);
    setMylong(position.coords.longitude);
  }
  const geoError=()=>{
    console.log("위치를 알 수 없습니다")
  }
  
  navigator.geolocation.getCurrentPosition(geoOk,geoError)
  console.log(mylat,mylong)
  
//   if(map){
//     console.log("lat",map.getCenter().La)
//     console.log("lon",map.getCenter().Ma)
//   }

  // 37.22100, 127.18803
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
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.22150, 127.18684), // 마커의 좌표
    map: map // 마커를 표시할 지도 객체
  });
  setLoading(false); 
  setMap(map)
  // console.log("lat",map.getCenter().La)
  // console.log("lon",map.getCenter().Ma)
  var my = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div id="user">MY</div>', 
    position: new kakao.maps.LatLng(mylat,mylong), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의  = new kakao.maps.CustomOverlay({
  })
  

  if(customOveray){
   
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
    
  //  document.querySelector(".customoveray").setMap(null)
     }
 }  

}catch(e){
console.log(e)}
},[customOveray])

if(map){
kakao.maps.event.addListener(map, 'center_changed', function() {
  setMaplat(map.getCenter().La)
  setMaplong(map.getCenter().Ma)

    // setMaplat(center.getLat());
    // setMaplong(center.getLng());

  setMaplevel(map.getLevel())
  console.log("level=",maplevel, "mapposition=",maplat,maplong)
});
}


  return (
    
    <div className='app-container'>
      <div className='title'>
       <h1>명지도</h1>
       <button onClick={customOverayonoff}>표시</button>
      </div>
      <div id="map"></div>
      {loading? <h1 className='loading'>Loading...</h1>:null}
       
     
    </div>
    
  );
}

export default App;
