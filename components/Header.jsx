import React from 'react'
import {SiBlockchaindotcom} from "react-icons/si"
import {CgMenuRight} from "react-icons/cg"

const Header = ({setActiveComponent, activeNetwork}) => {
  const navMenu = [
    "Home", "Liqudity", "Pool History", "Liqudity History", "Networks"
  ];
  return (
    <header id="navbar-sticky" className="navbar">
    <div className="container">
      <nav className="">
        <a className="logo" href="/">
          <img src="assets/images/logo.png" alt="logo webAI" className="h-10"/>
        </a>

        <div className='lg-hidden flex items-center ms-auto px-2.5'>
          <button className='hs-collapse-toggle inline-flex items-center justify-center h-9 w-12 rounded-md border border-white/20 bg-default-100/5' type='button' id='hs-unstyled-collapse' data-hs-collaps="#mobileMenu" data-hs-type="collapse">
            <CgMenuRight />
          </button>
        </div>
       
        
      </nav>
    </div>
  </header>
  )
}

export default Header