import React, { useContext, useState } from 'react'
import './login.css'
import LoginPng from '../images/login.png'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import userContext from '../Context/context'

function Login({toggleSignUp,closeLogin}) {
    const navigate = useNavigate()
    const cartList = useContext(userContext)
    const [login,setLogin]=useState({
      email:"",
      password:""
    })
    const handleChange =(e)=>{
      setLogin({...login,[e.target.name]:e.target.value})
    }

    const createLoginCart = ()=>{
      if(cartList?.length>0){
        cartList.forEach(async(list)=>{
          let newCart = {
            ...list,
            client:JSON.parse(localStorage.getItem('userData'))._id
          }
          axios.post('https://demonode-ffs6.onrender.com/new/cart',newCart).then((res)=>{
            if(res.data.status===1){
              toast.success(res.data.message)
            }
    
            if(res.data.status===0){
              toast.error(res.data.message)
            }
          })
        })
  
        localStorage.removeItem('cartData')
      }
      
    
      //login
      
    }
  
    const OnLogin = ()=>{
      if(login.email===""){
        return toast.error("Email Required")
      }
      if(login.password===""){
        return toast.error("Password Required")
      }
  
      axios.post('https://demonode-ffs6.onrender.com/user/login',login).then((res)=>{
        if(res.data.status===1){
          toast.success(res.data.message)
          console.log(res.data.token)
          localStorage.setItem("myapptoken",res.data.token)
          localStorage.setItem("userData",JSON.stringify(res.data.user))
          createLoginCart()
          closeLogin()

        }
        if(res.data.status===0){
          toast.error(res.data.message)
        }
      })
    }
  return (
   <div className='container-fluid'>
        <div className='row'>
            <div className='col-4 bg-primary left-login'>
                <h3 className='text-white m-4'>Login</h3>
                <h6 className='m-4'>
Get access to your Orders, Wishlist and Recommendations
                </h6>
                <div className='login-img'>
                    <img src={LoginPng}/>
                </div>
            </div>
            <div className='col-8 right-login'>
                <div className='container m-auto w-75 mt-5'>
                    <div>
                        <input className='login-input' type="email" name="email"  placeholder='Enter Email' onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div>
                        <input className='login-input' type="password" name='password' placeholder='Enter Password' onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className='mt-4'>
                        <p className='login-terms'>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                    </div>
                    <button className='req-btn' onClick={()=>OnLogin()}>Login</button>
                    <div className='text-center new-login'>
                        <p onClick={()=>toggleSignUp()}>New to Lifestyle? Create an account</p>
                    </div>
                </div>
                
            </div>
        </div>
   </div>
  )
}

export default Login