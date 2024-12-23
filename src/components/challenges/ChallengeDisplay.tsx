import { generateChallenges } from "../../helpers/generateChallenges"
import { FillChallenge } from "./FillChallenge"
import { MathChallenge } from "./MathChallenge"

type Challenge = ReturnType<typeof generateChallenges>[number]

type Props = {
  index: number
  challenge: Challenge
  onSuccess: () => void
  onSkip: () => void
}
const ChallengeDisplay = ({ index, challenge, onSuccess, onSkip }: Props) => {
  switch (challenge.type) {
    case "fill":
      return (
        <FillChallenge
          groups={challenge.groups}
          question={challenge.question}
          index={index}
          check={challenge.check}
          onSuccess={onSuccess}
          onSkip={onSkip}
        />
      )
    case "math":
      return (
        <MathChallenge
          question={challenge.question}
          index={index}
          solutionLength={challenge.solutionLength}
          check={challenge.check}
          onSuccess={onSuccess}
          onSkip={onSkip}
        />
      )
  }
  return <div>ChallengeDisplay</div>
}
export { ChallengeDisplay }
