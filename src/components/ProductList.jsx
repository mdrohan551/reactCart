import React, { useEffect, useState } from "react";
import Helper from "../utility/Helper";
import axios, { Axios } from "axios";
import FullscLoader from "./FullscLoader";
import { NavLink } from "react-router-dom";
import Carticon from './../assets/images/Carticon';
import toast from "react-hot-toast";

const ProductList = () => {
  const [data, setdata] = useState(null);
  const [loader,setloader]=useState(false)

  useEffect(() => {
    (async () => {
      await CallProductList();
    })();
  }, []);
  const CallProductList = async () => {
    const res = await axios.get(`${Helper.APIBASEPATH}/product-list`);
    let dataList = res.data["data"];
    setdata(dataList);
  };

  //add cart
  const AddtoCart=async(id)=>{
      try{
        setloader(true)
        let res=await axios.get(`${Helper.APIBASEPATH}/create-cart/${id}`,Helper.tokenHeader());
        setloader(false)
        alert(res.index)
        
         if(res.data['msg']==='success'){
          toast.success('add to cart success')
         }
         else{
          toast.error('requist fail')
         }
         
      }catch(e){
      
          Helper.unauthorized(e.response.status)
      }  
  }

  return (
    <div>
      {data === null || loader ? (
        <FullscLoader />
      ) : (
        <div className="container mt-5">
          <div className="row">
            {data.map((item, index) => {
              return (
                <div className="col-md-3 mt-4 p-2  ">
                  <div className="card">
                    <div className="card-body ">
                      <img
                        src={item["image"]}
                        className="card-img-top"
                        alt="card"
                      />
                      <h5 className="card-title"> {item["title"]} </h5>
                      <p className="card-text"> {item["short_des"]} </p>
                      <h5>
                        Price: $
                        {item["discount"] === 0 ? (
                          <span> {item["price"]} </span>
                        ) : (
                          <span>
                            {item["discount_price"]}

                            <strike className="mx-3 ">{item["price"]}</strike>
                          </span>
                        )}
                      </h5>
                      <div className="button d-flex px-2">
                        <NavLink onClick= { async ()=>{ await AddtoCart(item['id'])}}
                          href="#"
                          className="btn btn-outline-danger  buttoncard  d-flex   col-12 nav-link m-1"
                        >
                          <p className=" col-lg-8 text-lg-center mt-2 fs-6 ">Add to cart</p><Carticon/>
                            
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
