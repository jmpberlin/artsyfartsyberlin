import './App.css';
import MainNavbar from './components/navbar/MainNavbar';
import { Switch } from 'react-router-dom';

function App(props) {
  return (
    <div>
      <MainNavbar currentUser={props.currentUser}></MainNavbar>
      <Switch>
        {/* <Route exact path='/testroute' component={() => <h1>Hallo</h1>}></Route> */}
      </Switch>
    </div>
  );
}

export default App;
