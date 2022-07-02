import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { change_id, change_type, change_name, change_email, change_phone } from './userSlice';
import { change } from './themeSlice';

function App() {

  let theme = useSelector((state) => state.theme.data);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [input, setInput] = useState('');
  let [categories, set_cat] = useState([]);
  let [brands, set_brand] = useState([]);
  let [numbers, set_number] = useState([]);
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type', 'theme', 'user_name', 'user_email', 'user_phone']);
  const brand_list= [
    'samsung', 'xiaomi', 'apple',
    'samsung', 'xiaomi', 'apple',
    'lenovo', 'asus', 'apple'
  ];
  const category_list= [
    'mobile', 'mobile', 'mobile',
    'tablet', 'tablet', 'tablet',
    'laptop', 'laptop', 'laptop'
  ];

  useEffect(() => {
    var temp = false;
    if (current_user_id == -1){
      if(cookies.user_id != "undefined" && cookies.user_id){
        dispatch(change_id(cookies.user_id));
        dispatch(change_type(cookies.user_type));
        dispatch(change_name(cookies.user_name));
        dispatch(change_email(cookies.user_email));
        dispatch(change_phone(cookies.user_phone));
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
    navigate("/products_loader", { state: { input: input, categories: categories, brands: brands } });
  }

  function check_changed(e){
    var temp_index = numbers.indexOf(e.target.value);
    if(temp_index == -1){
      set_number([e.target.value, ...numbers]);
      set_brand([brand_list[e.target.value], ...brands]);
      set_cat([category_list[e.target.value], ...categories]);
    }
    else{
      var temp_number = numbers;
      temp_number.splice(temp_index, 1);
      set_number(temp_number);
      var temp_brand = brands;
      temp_brand.splice(temp_index, 1);
      set_brand(temp_brand);
      var temp_cat = categories;
      temp_cat.splice(temp_index, 1);
      set_cat(temp_cat);
    }
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("app_cont")}>
        <p>main page</p>
        <input type="text" onInput={e => setInput(e.target.value)} />
        <button onClick={search}>SEARCH</button>
        <input onChange={check_changed} type="checkbox" value="0"/> samsung mobile <br />
        <input onChange={check_changed} type="checkbox" value="1"/> xiaomi mobile <br />
        <input onChange={check_changed} type="checkbox" value="2"/> apple mobile <br />
        <input onChange={check_changed} type="checkbox" value="3"/> samsung tablet <br />
        <input onChange={check_changed} type="checkbox" value="4"/> xiaomi tablet <br />
        <input onChange={check_changed} type="checkbox" value="5"/> apple tablet <br />
        <input onChange={check_changed} type="checkbox" value="6"/> lenovo laptop <br />
        <input onChange={check_changed} type="checkbox" value="7"/> asus laptop <br />
        <input onChange={check_changed} type="checkbox" value="8"/> apple laptop <br />
      </div>
    </div>
  );
}

export default App;
