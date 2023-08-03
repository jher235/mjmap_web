import 'bootstrap/dist/css/bootstrap.min.css';
import {Fragment, useEffect,useState,} from 'react';
import '../css/footer.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {Button,Navbar} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'

import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';




function Footer() {

    return(

           
    <footer className="text-muted py-5 footer">
    <div className="footer-container">
      
      <p className="mb-0"> &copy; <img width="40px" height="40px" src={"../../jherMark.png"}/></p>
      <p className="mb-0">If you want to contact to me -&gt; <Link to="contact_me" className='contact-btn'>Click Here</Link> </p>
     
    </div>
  </footer>



    )
}






export default Footer;