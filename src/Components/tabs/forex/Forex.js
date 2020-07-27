import React, { Component } from 'react';
import Title from "../../Title";
import axios from 'axios'

class Forex extends Component{

    constructor(props){
        super(props)
        this.state = {
            button:'',
            historicalDatas:null,
            lastDatas:null
        }
    }

    componentDidMount(){
        this.getLatestDatas()
        this.getHistoricalDatas()
    }

    getLatestDatas = async () => {
        // try{
        //     const res = await axios.get("http://data.fixer.io/api/latest",{
        //         params:{
        //             access_key:'e18bf141523220a456e0fe4067d467b2',
        //             symbols:"USD, AED, GBP, JPY, CAD"
        //         }
        //     })
        //     if(res.data.err){
        //         console.log(res.data.err.type)
        //         alert('Erreur, veuillez reessayer plus tard')
        //     }else{
        //         const lastDatas = [res.data.date, res.data.rates]
        //         this.setState({lastDatas})
        //         console.log(res.data)
        //     }
        // }catch(err){
        //     alert('Erreur, veuillez reessayer plus tard')
        // }
    }

    getHistoricalDatas = () => {
        // const day = new Date()
        // let one = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        // day.setDate(day.getDate() - 1);
        // let two = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        // day.setDate(day.getDate() - 1);
        // let three = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        // day.setDate(day.getDate() - 1);
        // let four = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        // day.setDate(day.getDate() - 1);
        // let five = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        // day.setDate(day.getDate() - 1);
        // let six = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`
        // day.setDate(day.getDate() - 1);
        // let seven = `http://data.fixer.io/api/${day.toISOString().slice(0, 10)}?access_key=e18bf141523220a456e0fe4067d467b2`

        // const requestOne = axios.get(one);
        // const requestTwo = axios.get(two);
        // const requestThree = axios.get(three);
        // const requestFour = axios.get(four);
        // const requestFive = axios.get(five);
        // const requestSix = axios.get(six);
        // const requestSeven = axios.get(seven);

        // axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven])
        // .then(axios.spread((...responses) => {
        //     const responseOne = responses[0]
        //     const responseTwo = responses[1]
        //     const responseThree = responses[2]
        //     const responseFour = responses[3]
        //     const responseFive = responses[4]
        //     const responseSix = responses[5]
        //     const responseSeven = responses[6]
        //     console.log(responseOne)
        //     console.log(responseTwo)
        //     console.log(responseThree)
        //     console.log(responseFour)
        //     console.log(responseFive)
        //     console.log(responseSix)

        // // use/access the results 
        // })).catch(errors => {
        // // react on errors.
        // })
    }

    render(){
        return(
            <div>
                <Title name = "Forex"/>
            </div>
        )
    }
}
export default Forex;
