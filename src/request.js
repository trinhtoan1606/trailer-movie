const API_KEY = "9011044b6da2ab433f67485c8cc3169d";

const requests = {
  API_URL_TRENDING: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`,
  API_URL_DISCOVER: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`,
  API_URL_TOPRATED: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  API_URL_ACTIONMOVIES: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
  API_URL_COMEDYMOVIES: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
  API_URL_HORRORMOVIES: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
  API_URL_ROMANCEMOVIES: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  API_URL_DOCUMENTARIES: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
