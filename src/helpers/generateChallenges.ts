import { allButTwoChallenge } from "./challenges/allButTwoChallenge"
import { mathChallenges } from "./challenges/mathChallenges"
import { sectionChallenges } from "./challenges/sectionChallenges"
import { twoSinglesChallenge } from "./challenges/twoSinglesChallenge"
import { getFillGroup } from "./getFillGroup"

type CommonChallenge = {
  question: string
  check: (result: string) => boolean
}

type MathChallenge = CommonChallenge & {
  type: "math"
  solutionLength: number
}

type FillChallenge = CommonChallenge & {
  type: "fill"
  groups: Array<
    | {
        type: "blank"
        value: Array<[order: number, position: number]>
      }
    | { type: "numbers"; value: string }
  >
}

type Challenge = MathChallenge | FillChallenge

const generateChallenges = (number: string) => {
  const challenges: Array<Challenge> = []
  // Two random 1 character challenge EASY --------------------------------------
  for (let i = 0; i < 3; i++) {
    challenges.push({
      type: "fill",
      question: "Fill the gaps",
      check: (result) => result === number,
      groups: twoSinglesChallenge(number),
    })
  }

  sectionChallenges(number)?.forEach((groups) => {
    challenges.push({
      type: "fill",
      question: "Fill the gaps",
      check: (result) => result === number,
      groups: groups,
    })
  })

  // Math problems (MEDIUM)
  challenges.push(...mathChallenges(number))

  // ALL except a couple indexes (HARD)----------------------------------------
  for (let i = 0; i < 2; i++) {
    challenges.push({
      type: "fill",
      question: "Fill the gaps",
      check: (result) => result === number,
      groups: allButTwoChallenge(number),
    })
  }

  // ALL Final ---------------------------------------------------------------------
  const indexesArray: Array<number> = []

  for (let i = 0; i < number.length; i++) {
    if (number[i] !== "-") {
      indexesArray.push(i)
    }
  }

  challenges.push({
    type: "fill",
    question: "Fill the gaps",
    check: (result) => result === number,
    groups: getFillGroup(number, indexesArray),
  })

  return challenges
}

export { generateChallenges }
