import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Banner from "../../components/Banner/Banner";
import MovieRow from "../../components/MovieRow/MovieRow";
import requests from "../../request";

function Browse() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <MovieRow
        rowID="1"
        title="Original"
        fetchURL={requests.API_URL_TRENDING}
        isNetflix
      />
      <MovieRow
        rowID="3"
        title="Xếp hạng cao"
        fetchURL={requests.API_URL_TOPRATED}
      />
      <MovieRow
        rowID="4"
        title="Hành động"
        fetchURL={requests.API_URL_ACTIONMOVIES}
      />
      <MovieRow
        rowID="5"
        title="Hài"
        fetchURL={requests.API_URL_COMEDYMOVIES}
      />
      <MovieRow
        rowID="6"
        title="Kinh dị"
        fetchURL={requests.API_URL_HORRORMOVIES}
      />
      <MovieRow
        rowID="7"
        title="Lãng mạn"
        fetchURL={requests.API_URL_ROMANCEMOVIES}
      />
      <MovieRow
        rowID="8"
        title="Tài liệu"
        fetchURL={requests.API_URL_DOCUMENTARIES}
      />
    </div>
  );
}

export default Browse;
