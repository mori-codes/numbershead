import { Link } from "@tanstack/react-router"
import { getFormatIcon } from "../../../helpers/getFormatIcon"
import { NumberFormat } from "../../../types/storage"
import styles from "./NumberCard.module.css"
import { Close } from "../../icons/Close"

type Props = {
  id: number
  label: string
  format: NumberFormat
  number: string
  attempts: number
  deleteNumber: () => void
}

const NumberCard = ({
  id,
  label,
  format,
  number,
  attempts,
  deleteNumber,
}: Props) => {
  const Icon = getFormatIcon(format)
  return (
    <Link to={`/numbers/${id}`} className={styles.card}>
      <h3>{number}</h3>
      <div className={styles["hidden-buttons"]}>
        <button
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            deleteNumber()
          }}
        >
          <Close height={16} width={16} />
        </button>
      </div>
      <div className={styles["bottom-info"]}>
        <div>
          <Icon width={14} height={14} /> {label}
        </div>
        <span>Practiced {attempts === 1 ? "once" : `${attempts} times`}</span>
      </div>
    </Link>
  )
}
export { NumberCard }
