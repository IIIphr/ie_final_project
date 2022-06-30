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

  return (
    <div className={"navbar navbar_"+((theme == "light") ? "light" : "dark")}>
      <p>navbar</p>
      <button onClick={change_theme}>change theme</button>
    </div>
  );
}

export default Navbar;
