import React from 'react';


class Title extends React.Component {
    render(){
        return(
            <div style = {this.styles.containerDiv} >
                <h1 style = {{fontSize:"20px",margin:"0px"}}>{this.props.name}</h1>
            </div>
        )
    }

    styles = {
        containerDiv:{
            width:"100%",
            backgroundColor:"white",
            padding:"20px",
            textTransform:"uppercase",
            color:"#21B5B5",
            borderBottom:"1px solid lightgrey",
            marginBottom:"20px"
        }
    }
}

export default Title;