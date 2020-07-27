import React, { Component } from 'react';
import Candlestick from "./Candlestick"

class WeeklyStockValueChart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            stockValues:props.weeklyStockValues,
         }
    }
    render() { 
        return (
            <div className = "box">
                <h3 className = "text-center">Cours de la semaine</h3>
                <Candlestick datas = {this.state.stockValues}/>
            </div>
        )
    }
}
 
export default WeeklyStockValueChart;