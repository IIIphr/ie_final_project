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

  return (
    <div className={class_name("prod_shop_item_cont")}>
      <p>link: {props.link}</p>
      <p>price: {props.price}</p>
      <p>name: {props.data.name}</p>
    </div>
  );
}

export default Product_shop_item;
