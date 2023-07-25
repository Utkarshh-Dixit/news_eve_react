import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date} = this.props;
    return (
      <div>
        <div className="card" style={{width:"18rem"}}>
  <img src={imageUrl?imageUrl : "https://www.digitaltrends.com/wp-content/uploads/2022/09/iPhone-14-Pro-App-Library.jpg?resize=1200%2C630&p=1"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer" className="btn btn-primary" target='_blank' >Read more</a>
  </div>
</div>
      </div>
    )
  }
}
