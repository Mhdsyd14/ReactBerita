import React, { Component } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

export class CardComponent extends Component {
  render() {
    return (
      <>
        <div className="container">
          {this.props.newsData.map((article, index) => (
            <div key={index} className="card">
              <img
                src={article.urlToImage}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <p className="card-text">{article.publishedAt}</p>
                <a href={article.url} className="btn btn-primary">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default CardComponent;
