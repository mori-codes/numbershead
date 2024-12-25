import { Delete } from "../icons/Delete"
import styles from "./Numberpad.module.css"

type Props = {
  onButtonPress: (number: string) => void
  onSkip: () => void
  onDelete: () => void
}
const Numberpad = ({ onButtonPress, onSkip, onDelete }: Props) => {
  return (
    <div className={styles["numberpad-container"]}>
      <button onClick={() => onButtonPress("7")}>7</button>
      <button onClick={() => onButtonPress("8")}>8</button>
      <button onClick={() => onButtonPress("9")}>9</button>
      <button onClick={() => onButtonPress("6")}>6</button>
      <button onClick={() => onButtonPress("5")}>5</button>
      <button onClick={() => onButtonPress("4")}>4</button>
      <button onClick={() => onButtonPress("3")}>3</button>
      <button onClick={() => onButtonPress("2")}>2</button>
      <button onClick={() => onButtonPress("1")}>1</button>
      <button className={styles["tiny-button"]} onClick={onSkip}>
        Skip
      </button>
      <button onClick={() => onButtonPress("0")}>0</button>
      <button className={styles["tiny-button"]} onClick={onDelete}>
        <Delete strokeWidth={2} />
      </button>
    </div>
  )
}
export { Numberpad }
