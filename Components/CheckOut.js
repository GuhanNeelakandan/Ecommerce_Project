import React, { useContext, useEffect, useState } from "react";
import "./checkout.css";
import userContext from "../Context/context";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function CheckOut({ fetchCartData }) {
    const navigate = useNavigate()
    const [addressModal,setAddressModal]= useState(false)
    const [buyNow,setBuyNow]= useState(JSON.parse(localStorage.getItem('buyNow')))
    const [address,setAddress]=useState({
      name:"",
      line1:"",
      line2:"",
      landmark:"",
      city:"",
      state:"",
      country:"",
      pincode:"",
    })
  const cartList = useContext(userContext);
  const totalAmount = cartList.reduce(
    (prev, curr) => prev + Number(curr.offerPrice),
    0
  );

  console.log(cartList)

  useEffect(()=>{
    fetchCartData()
  },[])

  const handleChange =(e,name)=>{
    setAddress({...address,[name]:e.target.value})
  }

  const placeOrder = () => {
    if(localStorage.getItem('myapptoken')){
      setAddressModal(!addressModal)
    }else{
      toast.error('Please Login to Buy Product')
    }
  };

  const order = ()=>{
    cartList.forEach((pro)=>{
      let orderDetails={...pro,address,buyNow:false}
      axios.post('https://demonode-ffs6.onrender.com/new/order',orderDetails,{
        headers:{
          Authorization:localStorage.getItem('myapptoken')
        }
      }).then((res)=>{
        if(res.data.status===1){
          // toast.success("Order placed Successfully")
        }
        if(res.data.status===0){
          toast.error(res.data.message)
        }
      })
    })
    setAddressModal(!addressModal)
    toast.success("Order placed Successfully")
    navigate('/product')
    fetchCartData()
  }

  const buyNowOrder = ()=>{
    let client = JSON.parse(localStorage.getItem('userData'))._id
    let orderDetails={...buyNow,address,buyNow:true,client:client}
    axios.post('https://demonode-ffs6.onrender.com/new/order',orderDetails,{
        headers:{
          Authorization:localStorage.getItem('myapptoken')
        }
      }).then((res)=>{
        if(res.data.status===1){
          toast.success("Order placed Successfully")
          localStorage.removeItem('buyNow')
          setAddressModal(!addressModal)
          navigate('/product')
        }
        if(res.data.status===0){
          toast.error(res.data.message)
        }
      })
  }
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-8 left-cart">
          <div className="container w-50 m-auto">
            <div className="row">
              <div className="col-12">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Name"
                  />
                </div>
              </div>
              <div className="col-12">
                <div class="mb-3">
                  <label class="form-label">Card Number</label>
                  <input
                    type="number"
                    class="form-control"
                    maxLength={16}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Expiry Date</label>
                  <input type="date" class="form-control" placeholder="MM/YY" />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">CCV</label>
                  <input
                    type="number"
                    class="form-control"
                    maxLength={3}
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="pay-btn" onClick={() => placeOrder()}>
                Pay ${buyNow?buyNow.offerPrice:totalAmount}
              </button>
            </div>
          </div>
        </div>
        <div className="col-4 right-cart">
          <ul class="list-group">
            <li class="list-group-item">
              <h5 className="text-muted">Price Details</h5>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Items</h6>
                <h6>{buyNow ? "1" : cartList.length}</h6>
              </div>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Price</h6>
                <h6>${buyNow?buyNow?.offerPrice:totalAmount}</h6>
              </div>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Discount</h6>
                <h6 className="text-success">- $40</h6>
              </div>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Delivery Charges</h6>
                <h6>
                  <span className="text-decoration-line-through text-success">
                    $40
                  </span>
                  |Free
                </h6>
              </div>
            </li>
            <li class="list-group-item">
              <div className="d-flex justify-content-between">
                <h6>Total Amount</h6>
                <h6 className="text-success">${buyNow?buyNow.offerPrice:totalAmount}</h6>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Modal isOpen={addressModal} toggle={()=>setAddressModal(!addressModal)}>
        <ModalHeader>Order Address</ModalHeader>
        <ModalBody>
        <div className="container">
      <div className="row">
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              value={address.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
        </div>
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">Line 1</label>
            <input
              type="text"
              class="form-control"
              value={address.line1}
              onChange={(e) => handleChange(e, "line1")}
            />
          </div>
        </div>
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">Line 2</label>
            <input
              type="email"
              class="form-control"
              value={address.line2}
              onChange={(e) => handleChange(e, "line2")}
            />
          </div>
        </div>
        <div className="col-6">
          <label class="form-label">Landmark</label>
          <div class="input-group mb-3">
            <input
              type={"text"}
              class="form-control"
              aria-describedby="basic-addon2"
              value={address.landmark}
              onChange={(e) => handleChange(e, "landmark")}
            />
           
          </div>
          {/* <div class="mb-3">
            <label class="form-label">password</label>
            <input
              type="password"
              class="form-control"
              value={newStudent.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </div> */}
        </div>
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">City</label>
            <input
              type="text"
              class="form-control"
              value={address.city}
              onChange={(e) => handleChange(e, "city")}
            />
          </div>
        </div>
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">State</label>
            <input
              type="text"
              class="form-control"
              value={address.state}
              onChange={(e) => handleChange(e, "state")}
            />
          </div>
        </div>
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">Country</label>
            <input
              type="text"
              class="form-control"
              value={address.country}
              onChange={(e) => handleChange(e, "country")}
            />
          </div>
        </div>
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">Pincode</label>
            <input
              type="number"
              class="form-control"
              value={address.pincode}
              onChange={(e) => handleChange(e, "pincode")}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className="btn btn-sm btn-outline-success"
          onClick={()=>{buyNow?buyNowOrder():order()}}
        >
         Place Order
        </button>
      </div>
    </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CheckOut;
