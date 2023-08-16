
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Posts from "./routes/Posts";
import PostCreate from "./routes/PostCreate";
import PostDetail from "./routes/PostDetail";

import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PostModify from "./routes/PostModify";
import Profile from "./routes/Profile";
import Footer from "./routes/Footer";
import ContactMe from "./routes/ContactMe";
import PostTag from "./routes/PostTag";
import PostLikes from "./routes/PostLIkes";


//basename={process.env.PUBLIC_URL}
function App() {
  return(<Router basename={process.env.PUBLIC_URL} >
    <Routes>
      <Route path={"/"} element={<Home />}/>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/hi"} element ={<h1>hi</h1>} />
      <Route path={"/register"} element ={<Register/>} />
      <Route path={"/posts"} element ={<Posts/>} />
      <Route path={"/post_create"} element ={<PostCreate/>}/> 
      <Route path={"/posts/:postId"} element={<PostDetail/>}/>
      <Route path={"/posts/:postId/post_modify"} element={<PostModify/>}/>
      <Route path={"/profile/:usernum"} element={<Profile/>}/>
      <Route path={"/footer"} element={<Footer/>}/>
      <Route path={"/contact_me"} element={<ContactMe/>}/>
      <Route path={"/posts/tag/:tagId"} element={<PostTag/>}/>
      <Route path={"posts/likes/:userId"} element={<PostLikes/>}/>
    </Routes>
  </Router>);
}

export default App;



