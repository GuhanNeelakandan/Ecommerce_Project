import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function Order() {
  const [orders,setOrders]=useState([])
  const user = JSON.parse(localStorage.getItem('userData'))

    const fetchOrderList = ()=>{
      let url =""
      if(user?.role==='admin'){
        url='http://localhost:8000/admin/all/order'
      }else{
        url='http://localhost:8000/all/order'
      }
      axios.post(url,{},{
        headers:{
          Authorization:localStorage.getItem('myapptoken')
        }
      }).then((res)=>{
        if(res.data.status===1){
          setOrders(res.data.order)
        }
        if(res.data.status===0){
          setOrders([])
          toast.error(res.data.message)
        }
      })
    }

    useEffect(()=>{
      fetchOrderList()
    },[])
  return (
    <table class="table">
  <thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Product Name</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Place</th>
      <th scope="col">Pincode</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      orders.map((list,i)=>{
        return <tr>
          <th>{i+1}</th>
          <td>{list.productName}</td>
          <td>{list?.address?.name}</td>
          <td>{list?.offerPrice}</td>
          <td>{list?.address?.city}</td>
          <td>{list?.address?.pincode}</td>
          <td>
            <button>view</button>
            {
              user?.role==='admin'?<button>Edit</button>:<button>Change Address</button>
            }
            {
              user?.role==='admin'&&<button>Delete</button>
            }
            
          </td>
        </tr>
      })
    }
  </tbody>
</table>
  )
}

export default Order