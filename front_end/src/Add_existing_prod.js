import './Add_existing_prod.css';
import { useSelector, useDispatch } from 'react-redux';
import { change_id, change_type, change_name, change_phone, change_email } from './userSlice';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';
import Products_item from './Products_item';

function Add_existing_prod() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { state } = useLocation();
  let theme = useSelector((state) => state.theme.data);
  let current_user_id = useSelector((state) => state.user.user_id);
  let current_user_type = useSelector((state) => state.user.user_type);
  let current_user_name = useSelector((state) => state.user.user_name);
  let current_user_mobile = useSelector((state) => state.user.user_phone);
  let current_user_email = useSelector((state) => state.user.user_email);
  let [input, setInput] = useState('');
  let [categories, set_cat] = useState([]);
  let [brands, set_brand] = useState([]);
  let [numbers, set_number] = useState([]);
  let [message, setMessage] = useState('');
  let [id, setInput_id] = useState('');
  let [price, setInput_price] = useState('');
  let [link, setInput_link] = useState('');
  let [search_data, set_search_data] = useState(null);
  const [cookies, removeCookie, setCookie] = useCookies(['user_id', 'user_type', 'user_name', 'user_email', 'user_phone']);
  const brand_list = [
    'samsung', 'xiaomi', 'apple',
    'samsung', 'xiaomi', 'apple',
    'lenovo', 'asus', 'apple'
  ];
  const category_list = [
    'mobile', 'mobile', 'mobile',
    'tablet', 'tablet', 'tablet',
    'laptop', 'laptop', 'laptop'
  ];

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function search() {
    fetch('http://localhost:3030/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: (input || ""),
        type: categories,
        category: brands
      })
    })
      .then(response => response.json())
      .then(data => {
        set_search_data(data);
      });
  }

  function check_changed(e) {
    var temp_index = numbers.indexOf(e.target.value);
    if (temp_index == -1) {
      set_number([e.target.value, ...numbers]);
      set_brand([brand_list[e.target.value], ...brands]);
      set_cat([category_list[e.target.value], ...categories]);
    }
    else {
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

  function add_p() {
    if (id == "") {
      setMessage('id is empty');
    }
    else if (price == "") {
      setMessage('price is empty');
    }
    else if (link == "") {
      setMessage('link is empty');
    }
    else {
      fetch('http://localhost:3030/api/user/add_product/existing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: current_user_id,
          sid: state._id,
          pid: id,
          price: price,
          link: link
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setMessage(data.error.message);
          }
          else {
            setMessage(data.message);
          }
        });
    }
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("add_existing_prod_cont")}>
        <p>add existing product page</p>
        <p>id</p>
        <input type="text" value={id} onInput={e => setInput_id(e.target.value)} />
        <p>price</p>
        <input type="text" onInput={e => setInput_price(e.target.value)} />
        <p>link</p>
        <input type="text" onInput={e => setInput_link(e.target.value)} />
        <button onClick={add_p}>add</button>
        <h1>{message}</h1>
        <input type="text" onInput={e => setInput(e.target.value)} />
        <button onClick={search}>SEARCH</button>
        <input onChange={check_changed} type="checkbox" value="0" /> samsung mobile <br />
        <input onChange={check_changed} type="checkbox" value="1" /> xiaomi mobile <br />
        <input onChange={check_changed} type="checkbox" value="2" /> apple mobile <br />
        <input onChange={check_changed} type="checkbox" value="3" /> samsung tablet <br />
        <input onChange={check_changed} type="checkbox" value="4" /> xiaomi tablet <br />
        <input onChange={check_changed} type="checkbox" value="5" /> apple tablet <br />
        <input onChange={check_changed} type="checkbox" value="6" /> lenovo laptop <br />
        <input onChange={check_changed} type="checkbox" value="7" /> asus laptop <br />
        <input onChange={check_changed} type="checkbox" value="8" /> apple laptop <br />
        {
          (search_data || []).map(record => {
            return (
              <div key={record.pid}>
                <button onClick={() => setInput_id(record.pid)}>set Id</button>
                <Products_item data={record} />
              </div>);
          })
        }
      </div>
    </div>
  );
}

export default Add_existing_prod;
