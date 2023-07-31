import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, isNetflix, selectMovie }) => {
  return (
    // Hiển thị poster hoặc backdrop của phim
    <img
      onClick={() => selectMovie(movie)} // Khi click vào ảnh sẽ hiển thị trailer và thông tin phim tương ứng
      className={`row__poster ${isNetflix && "row__posterLarge"} `}
      src={`https://image.tmdb.org/t/p/w500/${
        isNetflix ? movie.poster_path : movie.backdrop_path
      }`}
      alt={movie.name}
    />
  );
};

export default MovieCard;
