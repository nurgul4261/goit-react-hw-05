import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieCast.module.css";
import axios from "axios";

const options = {
  headers: {
    Authorization: import.meta.env.VITE_TMDB_TOKEN,
  },
};

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w200";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          options
        );
        setCast(res.data.cast);
      } catch (err) {
        setError("Error occurred while loading player data.");
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (cast.length === 0) return <p>- "No player information found."</p>;

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={styles.item}>
          {actor.profile_path && (
            <img
              src={`${IMG_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              className={styles.photo}
            />
          )}
          <p><strong>{actor.name}</strong></p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;