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

  const test=()=>
  {
    var movehere = new kakao.maps.LatLng(37.22100,127.18803)
    map.setCenter(movehere)
  }

  const onsubmit=(event)=>{
    event.preventDefault();
    if(inputText!==""){
     console.log("submit",inputText);
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
  if(customOveray){

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
  },
  [customOveray])




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

 }  

}catch(e){
console.log(e)}
},[customOveray])






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
      </div>
      <div id="map"></div>
      {loading? <h1 className='loading'>Loading...</h1>:null}
       
     
    </div>
    
  );
}

export default App;
