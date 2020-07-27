import React, { Component } from 'react';
import Title from '../../Title'
import News from './News'

class Accueil extends Component{

    render(){
        return(
            <div id = "accueil">
                <Title name = "Accueil"/>
                <section style={{width:"100%"}} className = "d-flex justify-content-center">
                    <div className="row" style = {{width:"100%"}}>
                        <div className="col-lg-8">
                            <div className = "box">
                                <h2 style={{textAlign:"center"}}>Bienvenue sur <span style = {{fontWeight:'bold'}}>STOCK</span>enium !</h2>
                                <p>Cette application vous permet de :</p>
                                <ul>
                                    <li>Onglet Action : Obtenir le cours de l'action de vos entreprises favorites !</li>
                                    <li>Onglet Forex : Obtenir le cours des dernières devises, ainsi que leur évolution !</li>
                                </ul>
                                <p style = {{color:"red"}}>L'application est actuellement en cours de développement (update : juillet 2020)</p>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <News />
                        </div>
                        
                    </div>
                </section> 
            </div>
        )
    }
}
export default Accueil;
