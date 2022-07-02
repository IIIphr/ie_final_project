import './Products_item.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { change } from './themeSlice';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function Products_item(props) {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);
  let current_user_id = useSelector((state) => state.user.user_id);
  let current_user_type = useSelector((state) => state.user.user_type);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function add_to_fav() {
    fetch('http://localhost:3030/api/user/add_fav', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: current_user_id,
        pid: props.data.pid ? props.data.pid : props.data._id,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  function remove_fav() {
    fetch('http://localhost:3030/api/user/remove_fav', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: current_user_id,
        pid: props.data.pid ? props.data.pid : props.data._id,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  function for_user(){
    if(current_user_type == "user"){
      return (
        <div>
          <button onClick={add_to_fav}>add to fav</button>
          <button onClick={remove_fav}>remove fav</button>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={class_name("prods_item_cont")}>
      <Link to="/product" state={props.data}><p key={props.data.name}>{props.data.name}</p></Link>
      {for_user()}
    </div>
  );
}

export default Products_item;
