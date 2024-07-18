import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import './CreateContact.css'
import ToastContext from '../context/ToastContext';


const CreateContact = () => {
    const [userDetails , setUserDetails] = useState({
        name:"",
        address:"",
        email:"",
        phone:"",
    })

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const {toast} = useContext(ToastContext)

  const handleInputChange = (event) =>{
    const {name  , value} = event.target;

    setUserDetails({...userDetails , [name]:value})
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const res = await fetch(`http://localhost:4000/api/contact` , {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify(userDetails)
    });

    const result  = await res.json();
    if(!result.error){
        toast.success(`Created [${userDetails.name}] `)
        console.log(result)
        setUserDetails({name:""  ,address:"" ,email:"" , phone:""});
        // console.log(result)
    } else{

        toast.error(result.error)
        console.log(result);
    }

  }

  
  return (
  <>    
    <h2 className='create'>Create Your Contacts</h2>

    <form action="" className='contact-form' onSubmit={handleSubmit}>

    <div className="form-group">
              <label htmlFor="nameInput">Name of Person</label>
              <input
                type="text"
                id="nameInput"
                name='name'
                value = {userDetails.name}
                onChange={handleInputChange}

                placeholder='Enter Contact Name'
             
                
                required
              />
            </div>
    <div className="form-group">
              <label htmlFor="addressInput">Address of Person</label>
              <input
                type="text"
                id="addressInput"
                name='address'
                value = {userDetails.address}
                onChange={handleInputChange}

                placeholder='Address of Contact'
             
                
                required
              />
            </div>
    <div className="form-group">
              <label htmlFor="emailInput">Email of Person</label>
              <input
                type="email"
                id="emailInput"
                name='email'
                value = {userDetails.email}
                onChange={handleInputChange}

                placeholder='Enter Email of contact'
             
                
                required
              />
            </div>
    <div className="form-group">
              <label htmlFor="phoneInput">Phone Number of Person</label>
              <input
                type="number"
                id="phoneInput"
                name='phone'
                value = {userDetails.phone}
                onChange={handleInputChange}

                placeholder='+91 1234567843'
             
                className='phone-input'
                required
              />
            </div>

            <input  type="submit" value="Add Contact"  className='btn btn-info my-2'  />
    </form>
  
  </>
  
  )
}


export default CreateContact