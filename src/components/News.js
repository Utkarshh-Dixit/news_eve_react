import React, { Component } from 'react'
import NewsItem from './Items/NewsItem'

export class News extends Component {
   

        constructor(){
          super();
          this.state = {
            articles : [],
            loading : false
          }
        }

        async componentDidMount(){
          let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=33f83513f9b94d259b8c48ee767f5437";
          let data = await fetch(url);
          let parsedData = await data.json();
          this.setState({articles: parsedData.articles})
        }
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsEve - Top Headlines</h2>
         <div className='row'>
        {this.state.articles.map((element)=>{
         return <div className='col-md-4 my-4' key={element.url}>
        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
            })}
       
        </div>
      </div>
    )
  }
}

export default News