import styles from "./Challenge.module.css"

const LoadingChallenge = () => {
  return (
    <div className={`${styles.container} ${styles["loading-text"]}`}>
      Your challenge is loading, get ready!
      <div className={styles.skeleton} />
    </div>
  )
}
export { LoadingChallenge }
