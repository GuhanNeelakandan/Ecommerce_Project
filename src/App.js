import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import '../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import '../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "./Components/Topbar";
import Slides from "./Components/Slides";
import SampleProducts from "./Components/SampleProducts";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Context/context";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckOut from "./Components/CheckOut";
import Order from "./Components/Order";

function App() {
  const [cartData,setCartData]=useState([])
  const fetchCartData = ()=>{
    axios.post('http://localhost:8000/all/cart','',{
      headers:{
        Authorization:localStorage.getItem('myapptoken')
      }
    }).then((res)=>{
      setCartData(res.data.cart)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const fetchLocalCart = ()=>{
    let cart = JSON.parse(localStorage.getItem('cartData'))
    if(cart?.length>0){
      setCartData(cart)
    }else{
      setCartData([])
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('myapptoken')){
      fetchCartData()
    }else{
      fetchLocalCart()
    }
  },[])

  return (
    <BrowserRouter>
    <UserProvider value={cartData}>
    <Topbar cartData={cartData} fetchCartData={fetchCartData}/>
    <Slides/>
  
      <Routes>
        <Route path="/" element={  <SampleProducts/>} />
        <Route path="/product" element={<Products cartData={cartData} setCartData={setCartData}/>} />
        <Route path="/cart" element={<Cart fetchCartData={fetchCartData} fetchLocalCart={fetchLocalCart}/>} />
        <Route path="/check/out" element={<CheckOut fetchCartData={fetchCartData} />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Toaster/>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
