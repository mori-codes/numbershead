import { useState } from "react"
import { FormatPill } from "../../components/buttons/FormatPill/FormatPill"
import { formats, NumberFormat } from "../../types/storage"
import styles from "./Create.module.css"
import { NumberInput } from "../../components/inputs/NumberInput/NumberInput"

const Create = () => {
  const [selectedFormat, setSelectedFormat] = useState<NumberFormat>("phone")
  const [number, setNumber] = useState("")

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>What do you want to remember?</h2>
        <div className={styles["chips-container"]}>
          {formats.map((format) => (
            <FormatPill
              key={format}
              format={format}
              selected={selectedFormat === format}
              onClick={(format) => setSelectedFormat(format)}
            />
          ))}
        </div>
        <div className={styles["input-container"]}>
          <NumberInput value={number} onChange={setNumber} />
        </div>
      </div>
    </div>
  )
}
export { Create }
