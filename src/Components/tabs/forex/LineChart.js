import React, { Component } from 'react';
import Chart from 'chart.js';


class LineChart extends Component {
    constructor(props){
        super(props)
        this.chartRef = React.createRef()
    }

    componentDidMount(){
        const dates = this.props.historicalDatas[0]
            const datas = this.props.historicalDatas[1]
            new Chart(this.chartRef.current, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{ 
                        data: datas[0],
                        label: "USD",
                        borderColor: "#3e95cd",
                        fill: false
                    }, { 
                        data: datas[1],
                        label: "AED",
                        borderColor: "#8e5ea2",
                        fill: false
                    }, { 
                        data: datas[2],
                        label: "GBP",
                        borderColor: "#3cba9f",
                        fill: false
                    }, { 
                        data: datas[3],
                        label: "AUD",
                        borderColor: "#e8c3b9",
                        fill: false
                    }, { 
                        data: datas[4],
                        label: "CAD",
                        borderColor: "#c45850",
                        fill: false
                    }
                    ]
                },
                options: {
                    title: {
                    display: true,
                    text: 'Evolution des devises cette semaine'
                    }
                }
                });

    }

    render(){
        return(
            <div className="box">
                <canvas ref={this.chartRef} />
            </div>
        )
    }
    
}
 
export default LineChart;