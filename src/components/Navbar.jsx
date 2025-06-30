import React from 'react'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { IoIosMoon } from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
   <div className="container nav_container">
     
   <Link  to="/" className='nav_logo'>EGATOR</Link>

  <div >
    <menu>
        <NavLink to="/elections">Elections</NavLink>
         <NavLink to="/results">Results</NavLink>
          <NavLink to="/logout">ELogout</NavLink>
    </menu>
    <button className='theme__toggle-btn'><IoIosMoon/></button>
   <button className='theme__toggle-btn'><HiOutlineBars3/></button>
  </div>

   </div>
   </nav>
  )
}

export default Navbar
