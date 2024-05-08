import React from "react";
import MenuNav from "./MenuNav";
import Footer from "./Footer";
import { Toaster } from 'react-hot-toast';


const MasterLayout = (props) => {
  return (
    <div>
      <MenuNav />
      {props.children}
       <Toaster position="bottom-center"/>
      <Footer />

    </div>
  );
};

export default MasterLayout;
