const kak_map_api_url = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${config.apikey}&libraries=services`;

const loadMapAPI = () => {
    const script = document.createElement('script');
    script.src = kakao_map_api_url;
    script.type = 'text/javascript';
    document.head.appendChild(script);
};

loadMapAPI();