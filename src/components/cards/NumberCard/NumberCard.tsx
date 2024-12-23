import { Link } from "@tanstack/react-router"
import { getFormatIcon } from "../../../helpers/getFormatIcon"
import { NumberFormat } from "../../../types/storage"
import styles from "./NumberCard.module.css"

type Props = {
  id: number
  label: string
  format: NumberFormat
  number: string
  attempts: number
}

const NumberCard = ({ id, label, format, number, attempts }: Props) => {
  const Icon = getFormatIcon(format)
  return (
    <Link to={`/numbers/${id}`} className={styles.card}>
      <h3>{number}</h3>
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
