import React, { Component } from 'react';
import fire from '../../config/Firebase';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import Title from '../Title'


class Login extends Component{
    constructor(props){
        super(props);
        this.state = ({
            email:"",
            password:"",
            error:"",
            showLoading:false
        })
    }

    handleChange = (event) => {
        if(event.target.id === "emailInput"){
            this.setState({
                email: event.target.value
            });
        }else{
            this.setState({
                password: event.target.value
            });
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({showLoading:true})
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() =>{
            this.props.history.push('/')
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password' || errorCode === "auth/user-not-found") {
                this.setState({
                    showLoading:false,
                    error:'Identifiant ou mot de passe incorrect'
                })
            } else {
                this.setState({
                    showLoading:false,
                    error:errorMessage
                })
            }
              console.log(error);
          });
    }

    loadingOrSubmit = () =>{
        if(this.state.showLoading){
            return (
                <Loading type = "spin" color = "#17A9A8" height = "50px" width ="50px"/>
            )
        }else{
            return (
                <button type="submit" className="btn btn-primary">Connexion</button>
            )
        }
    }

    render(){
        return(
            <div>
                <Title name = "Connexion"/>
                <div className = "container text-center" id = "login">
                    <h2 style = {{color:"red"}}>Testez l'application ! email = test@test.com password = test123</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="emailInput">Adresse email</label>
                            <input type="email"
                                className="form-control"
                                id="emailInput"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInput">Mot de Passe</label>
                            <input type="password"
                                className="form-control"
                                id="passwordInput"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className = "error-container">
                            {this.state.error}
                        </div>
                        <div className = "d-flex justify-content-center" style={{width:"100%"}}>
                            {this.loadingOrSubmit()}
                        </div>
                        <p>Vous n'avez pas de compte ? <Link to = "/signup">Inscrivez-vous !</Link></p>
                    </form>
                </div>
            </div>
        )
            
    }
}
export default Login;
