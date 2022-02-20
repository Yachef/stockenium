import React from 'react';


class LastCurrencyValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastUpdateTime : null,
            lastValue : null,
            currencySelected:null,
        }
    }
    componentDidUpdate(prevPosts){
        if(this.props !== prevPosts){
            if(this.props.lastValue){
                this.setState({
                    lastUpdateTime : this.props.lastValue[0],
                    lastValue : this.props.lastValue[1],
                    currencySelected:this.props.currencySelected,
                })
            }
        }
    }
    render() { 
        const currency = this.state.currencySelected
        return ( 
            <div className = "box">
                <div className = "text-center">
                    <h3>Valeur de la devise : {this.state.currencySelected}</h3>
                    <h6 style = {{color:"lightgray"}} className = "text-center">Dernière mise à jour : {this.state.lastUpdateTime}</h6>
                    <p id = "lastStockValue" className = "blink">{this.state.lastValue ? this.state.lastValue[currency] : ''}</p>
                </div>
            </div>
         );
    }
}
 
export default LastCurrencyValue;