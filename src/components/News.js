import React, { Component } from 'react'
import NewsItem from './Items/NewsItem'

export class News extends Component {
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsEve - Top Headlines</h2>
         <div className='row'>
            <div className='col-md-4'>
        <NewsItem Title="Hell news" description="helldesc"/>
        </div>
        <div className='col-md-4'>
        <NewsItem Title="Hell news" description="helldesc"/>
        </div>
        <div className='col-md-4'>
        <NewsItem Title="Hell news" description="helldesc"/>
        </div>
        </div>
      </div>
    )
  }
}

export default News