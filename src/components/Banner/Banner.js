import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../../request";
import "./Banner.css";

const Banner = () => {
  // Tạo array chứa danh sách các bộ phim
  const [movies, setMovies] = useState([]);

  // Lấy ngẫu nhiên 1 bộ phim
  const movie = movies[Math.floor(Math.random() * movies.length)];

  // Lấy danh sách các bộ phim từ API
  useEffect(() => {
    axios.get(requests.API_URL_TRENDING).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  // Tạo hàm để thu gọn overview của phim
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div>
      <header
        className="banner"
        // Ảnh banner là ảnh backdrop của phim
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
               "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
           )`,
          backgroundPosition: "center-center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {/* Tên phim lấy từ tittle hoặc name hoặc original_name của phim */}
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">
            {/* overview không quá 150 chữ */}
            {truncateString(movie?.overview, 150)}
          </h1>
        </div>
      </header>
    </div>
  );
};

export default Banner;
