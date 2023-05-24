import './App.css';
import {useEffect,useState} from 'react';


const {kakao} = window;



function App() {
  const [loading,setLoading] = useState(true)
  const [zoomLevel,setzoomLevel] = useState(4)
 
 


  useEffect(()=>{
    try{const container = document.getElementById('map')
    const mapOptions = {
      center: new kakao.maps.LatLng(37.22100, 127.18803), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
    };
   console.log(container)
    if(container){
  const map = new kakao.maps.Map(container, mapOptions);
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.22150, 127.18684), // 마커의 좌표
    map: map // 마커를 표시할 지도 객체
  });
//   var infowindow = new kakao.maps.InfoWindow({
//     content : '<div class="custom-infowindow">2공학관</div>' // 인포윈도우에 표시할 내용
//   });
// infowindow.open(map, marker);

  var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div class="customOveray">2공학관</div>', 
    position: new kakao.maps.LatLng(37.22155, 127.18684), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의 y 위치
  });
  var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div class="customOveray">Y7_체육관</div>', 
    position: new kakao.maps.LatLng(37.22180, 127.19020), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의 y 위치
  });
  
  setLoading(false); 
}}catch(e){
console.log(e)}
},[])
  


  return (
    
    <div className='app-container'>
      <div className='title'>
       <h1>명지도</h1>
      </div>
      <div id="map"></div>
      {loading? <h1 className='loading'>Loading...</h1>:null}
       
     
    </div>
    
  );
}

export default App;
