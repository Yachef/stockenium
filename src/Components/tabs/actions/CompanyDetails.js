import React, { Component } from 'react';

class CompanyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            companyDetails:props.companyDetails
         }
    }
    render() { 
        return (
        <div className = "box">
            <h3 className = "text-center">Détails sur l'entreprise</h3>
            <ul>
                <li>Nom : { this.state.companyDetails["Name"]}</li>
                <li>Pays : { this.state.companyDetails["Country"]}</li>
                <li>Secteur : { this.state.companyDetails["Sector"]}</li>
                <li>Nombre d'employés : { parseInt(this.state.companyDetails["FullTimeEmployees"]).toLocaleString()}</li>
                <li>Capitalisation boursière : { parseInt(this.state.companyDetails["MarketCapitalization"]).toLocaleString() +" "+  this.state.companyDetails["Currency"]}</li>
                <li>Marge bénéficiaire : { parseFloat(this.state.companyDetails["ProfitMargin"]).toFixed(2) * 100 + '%'}</li>
            </ul>
        </div>
        )
    }
}
 
export default CompanyDetails;