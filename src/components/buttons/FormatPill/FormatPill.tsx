import { getFormatIcon } from "../../../helpers/getFormatIcon"
import { getFormatLabel } from "../../../helpers/getFormatLabel"
import { NumberFormat } from "../../../types/storage"
import styles from "./FormatPill.module.css"

type Props = {
  format: NumberFormat
  selected: boolean
  onClick: (format: NumberFormat) => void
}
const FormatPill = ({ format, selected, onClick }: Props) => {
  const Icon = getFormatIcon(format)

  return (
    <button
      onClick={() => onClick(format)}
      className={`${styles["format-button"]} ${selected ? styles["selected-format-button"] : ""}`}
    >
      <Icon width={16} height={16} /> <span>{getFormatLabel(format)}</span>
    </button>
  )
}
export { FormatPill }
