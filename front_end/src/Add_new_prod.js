import './Add_new_prod.css';
import { useSelector, useDispatch } from 'react-redux';
import { change_id, change_type, change_name, change_phone, change_email } from './userSlice';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';

function Add_new_prod() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { state } = useLocation();
  let theme = useSelector((state) => state.theme.data);
  let current_user_id = useSelector((state) => state.user.user_id);
  let current_user_type = useSelector((state) => state.user.user_type);
  let current_user_name = useSelector((state) => state.user.user_name);
  let current_user_mobile = useSelector((state) => state.user.user_phone);
  let current_user_email = useSelector((state) => state.user.user_email);
  let [message, setMessage] = useState('');
  let [name, setInput_name] = useState('');
  let [price, setInput_price] = useState('');
  let [link, setInput_link] = useState('');
  let [size, setInput_size] = useState('');
  let [country, setInput_country] = useState('');
  let [weight, setInput_weight] = useState('');
  let [material, setInput_material] = useState('');
  let [brand, setInput_brand] = useState("samsung");
  let [type, setInput_type] = useState("mobile");
  const [cookies, removeCookie, setCookie] = useCookies(['user_id', 'user_type', 'user_name', 'user_email', 'user_phone']);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function add_p() {
    if (name == "") {
      setMessage('name is empty');
    }
    else if (price == "") {
      setMessage('price is empty');
    }
    else if (link == "") {
      setMessage('link is empty');
    }
    else if (size == "") {
      setMessage('size is empty');
    }
    else if (material == "") {
      setMessage('material is empty');
    }
    else if (country == "") {
      setMessage('country is empty');
    }
    else if (weight == "") {
      setMessage('weight is empty');
    }
    else {
      fetch('http://localhost:3030/api/user/add_product/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: current_user_id,
          sid: state._id,
          name: name,
          category: brand,
          type: type,
          weight: weight,
          country: country,
          material: material,
          size: size,
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
      <div className={class_name("add_new_prod_cont")}>
        <p>add new product page</p>
        <p>name</p>
        <input type="text" onInput={e => setInput_name(e.target.value)} />
        <p>price</p>
        <input type="text" onInput={e => setInput_price(e.target.value)} />
        <p>link</p>
        <input type="text" onInput={e => setInput_link(e.target.value)} />
        <p>size</p>
        <input type="text" onInput={e => setInput_size(e.target.value)} />
        <p>country</p>
        <input type="text" onInput={e => setInput_country(e.target.value)} />
        <p>weight</p>
        <input type="text" onInput={e => setInput_weight(e.target.value)} />
        <p>material</p>
        <input type="text" onInput={e => setInput_material(e.target.value)} />
        <button onClick={add_p}>add</button>
        <h1>{message}</h1>
      </div>
    </div>
  );
}

export default Add_new_prod;
