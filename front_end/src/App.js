import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { change } from './themeSlice';

function App() {

  let dispatch = useDispatch();
  let theme = useSelector((state) => state.theme.data);

  function change_theme(){
    dispatch(change());
  }

  return (
    <div className={((theme == "light") ? " dark_theme" : "")}>
      <p>meh</p>
      <button onClick={change_theme}>change theme</button>
    </div>
  );
}

export default App;
