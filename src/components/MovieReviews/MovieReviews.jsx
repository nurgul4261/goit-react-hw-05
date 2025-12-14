import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieReviews.module.css";
import axios from "axios";

const options = {
  headers: {
    Authorization: import.meta.env.VITE_TMDB_TOKEN,
  },
};

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
          options
        );
        setReviews(res.data.results);
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available</p>;

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.item}>
          <p><strong>{review.author}</strong></p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;