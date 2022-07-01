import './Shops.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { change_id, change_type, change_name } from './userSlice';
import { change } from './themeSlice';

function Shops() {

  let theme = useSelector((state) => state.theme.data);
  const { state } = useLocation();
  const { data } = state;
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

  function to_shop(record) {
    fetch('http://localhost:3030/api/user/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: current_user_id,
        sid: record._id
      })
    })
      .then(response => response.json())
      .then(data_reports => {
        if (! data_reports.error) {
          navigate("/shop", { state: {data: data, reports: data_reports.data}});
        }
      });
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("shops_cont")}>
        <p>shops page</p>
        {
          (data || []).map(record => {
            return <button key={record.name} onClick={() => to_shop(record)}>{record.name}</button>;
          })
        }
      </div>
    </div>
  );
}

export default Shops;
