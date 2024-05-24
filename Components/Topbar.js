import React, { useContext, useEffect, useState } from 'react'
import './topbar.css'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Login from './Login'
import SignUp from './SignUp'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Context/context'

function Topbar({cartData,fetchCartData}) {
  const navigate = useNavigate()
  let token = localStorage.getItem('myapptoken')
  let userData = JSON.parse(localStorage.getItem('userData'))
  const cartList = useContext(userContext)
    const [islogin,setIsLogin]= useState(false)
    const [isSignup,setIsSignup]= useState(false)

    const closeLogin = ()=>setIsLogin(!islogin)

    const toggleSignUp = ()=>{
        setIsLogin(false)
        setIsSignup(true)
    }

    const toggleLogin =()=>{
        setIsSignup(false)
        setIsLogin(true)
    }

    const onLogout=()=>{
      localStorage.removeItem('myapptoken')
      localStorage.removeItem('userData')
      navigate('/')
  }

  useEffect(()=>{
    fetchCartData()
  },[])
  return (
    <nav class="navbar navbar-expand-lg bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <Link to={'/dashboard'}>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
        </li></Link>
       <Link to={'/product'}>
       <li class="nav-item">
          <a class="nav-link" href="#">Products</a>
        </li>
       </Link>
       <Link to={'/order'}>
       <li class="nav-item">
          <a class="nav-link" href="#">Orders</a>
        </li>
       </Link>
        
        
      </ul>
    </div>
    <div>
      {
        token ? <span className='mx-3'>{userData? userData.userName :"User"}</span>: <button className='btn btn-sm btn-outline-light mx-3' onClick={()=>setIsLogin(!islogin)}>Login</button>
      }
       
        <button className='cart-btn' onClick={()=>navigate('/cart')}><i class="fa fa-cart-arrow-down" aria-hidden="true"></i> <span class="badge text-bg-danger">{cartList?.length}</span></button>
        {
          token && <button className='btn btn-sm btn-outline-danger mx-3' onClick={()=>onLogout()}>Logout</button>
        }
    </div>
  </div>
  <Modal isOpen={islogin} toggle={()=>setIsLogin(!islogin)} centered size='lg'>
   <ModalBody>
    <Login toggleSignUp={toggleSignUp} closeLogin={closeLogin}/>
   </ModalBody>
  </Modal>
  <Modal isOpen={isSignup} toggle={()=>setIsSignup(!isSignup)} centered size='lg'>
    <ModalBody>
        <SignUp toggleLogin={toggleLogin}/>
    </ModalBody>
  </Modal>
</nav>
  )
}

export default Topbar