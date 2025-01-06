const mathChallenges = (number: string) => {
  const challenges = []
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

  const onlyDigits = Array.from(number)
    .filter((digit) => digit !== "-")
    .join("")

  for (const digit of onlyDigits) {
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
    type: "math" as const,
    question: "Biggest digit?",
    check: (result: string) => result === biggestNumber.toString(),
    solutionLength: 1,
  })

  challenges.push({
    type: "math" as const,
    question: "Smallest digit?",
    check: (result: string) => result === smallestNumber.toString(),
    solutionLength: 1,
  })

  const notUsedDigits = Object.entries(nonAppearingNumbers)
    .filter(([, value]) => !value)
    .map(([digit]) => digit)
  if (notUsedDigits.length) {
    challenges.push({
      type: "math" as const,
      question: "Which digits are not being used?",
      check: (result: string) => {
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
    type: "math" as const,
    question: "Sum of all the digits?",
    check: (result: string) => result === sum.toString(),
    solutionLength: sum.toString().length,
  })

  return challenges
}

export { mathChallenges }
