import './Product_shop_item.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { change } from './themeSlice';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function Product_shop_item(props) {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);
  let current_user_id = useSelector((state) => state.user.user_id);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function report(type) {
    fetch('http://localhost:3030/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pid: props.pid,
        sid: props.data._id,
        report_type: type
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log(data.error.message);
        }
        else {
          console.log(data.message);
        }
      });
  }

  return (
    <div className={class_name("prod_shop_item_cont")}>
      <p>link: {props.link}</p>
      <p>price: {props.price}</p>
      <p>name: {props.data.name}</p>
      <button onClick={() => report(1)}>report type 1</button>
      <button onClick={() => report(2)}>report type 2</button>
    </div>
  );
}

export default Product_shop_item;
