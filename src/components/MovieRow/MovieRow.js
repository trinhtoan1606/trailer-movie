import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./MovieRow.css";
import YouTube from "react-youtube";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, fetchURL, rowID, isNetflix }) => {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "9011044b6da2ab433f67485c8cc3169d";
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [show, setShow] = useState(false);

  // Lấy danh sách movie từ API
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      await selectMovie(request.data.results[0]);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  // Lấy video movie từ API
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });
    return data;
  };

  // Lấy video và thông tin movie tương ứng với từng poster phim
  const selectMovie = async (movie) => {
    const data = await fetchMovie(movie.id);
    setSelectedMovie(data);
  };

  // Render video nếu video đó có tên = "Official Trailer" hoặc có type = "Teaser", "Trailer"
  const rendertrailer = () => {
    const traler = selectedMovie.videos.results.find(
      (vid) =>
        vid.name === "Official Trailer" ||
        vid.type === "Teaser" ||
        vid.type === "Trailer"
    );

    const key = traler ? traler.key : selectedMovie.videos.results[0];

    return (
      <YouTube
        videoId={key}
        opts={{
          height: "450",
          width: "950",
          playerVars: { autoplay: 0 },
        }}
      />
    );
  };

  // Tạo 2 thanh slice kéo danh sách movie qua trái, qua phải
  const sliderLeft = () => {
    let slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const sliderRight = () => {
    let slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // ------------------------------------------------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <div className="movieContainer">
        <h2>{title}</h2>
        <FiChevronLeft onClick={sliderLeft} className="btnLeft" />
        <FiChevronRight onClick={sliderRight} className="btnRight" />

        {/* Hiển thị danh sách movie */}
        <div
          id={"slider" + rowID}
          className="movieSlider"
          onClick={() => setShow(!show)} // Khi click vào ảnh sẽ ẩn hiện phần trailer và thông tin movie
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isNetflix={isNetflix}
              selectMovie={selectMovie}
            />
          ))}
        </div>
      </div>

      {/* Hiển thị Trailer và thông tin movie */}
      <div className={`${show ? "show" : "hide"}`}>
        <div className={"detailMovie "}>
          <div className="movieInfo">
            <h2 className="movieTitle">{selectedMovie.title}</h2>
            <span>
              ___________________________________________________________________________________________________________________________
            </span>
            <div className="movieRate">
              {selectedMovie.release_date ? (
                <span className="">
                  Release Date: {selectedMovie.release_date}
                </span>
              ) : null}
              {selectedMovie.vote_average ? (
                <span className="">
                  Vote: {selectedMovie.vote_average.toFixed(1)}/10
                </span>
              ) : null}
            </div>
            {selectedMovie.overview ? <p>{selectedMovie.overview}</p> : null}
          </div>
          <div className="movieTrailer">
            {selectedMovie.videos ? rendertrailer() : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieRow;
