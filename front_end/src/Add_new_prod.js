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
  let [brand, set_brand] = useState('samsung');
  let [type, set_cat] = useState('mobile');
  let [number, set_number] = useState(0);
  const [cookies, removeCookie, setCookie] = useCookies(['user_id', 'user_type', 'user_name', 'user_email', 'user_phone']);
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
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[0]); set_cat(category_list[0]); set_number(0);}} checked={number == 0} type="radio" value="0" id="0"/><label htmlFor='0' className={class_name('add_prod_radio_lab')}>samsung mobile</label></div>
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[1]); set_cat(category_list[1]); set_number(1);}} checked={number == 1} type="radio" value="1" id="1"/><label htmlFor='1' className={class_name('add_prod_radio_lab')}>xiaomi mobile</label></div>
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[2]); set_cat(category_list[2]); set_number(2);}} checked={number == 2} type="radio" value="2" id="2"/><label htmlFor='2' className={class_name('add_prod_radio_lab')}>apple mobile</label></div>
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[3]); set_cat(category_list[3]); set_number(3);}} checked={number == 3} type="radio" value="3" id="3"/><label htmlFor='3' className={class_name('add_prod_radio_lab')}>samsung tablet</label></div>
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[4]); set_cat(category_list[4]); set_number(4);}} checked={number == 4} type="radio" value="4" id="4"/><label htmlFor='4' className={class_name('add_prod_radio_lab')}>xiaomi tablet</label></div>
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[5]); set_cat(category_list[5]); set_number(5);}} checked={number == 5} type="radio" value="5" id="5"/><label htmlFor='5' className={class_name('add_prod_radio_lab')}>apple tablet</label></div>
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[6]); set_cat(category_list[6]); set_number(6);}} checked={number == 6} type="radio" value="6" id="6"/><label htmlFor='6' className={class_name('add_prod_radio_lab')}>lenovo laptop</label></div>
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[7]); set_cat(category_list[7]); set_number(7);}} checked={number == 7} type="radio" value="7" id="7"/><label htmlFor='7' className={class_name('add_prod_radio_lab')}>asus laptop</label></div>
        <div className={class_name('add_prod_rad_cont')}><input className={class_name('add_prod_rad_in')} onClick={() => {set_brand(brand_list[8]); set_cat(category_list[8]); set_number(8);}} checked={number == 8} type="radio" value="8" id="8"/><label htmlFor='8' className={class_name('add_prod_radio_lab')}>apple laptop</label></div>
        <button onClick={add_p}>add</button>
        <h1>{message}</h1>
      </div>
    </div>
  );
}

export default Add_new_prod;
