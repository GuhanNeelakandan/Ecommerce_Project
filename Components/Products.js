import axios from "axios";
import React, { useEffect, useState } from "react";
import loginPng from '../images/login.png'
import './products.css'
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Products({cartData,setCartData}) {
  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(true)
  const [deleteModal,setdeleteModal]=useState(false)
  const [deleteId,setdeleteId]=useState(null)
  const [newProductModal,setNewProductModal]= useState(false)
  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",
    rating: 0,
    price: 0,
    offerPrice: 0,
  });
  const user = JSON.parse(localStorage.getItem('userData'))

  const fetchAllProducts = () => {
    axios
      .post("https://demonode-ffs6.onrender.com/all/product")
      .then((res) => {
        console.log(res)
        setLoading(false)
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleAddtoCart =(data)=>{
    if(localStorage.getItem('myapptoken')){
      let newCart = {
        ...data,
        client:JSON.parse(localStorage.getItem('userData'))._id
      }

      console.log(newCart)
      //login
      axios.post('https://demonode-ffs6.onrender.com/new/cart',newCart).then((res)=>{
        if(res.data.status===1){
          toast.success(res.data.message)
          setCartData([...cartData,newCart])
        }

        if(res.data.status===0){
          toast.error(res.data.message)
        }
      })
    }else{
      localStorage.setItem('cartData',JSON.stringify([...cartData,data]))
      setCartData([...cartData,data])
      toast.success("Added To Cart")
    }
      
     
  }

  const handleBuyNow=(data)=>{
    localStorage.setItem('buyNow',JSON.stringify(data))
    navigate('/check/out')
  }

  const addNewProduct=()=>{
    setNewProductModal(true)
  }

  const handleChange = (event, name) => {
    setNewProduct({ ...newProduct, [name]: event.target.value });
  };

  const submitProduct =()=>{
    axios.post('https://demonode-ffs6.onrender.com/new/product',newProduct,{
      headers:{
        Authorization:localStorage.getItem('myapptoken')
      }
    }).then((res)=>{
      if(res.data.status===1){
        toast.success("Product added successfully")
        setNewProductModal(false)
        fetchAllProducts()
      }
      if(res.data.status===0){
        toast.error("Product not added")
      }
    })
  }

  const OnDelete=(id)=>{
    setdeleteModal(!deleteModal)
    setdeleteId(id)
  }

  const cancelDelete=()=>{
    setdeleteModal(!deleteModal)
    setdeleteId(null)
  }

  const deleteProduct=()=>{
    axios.post('https://demonode-ffs6.onrender.com/delete/product',{id:deleteId},{
      headers:{
        Authorization:localStorage.getItem('myapptoken')
      }
    }).then((res)=>{
      if(res.data.status===1){
        toast.success("Product Removed Successfully")
        setdeleteModal(false)
        setdeleteId(null)
        fetchAllProducts()
      }
      if(res.data.status===0){
        toast.error("Product Not Removed")
      }
    })
  }



  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">

      <h1>Products</h1>
      {
        user?.role==='admin'&& <div><button onClick={()=>addNewProduct()}>Add</button></div>
      }
      
      </div>
      <div className="container">
        <div className="row">
          {
           loading?<div>Loading.....</div>: products.map((list)=>{
            return <div className="col-4">
            <div class="card product-card" style={{width: "22rem"}}>
              <img src={list.image} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{list.productName}</h5>
                <p class="card-text">
                  {list.description}
                </p>
                <div><span class={Number(list.rating)>=3?"badge text-bg-success":"badge text-bg-danger"}>{list.rating} <i class="fa fa-star-o" aria-hidden="true"></i></span></div>
                <p >Price:<h5>${list.offerPrice} <span className="text-decoration-line-through text-muted fs-6">${list.price}</span></h5></p>
                {
                  user?.role==='admin' &&   <div className="my-2">
                  <button className="btn btn-sm btn-outline-primary mx-2">Edit</button><button className="btn btn-sm btn-outline-danger" onClick={()=>OnDelete(list._id)}>Delete</button>
                </div>
                }
              
              <div>
              <button className="add-btn" onClick={()=>handleAddtoCart(list)}><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart</button>
              <button className="buy-btn" onClick={()=>handleBuyNow(list)}><i class="fa fa-bolt" aria-hidden="true"></i> Buy Now</button>
              </div>
              </div>
            </div>
          </div>
           })
          }
          
        </div>
      </div>
      <Modal isOpen={newProductModal} toggle={()=>setNewProductModal(!newProductModal)}>
        <ModalHeader>Add Products</ModalHeader>
        <ModalBody>
        <div className="container">
      <div className="row">
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">Product Name</label>
            <input
              type="text"
              class="form-control"
              // value={newStudent.firstName}
              onChange={(e) => handleChange(e, "productName")}
            />
          </div>
        </div>
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">Description</label>
            <input
              type="text"
              class="form-control"
              // value={newStudent.lastName}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>
        </div>
        <div className="col-6">
          <div class="mb-3">
            <label class="form-label">Price</label>
            <input
              type="email"
              class="form-control"
              // value={newStudent.email}
              onChange={(e) => handleChange(e, "price")}
            />
          </div>
        </div>
        <div className="col-6">
          <label class="form-label">Rating</label>
          <div class="input-group mb-3">
            <input
              type={"text"}
              class="form-control"
              aria-describedby="basic-addon2"
              // value={newStudent.password}
              onChange={(e) => handleChange(e, "rating")}
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
            <label class="form-label">Offer Price</label>
            <input
              type="number"
              class="form-control"
              // value={newStudent.mobile}
              onChange={(e) => handleChange(e, "offerPrice")}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className="btn btn-sm btn-outline-success"
         onClick={()=>submitProduct()}
        >
          Add +
        </button>
      </div>
    </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      <Modal isOpen={deleteModal} toggle={()=>setdeleteModal(!deleteModal)}>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalBody>
          <div className="container">
              <div>
                <p>
                  Are you sure you want to delete this product?
                </p>
                <div className="d-felx justify-content-end">
                  <button className="btn btn-sm btn-outline-success" onClick={()=>deleteProduct()} >Yes</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>cancelDelete()} >No</button>
                </div>
              </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Products;
