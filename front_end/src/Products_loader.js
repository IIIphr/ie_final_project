import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from './Navbar';

function Products_loader() {

  let theme = useSelector((state) => state.theme.data);
  let navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { input } = state;
      if (input == "") {
        navigate("/products");
      }
      else{
        //fetch data
      }
    }
    else {
      navigate("/products");
    }
  }, []);

  return (
    <div className="cont">
      <Navbar />
      <p>Loading...</p>
    </div>
  );
}

export default Products_loader;
