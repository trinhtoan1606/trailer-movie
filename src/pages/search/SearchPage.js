import React, { useState, useRef } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchPage.css";
import MovieCard from "../../components/MovieRow/MovieCard";
import axios from "axios";
import YouTube from "react-youtube";

const SearchPage = (isNetflix = false) => {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "9011044b6da2ab433f67485c8cc3169d";
  const [selectedMovie, setSelectedMovie] = useState({});
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const formSearchRef = useRef();

  // Lẫy dữ liệu tìm kiếm từ API
  const searchMovie = async (e) => {
    e.preventDefault();

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=9011044b6da2ab433f67485c8cc3169d&query=${search}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  // Từ khóa tìm kiếm là dữ liệu được người dùng nhập vào
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  // Reset từ khóa tìm kiếm
  const searchResetHandler = (event) => {
    setSearch("");
    formSearchRef.current.reset();
  };

  // Lấy trailer movie từ API
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

  return (
    <div className="search-component">
      <div className="container-fluid">
        {/* Hiển thị thanh tìm kiếm */}
        <div className="search-form">
          <form ref={formSearchRef} onSubmit={searchMovie}>
            <div className="form-group">
              <Input
                id="search-movie"
                type="search"
                onChange={searchHandler}
                value={search}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </div>
            <div className="search-action d-flex justify-content-end pr-4">
              <Button variant="text" type="button" onClick={searchResetHandler}>
                Reset
              </Button>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </div>
          </form>
        </div>

        <div className="search-content">
          <h2 className="search-content__title">Search result</h2>

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
                {selectedMovie.overview ? (
                  <p>{selectedMovie.overview}</p>
                ) : null}
              </div>
              <div className="movieTrailer">
                {selectedMovie.videos ? rendertrailer() : null}
              </div>
            </div>
          </div>

          {/* Hiển thị danh sách tìm kiếm */}
          <div className="search-content__result">
            {movies.length > 0 ? (
              <div className="container">
                <div className="grid" onClick={() => setShow(!show)}>
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
            ) : (
              // Nếu chưa nhập từ khóa hoặc không có phim trùng với từ khóa => báo lỗi
              <h2 className="noMovieFound">Sorry !! No Movies Found</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
