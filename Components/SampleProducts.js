import axios from "axios";
import React, { useEffect, useState } from "react";
import "./sampleproduct.css";
import OwlCarousel from "react-owl-carousel";
import {useNavigate } from "react-router-dom";
import MyDropzone from "./MyDropZone";
import DropAndDrag from "./DropAndDrag";

function SampleProducts() {
 
  //step3-saving data
  const [sample, setSample] = useState([]);
  const navigate = useNavigate()

  //step1- fetch
  const fetchSampleProducts = () => {
    axios
      .get("https://65e6a3dfd7f0758a76e8ab61.mockapi.io/bestseller")
      .then((res) => {
        setSample(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //step2: useEffect
  useEffect(() => {
    fetchSampleProducts();
  }, []);
  return (
    <div className="container-fluid">
      <h4>Best Sellers</h4>
      <div className="product-box">
        <OwlCarousel className="owl-theme"  margin={10} nav>
          {sample.map((item) => {
            return (
              <div className="item" onClick={()=>navigate('/product')}>
                <img src={item.image} className="product-img" />
                <h6 className="mt-4 text-center">Price:${item.price}</h6>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
      <div className="">
      <h1>Drag and Drop List</h1>
      <MyDropzone/>
    </div>
      <DropAndDrag />
    </div>
  );
}

export default SampleProducts;
