

import React, { useState } from 'react';
import Helper from "../utility/Helper.js";
import toast, { Toaster } from "react-hot-toast";
import ButtonLoader from "./ButtonLoader.jsx";
import axios from 'axios';





    const VerifyForm = () => {
        const [sumbit,setsubmit]=useState(false)

    
    const onSubmit = async(e)=>{
        e.preventDefault();
        let formData= new FormData(e.target);
        let otp = formData.get('otp')
        if(Helper.isEmpty(otp)){
            toast.error('Verification code Required')
        }
        else {
          try {
            let myEmail= sessionStorage.getItem("myEmail")
            setsubmit(true)
            // API CALL 
            let res= await axios.post(`${Helper.APIBASEPATH}/verify-login`,{OTP:otp,UserEmail:myEmail})
            setsubmit(false)
              if (res.data['msg']=== "success"){
               toast.success('verify success')
               sessionStorage.setItem("token",res.data['data'])
               sessionStorage.removeItem('myEmail')
               window.location.href="/"
                 
              }
              else {
                  toast.error('wrong verify code')
                  setsubmit(false)
              }
          } catch (error) {
            toast.error('An error occurred while verifying. Please try again later.');
          }
          finally{
            setsubmit(false)
          }
        }
          
    }
    return (
        <div className="container mx-auto vh-100 mt-5 LoginForm ">
            <div className="row d-flex justify-content-center ">
                <div className="col-md-4">
                    <div className="card p-3 ">
                        <form onSubmit={onSubmit} className="p-4 ">
                            <label className='col-12 mb-3 form-label  '>Verification code</label>
                            <input name='otp' type="text" className='from-control col-12 p-2 '/>


                            <button disabled={sumbit} type='submit' className='btn btn-success mt-3 w-100 '>
                                {
                                    sumbit ? (<ButtonLoader/>) : ("submit")
                                }
                            </button>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyForm;