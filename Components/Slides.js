import React from "react";
import slide1 from '../images/side1.webp'
import slide2 from '../images/slide2.webp'
import slide3 from '../images/side1.webp'
import { useLocation } from "react-router-dom";


function Slides() {
  const location = useLocation()
  console.log(location)
  return (
    <>
    {
      location.pathname==="/cart"?"":  <div
      id="carouselExampleAutoplaying"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={slide1} class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src={slide2} class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src={slide3} class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    }
  
    </>
    
  );
}

export default Slides;
