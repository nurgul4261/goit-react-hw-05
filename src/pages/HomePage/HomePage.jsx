import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/tmdb.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setLoading(true);
        setError(null);
        const results = await getTrendingMovies();
        setMovies(results);
      } catch (err) {
        setError("Failed to load trending movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Today</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;