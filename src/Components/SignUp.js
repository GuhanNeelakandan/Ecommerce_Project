import React, { useState } from 'react'
import LoginPng from '../images/login.png'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

function SignUp({toggleLogin}) {
    const navigate = useNavigate()
    const [user,setUser]=useState({
      userName:"",
      mobile:0,
      email:"",
      password:""
    })
  
    const handleChange =(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit =()=>{
        if(user.userName===""){
          return toast.error("User Name Required")
        }
        if(user.email===""){
          return toast.error("Email Required")
        }
        if(user.mobile.length<=0){
          return toast.error("Mobile Required")
        }
        if(user.password===""){
          return toast.error("Password Required")
        }
    
        axios.post('https://demonode-ffs6.onrender.com/user/signup',user).then((res)=>{
          if(res.data.status===1){
            toast.success(res.data.message)
            toggleLogin()
          }
          if(res.data.status===0){
            toast.error(res.data.message)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
  
  return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-4 bg-primary left-login'>
            <h4 className='text-white m-4'>Looks like you're new here!</h4>
            <h6 className='m-4'>
            Sign up with your mobile number to get started
            </h6>
            <div className='login-img'>
                <img src={LoginPng}/>
            </div>
        </div>
        <div className='col-8 right-login'>
            <div className='container m-auto w-75 mt-5'>
                <div>
                    <input className='login-input' name="userName" type='text' placeholder='Enter User Name' onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <input className='login-input' name="email" type='email' placeholder='Enter Email' onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <input className='login-input' name="mobile" type='number' placeholder='Enter Mobile Number' onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <input className='login-input' name="password" type='password' placeholder='Enter Password' onChange={(e)=>handleChange(e)}/>
                </div>
                <div className='mt-4'>
                    <p className='login-terms'>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                </div>
                <button className='req-btn' onClick={onSubmit}>Continue</button>
                <button className='req-exist-btn' onClick={()=>toggleLogin()}>Existing User? Login</button>
            </div>
            
        </div>
    </div>
</div>
  )
}

export default SignUp