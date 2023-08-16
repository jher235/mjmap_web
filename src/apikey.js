const loadKakaoMap = () => {
    const scriptTag = document.getElementById("kakao-map-script");
    // scriptTag.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
    scriptTag.src ='https://dapi.kakao.com/v2/maps/sdk.js?appkey=47040307eaafc39a6f99984328039bd6&libraries=services'
  };
  
  export default loadKakaoMap;