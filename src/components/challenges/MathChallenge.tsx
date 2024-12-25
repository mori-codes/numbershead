import { useCallback, useEffect, useState } from "react"
import { useNumberDown } from "../../helpers/useNumberDown"
import { Check } from "../icons/Check"
import { Close } from "../icons/Close"
import styles from "./Challenge.module.css"
import { useDeviceInfo } from "../../helpers/useDeviceInfo"
import { Numberpad } from "../numberpad"

type Props = {
  question: string
  index: number
  solutionLength: number
  check: (value: string) => boolean
  onSuccess: () => void
  onSkip: () => void
}
const MathChallenge = ({
  question,
  index,
  solutionLength,
  check,
  onSkip,
  onSuccess,
}: Props) => {
  const { isMobile } = useDeviceInfo()
  const [solution, setSolution] = useState("")
  const [correct, setCorrect] = useState<boolean | undefined>(undefined)

  const addNumber = useCallback(
    (number: string) => {
      setSolution((prev) =>
        solutionLength > prev.length ? prev + number : prev
      )
    },
    [solutionLength]
  )

  const removeNumber = useCallback(() => {
    if (!correct) {
      setSolution((prev) => prev.slice(0, prev.length - 1))
      if (correct === false) {
        setCorrect(undefined)
      }
    }
  }, [correct])

  useNumberDown(addNumber, removeNumber)

  useEffect(() => {
    if (solution.length === solutionLength) {
      const result = check(solution)
      setCorrect(result)

      if (result) {
        onSuccess()
      }
    }
  }, [check, onSuccess, solution, solutionLength])

  const CorrectIcon = correct ? Check : Close

  return (
    <div className={styles["challenge-container"]}>
      <div className={styles["top-part"]}>
        <div className={styles.header}>
          <p>
            {index + 1}. {question}
          </p>
          {isMobile ? null : <button onClick={onSkip}>Skip</button>}
        </div>
        <div
          className={`${styles.numbers} ${styles["blank-group"]} ${correct ? styles.correct : ""}`}
        >
          {new Array(solutionLength).fill(undefined).map((_, index) => {
            return (
              <span className={styles.blank} key={index}>
                {solution[index] !== undefined ? solution[index] : "_"}
              </span>
            )
          })}
        </div>
        <div
          className={`${styles["result-icon-container"]} ${correct ? styles.correct : ""}`}
        >
          {correct !== undefined ? (
            <CorrectIcon height={48} width={48} strokeWidth={2} />
          ) : null}
        </div>
      </div>

      <div className={styles["numpad"]}>
        {isMobile ? (
          <Numberpad
            onButtonPress={addNumber}
            onDelete={removeNumber}
            onSkip={onSkip}
          />
        ) : null}
      </div>
    </div>
  )
}
export { MathChallenge }
