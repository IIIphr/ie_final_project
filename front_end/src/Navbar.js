import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { change } from './themeSlice';

function Navbar() {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);

  function change_theme(){
    dispatch(change());
  }

  function class_name(name){
    return name + " " + name + "_" + theme;
  }

  return (
    <div className={class_name("navbar")}>
      <Link to="/">TOROB</Link>
      <Link to="/products_loader">all products</Link>
      <div className={class_name("categories_cont")}>
        <p>categories</p>
        <div className={class_name("categories_drop")}>
            <p>test</p>
            <p>test_2</p>
        </div>
      </div>
      <Link to="/login">login</Link>
      <button onClick={change_theme}>change theme</button>
    </div>
  );
}

export default Navbar;
