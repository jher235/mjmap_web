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


var y83 = new kakao.maps.CustomOverlay({
  map: map,
  content: '<div class="customOveray">Y83_모형실험동</div>', 
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
    content: '<div class="customOveray">Y30_명현관</div>', 
    position: new kakao.maps.LatLng(37.22342, 127.181766), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의 y 위치
  });
  var y31 = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div class="customOveray">Y31_명덕관</div>', 
    position: new kakao.maps.LatLng(37.224024, 127.181838), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의 y 위치
  });
  var y32 = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div class="customOveray">Y32_3동</div>', 
    position: new kakao.maps.LatLng(37.223312, 127.183261), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의 y 위치
  });
  var y33 = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div class="customOveray">Y33_4동</div>', 
    position: new kakao.maps.LatLng(37.223747, 127.183826), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의 y 위치
  });
  var y34  = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div class="customOveray">Y34_5동</div>', 
    position: new kakao.maps.LatLng(37.223716, 127.182789), // 커스텀 오버레이를 표시할 좌표
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 0.5 // 컨텐츠의 y 위치
  });
  var y35 = new kakao.maps.CustomOverlay({
    map: map,
    content: '<div class="customOveray">Y35_복지동</div>', 
    position: new kakao.maps.LatLng(37.223814, 127.183199), // 커스텀 오버레이를 표시할 좌표
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
