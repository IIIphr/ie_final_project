import './Product.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { change_id, change_type, change_name } from './userSlice';
import { change } from './themeSlice';

function Product() {

  let theme = useSelector((state) => state.theme.data);
  const {state} = useLocation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [input, setInput] = useState('');
  let [categories, set_cat] = useState([]);
  let [brands, set_brand] = useState([]);
  let [numbers, set_number] = useState([]);
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type', 'theme', 'user_name']);
  const brand_list= [
    'samsung', 'shiaomi', 'apple',
    'samsung', 'shiaomi', 'apple',
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
      <div className={class_name("product_cont")}>
        <p>product page</p>
        <p>name: {state.name}</p>
      </div>
    </div>
  );
}

export default Product;
