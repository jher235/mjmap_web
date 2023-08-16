import React,{useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const kakaoApiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
// const script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services`;
// document.head.appendChild(script);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import React,{useEffect} from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';




// const Index = () => {
//   useEffect(() => {
//     const kakaoApiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services`;
//     document.head.appendChild(script);
//   }, []);

//   return (
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// };

// ReactDOM.render(<Index />, document.getElementById('root'));
// reportWebVitals();