import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../../context/AuthContext';
import ToastContext from '../../context/ToastContext';

const Navbar = () => {
  const {user , setUser}  = useContext(AuthContext)
  const {toast} = useContext(ToastContext)
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">CMS</Link>
      </div>

      <Link to="/create" className="navbar-link">Create</Link>
      <Link to="/mycontacts" className="navbar-link">My Contacts</Link>
      <div className="navbar-right">
      
        {user ? <> <button className='navbar-link logout'  onClick={()=>{setUser(null) ;
        localStorage.clear();
         toast.success("Logged Out")
         navigate("/login" ,{replace:true})
             
        }}>Logout</button></>
             : <> <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/register" className="navbar-link">Register</Link></>  }
        
       
      </div>
    </nav>
  );
}

export default Navbar;






