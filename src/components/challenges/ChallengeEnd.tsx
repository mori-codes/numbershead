import { Link } from "@tanstack/react-router"
import { NormalButton } from "../buttons"
import styles from "./ChallengeEnd.module.css"
import { useState } from "react"

type Props = {
  onReset: () => void
  skippedNumber: number
  saveName: (newName: string) => void
  attempt: number
}

// IMPORTANT: Given how the data works, attempt might be one less than the actual db one
// Need to review how to handle that

const ChallengeEnd = ({ skippedNumber, onReset, saveName, attempt }: Props) => {
  const [name, setName] = useState("")
  const [saved, setSaved] = useState(false)

  const completedLabel =
    attempt === 0 ? (
      <p>This is your first time! Give a name to this number to remember it</p>
    ) : (
      <p>
        You practiced this number <strong>{attempt + 1}</strong> times
      </p>
    )
  return (
    <div className={styles["card"]}>
      <div className={styles["card-main"]}>
        <h6>
          {skippedNumber === 0
            ? "You completed the practice!"
            : "End of the practice"}
        </h6>
        {skippedNumber === 0 ? (
          completedLabel
        ) : (
          <p>
            Looks like you skipped some questions, <br/> try to answer all of them!
          </p>
        )}

        {attempt === 0 ? (
          <div className={styles["input-container"]}>
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setSaved((prev) => (!prev ? prev : !prev))
              }}
            />
            <NormalButton
              label={saved ? "Saved" : "Save"}
              disabled={saved}
              onClick={() => {
                saveName(name)
                setSaved(true)
              }}
            />
          </div>
        ) : null}
      </div>
      <div className={styles["button-container"]}>
        <NormalButton onClick={onReset} label="Try again" />
        <Link to="/">Go Home</Link>
      </div>
    </div>
  )
}
export { ChallengeEnd }
