import React, { Component } from 'react';
import Title from "../../Title";
import axios from 'axios'
import LastCurrencyValue from './LastCurrencyValue';
import LineChart from './LineChart';
import Loading from '../../Loading';

class Forex extends Component{

    constructor(props){
        super(props)
        this.state = {
            button:'',
            historicalDatas:null,
            lastDatas:null,
            currencySelected:"USD"
        }
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
    }

    componentDidMount(){
        this.getLatestDatas()
        this.getHistoricalDatas()
    }

    componentWillUnmount(){
        this.source.cancel();
    }

    getLatestDatas = async () => {
        try{
            const res = await axios.get("http://data.fixer.io/api/latest",{
                params:{
                    access_key:'e18bf141523220a456e0fe4067d467b2',
                    symbols:"USD, AED, GBP, AUD, CAD"
                },
                cancelToken:this.source.token
            })
            if(res.data.err){
                console.log(res.data.err.type)
                alert('Erreur, veuillez reessayer plus tard')
            }else{
                const lastDatas = [new Date(res.data.timestamp * 1000).toISOString().slice(0, 19).replace('T', ' '), res.data.rates]
                this.setState({lastDatas})
            }
        }catch(err){
            console.log(err)
        }
    }

    getHistoricalDatas = () => {
        const days = []

        const day = new Date()
        let one = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        days.push(day.toISOString().slice(0, 10))

        day.setDate(day.getDate() - 1);
        let two = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        days.push(day.toISOString().slice(0, 10))

        day.setDate(day.getDate() - 1);
        let three = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        days.push(day.toISOString().slice(0, 10))

        day.setDate(day.getDate() - 1);
        let four = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        days.push(day.toISOString().slice(0, 10))

        day.setDate(day.getDate() - 1);
        let five = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        days.push(day.toISOString().slice(0, 10))

        day.setDate(day.getDate() - 1);
        let six = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        days.push(day.toISOString().slice(0, 10))

        day.setDate(day.getDate() - 1);
        let seven = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        days.push(day.toISOString().slice(0, 10))

        const requestOne = axios.get(one,{cancelToken:this.source.token});
        const requestTwo = axios.get(two);
        const requestThree = axios.get(three);
        const requestFour = axios.get(four);
        const requestFive = axios.get(five);
        const requestSix = axios.get(six);
        const requestSeven = axios.get(seven);

        axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven],)
        .then(axios.spread((...responses) => {
            const usd = [] 
            ,aed = []
            ,gbp = []
            ,aud = []
            , cad= []

            responses.forEach(response => {
                usd.push(response.data.rates["USD"])
                aed.push(response.data.rates["AED"])
                gbp.push(response.data.rates["GBP"])
                aud.push(response.data.rates["AUD"])
                cad.push(response.data.rates["CAD"])
            });
            this.setState({
                historicalDatas: [days, [usd, aed, gbp, aud, cad]]
            })
        // use/access the results 
        })).catch(errors => {
            alert("Erreur lors de l'appel à l'API")
            console.log(errors)
        // react on errors.
        })
    }

    setCurrency = (e) =>{
        this.setState({
            currencySelected:e.target.getAttribute("data-id")
        })
        document.querySelectorAll("#forex button").forEach(button =>{
            button.classList.remove('active')
        })
        e.target.classList.add('active')
    }

    render(){
        return(
            <div id = "forex">
                <Title name = "Forex"/>
                <div className="m-auto" style = {{width:"95%", margin: "auto"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <h2 style={{textAlign:"center"}}>Sélectionnez une devise !</h2>
                                <h6 className = "text-danger text-center">Base : EUR</h6>
                                <div className="input-group mb-3  d-flex justify-content-center">
                                    <div className="input-group-prepend">
                                        <button data-id = 'USD'className="btn btn-outline-secondary active" type="button" onClick= {this.setCurrency}>USD</button>
                                        <button data-id = 'AED'className="btn btn-outline-secondary" onClick= {this.setCurrency}type="button">AED</button>
                                        <button data-id = 'AUD'className="btn btn-outline-secondary" onClick= {this.setCurrency}type="button">AUD</button>
                                        <button data-id = 'CAD'className="btn btn-outline-secondary" onClick= {this.setCurrency}type="button">CAD</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            {this.state.historicalDatas ?
                                <LineChart historicalDatas = {this.state.historicalDatas}/>:
                                <Loading type = "spin" color = "#17A9A8" height = "50px" width ="50px"/>
                            }
                        </div>
                        <div className="col-md-3">
                            {this.state.lastDatas ? 
                                <LastCurrencyValue lastValue = {this.state.lastDatas} currencySelected = {this.state.currencySelected}/>:
                                <Loading type = "spin" color = "#17A9A8" height = "50px" width ="50px"/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Forex;
