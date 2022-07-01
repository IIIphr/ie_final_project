import './Add_shop.css';
import { useSelector, useDispatch } from 'react-redux';
import { change_id, change_type, change_name, change_phone, change_email } from './userSlice';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';

function Add_shop() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let theme = useSelector((state) => state.theme.data);
  let current_user_id = useSelector((state) => state.user.user_id);
  let current_user_type = useSelector((state) => state.user.user_type);
  let current_user_name = useSelector((state) => state.user.user_name);
  let current_user_mobile = useSelector((state) => state.user.user_phone);
  let current_user_email = useSelector((state) => state.user.user_email);
  let [message, setMessage] = useState('');
  let [email, setInput_email] = useState(current_user_email);
  let [name, setInput_name] = useState('');
  let [mobile, setInput_mobile] = useState(current_user_mobile);
  const [cookies, removeCookie, setCookie] = useCookies(['user_id', 'user_type', 'user_name', 'user_email', 'user_phone']);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function add_s() {
    if (name == "") {
      setMessage('name is empty');
    }
    else {
      fetch('http://localhost:3030/api/user/add_shop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sid: current_user_id,
          shop_name: name
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setMessage(data.error.message);
          }
          else {
            setMessage(data.message);
          }
        });
    }
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("add_shop_cont")}>
        <p>add shop page</p>
        <p>name</p>
        <input type="text" value={name} onInput={e => setInput_name(e.target.value)} />
        <button onClick={add_s}>add</button>
        <h1>{message}</h1>
      </div>
    </div>
  );
}

export default Add_shop;
