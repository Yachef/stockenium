import React, { Component } from 'react';
import Title from "../Title";

class Contact extends Component{

    render(){
        return(
            <div>
            <Title name = "Contact" />
            <section style={{width:"100%"}} className = "d-flex justify-content-center">
                    <div className = "box" style={{width:"90%"}}>
                        <h2 style={{textAlign:"center"}}>Informations de contact</h2>
                        <p>Besoin d'un développeur front-end React en freelance ? Contactez moi !</p>
                        <ul>
                            <li>Email : yacine[@]webenium.fr</li>
                            <li>Tél : +33 6 05 13 62 00</li>
                        </ul>
                    </div>
                </section> 
            </div>
        )
    }
}
export default Contact;
