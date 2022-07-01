import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { change_id, change_type } from './userSlice';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';

function Login() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let theme = useSelector((state) => state.theme.data);
  let [login_username, setInput_login_username] = useState('');
  let [login_password, setInput_login_password] = useState('');
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type']);

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


  function login(){
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
    .then(answer => console.log(answer.json()));
  }

  // function change_id_func() {
  //   setCookie('user_id', input_id, { path: '/', expires: addMonths(new Date(), 1) });
  //   dispatch(change_id(input_id));
  // }

  // function change_type_func() {
  //   setCookie('user_type', input_type, { path: '/', expires: addMonths(new Date(), 1) });
  //   dispatch(change_type(input_type));
  // }

  function signup() {
    fetch('http://localhost:3030/api/signup_customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "sepehr",
        password: "123",
        email: "a@a.a",
        name: "me",
        mobile: "0912"
      })
    }).then(answer => console.log(answer.message));
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("login_cont")}>
        <p>login:</p>
        <p>username</p>
        <input type="text" onInput={e => setInput_login_username(e.target.value)} />
        <p>password</p>
        <input type="text" onInput={e => setInput_login_password(e.target.value)} />
        <button onClick={login}>login</button>
        <button onClick={signup}>signup????</button>
      </div>
    </div>
  );
}

export default Login;
