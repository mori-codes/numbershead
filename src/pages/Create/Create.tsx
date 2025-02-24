import { useState } from "react"
import { FormatPill } from "../../components/buttons/FormatPill/FormatPill"
import { formats, NumberFormat } from "../../types/storage"
import styles from "./Create.module.css"
import { NumberInput } from "../../components/inputs/NumberInput/NumberInput"
import { NormalButton } from "../../components/buttons"
import { useAddNumber } from "../../data/numbers.hooks"
import { useNavigate } from "@tanstack/react-router"

const Create = () => {
  const [selectedFormat, setSelectedFormat] = useState<NumberFormat>("phone")
  const [number, setNumber] = useState("")
  const { addNumber } = useAddNumber()
  const navigate = useNavigate()

  const disabled = number.length < 3 || number.length > 20

  const handleCreateNumber = async () => {
    if (disabled) {
      return
    }

    const key = await addNumber({
      attempts: 0,
      format: selectedFormat,
      number,
    })

    if (key) {
      navigate({
        to: `/numbers/$numberId`,
        params: { numberId: `${key.result}` },
      })
    }
  }

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
          <NumberInput
            value={number}
            onChange={setNumber}
            onSubmit={handleCreateNumber}
            autoFocus
            censorNumber={selectedFormat === "pin"}
          />
        </div>
        <div className={styles["bottom-section"]}>
          <NormalButton
            onClick={handleCreateNumber}
            label="Start"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}
export { Create }
