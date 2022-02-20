import React from "react"
import Chart from "react-google-charts";
import Loading from "../../Loading";

class Candlestick extends React.Component  {

    constructor(props){
        super(props)
        this.state = ({
            datas:"",
            formattedDatas:null,
            dataDate: null
        })
    }

    componentWillMount(){
        this.formatDatas(this.props.datas)
    }

    componentDidUpdate(prevProps) {
        // Utilisation classique (pensez bien à comparer les props) :
        if (this.props.datas !== prevProps.datas) {
            this.formatDatas(this.props.datas)
        }
      }

    formatDatas = (rawDatas) => {
        if(this.props.datas !== ""){
            const stockDatas = Object.values(rawDatas)
            const days = Object.keys(rawDatas)
            this.setState({dataDate:new Date(days[0]).toLocaleDateString('fr-FR')})
            const res = [];
            res.push(['day', 'a', 'b', 'c', 'd'])
            for (let i = 0; i<7;i++){
                res.push([days[i], parseFloat(stockDatas[i]["3. low"]), parseFloat(stockDatas[i]["1. open"]), parseFloat(stockDatas[i]["4. close"]), parseFloat(stockDatas[i]["2. high"])])
            }
            this.setState({formattedDatas:res})
        }
    }
    chart =() =>{
        return (<Chart
            width={'100%'}
            height = {'400px'}
            chartType="CandlestickChart"
            loader = {<Loading type = "spin" color = "#17A9A8" height = "50px" width ="50px"/>}
            data = {this.state.formattedDatas}
            options={{
                legend: 'none',
                chartArea: {'width': '90%', 'height': '80%'},
                fontSize:'10px',
                candlestick: {
                    fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                    risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
                },
            }}
            rootProps={{ 'data-testid': '1' }}
            />)
    }
    render(){
        return(
            <div>
                <h5 className = "text-center" style = {{color:"lightgray"}}>Dernière mise à jour : {this.state.dataDate}</h5>
                {this.chart()}
            </div>
            )
    }
    
}

export default Candlestick;