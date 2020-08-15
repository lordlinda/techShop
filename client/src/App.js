import React,{useEffect} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import './assets/main.css'
import store from './data/store.js'
import Navbar from './components/navbar/Navbar.js'
import Register from './components/screens/Register.js'
import Login from './components/screens/Login.js'
import {loadUser} from './data/reducers/auth.js'
import setAuthToken from './components/helpers/setAuthToken.js'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
    useEffect(()=>{
        store.dispatch(loadUser())
    },[])
  return (
    <Provider store={store}>
    <Router>
    <Navbar />
    <ToastContainer />
    <Switch>
    <Route exact path='/register' component={Register}/>
    <Route exact path='/login' component={Login}/>
    </Switch>
    </Router>
    </Provider>
  );
}

export default App;
