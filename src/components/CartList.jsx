
// import axios from "axios";

import React, {useEffect, useState} from "react";
import Helper from "../utility/Helper.js";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink } from "react-router-dom";
import FullscLoader from "./FullscLoader.jsx";

const CartList = () => {
    const [data, setdata] = useState(null);
    const [loader,setloader]=useState(false)

    useEffect(() => {
        (async () => {
            await CallCartList();
        })();
    }, []);

    const CallCartList = async () => {
       try {
        const res = await axios.get(`${Helper.APIBASEPATH}/cart-list`,Helper.tokenHeader());
        let dataList = res.data["data"];
        setdata(dataList);
       } catch (error) {
        Helper.unauthorized(e.response.status)
       }
    };

    //add cart
    const removedcart=async(id)=>{
        try{
            setloader(true)
            
            let res=await axios.get(`${Helper.APIBASEPATH}/remove-cart/${id}`,Helper.tokenHeader());
            setloader(false)

            if(res.data['msg']==='success'){
                toast.success('removed product')
                await CallCartList();
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
                {" "}
                {data.map((item, index) => {
                  return (
                    <div className="col-md-3 mt-4 p-2  ">
                      <div className="card">
                        <div className="card-body ">
                          <img
                            src={item['product']["image"]}
                            className="card-img-top"
                            alt="card"
                          />
                          <h5 className="card-title"> {item['product']["title"]} </h5>
                          <p className="card-text"> {item['product']["short_des"]} </p>
                          <h5>
                            Price: $
                            {item['product']["discount"] === 0 ? (
                              <span> {item["price"]} </span>
                            ) : (
                              <span>
                                {item['product']["discount_price"]}
    
                                <strike className="mx-3 ">{item['product']["price"]}</strike>
                              </span>
                            )}
                          </h5>
                          <div className="button d-flex px-2">
                            <NavLink onClick={ async()=>{ await removedcart(item['product']['id'])}}
                              href="#"
                              className="btn btn-outline-danger  buttoncard  d-flex align-items-center    col-12 nav-link m-1"
                            >
                              <p className=" col-lg-8 text-lg-center  fs-6 ">removed</p><i class="bi bi-trash3"></i>
                                
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


export default CartList
