import { z } from "zod"
import { StoredNumber } from "../../types/storage"
import { useRef, useState } from "react"
import { generateChallenges } from "../../helpers/generateChallenges"
import { ChallengeDisplay } from "../../components/challenges"
import styles from "./Challenge.module.css"

type Props = {
  number: z.infer<typeof StoredNumber>
}

const Challenge = ({ number }: Props) => {
  const { number: numbers } = number
  const challenges = useRef(generateChallenges(numbers))
  const [currentChallenge, setCurrentChallenge] = useState(-1)

  const advanceChallenge = () => {
    setTimeout(() => setCurrentChallenge((prev) => prev + 1), 500)
  }

  if (currentChallenge === -1) {
    return (
      <div
        className={styles.container}
        style={{ cursor: "pointer" }}
        onClick={() => setCurrentChallenge(0)}
      >
        Click on the screen to continue
      </div>
    )
  }

  if (currentChallenge === challenges.current.length) {
    return <div>you won!</div>
  }

  return (
    <div className={styles.container}>
      <ChallengeDisplay
        key={currentChallenge}
        challenge={challenges.current[currentChallenge]}
        index={currentChallenge}
        onSkip={advanceChallenge}
        onSuccess={advanceChallenge}
      />
    </div>
  )
}
export { Challenge }
