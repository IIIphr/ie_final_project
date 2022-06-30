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

  return (
    <div className="cont">
      <Navbar />
      <div className={"login_cont login_cont_" + ((theme == "light") ? "light" : "dark")}>
        <p>login page</p>
      </div>
    </div>
  );
}

export default Login;
