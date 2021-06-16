import React from "react";
import {FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";


import Menu from "./Menu";
import {footer, Custom} from "../styles.css"
// if using () dont use return keyword if using {} then use return keyword

const  date = new Date().getFullYear();

const Base = ({
    title = "My Title",
    description = "My description",
    className = " text-white p-4",
    children 
}) => (

    <body>
        <Menu />
        <div className="container-fluid">
            <div className="jumbotron bg-dark text-white text-center">
                <h2 className="display-4"> {title} </h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>

    
        <footer className="footer bg-dark mt-auto py-3">
  
       {/* social-icon */}
                    {/* <social-icon>
                    <ul className="nav">
                    <a href="#"><li className="mx-4 col px-md-5" ><FaGithub color="#fffff" size="2.5em"/></li> </a>      
                    <a href="#"><li className="mx-4 col px-md-5"> <FaFacebook color="#4267B2" size="2.5em"/> </li></a>  
                    <a href="#"><li className="mx-4 col px-md-5"> <FaInstagram color="#8a3ab9" size="2.5em"/> </li></a>    
                    <a href="#"><li className="mx-4 col px-md-5"> <FaLinkedin color="#0e76a8" size="2.5em"/> </li></a>  
                    <a href="#"><li className="mx-4 col px-md-5"> <FaTwitter color=" #1DA1F2" size="2.5em" /> </li></a>  
                    </ul>
                    </social-icon> */}
            <div className="container-fluid px-4 text-white text-center">
                  <h4> If You Have Any Query, Feel Free To Reach Out!</h4>
                   <button className="btn btn-warning btn-lg ">Contact us</button>
            </div>
            <div className="container">
              <marquee direction="right">  <span className="text-muted"> &copy;{date} Copyright Reserved: <span className="text-white"> BOOK STORE By Shivam</span> Made with ❤</span>
              </marquee>
            </div>
            

        </footer>
        
    </body>
)


export default Base;