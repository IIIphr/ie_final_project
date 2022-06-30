import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { change } from './themeSlice';
import Navbar from './Navbar';

function Login() {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);

  function change_theme() {
    dispatch(change());
  }

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("login_cont")}>
        <p>login page</p>
      </div>
    </div>
  );
}

export default Login;
