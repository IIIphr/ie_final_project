import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';

function Login() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [is_shown_login, set_is_shown_login] = useState(false);
  const [is_shown_signup, set_is_shown_signup] = useState(false);
  let theme = useSelector((state) => state.theme.data);
  let [login_message, set_login_msg] = useState('');
  let [signup_message, set_signup_msg] = useState('');
  let [login_username, setInput_login_username] = useState('');
  let [login_password, setInput_login_password] = useState('');
  let [signup_username, setInput_signup_username] = useState('');
  let [signup_password, setInput_signup_password] = useState('');
  let [signup_email, setInput_signup_email] = useState('');
  let [signup_name, setInput_signup_name] = useState('');
  let [signup_mobile, setInput_signup_mobile] = useState('');
  let [signup_type, setInput_signup_type] = useState('user');
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type', 'user_name', 'user_email', 'user_phone']);

  useEffect(() => {
    if (current_user_id != -1) {
      navigate("/user");
    }
  }, []);

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

  function login() {
    if (login_username == "") {
      set_login_msg('username is empty');
    }
    else if (login_password == "") {
      set_login_msg('password is empty');
    }
    else {
      fetch('http://localhost:3030/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: login_username,
          password: login_password,
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            set_login_msg(data.error.message);
          }
          else {
            setCookie('user_type', data.type, { path: '/', expires: addMonths(new Date(), 1) });
            if (data.type == "user") {
              setCookie('user_id', data.user._id, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_name', data.user.name, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_email', data.user.email, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_phone', data.user.mobile, { path: '/', expires: addMonths(new Date(), 1) });
            }
            else {
              setCookie('user_id', data.seller._id, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_name', data.seller.name, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_email', data.seller.email, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_phone', data.seller.mobile, { path: '/', expires: addMonths(new Date(), 1) });
            }
            navigate("/");
          }
        });
    }
  }

  function signup() {
    if (signup_username == "") {
      set_signup_msg('username is empty');
    }
    else if (signup_password == "") {
      set_signup_msg('password is empty');
    }
    else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(signup_password))) {
      set_signup_msg('password must have 8 characters with at least one number, one lowercase letter and one uppercase letter');
    }
    else if (signup_email == "") {
      set_signup_msg('email is empty');
    }
    else if (!(/^\S+@\S+\.\S+$/.test(signup_email))) {
      set_signup_msg('email is not correct');
    }
    else if (signup_name == "") {
      set_signup_msg('name is empty');
    }
    else if (signup_mobile == "") {
      set_signup_msg('mobile is empty');
    }
    else if (signup_type == 'user') {
      fetch('http://localhost:3030/api/signup_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signup_username,
          password: signup_password,
          email: signup_email,
          name: signup_name,
          mobile: signup_mobile
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            set_signup_msg(data.error.message);
          }
          else {
            set_signup_msg(data.message);
          }
        });
    }
    else {
      fetch('http://localhost:3030/api/signup_seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signup_username,
          password: signup_password,
          email: signup_email,
          name: signup_name,
          mobile: signup_mobile
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            set_signup_msg(data.error.message);
          }
          else {
            set_signup_msg(data.message);
          }
        });
    }
  }

  function toggle_login_pass() {
    var temp = is_shown_login;
    set_is_shown_login(!temp);
  }

  function toggle_signup_pass() {
    var temp = is_shown_signup;
    set_is_shown_signup(!temp);
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name('cont_cont')}>
        <div className={class_name("login_cont")}>
          <h1 className={class_name('login_header')}>Login</h1>
          <p className={class_name('login_username_label')}>username</p>
          <input className={class_name('login_username_input')} type="text" onInput={e => setInput_login_username(e.target.value)} />
          <p className={class_name('login_password_label')}>password</p>
          <input className={class_name('login_password_input')} type={is_shown_login ? "text" : "password"} onInput={e => setInput_login_password(e.target.value)} />
          <button className={class_name('login_password_btn')} onClick={toggle_login_pass}>show/hide</button>
          <button className={class_name('login_btn')} onClick={login}>login</button>
          <h3 className={class_name('login_msg')}>{login_message}</h3>
        </div>
        <div className={class_name("signup_cont")}>
          <h1 className={class_name('signup_header')}>Sign up</h1>
          <p className={class_name('signup_username_label')}>username</p>
          <input className={class_name('signup_username_input')} type="text" onInput={e => setInput_signup_username(e.target.value)} />
          <p className={class_name('signup_password_label')}>password</p>
          <input className={class_name('signup_password_input')} type={is_shown_signup ? "text" : "password"} onInput={e => setInput_signup_password(e.target.value)} />
          <button className={class_name('signup_password_btn')} onClick={toggle_signup_pass}>show/hide</button>
          <p className={class_name('signup_email_label')}>email</p>
          <input className={class_name('signup_email_linput')} type="text" onInput={e => setInput_signup_email(e.target.value)} />
          <p className={class_name('signup_name_label')}>name</p>
          <input className={class_name('signup_name_ipnut')} type="text" onInput={e => setInput_signup_name(e.target.value)} />
          <p className={class_name('signup_mobile_label')}>mobile</p>
          <input className={class_name('signup_mobile_input')} type="text" onInput={e => setInput_signup_mobile(e.target.value)} />
          <div className={class_name('signup_radio_cont')}>
            <input id='rad_user' type="radio" value="user" name="signup_type" checked={signup_type == 'user'} onClick={() => setInput_signup_type('user')} /><label htmlFor='rad_user'>User</label>
            <input id='rad_seller' type="radio" value="seller" name="signup_type" checked={signup_type == 'seller'} onClick={() => setInput_signup_type('seller')} /><label htmlFor='rad_seller'>Seller</label>
          </div>
          <button className={class_name('signup_btn')} onClick={signup}>signup</button>
          <h3 className={class_name('signup_msg')}>{signup_message}</h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
