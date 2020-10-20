import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="nav-wrapper teal darken-3">
      <div className="container">
        <Link className="brand-logo" to="/"> Project Management </Link>
        <ul className="right">
          <li> <NavLink to="/project/risks"> Risks </NavLink> </li>
          <li> <NavLink to='/project/issues'> Issues </NavLink> </li>
          <li> <NavLink to='/project/actions'> Actions </NavLink> </li>
          <li> <NavLink to='/project/reports'> Reports </NavLink> </li>
        </ul>
      </div>
    </nav> 
  )
}

export default Navbar