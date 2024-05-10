import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardComponent from "./CardComponent";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      searchData: [],
      cari: "",
      isLoading: true,
      error: null,
    };
  }

  handleOnchange = (e) => {
    this.setState({
      cari: e.target.value,
    });
  };

  searchDatas = () => {
    axios
      .get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=171443a1da2145fb9262ab18a9af71b5"
      )
      .then((response) => {
        this.setState({
          newsData: response.data.articles,
          isLoading: true,
        });
        const { cari, newsData } = this.state;
        if (cari === "") {
          this.setState({
            isLoading: false,
            searchData: newsData,
          });
        } else {
          this.setState({
            isLoading: false,
            searchData: newsData.filter((i) =>
              i.title.toLowerCase().includes(cari.toLowerCase())
            ),
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: error,
          isLoading: false,
        });
      });
  };

  componentDidMount() {
    this.searchDatas();
  }

  render() {
    const { searchData, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className="container d-flex justify-content-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      );
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return (
      <>
        <div className="input-group mb-3 mt-3 container">
          <input
            type="text"
            className="form-control"
            placeholder="Search berita"
            id="searchInput"
            onChange={(e) => this.handleOnchange(e)}
          />
          <button
            className="input-group-text"
            id="basic-addon2"
            onClick={() => {
              this.setState({
                isLoading: true,
              });
              setTimeout(() => {
                this.searchDatas(); // Panggil searchDatas di sini setelah 3 detik
              }, 3000);
            }}
          >
            Search
          </button>
        </div>
        <CardComponent newsData={searchData} />
      </>
    );
  }
}
