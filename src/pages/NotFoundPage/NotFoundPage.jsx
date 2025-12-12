import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <Link to="/" className={styles.link}>
        Ana sayfaya dön
      </Link>
    </div>
  );
}

export default NotFoundPage;