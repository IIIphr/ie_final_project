import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { change_id, change_type } from './userSlice';
import { useState } from 'react';
import Navbar from './Navbar';

function Login() {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);
  let [input_id, setInputId] = useState('');
  let [input_type, setInputType] = useState('');

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function change_id_func(){
    dispatch(change_id(input_id));
  }

  function change_type_func(){
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
