import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const NavbarHome = () => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <Link className="brand-logo" to="/"> Project Management </Link>
      </div>
    </nav> 
  )
}

export default NavbarHome