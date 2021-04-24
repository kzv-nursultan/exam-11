import './App.css';
import MainPage from "./containers/MainPage/MainPage";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ButtonAppBar from "./containers/AppBar/AppBar";
import UserSignUp from "./containers/UserSignUp/UserSignUp";
import UserSignIn from "./containers/UserSignIn/UserSignIn";
import CreateAdvertise from "./containers/CreateAdvertise/CreateAdvertise";
import OneGoodPage from "./containers/OneGoodPage/OneGoodPage";


const App = () => {
  return (
      <BrowserRouter>
        <ButtonAppBar/>
        <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/register' component={UserSignUp}/>
            <Route path='/login' component={UserSignIn}/>
            <Route path='/add' component={CreateAdvertise}/>
            <Route path='/more/:id'  component={OneGoodPage}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
