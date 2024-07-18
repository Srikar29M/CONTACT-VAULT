import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import './CreateContact.css'
import ToastContext from '../context/ToastContext';
import { Spinner } from 'react-bootstrap';


const EditContact = () => {
    const {id} = useParams()
    const [userDetails , setUserDetails] = useState({
        name:"",
        address:"",
        email:"",
        phone:"",
    })
    const [loading,setLoading] = useState(false);

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
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
        },
        body:JSON.stringify({id  , ...userDetails})
    });

    const result  = await res.json();
    if(!result.error){
        toast.success(`Updated [${userDetails.name}] `)
        console.log(result)
        setUserDetails({name:""  ,address:"" ,email:"" , phone:""});
        // console.log(result)
        navigate("/mycontacts")
    } else{

        toast.error(result.error)
        console.log(result);
    }

  }

  useEffect(() => {
    setLoading(true)
    const fetchContacts = async()=>{
   
    try {
        const res = await fetch(`http://localhost:4000/api/contact/${id}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
                
            }

        })
        const result = await res.json()
        setUserDetails({name:result.name,email:result.email ,address:result.address, phone:result.phone})
        console.log(result)
        setLoading(false)
        
    } catch (err) {
        console.log(err)
    }
    }
    fetchContacts();
  }, [])
  
  
  return (
  <>    

  {loading ? <Spinner splash = "Loading Contact..." /> :(<>
    <h2 className='create'>Edit Your Contact</h2>

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

            <input  type="submit" value="Save Changes"  className='btn btn-info my-2'  />
    </form>
    </>)}
  
  </>
  
  )
}


export default EditContact