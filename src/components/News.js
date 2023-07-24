import React, { Component } from 'react'
import NewsItem from './Items/NewsItem'
import { Spinner } from 'react-bootstrap';

export class News extends Component {
   

        constructor(){
          super();
          this.state = {
            articles : [],
            loading : false,
            page : 1
          }
        }

        async componentDidMount(){
          let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=33f83513f9b94d259b8c48ee767f5437&page=1&pageSize=${this.props.pageSize}`;
          this.setState({loading : true});
          let data = await fetch(url);
          let parsedData = await data.json();
          this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
          loading : false})
        }

        handleNextClick = async () =>{
          console.log("This will happen when you click next");
          
          let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=33f83513f9b94d259b8c48ee767f5437&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
          this.setState({loading : true});
          let data = await fetch(url);
          let parsedData = await data.json();
          this.setState({
            page : this.state.page + 1,
            articles : parsedData.articles,
            loading:false
          })
        }
        
        handlePrevClick = async () =>{
        console.log("This will happen when you click previous")
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=33f83513f9b94d259b8c48ee767f5437&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
          let data = await fetch(url);
          let parsedData = await data.json();
          this.setState({
            page : this.state.page - 1,
            articles : parsedData.articles,
            loading : false
          })
        }
  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{border:"2px solid black"}}>NewsEve - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
         <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
         return <div className='col-md-4 my-4' key={element.url}>
        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
            })}
       
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News