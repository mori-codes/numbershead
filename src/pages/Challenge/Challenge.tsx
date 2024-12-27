import { z } from "zod"
import { StoredNumber } from "../../types/storage"
import { useRef, useState } from "react"
import { generateChallenges } from "../../helpers/generateChallenges"
import { ChallengeDisplay, ChallengeEnd } from "../../components/challenges"
import styles from "./Challenge.module.css"
import { useUpdateNumber } from "../../data/numbers.hooks"
import { useAudioContext } from "../../helpers/useAudio"

type Props = {
  number: z.infer<typeof StoredNumber>
  refetchNumber: () => void
}

const Challenge = ({ number, refetchNumber }: Props) => {
  const { number: numbers } = number
  const challenges = useRef(generateChallenges(numbers))
  const [currentChallenge, setCurrentChallenge] = useState(-1)
  const [skips, setSkips] = useState(0)

  const { updateNumber } = useUpdateNumber()
  const { playSound } = useAudioContext()

  const advanceChallenge = () => {
    setTimeout(() => setCurrentChallenge((prev) => prev + 1), 500)
    playSound("chime")

    if (currentChallenge >= challenges.current.length - 1) {
      updateNumber(number.id, { attempts: number.attempts + 1 })
    }
  }

  const skipChallenge = () => {
    setCurrentChallenge((prev) => prev + 1)
    setSkips((prev) => prev + 1)
  }

  const resetChallenge = () => {
    refetchNumber()
    setCurrentChallenge(-1)
    setSkips(0)
    challenges.current = generateChallenges(numbers)
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
    return (
      <div className={styles.container}>
        <ChallengeEnd
          skippedNumber={skips}
          onReset={resetChallenge}
          attempt={number.attempts}
          saveName={(name) => updateNumber(number.id, { label: name })}
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <ChallengeDisplay
        key={currentChallenge}
        challenge={challenges.current[currentChallenge]}
        index={currentChallenge}
        onSkip={skipChallenge}
        onSuccess={advanceChallenge}
      />
    </div>
  )
}
export { Challenge }
