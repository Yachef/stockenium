import React, { Component } from 'react';
import axios from 'axios';
import NoImagesAvailable from '../../../images/no-images-available.png'
import Loading from '../../Loading';

class News extends Component {
    constructor() {
        super();
        this.state = {
            articles:null
        }
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
    }

    componentDidMount(){
        this.getNews();
    }

    
    componentWillUnmount(){
        this.source.cancel();
    }

    getNews = () => {
        axios.get("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FEconomy.xml",{cancelToken:this.source.token})
        .then(res => {
            if(res.status === 200){
                const articles = res.data.items
                const formattedArticles = articles.map((article) =>{
                    return(
                        <div key = {article.pubDate} className = "article-container">
                            <a href = {article.link} target = '_blank' rel="noopener noreferrer">
                                <div className = "d-flex justify-content-space-between align-items-center">
                                    <div className="article-image">
                                        <img alt = {article.description} src = {article.enclosure.link ? article.enclosure.link : NoImagesAvailable}/>
                                    </div>
                                    <div>
                                        <div className = "article-title">
                                            {article.title}
                                        </div>
                                        <div className="article-date">
                                            {article.pubDate}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        <hr style ={{borderTop: '1px solid lightgray'}}></hr>
                        </div>
                    )
                })
                this.setState({articles:formattedArticles})
            }else{
                this.setState({articles:<div>Erreur lors de la récupération des données</div>})
            }
        })
        .catch(e => {
            console.log(e)
            this.setState({articles:<div>Erreur lors de la récupération des données</div>})
        })
        
    }

    render() { 
        return ( 
            <div className = "box" id = "news">
                <h2 style={{textAlign:"center"}}>Actualités</h2>
                {this.state.articles ? this.state.articles : 
                        <Loading type = "spin" color = "#17A9A8" height = "50px" width ="50px"/>}
            </div>
         );
    }
}
 
export default News;