import './User.css';
import { useSelector, useDispatch } from 'react-redux';
import { change_id, change_type, change_name, change_phone, change_email } from './userSlice';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';
import Products_item from './Products_item';

function User() {

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
  let [name, setInput_name] = useState(current_user_name);
  let [mobile, setInput_mobile] = useState(current_user_mobile);
  let [fav_data, set_fav_data] = useState(null);
  const [cookies, removeCookie, setCookie] = useCookies(['user_id', 'user_type', 'user_name', 'user_email', 'user_phone']);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  function logout() {
    removeCookie('user_id');
    removeCookie('user_type');
    removeCookie('user_name');
    removeCookie('user_email');
    removeCookie('user_phone');
    dispatch(change_id(-1));
    dispatch(change_type(null));
    dispatch(change_email(null));
    dispatch(change_phone(null));
    dispatch(change_name(null));
    navigate("/");
  }

  function change_info() {
    if (name == "") {
      setMessage('name is empty');
    }
    else if (mobile == "") {
      setMessage('mobile is empty');
    }
    else if (email == "") {
      setMessage('email is empty');
    }
    else if (!(/^\S+@\S+\.\S+$/.test(email))) {
      setMessage('email is not correct');
    }
    else {
      fetch('http://localhost:3030/api/user/change_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: current_user_id,
          phone: mobile,
          name: name,
          email: email
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setMessage(data.error.message);
          }
          else {
            setCookie('user_name', name, { path: '/', expires: addMonths(new Date(), 1) });
            setCookie('user_emil', email, { path: '/', expires: addMonths(new Date(), 1) });
            setCookie('user_phone', mobile, { path: '/', expires: addMonths(new Date(), 1) });
            dispatch(change_name(name));
            dispatch(change_phone(mobile));
            dispatch(change_email(email));
            setMessage(data.message);
          }
        });
    }
  }

  function to_shops() {
    fetch('http://localhost:3030/api/user/shops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: current_user_id
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error.message);
        }
        else {
          navigate("/shops", { state: data });
        }
      });
  }

  function for_seller() {
    if (current_user_type == "seller") {
      return (
        <div className={class_name("seller_cont")}>
          <p className={class_name("seller_email_label")}>email</p>
          <input className={class_name("seller_email_input")} type="text" value={email} onInput={e => setInput_email(e.target.value)} />
          <p className={class_name("seller_name_label")}>name</p>
          <input className={class_name("seller_name_input")} type="text" value={name} onInput={e => setInput_name(e.target.value)} />
          <p className={class_name("seller_mobile_label")}>mobile</p>
          <input className={class_name("seller_mobile_input")} type="text" value={mobile} onInput={e => setInput_mobile(e.target.value)} />
          <button className={class_name("seller_change_btn")} onClick={change_info}>change info</button>
          <h3 className={class_name("seller_msg")}>{message}</h3>
          <Link className={class_name("seller_add_btn")} to="/add_shop"><p>add shop</p></Link>
          <button className={class_name("seller_shops_btn")} onClick={to_shops}>shops</button>
        </div>
      );
    }
    return null;
  }

  function show_fav() {
    fetch('http://localhost:3030/api/user/favs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: current_user_id
      })
    })
      .then(response => response.json())
      .then(data => {
        set_fav_data(data);
      });
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("user_cont")}>
        <h2 className={class_name("user_header")}>User page</h2>
        <button className={class_name("logout_btn")} onClick={logout}>logout</button>
        {for_seller()}
        {current_user_type == "user" ? <button className={class_name("user_btn")} onClick={show_fav}>show fav</button> : null}
        {fav_data ? <div className={class_name("fav_cont")}>
          {
            (fav_data || []).map(record => {
              return <Products_item key={record._id} data={record} />;
            })
          }
        </div> : null}
      </div>
    </div>
  );
}

export default User;
