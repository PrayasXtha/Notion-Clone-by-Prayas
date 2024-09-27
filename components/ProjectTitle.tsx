import React from 'react'
import { SocialIcon } from 'react-social-icons/component'
const img = "/prayasPP.jpg"

import 'react-social-icons/linkedin'
import 'react-social-icons/github'


function ProjectTitle() {
  return (
    <header className="flex flex-1 justify-center  bg-black ">
    <ul className="flex p-3 justify-center items-center text-white">
      <li><a href='https://prayasxtha.github.io/' target='blank'><img id="logo" src={img} alt="Logo"  className="w-8 mr-3 h-auto" />
      </a></li>
      <li><h5 className="text-xs">MY PROJECT SERIES: </h5>
      <h2 className="text-lg"><b>NOTION CLONE</b> </h2></li>
 

      <li><a id='socials_git' className="social_links" href="" target="_blank" data-aos="fade-down" data-aos-delay="150" data-aos-duration="1500" data-aos-easing="ease-in-out">
        <i className="fa-brands fa-github"></i>
      </a></li>
      <li className="ml-3">
      <SocialIcon style={{ width: '35px', height: '35px' }}   url="www.linkedin.com" href="https://www.linkedin.com/in/prayas-shrestha-702a4223b/" target="blank" />
     
        </li> 
        <li className="ml-3">
      
      <SocialIcon  style={{ width: '35px', height: '35px' }}  url="www.github.com" href="https://github.com/PrayasXtha" target="blank"/>
        </li> 

    </ul>
    </header>
  )
}

export default ProjectTitle
