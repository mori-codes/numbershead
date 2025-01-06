import { generateRandomIndex } from "../generateRandomIndex"
import { getFillGroup } from "../getFillGroup"

const sectionChallenges = (number: string) => {
  // Sections would be decided by the "-" character, if none, then divide by 3
  if (number.includes("-")) {
    const groups = []
    // Get subsection aprox corresponding to - division
    const hyphensGroups = number.split("-")
    let previousCharacters = 0

    for (const numbers of hyphensGroups) {
      if (numbers.length < 4) {
        groups.push(
          getFillGroup(
            number,
            Array.from(
              { length: numbers.length },
              (_, i) => i + previousCharacters
            )
          )
        )

        previousCharacters += numbers.length + 1
      }
    }

    return groups
  } else {
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
        indexesArray1.push(misteryLength * randomIndex1 + i)
        indexesArray2.push(misteryLength * randomIndex2 + i)
      }

      return [
        getFillGroup(number, indexesArray1),
        getFillGroup(number, indexesArray2),
      ]
    }

    return []
  }
}

export { sectionChallenges }
