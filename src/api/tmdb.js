import axios from "axios";

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: import.meta.env.VITE_TMDB_TOKEN,
  },
});

export const getTrendingMovies = async () => {
  const res = await API.get("/trending/movie/day?language=en-US");
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await API.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
  return res.data.results;
};

export const getMovieDetails = async (movieId) => {
  const res = await API.get(`/movie/${movieId}?language=en-US`);
  return res.data;
};

export const getMovieCast = async (movieId) => {
  const res = await API.get(`/movie/${movieId}/credits?language=en-US`);
  return res.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const res = await API.get(`/movie/${movieId}/reviews?language=en-US&page=1`);
  return res.data.results;
};