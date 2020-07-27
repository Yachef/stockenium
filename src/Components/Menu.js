import React, { Component } from 'react';
import { FaBars, FaHome, FaCogs, FaUserTie, FaEnvelope } from 'react-icons/fa';
import logo from '../images/logo-stockenium.png'
import { NavLink } from "react-router-dom";
import fire from '../config/Firebase';



class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
          isMenuOpened :true,
        }
      }
    toggleMenu = () => {
        this.props.menuCallback(!this.state.isMenuOpened);
        this.setState({
            isMenuOpened: !this.state.isMenuOpened,
        })
    }

    loggedMenu = () => {
        return (
            <div className = "menu-items">
                        <NavLink exact activeClassName = "active" to="/">
                            <div className = "menu-item-icon">
                                <FaHome/>
                            </div>
                            <div className = "menu-item-text">
                                Accueil
                            </div>
                        </NavLink>
                        <NavLink exact activeClassName = "active" to="/actions">
                            <div className = "menu-item-icon">
                                <FaCogs/>
                            </div>
                            <div className = "menu-item-text">
                                Actions
                            </div>
                        </NavLink>
                        <NavLink exact activeClassName = "active" to="/forex">
                            <div className = "menu-item-icon">
                                <FaUserTie/>
                            </div>
                            <div className = "menu-item-text">
                                Forex
                            </div>
                        </NavLink>
                        <NavLink exact activeClassName = "active" to="/contact">
                            <div className = "menu-item-icon">
                                <FaEnvelope />
                            </div>
                            <div className = "menu-item-text">
                                Contact
                            </div>
                        </NavLink>
                        {/* <NavLink exact activeClassName = "active" to="/visites">
                            <div className = "menu-item-icon">
                                <FaWalking/>
                            </div>
                            <div className = "menu-item-text">
                                Mes Visites
                            </div>
                        </NavLink>
                        <NavLink exact activeClassName = "active" to="/parametres">
                            <div className = "menu-item-icon">
                                <FaCog/>
                            </div>
                            <div className = "menu-item-text">
                                Paramètres
                            </div>
                        </NavLink> */}
                    </div>
        )
    }
    unloggedMenu = () => {
        return(
            <div className = "menu-items">
                <NavLink exact activeClassName = "active" to="/login">
                    <div className = "menu-item-icon">
                        <FaHome/>
                    </div>
                    <div className = "menu-item-text">
                        Connexion
                    </div>
                </NavLink>

                <NavLink exact activeClassName = "active" to="/signup">
                    <div className = "menu-item-icon">
                        <FaHome/>
                    </div>
                    <div className = "menu-item-text">
                        Inscription
                    </div>
                </NavLink>
            </div>
        )
    }

    signOut = () =>{
		fire.auth().signOut().then(function() {
            // Sign-out successful.
            localStorage.removeItem('myPage.expectSignIn')
            
		  }).catch(function(error) {
			// An error happened.
		  });
	}

    render(){
        let button;
        if (this.props.user) {
            button = <button style = {{color:"white"}} onClick={this.signOut}>Déconnexion</button>;
        }else{
            button = null
        }

        return(
            <section id = "menu" >

                <div id = "topbar" className = {this.state.isMenuOpened ? 'pushed' : ''}>
                    <div id = "icon-menu" >
                    <button className = "d-flex justify-content-center align-items-center" onClick = {this.toggleMenu}><FaBars style = {{fontSize:"30px",color:"white"}} /></button>
                    </div>
                    <div className = "d-flex justify-content-center align-items-center">
                        {button}
                    </div>
                </div>

                <div id = "sidebar" className={this.state.isMenuOpened ? 'show-nav' : 'hide-nav'}>
                    <div className = "logo">
                        <NavLink activeClassName = "active" to="/">
                            <img src={logo} alt=""/>
                        </NavLink>
                    </div>
                    {this.props.user ? this.loggedMenu() : this.unloggedMenu()}
                    
                    <p className = "d-flex justify-content-center"
                        style = {{width:"100%",position:"absolute",bottom:"0",color:"grey", fontSize:"12px"}}>
                            App réalisée par <a href = "https://yacine.webenium.fr" target = "_blank" rel = "noopener noreferrer"className = "ml-1">Yacine</a>
                    </p>
                </div>

        </section>
        )
    }
}
export default Menu;
