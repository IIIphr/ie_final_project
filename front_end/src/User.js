import './User.css';
import { useSelector, useDispatch } from 'react-redux';
import { change_id, change_type } from './userSlice';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from './Navbar';

function User() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let theme = useSelector((state) => state.theme.data);
  let current_user_id = useSelector((state) => state.user.user_id);
  let current_user_type = useSelector((state) => state.user.user_type);

  function class_name(name) {
    return name + " " + name + "_" + theme;
  }

  function logout(){
    dispatch(change_id(-1));
    navigate("/");
  }

  return (
    <div className="cont">
      <Navbar />
      <div className={class_name("user_cont")}>
        <p>user page</p>
        <p>well, you are {current_user_id} with your type being {current_user_type}</p>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}

export default User;
