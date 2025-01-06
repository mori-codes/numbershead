import { Link } from "@tanstack/react-router"
import styles from "./Challenge.module.css"

const InvalidChallenge = () => {
  return (
    <div className={styles.container} style={{ textAlign: "center" }}>
      Sorry, but the number you are trying to reach no longer exists :(
      <Link to="/" className={styles["normal-link"]}>
        Go Back Home
      </Link>
    </div>
  )
}

export { InvalidChallenge }
