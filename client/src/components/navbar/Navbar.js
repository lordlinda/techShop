import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import Container from '../Container.js'
import NavbarToggle from './NavbarToggle.js'
import NavbarList from './NavbarList.js'
import './navbar.css'
const Navbar=()=>{
	//implement toggle state
	const [active,setActive]=useState(false)
	//toggle control
	const menuState=()=>{
		setActive(!active)
	}
	return (
		<Container>
		<nav className='navbar'>
	      {/*left side*/}
	      <div className='flex justify-between w-full md:w-32 items-center'>
	      <Link to='/' className='logo w-16 animate'>
	      <img src='' alt='main logo'/>
	      </Link>
	      <NavbarToggle active={active} menuState={menuState} />
	      </div>
	  {/*Right side*/}
	  <div className={`${active ?'flex':'hidden'} md:flex`}>
	  <NavbarList />
	  </div>
        </nav>
		</Container>
		)
}

export default Navbar