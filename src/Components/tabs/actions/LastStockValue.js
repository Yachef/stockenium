import React, { Component } from 'react';

class LastStockValue extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lastStockValue : Object.values(props.lastStockValue)[0]["4. close"],
            lastUpdateTime:Object.keys(props.lastStockValue)[0]
        }
    }
    render() { 
        return(
            <div className = {"box"}>
                <h3 className = "text-center">Valeur actuelle de l'action</h3>
                <h6 style = {{color:"lightgray"}} className = "text-center">Dernière mise à jour : {this.state.lastUpdateTime}</h6>
                <p id = "lastStockValue" className = "blink">{parseFloat(this.state.lastStockValue).toFixed(2) + "$"}</p>
            </div>
        )
    }
}
 
export default LastStockValue;