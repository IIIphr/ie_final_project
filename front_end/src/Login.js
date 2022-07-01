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
  let [input_id, setInputId] = useState('');
  let [input_type, setInputType] = useState('');
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type']);

  useEffect(() => {
    if (current_user_id != -1){
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

  function change_id_func(){
    setCookie('user_id', input_id, { path: '/', expires:addMonths(new Date(),1) });
    dispatch(change_id(input_id));
  }

  function change_type_func(){
    setCookie('user_type', input_type, { path: '/', expires:addMonths(new Date(),1) });
    dispatch(change_type(input_type));
  } 

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("login_cont")}>
        <p>login page</p>
        <p>id</p>
        <input type="text" onInput={e => setInputId(e.target.value)} />
        <button onClick={change_id_func}>change</button>
        <p>type</p>
        <input type="text" onInput={e => setInputType(e.target.value)} />
        <button onClick={change_type_func}>change</button>
      </div>
    </div>
  );
}

export default Login;
