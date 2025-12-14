import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, Outlet, NavLink } from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import axios from "axios";

const options = {
  headers: {
    Authorization: import.meta.env.VITE_TMDB_TOKEN,
  },
};

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        setMovie(res.data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.back}>
        ← Go back
      </Link>

      <div className={styles.details}>
        {movie.poster_path && (
          <img
            src={`${IMG_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        )}
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <div className={styles.additional}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <NavLink to="cast" className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;