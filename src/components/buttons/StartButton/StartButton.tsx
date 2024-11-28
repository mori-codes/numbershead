import { Link } from "@tanstack/react-router"
import styles from "./StartButton.module.css"
import { Add } from "../../icons/Add"

type Props = {
  to: string
}

const StartButton = ({ to }: Props) => {
  return (
    <Link to={to} className={styles["start-button"]}>
      <Add strokeWidth={2} width={32} height={32}/>
      Study new number
    </Link>
  )
}
export { StartButton }
