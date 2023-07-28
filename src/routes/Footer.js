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
      
      <p className="mb-0"> &copy; jher</p>
      <p className="mb-0">Connect to me -&gt; <a href="/">Here</a> </p>
     
    </div>
  </footer>



    )
}






export default Footer;