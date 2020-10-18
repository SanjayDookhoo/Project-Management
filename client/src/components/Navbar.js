import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <Link className="brand-logo" to="/"> Project Management </Link>
        <ul className="right">
          <li> <NavLink to="/risks"> Risks </NavLink> </li>
          <li> <NavLink to='/issues'> Issues </NavLink> </li>
          <li> <NavLink to='/actions'> Actions </NavLink> </li>
          <li> <NavLink to='/reports'> Reports </NavLink> </li>
        </ul>
      </div>
    </nav> 
  )
}

export default Navbar