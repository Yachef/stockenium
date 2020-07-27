import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import fire from '../../config/Firebase';
import Loading from '../Loading';
import Title from '../Title'


class Signup extends Component{

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            error:"",
            showLoading:false
        }
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
        event.preventDefault()
        this.setState({showLoading:true})
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() =>{
            this.props.history.push('/')
        }).catch((error) => {
            var errorMessage = error.message;
            this.setState({
                showLoading:false,
                error:errorMessage
         })

          });
    }
    
    loadingOrSubmit = () =>{
        if(this.state.showLoading){
            return (
                <Loading type = "spin" color = "#17A9A8" height = "50px" width ="50px"/>
            )
        }else{
            return (
                <button type="submit" className="btn btn-primary">Confirmer mon inscription !</button>
            )
        }
    }

    render(){
        return(
            <div>
                <Title name = "Inscription"/>
                <div className = "container text-center" id = "login">
                    <p>Remplissez le formulaire ci-dessous pour vous inscrire.</p>
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
                        <p>Vous avez déjà un compte ? <Link to = "/login">Connectez-vous !</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(Signup);
