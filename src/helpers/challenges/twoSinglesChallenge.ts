import { generateRandomIndex } from "../generateRandomIndex"
import { getFillGroup } from "../getFillGroup"
import { sortNumbers } from "../sortNumbers"

const twoSinglesChallenge = (number: string) => {
  let randomIndex1 = generateRandomIndex(number.length)

  while (number[randomIndex1] === "-") {
    randomIndex1 = generateRandomIndex(number.length)
  }

  let randomIndex2 = generateRandomIndex(number.length)

  while (number[randomIndex2] === "-" || randomIndex2 === randomIndex1) {
    randomIndex2 = generateRandomIndex(number.length)
  }

  return getFillGroup(number, [randomIndex1, randomIndex2].sort(sortNumbers))
}

export { twoSinglesChallenge }
