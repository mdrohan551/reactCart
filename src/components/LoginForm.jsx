
import React, { useState } from 'react';
import Helper from "../utility/Helper.js";
import toast, { Toaster } from "react-hot-toast";
import ButtonLoader from "./ButtonLoader.jsx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {
    const [sumbit,setsubmit]=useState(false)
    const navigate=useNavigate(/*inistans*/)

const onSubmit = async(e)=>{
    e.preventDefault();
    let formData= new FormData(e.target);
    let myEmail= formData.get('email')
    if(Helper.isEmpty(myEmail)){
        toast.error('Email Required')
    } 
    else {
        setsubmit(true)
        // API CALL 
        let res= await axios.post(`${Helper.APIBASEPATH}/user-login`,{UserEmail:myEmail})
          if (res.data['msg']=== "success"){
             toast.success(res.data['data'])
              sessionStorage.setItem('myEmail',myEmail)
              navigate("/verify")
          }else {
              toast.error('Login fail')
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
                    <label className='col-12 mb-3 form-label  '>YOUR EMAiL ADDRESS</label>
                    <input name='email' type="email" className='from-control col-12 p-2 '/>


                    <button disabled={sumbit} type='submit' className='btn btn-success mt-3 w-100 '>
                        {
                            sumbit?(<ButtonLoader/>):("submit")
                        }
                    </button>



                </form>
               </div>
            </div>
        </div>
       </div>
       
    );
};

export default LoginForm;