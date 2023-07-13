import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect,useState,} from 'react';
import '../css/home.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {Button,Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import 'bootstrap/dist/js/bootstrap.bundle.min';

<script src="https://kit.fontawesome.com/51ed27ab31"></script>

function navi(){
    <div  className='app-container'>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand titlePlus ms-4" href="#" ><h1>명지도</h1></a>


    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
        <li class="nav-item">
          <a role="button" class="nav-link" onClick={findCampus} href="#">자연캠</a>
        </li>
        <li class="nav-item">
          <a role="button" class="nav-link" onClick={find_my_position} href="#">내 위치</a>
        </li>
        <li class="nav-item">
          <a role="button" class="nav-link" onClick={customOverayonoff} href="#">건물번호</a>
        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            편의시설
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">식당</a></li>
            <li><a class="dropdown-item" href="#">편의점</a></li>
            <li><a class="dropdown-item" href="#">도서관&서점</a></li>
            <li><a class="dropdown-item" onClick={veiwDomitory}>기숙사</a></li>
          </ul>
        </li>
      </ul>

        

      <div class="search floor" >
      <text class="floor">Y_</text>
      <form onSubmit={onsubmit}>
      <input class='search1'type='number' value={inputText} onChange={(event)=>setInputText(event.target.value)} placeholder="강의실 번호 검색" />
      <button class='search1 btn-sm btn-block' onClick={onsubmit} >검색</button>
      {floor?<text class="floor">{floor}층</text>:null}
      </form>
      
      </div>
      
      <ul class="navbar-nav ms-auto me-5 ">
        <li class="nav-item">
          {/* <a class="nav-link btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" href="#">Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></a>
           */}
           {localStorage.getItem("token")? localStorage.getItem("username") : <Link to="/login" class="nav-link btn btn-primary" >Log In <FontAwesomeIcon icon={faArrowRightToBracket}/></Link>
           }
          
          
        </li>
      </ul>
      
     
    </div>
  </div>
</nav>




<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="loginModalLabel"><FontAwesomeIcon icon={faArrowRightToBracket}/>   Log In</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <text class="loginWord">Id</text>
       <input class="loginInput"></input>

       <text class="loginWord">Password</text>
       <input class="loginInput"></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary me-auto" href="#">Sign Up</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

      
}



