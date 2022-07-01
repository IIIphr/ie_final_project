import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { change_id, change_type, change_name } from './userSlice';
import { change } from './themeSlice';

function App() {

  let theme = useSelector((state) => state.theme.data);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [input, setInput] = useState('');
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type', 'theme', 'user_name']);

  useEffect(() => {
    var temp = false;
    if (current_user_id == -1){
      if(cookies.user_id != "undefined" && cookies.user_id){
        dispatch(change_id(cookies.user_id));
        dispatch(change_type(cookies.user_type));
        dispatch(change_name(cookies.user_name));
        temp = true;
      }
    }
    if (cookies.theme != "undefined"){
      if(cookies.theme != theme){
        dispatch(change());
        temp = true;
      }
    }
    if(temp == true){
      navigate('/');
    }
  }, []);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function search() {
    navigate("/products_loader", { state: { input: input } });
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("app_cont")}>
        <p>main page</p>
        <input type="text" onInput={e => setInput(e.target.value)} />
        <button onClick={search}>SEARCH</button>
      </div>
    </div>
  );
}

export default App;
