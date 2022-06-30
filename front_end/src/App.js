import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { change } from './themeSlice';
import Navbar from './Navbar';

function App() {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);

  function change_theme(){
    dispatch(change());
  }

  return (
    <div className={"app_cont app_cont_"+((theme == "light") ? "light" : "dark")}>
      <Navbar />
      <p>main page</p>
    </div>
  );
}

export default App;
