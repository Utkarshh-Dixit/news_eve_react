import React from 'react'
import { useEffect, useState } from 'react'
import NewsItem from './Items/NewsItem'
// import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'

const News =(props)=> {
   const [articles, setarticles] = useState([])
   const [loading, setloading] = useState(false)
   const [page, setpage] = useState(1)
   const [totalResults, settotalResults] = useState(0)
  
        
          // document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News_Eve`;
         
        const updateNews  = async() =>{
          let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=33f83513f9b94d259b8c48ee767f5437&page=${page}&pageSize=${props.pageSize}`;
          setloading(true);
          let data = await fetch(url);
          let parsedData = await data.json();
          setarticles(parsedData.articles)
          settotalResults(parsedData.totalResults)
          setloading(false)
          
        }

        useEffect(() => {
          //eslint-disable-next-line
          updateNews();
          
        }, [])
        
        

        // const handleNextClick = async () =>{
        //   console.log("This will happen when you click next");
        //   setpage(page+1);
        //   updateNews();
        // }
        
        // const handlePrevClick = async () =>{
        // console.log("This will happen when you click previous")
        // setpage(page-1);
        // updateNews();
        // }

        const fetchMoreData = async() =>{
          let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=33f83513f9b94d259b8c48ee767f5437&page=${page+1}&pageSize=${props.pageSize}`;
          setpage(page+1);
          setloading(true);
          let data = await fetch(url);
          let parsedData = await data.json();
          setarticles(articles.concat(parsedData.articles));
          settotalResults(parsedData.totalResults);
          setloading(false);
          
        }
        
    return (
      <>
        <h1 className='text-center' style={{ padding:"25px 25px", marginTop:"100px"}}>NewsEve - Top {props.category} headlines</h1>
        {/* <h5>Page: {this.state.page}</h5> */}
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={page+1 > Math.ceil(totalResults/props.pageSize) ? "":<h4>Loading...</h4>}
        >
          <div className='container'>
         <div className='row'>
        {articles.map((element)=>{
         return <div className='col-md-4 my-4' key={element.url+element.publishedAt}>
        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
        </div>
            })}
       
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'General'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News