import React from 'react';
import './App.scss';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
  } from "react-router-dom";
import fire from './config/Firebase';


import Menu from './Components/Menu'
import Forex from './Components/tabs/forex/Forex';
import Actions from './Components/tabs/actions/Actions';
import Accueil from './Components/tabs/home/Accueil';
import Contact from './Components/tabs/Contact';
import Login from './Components/tabs/Login'
import Signup from './Components/tabs/SignUp'


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
				<Route path="/actions">
					<Actions />
				</Route>
				<Route path="/forex">
					<Forex />
				</Route>
				<Route path="/contact">
					<Contact />
				</Route>
				<Route exact path="/">
					<Accueil/>
				</Route>
			</React.Fragment>

		)
	}

	userNotLoggedInRoutes = () => {
		return(
			<React.Fragment>
				<Route path="/signup">
					<Signup/>
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Redirect to = "/login"/> {/* Redirect to login when user logsout */}
			</React.Fragment>
		)
	}
  render(){
    return (
      <div id="App">

		  	<Router>
				<Menu menuCallback = {this.menuCallback} user = {this.state.user}/>
				<section id = "content" className = {this.state.menuOpened ? 'pushed' : ''}>
					<Switch>
							{this.state.user ? (this.userLoggedInRoutes()) : (this.userNotLoggedInRoutes())}
					</Switch>
				</section>
				
			</Router>	
      </div>
    );
  }
  
}

export default App;
