import './App.css';
import MainNavbar from './components/navbar/MainNavbar';
import { Switch } from 'react-router-dom';
import ItemBox from './components/items/ItemBox';

function App(props) {
  return (
    <div>
      <MainNavbar currentUser={props.currentUser}></MainNavbar>
      <Switch>
        {/* <Route exact path='/testroute' component={() => <h1>Hallo</h1>}></Route> */}
      </Switch>
      <ItemBox></ItemBox>
    </div>
  );
}

export default App;
