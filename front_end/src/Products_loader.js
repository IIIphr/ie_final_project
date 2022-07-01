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
      const { input, categories, brands } = state;
      fetch('http://localhost:3030/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: (input || ""),
          type: categories,
          category: brands
        })
      })
        .then(response => response.json())
        .then(data => {
          navigate("/products", { state: data });
        });
      return;
    }
    fetch('http://localhost:3030/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "",
        type: [],
        category: []
      })
    })
      .then(response => response.json())
      .then(data => {
        navigate("/products", { state: data });
      });
  }, []);

  return (
    <div className="cont">
      <Navbar />
      <p>Loading...</p>
    </div>
  );
}

export default Products_loader;
