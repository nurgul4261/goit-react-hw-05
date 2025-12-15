import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./MoviesPage.module.css";
import axios from "axios";

const options = {
  headers: {
    Authorization: `${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          options
        );
        setMovies(res.data.results);
      } catch (err) {
        setError("Failed to search movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.search.value.trim();
    if (value) {
      setSearchParams({ query: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Enter movie name..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;