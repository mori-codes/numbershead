import styles from "./NormalButton.module.css"

type Props = {
  onClick: () => void
  label: string
  disabled?: boolean
}
const NormalButton = ({ onClick, disabled, label }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles["normal-button"]}
    >
      {label}
    </button>
  )
}
export { NormalButton }
