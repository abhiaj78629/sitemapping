
import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

function Layout() {
  return (
    <div className="nav"> 
             <Link to="/" > Home  </Link> 
             <Link to="/about" >  About </Link> 
             <Link to="/contact" >  Contacts </Link> 
             <Link to="/sitemap"> Sitemap</Link>
             <Link to='/details'>Details</Link>
             
    </div> 
  )
}

export default Layout;