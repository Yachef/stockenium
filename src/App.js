import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Navigate, Route, Routes,} from "react-router-dom";
import fire from './config/Firebase';
import Actions from "./Components/tabs/actions/Actions";
import Forex from "./Components/tabs/forex/Forex";
import Contact from "./Components/tabs/Contact";
import Accueil from "./Components/tabs/home/Accueil";
import Signup from "./Components/tabs/SignUp";
import Login from "./Components/tabs/Login";
import Menu from "./Components/Menu";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      menuOpened:true,
      user:" "
    }
  }

  menuCallback  = (isMenuOpened)=>{
    this.setState({
      menuOpened:isMenuOpened,
    })
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  componentDidMount(){
    this.authListener()
  }

  userLoggedInRoutes = () => {
    return (
      <React.Fragment>
        <Route path="/actions" element={<Actions />} />
        <Route path="/forex" element={<Forex />} />
        <Route path="/contact" element={<Contact />} />
        <Route exact path="/" element={<Accueil />} />
      </React.Fragment>
    )
  }

  userNotLoggedInRoutes = () => {
    return(
      <React.Fragment>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/*<Navigate to = "/login"/> /!* Redirect to login when user logsout *!/*/}
      </React.Fragment>
    )
  }
  render(){
    return (
      <div id="App">

        <Router>
          <Menu menuCallback = {this.menuCallback} user = {this.state.user}/>
          <section id = "content" className = {this.state.menuOpened ? 'pushed' : ''}>
            <Routes>
              {this.state.user ? (this.userLoggedInRoutes()) : (this.userNotLoggedInRoutes())}
            </Routes>
          </section>

        </Router>
      </div>
    );
  }
}

export default App;