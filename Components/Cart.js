import React, { useContext, useEffect, useState } from "react";
import loginPng from "../images/login.png";
import "./cart.css";
import userContext from "../Context/context";
import { addDays, format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import Login from "./Login";
import SignUp from "./SignUp";

function Cart({fetchCartData,fetchLocalCart}) {
  const navigate = useNavigate()
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
  const token = localStorage.getItem('myapptoken')
  console.log(cartList)

  useEffect(()=>{
    if(localStorage.getItem('myapptoken')){

      fetchCartData()
    }else{
      fetchLocalCart()
    }
  },[])


  const totalAmount = cartList?.reduce((pre,curr)=>pre+curr.offerPrice,0).toFixed(2)//0+36000= 36000+38000 =900000+50000
  const RemoveCart = (id,i)=>{
    if(localStorage.getItem('myapptoken')){
      axios.post(`https://demonode-ffs6.onrender.com/delete/cart`,{id:id}).then((res)=>{
        toast.success("Cart Item Removed")
        fetchCartData()
      })
    }else{
      cartList.splice(i,1)
      localStorage.setItem('cartData',JSON.stringify(cartList))
      fetchLocalCart()
      toast.success("Cart Item Removed")
    }
    
  }

  const openLogin =()=>{
    toggleLogin()
  }

  const openCheckOut=()=>{
    navigate('/check/out')
  }
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-8 left-cart">
          <ul class="list-group">
            {
              cartList && cartList.map((item,i)=>{
                return <li class="list-group-item list-group-item-light my-2">
                <div className="cart-list">
                  <div className="px-1">
                    <img src={item.image} className="cart-img" />
                  </div>
                  <div className="px-1">
                    <h3>{item.productName}</h3>
                    <p>
                     {item.description}
                    </p>
                    <div>Price:$ {item.offerPrice}</div>
                    <div>
                      <button className="btn btn-outline-danger" onClick={()=>RemoveCart(item._id,i)}>Remove</button>
                    </div>
                  </div>
                  <div className="px-1">
                    Delivery by {format(new Date(addDays(new Date(),5)),'dd/MMM/yyyy')} | <span>$40 Free</span>
                  </div>
                </div>
              </li>
              })
            }
            
          </ul>
        </div>
        <div className="col-4 right-cart">
          <ul class="list-group">
            <li class="list-group-item"><h5 className="text-muted">Price Details</h5></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Items</h6><h6>{cartList?.length}</h6></div></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Price</h6><h6>${totalAmount}</h6></div></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Discount</h6><h6 className="text-success">- $40</h6></div></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Delivery Charges</h6><h6 ><span className="text-decoration-line-through text-success">$40</span>|Free</h6></div></li>
            <li class="list-group-item"><div className="d-flex justify-content-between"><h6>Total Amount</h6><h6 className="text-success">${totalAmount}</h6></div></li>
          </ul>
          <div className="text-center">
            <button className="pay-btn" onClick={()=>{token?openCheckOut():openLogin()}}>{token?"Pay Now" :"Login to Pay"}</button>

          </div>
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
    </div>
  );
}

export default Cart;
