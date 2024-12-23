import { generateRandomIndex } from "./generateRandomIndex"
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

const sortIndexFunction = (a: number, b: number) => a - b

const generateChallenges = (number: string) => {
  const challenges: Array<Challenge> = []
  if (number.includes("-")) {
    return challenges
  }

  // Two random 1 character challenge EASY --------------------------------------
  for (let i = 0; i < 3; i++) {
    const randomIndex1 = generateRandomIndex(number.length)
    let randomIndex2 = generateRandomIndex(number.length)

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = generateRandomIndex(number.length)
    }

    const singleBlankGroups = getFillGroup(
      number,
      [randomIndex1, randomIndex2].sort(sortIndexFunction)
    )

    challenges.push({
      type: "fill",
      question: "Fill the gaps",
      check: (result) => result === number,
      groups: singleBlankGroups,
    })
  }

  if (number.length >= 6) {
    // Get subsection aprox a third of the number length --------------------------
    const misteryLength = Math.floor(number.length / 3)
    const randomIndex1 = generateRandomIndex(3)
    let randomIndex2 = generateRandomIndex(3)

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = generateRandomIndex(3)
    }

    const indexesArray1: Array<number> = []
    const indexesArray2: Array<number> = []

    for (let i = 0; i < misteryLength; i++) {
      indexesArray1.push(3 * randomIndex1 + i)
      indexesArray2.push(3 * randomIndex2 + i)
    }

    challenges.push({
      type: "fill",
      question: "Fill the gaps",
      check: (result) => result === number,
      groups: getFillGroup(number, indexesArray1),
    })

    challenges.push({
      type: "fill",
      question: "Fill the gaps",
      check: (result) => result === number,
      groups: getFillGroup(number, indexesArray2),
    })
  }

  // MATH ones should be here (MEDIUM)---------------------------------
  let smallestNumber = 9
  let biggestNumber = 0
  const nonAppearingNumbers: Record<number, boolean> = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  }
  let sum = 0

  for (const digit of number) {
    const intDigit = parseInt(digit)
    if (intDigit < smallestNumber) {
      smallestNumber = intDigit
    }
    if (intDigit > biggestNumber) {
      biggestNumber = intDigit
    }

    nonAppearingNumbers[intDigit] = true
    sum += intDigit
  }

  challenges.push({
    type: "math",
    question: "Biggest digit?",
    check: (result) => result === biggestNumber.toString(),
    solutionLength: 1,
  })

  challenges.push({
    type: "math",
    question: "Smallest digit?",
    check: (result) => result === smallestNumber.toString(),
    solutionLength: 1,
  })

  const notUsedDigits = Object.entries(nonAppearingNumbers)
    .filter(([, value]) => !value)
    .map(([digit]) => digit)
  if (notUsedDigits.length) {
    challenges.push({
      type: "math",
      question: "Which digits are not being used?",
      check: (result) => {
        if (result.length !== notUsedDigits.length) {
          return false
        }

        for (const digit of result) {
          if (nonAppearingNumbers[parseInt(digit)]) {
            return false
          }
        }

        return true
      },
      solutionLength: notUsedDigits.length,
    })
  }

  challenges.push({
    type: "math",
    question: "Sum of all the digits?",
    check: (result) => result === sum.toString(),
    solutionLength: sum.toString().length,
  })

  // ALL except a couple indexes (HARD)----------------------------------------
  for (let i = 0; i < 2; i++) {
    const randomIndex1 = generateRandomIndex(number.length)
    let randomIndex2 = generateRandomIndex(number.length)

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = generateRandomIndex(number.length)
    }

    const exceptOneIndexes: Array<number> = []

    for (let i = 0; i < number.length; i++) {
      if (i !== randomIndex1 && i !== randomIndex2) {
        exceptOneIndexes.push(i)
      }
    }

    challenges.push({
      type: "fill",
      question: "Fill the gaps",
      check: (result) => result === number,
      groups: getFillGroup(number, exceptOneIndexes),
    })
  }

  // ALL Final ---------------------------------------------------------------------
  const indexesArray: Array<number> = []

  for (let i = 0; i < number.length; i++) {
    indexesArray.push(i)
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
