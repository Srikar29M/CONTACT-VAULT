import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

// import {ToastContainer  , toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css";
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Register = () => {

  const {toast}  = useContext(ToastContext)
    const {registerUser} = useContext(AuthContext)
    const [credentials , setcredentials] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const handleInputChange = event =>{
        const {name , value} = event.target;

        setcredentials({...credentials , [name]:value})
    };

    const handleSubmit = event =>{
        event.preventDefault();

        if(!credentials.email || !credentials.password || !credentials.confirmPassword){
            toast.error("please enter all the required fields!")
            return
        }

        if(credentials.password !== credentials.confirmPassword){
            toast.error("password do not match!")
            return;
        }

        const userData = {...credentials , confirmPassword:undefined}
       registerUser(userData)
    }
  return (
    
        <div className="login-container">
        
            {/* <ToastContainer autoClose={3000}/> */}
          <h2>CREATE YOUR ACCOUNT</h2>
          
          <form onSubmit={handleSubmit} >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
             
                name='name'
                value={credentials.name}

                onChange={handleInputChange}
                
               
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
             
                name='email'
                value={credentials.email}

                onChange={handleInputChange}
                
               
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"

                
                name='password'
                value={credentials.password}
                onChange={handleInputChange}
             
                
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"

                name='confirmPassword'
                value={credentials.confirmPassword}
                onChange={handleInputChange}

             
                
                required
              />
            </div>
            <button type="submit">Register</button>


  <p>
     Already have an account ? <Link to ="/login" >Login</Link>
  </p>
           
          </form>

     
        </div>
      
    
  )
}

export default Register
