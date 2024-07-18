import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const Home = () => {
  // const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login" , {replace:true });
  }, [])
  
  return (
  <>    
    <div className="jumbotron">
    <h1  className='welcome'>Welcome {user ? user.name:null}</h1>
    <hr className='my-4' />
      <a className="btn btn-primary " href="#" role="button">ADD CONTACTS</a>
    
  </div>
  </>
  
  )
}


export default Home
