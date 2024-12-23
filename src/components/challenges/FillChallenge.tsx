import { useEffect, useState } from "react"
import styles from "./Challenge.module.css"
import { useNumberDown } from "../../helpers/useNumberDown"
import { regenerateNumber } from "../../helpers/regenerateNumber"
import { Check } from "../icons/Check"
import { Close } from "../icons/Close"

type Props = {
  question: string
  index: number
  groups: Array<
    | {
        type: "blank"
        value: Array<[order: number, position: number]>
      }
    | { type: "numbers"; value: string }
  >
  check: (value: string) => boolean
  onSuccess: () => void
  onSkip: () => void
}
const FillChallenge = ({
  question,
  index,
  groups,
  check,
  onSuccess,
  onSkip,
}: Props) => {
  const [solution, setSolution] = useState("")
  const [correct, setCorrect] = useState<boolean | undefined>(undefined)
  const maxBlank = groups.reduce(
    (acc, group) => (group.type === "blank" ? acc + group.value.length : acc),
    0
  )

  useNumberDown(
    (number) => {
      setSolution((prev) => (maxBlank > prev.length ? prev + number : prev))
    },
    () => {
      if (!correct) {
        setSolution((prev) => prev.slice(0, prev.length - 1))
        if (correct === false) {
          setCorrect(undefined)
        }
      }
    }
  )

  useEffect(() => {
    if (solution.length === maxBlank) {
      const result = check(regenerateNumber(groups, solution))
      setCorrect(result)

      if (result) {
        onSuccess()
      }
    }
  }, [check, groups, maxBlank, onSuccess, solution])

  const CorrectIcon = correct ? Check : Close

  return (
    <div>
      <div className={styles.header}>
        <p>
          {index + 1}. {question}
        </p>
        <button onClick={onSkip}>Skip</button>
      </div>
      <div className={`${styles.numbers} ${correct ? styles.correct : ""}`}>
        {groups.map((group, index) => {
          switch (group.type) {
            case "numbers":
              return <span key={index}>{group.value}</span>
            case "blank":
              return (
                <div key={index} className={styles["blank-group"]}>
                  {group.value.map(([blankOrder, blankPosition]) => {
                    return (
                      <span className={styles.blank} key={blankPosition}>
                        {solution[blankOrder] ?? "_"}
                      </span>
                    )
                  })}
                </div>
              )
          }
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
  )
}
export { FillChallenge }
