
import { createContext, useContext, useEffect, useState } from "react";


import React from 'react'
import ToastContext from "./ToastContext";
import { useLocation, useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthContextProvider  = ({children})=>{
    const {toast} = useContext(ToastContext)
    const navigate = useNavigate()
    const location = useLocation()

    const [user , setUser] = useState(null);
 

    useEffect(()=>{
        checkUserLoggedIn();
    } , []);

    const checkUserLoggedIn = async()=>{
       
        try{
            const res = await fetch(`http://localhost:4000/api/me`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                },
            });
            const result = await res.json();
            if(!result.error){

                if(location.pathname == "/login" || location.pathname === "/register"){
                   setTimeout(() => {
                    
                       navigate("/", {replace:true})
                   }, 500);
                } else{
                    navigate(location.pathname ? location.pathname:"/")
                }
                    setUser(result)
                
             
            }else{
                navigate("/login" , {replace:true});
            }

        }catch(err){
            console.log(err)
        }
    }

    //login request
    const loginUser = async(userData)=>{
        try{
            const res = await fetch(`http://localhost:4000/api/login` , {
                method:"POST",
                headers:{
                    "Content-Type" :"application/json",
                },
                body : JSON.stringify({...userData}),
            });
            const result = await res.json();
           if(!result.error){
            console.log(result)
             localStorage.setItem("token" ,result.token);
             setUser(result.user);
             toast.success(`Logged in ${result.user.name}`)

             navigate("/" , {replace:true})

           }
           else{
        
            toast.error(result.error)
           
           } 
            
        }
        catch(err){
            console.log(err);
        }
    };

    //register request
    const registerUser = async (userData)=>{
        try{
            const res = await fetch(`http://localhost:4000/api/register` ,{
                method:"POST",
                headers:{
                    "Content-Type" :"application/json",
                },
                body : JSON.stringify({...userData}),
            });
            const result = await res.json();

            if(!result.error){
                // console.log(result)
                toast.success("user registered successfully! Login into your account")
                navigate("/login" , {replace:true})
   
              }
              else{
            //    console.log(result.error)
            toast.error(result.error)
              
              }
        }
        catch(err){
            console.log(err)
        }
    }
    

    return <AuthContext.Provider value={{loginUser ,registerUser, user , setUser}}>
        {/* <ToastContainer autoClose= {2000}/>  */}
        {children}
    </AuthContext.Provider>
}

export default AuthContext


