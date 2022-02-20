import React, { Component } from 'react';
import Title from "../../Title";
import axios from 'axios';
import ReactAutocomplete from 'react-autocomplete'
import CompanyDetails from './CompanyDetails';
import LastStockValue from './LastStockValue';
import WeeklyStockValueChart from './WeeklyStockValueChart';
import Loading from '../../Loading';

class Actions extends Component{

    constructor(props){
        super(props);
        this.state = ({
            searchQuery : "",
            searchSuggestions:[],
            error:"",
            companyDetails:null,
            weeklyStockValues:"",
            lastStockValue:null,
            waitingForDatas:3
        })
        this.suggestions = require("../../../nyse-stockmarket.json")
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
    }

    componentWillUnmount(){
        this.source.cancel();
    }
    setSearchQuery = (query) => {
        this.setState({
            searchQuery:query
        })
    }
    launchQuery = (symbol) => {
        this.setState({
            searchQuery:symbol,
            waitingForDatas:0,
        })
        axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=PVV4C25QHRGYZBN2`,{cancelToken:this.source.token})
            .then(res => {
                if(res.status === 200 && res.data["Name"]){
                    this.setState({
                        companyDetails:res.data,
                        error:""
                    })
                    this.getWeeklyDatas(symbol)
                    this.getLastStockValue(symbol)
                }else if(res.status === 200 && res.data.Note){
                    this.setState({
                        error:"Trop d'appels à l'API (limité à 5 par minute en version gratuite), veuillez réessayer dans quelques instants",
                        companyDetails:null,
                        weeklyStockValues:"",
                        lastStockValue:null,
                    })
                }
                else{
                    this.setState({
                        companyDetails:null,
                        weeklyStockValues:"",
                        lastStockValue:null,
                        error:"Veuillez sélectionner un autre symbole, ce dernier n'est pas disponible dans l'API AlphaVantage"
                    })
                }
                this.setState((prevState) =>  {return {waitingForDatas:prevState.waitingForDatas+1}})
            }).catch((e)=>{
                this.setState({
                    companyDetails:null,
                    weeklyStockValues:"",
                    lastStockValue:null
                })
                this.setState({error:"Erreur lors de l'appel : " + e})
            })
    }

    getWeeklyDatas = (symbol) => {
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&apikey=PVV4C25QHRGYZBN2`,{cancelToken:this.source.token})
            .then(res =>{
                if(res.status ===200){
                    if(res.data["Time Series (Daily)"]){
                        this.setState({weeklyStockValues:res.data["Time Series (Daily)"]})
                    }else{
                        if(alert("Trop d'appels à l'API, recommencez dans quelques instants")){}
                        else document.location.reload()
                    }
                }else{
                    if(alert("Erreur lors de l'appel à l'API")){}
                    else document.location.reload()
                }
                this.setState((prevState) =>  {return {waitingForDatas:prevState.waitingForDatas+1}})
            }).catch(e=>{
                console.log(e)
            })
    }
    getLastStockValue = (symbol) => {
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=PVV4C25QHRGYZBN2`,{cancelToken:this.source.token})
            .then(res =>{
                if(res.status ===200){
                    if(res.data["Time Series (1min)"]){
                        this.setState({lastStockValue:res.data["Time Series (1min)"]})
                    }else{
                        if(alert("Trop d'appels à l'API, recommencez dans quelques instants")){}
                        else document.location.reload()
                    }
                }else{
                    if(alert("Erreur lors de l'appel à l'API")){}
                    else document.location.reload()
                }
                this.setState((prevState) =>  {return {waitingForDatas:prevState.waitingForDatas+1}})
            }).catch(e=>{
                console.log(e)
            })
    }

    render(){
        return(
            <div id = "actions">
                <Title name = "Actions" /> 
                <section style={{width:"100%"}} className = "d-flex justify-content-center">
                    <div className = "box text-center" style = {{width:"95%", margin: "auto"}}>
                        <h3 style = {{color:"red"}}>Attention : j'utilise l'API AlphaVantage dans sa version gratuite. Le nombre de requêtes étant limité, vous ne pourrez rechercher qu'une société par minute </h3>
                        <p>Recherchez une entreprise par son <span className = "text-danger font-weight-bold">symbole ACT (ex : IBM)</span></p>
                        <div>
                        <ReactAutocomplete
                            getItemValue={(item) => item["ACT Symbol"]}
                            items={this.suggestions}
                          shouldItemRender={(item, value) => item["ACT Symbol"].toLowerCase().indexOf(value.toLowerCase()) > -1}
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'lightgray' : 'white', cursor: isHighlighted ? "pointer": "" }}>
                                {item["ACT Symbol"]}
                                </div>
                            }
                            value={this.state.searchQuery}
                            onChange={(e) =>  this.setSearchQuery(e.target.value)}
                            onSelect={(val) => {this.launchQuery(val)}}
                            menuStyle = {{
                                zIndex: "10",
                                borderRadius: '3px',
                                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                background: 'rgba(255, 255, 255, 0.9)',
                                padding: '2px 0',
                                fontSize: '90%',
                                position: 'fixed',
                                overflow: 'auto',
                                maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
                            }}
                            renderInput = {(props) => {return <input className = "form-control" {...props} />}}
                        />
                        </div>
                        <div style = {{color:"red"}}>
                            {this.state.error}
                        </div>
                    </div>
                </section>
                <section id = "actions-data" className = "row">
                    {this.state.waitingForDatas !== 3 ? 
                    <div className = "d-flex justify-content-center" style = {{width:"100%"}}>
                        <Loading type = "spin" color = "#17A9A8" height = "150px" width ="150px"/>
                    </div> : " "}
                        <div className = "col-xl-4" >
                            {(this.state.companyDetails && this.state.waitingForDatas === 3) ? <CompanyDetails companyDetails = {this.state.companyDetails} /> : " "}
                            {(this.state.lastStockValue && this.state.waitingForDatas === 3) ? <LastStockValue lastStockValue = {this.state.lastStockValue}/>: " "}
                        </div>
                        <div className = "col-xl-8">
                            {(this.state.weeklyStockValues && this.state.waitingForDatas === 3) ? <WeeklyStockValueChart weeklyStockValues = {this.state.weeklyStockValues} />: " "}
                        </div>
                </section>
            </div>
        )
    }
}
export default Actions;