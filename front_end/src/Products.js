import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { change } from './themeSlice';
import Navbar from './Navbar';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Products() {

    let dispatch = useDispatch();
    let theme = useSelector((state) => state.theme.data);
    let navigate = useNavigate();
    let [input, setInput] = useState('');

    function change_theme() {
        dispatch(change());
    }

    function class_name(name) {
        return name + " " + name + "_" + theme;
    }

    function search() {
        navigate("/products_loader", { state: { input: input } });
    }

    return (
        <div className="cont">
            <Navbar />
            <div className={class_name("prods_cont")}>
                <p>products</p>
                <input type="text" onInput={e => setInput(e.target.value)} />
                <button onClick={search}>SEARCH</button>
            </div>
        </div>
    );
}

export default Products;
