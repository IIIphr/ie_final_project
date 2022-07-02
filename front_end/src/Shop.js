import './Shop.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { change_id, change_type, change_name } from './userSlice';
import { change } from './themeSlice';

function Shop() {

  let theme = useSelector((state) => state.theme.data);
  const {state} = useLocation();
  const {data, reports} = state;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [input, setInput] = useState('');
  let [categories, set_cat] = useState([]);
  let [brands, set_brand] = useState([]);
  let [numbers, set_number] = useState([]);
  let current_user_id = useSelector((state) => state.user.user_id);
  const [cookies, setCookie] = useCookies(['user_id', 'user_type', 'theme', 'user_name']);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("shop_cont")}>
        <p>Shop page</p>
        <p>name: {data.name}</p>
        <Link to="/add_new_prod" state={data}><p>add new product</p></Link>
        <Link to="/add_existing_prod" state={data}><p>add existing product</p></Link>
        {
          (reports || []).map(record => {
            return <p key={record.pid +" "+ record.sid+" "+record.reason}>{"A report of product "+record.pid+", type: "+record.reason}</p>
          })
        }
      </div>
    </div>
  );
}

export default Shop;
