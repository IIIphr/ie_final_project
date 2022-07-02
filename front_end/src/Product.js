import './Product.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { change_id, change_type, change_name } from './userSlice';
import { change } from './themeSlice';
import Product_shop_item from './Product_shop_item';

function Product() {

  let theme = useSelector((state) => state.theme.data);
  const { state } = useLocation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type', 'theme', 'user_name']);

  useEffect(() => {
    var temp = false;
    if (current_user_id == -1) {
      if (cookies.user_id != "undefined" && cookies.user_id) {
        dispatch(change_id(cookies.user_id));
        dispatch(change_type(cookies.user_type));
        dispatch(change_name(cookies.user_name));
        temp = true;
      }
    }
    if (cookies.theme != "undefined") {
      if (cookies.theme != theme) {
        dispatch(change());
        temp = true;
      }
    }
    if (temp == true) {
      navigate('/');
    }
  }, []);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  var i = -1;

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("product_cont")}>
        <h3 className={class_name("product_name")}>{state.name + "(" + state.category + " " + state.type + ")"}</h3>
        <p className={class_name("product_name")}>{"Country: " + state.country}</p>
        <p className={class_name("product_name")}>{"Material: " + state.material}</p>
        <p className={class_name("product_name")}>{"Size: " + state.size}</p>
        <p className={class_name("product_name")}>{"Weight: " + state.weight}</p>
        <div className={class_name("product_shops_cont")}>
          <div className={class_name("prod_shop_item_cont")}>
            <h4 className={class_name("prod_shop_item_name")}>shop name</h4>
            <h4 className={class_name("prod_shop_item_name")}>price</h4>
            <h4 className={class_name("prod_shop_item_name")}>link</h4>
            <h4 className={class_name("prod_shop_item_name")}>report price</h4>
            <h4 className={class_name("prod_shop_item_name")}>report product</h4>
          </div>
          {
            (state.shops || []).map(record => {
              i++;
              return <Product_shop_item key={record._id} data={record} price={state.prices[i]} link={state.links[i]} pid={state.pid} />;
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Product;
