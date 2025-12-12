import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>"Sorry, the page you are looking for was not found."</p>
      <Link to="/" className={styles.link}>
        Go back to homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;