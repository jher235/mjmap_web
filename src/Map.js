import React, {useEffect} from 'react'


const {kakao} = window;


export default function Map(){

    useEffect(()=>{
        let mapContainer = document.getElementById('map')

        let mapOptions = {
            center: new kakao.maps.LatLng(37.22100, 127.18803),
            level: 4,
            mapTypeId: kakao.maps.MapTypeId.ROADMAP,
        };
        

        var map = new kakao.maps.Map(mapContainer,mapOptions)
    },[])


return(
    <div
    id='map'
    style={{
        width:"80%",
        height:"80%",
    }}></div>
)


}