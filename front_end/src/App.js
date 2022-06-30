import './App.css';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function App() {

  let theme = useSelector((state) => state.theme.data);
  let navigate = useNavigate();
  let [input, setInput] = useState('');

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
