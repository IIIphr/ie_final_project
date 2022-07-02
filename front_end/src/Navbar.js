import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { change } from './themeSlice';
import { useCookies } from 'react-cookie';

function Navbar() {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);
  let current_user_id = useSelector((state) => state.user.user_id);
  let current_user_name = useSelector((state) => state.user.user_name);
  let current_user_type = useSelector((state) => state.user.user_type);
  const [cookies, setCookie] = useCookies(['theme']);

  function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  function change_theme() {
    setCookie('theme', theme == "dark" ? "light" : "dark", { path: '/', expires:addMonths(new Date(),12) });
    dispatch(change());
  }

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function user_section() {
    if (current_user_id == -1) {
      return (<Link to="/login">login</Link>);
    }
    else{
      return (<Link to="/user">welcome, {current_user_name}</Link>);
    }
  }

  return (
    <div className={class_name("navbar")}>
      <Link to="/">TOROB</Link>
      <Link to="/products_loader">all products</Link>
      {user_section()}
      <button onClick={change_theme}>change theme</button>
    </div>
  );
}

export default Navbar;
