import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { change } from './themeSlice';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Products_item from './Products_item';

function Products() {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);
  let navigate = useNavigate();
  let [input, setInput] = useState('');
  let [categories, set_cat] = useState([]);
  let [brands, set_brand] = useState([]);
  let [numbers, set_number] = useState([]);
  const { state } = useLocation();
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

  function change_theme() {
    dispatch(change());
  }

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function search() {
    navigate("/products_loader", { state: { input: input, categories: categories, brands: brands } });
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

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("prods_cont")}>
        <h1 className={class_name('prods_header')}>Products</h1>
        <div className={class_name("prods_search_cont")}>
          <input className={class_name('prods_search_in')} type="text" onInput={e => setInput(e.target.value)} />
          <button className={class_name('prods_search_btn')} onClick={search}>SEARCH</button>
        </div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="0" id="0" /><label htmlFor='0' className={class_name('prods_radio_lab')}>samsung mobile</label></div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="1" id="1" /><label htmlFor='1' className={class_name('prods_radio_lab')}>xiaomi mobile</label></div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="2" id="2" /><label htmlFor='2' className={class_name('prods_radio_lab')}>apple mobile</label></div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="3" id="3" /><label htmlFor='3' className={class_name('prods_radio_lab')}>samsung tablet</label></div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="4" id="4" /><label htmlFor='4' className={class_name('prods_radio_lab')}>xiaomi tablet</label></div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="5" id="5" /><label htmlFor='5' className={class_name('prods_radio_lab')}>apple tablet</label></div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="6" id="6" /><label htmlFor='6' className={class_name('prods_radio_lab')}>lenovo laptop</label></div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="7" id="7" /><label htmlFor='7' className={class_name('prods_radio_lab')}>asus laptop</label></div>
        <div className={class_name('prods_rad_cont')}><input className={class_name('prods_rad_in')} onChange={check_changed} type="checkbox" value="8" id="8" /><label htmlFor='8' className={class_name('prods_radio_lab')}>apple laptop</label></div>
        <div className={class_name('prods_prod_cont')}>
          {
            (state || []).map(record => {
              return <Products_item key={record._id} data={record} />;
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Products;
