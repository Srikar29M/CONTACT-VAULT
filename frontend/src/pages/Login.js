import React, { useContext, useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
// import {ToastContainer , toast} from "react-toastify"
// import "react-toastify/dist/ReactToastify.css";
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Login = () => {

  const {toast} = useContext(ToastContext) ; 
   const {loginUser} = useContext(AuthContext)

    const [credentials  , setcredentials] = useState({
        email :"",
        password:"",
    })

    const handleInputChange  = (event)=>{
        const {name, value} = event.target

        setcredentials({...credentials , [name]:value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
 

        

        if(!credentials.email || !credentials.password){
                toast.error("please enter all required fields!")
                return;
        }
        console.log("successful login")
        console.log(credentials)
         loginUser(credentials);
    }
    return (


        <div className="login-container">

          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name='email'
                value = {credentials.email}

                onChange={handleInputChange}
                placeholder='Enter your email'
               
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name='password'
                value = {credentials.password}
                onChange={handleInputChange}

                placeholder='Enter Password'
             
                
                required
              />
            </div>
            <button type="submit">Login</button>

            <p>Don't have an account ? <Link to= "/register">Create One</Link></p>
          </form>
        </div>
      );
    };
    
    export default Login;


