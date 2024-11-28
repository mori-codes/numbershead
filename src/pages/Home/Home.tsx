import { StartButton } from "../../components/buttons"
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <StartButton to="/new" />
      </div>
    </div>
  )
}
export { Home }
