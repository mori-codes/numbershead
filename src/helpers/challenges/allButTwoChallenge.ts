import { generateRandomIndex } from "../generateRandomIndex"
import { getFillGroup } from "../getFillGroup"

const allButTwoChallenge = (number: string) => {
    let randomIndex1 = generateRandomIndex(number.length)

    while (number[randomIndex1] === "-") {
      randomIndex1 = generateRandomIndex(number.length)
    }
  
    let randomIndex2 = generateRandomIndex(number.length)
  
    while (number[randomIndex2] === "-" || randomIndex2 === randomIndex1) {
      randomIndex2 = generateRandomIndex(number.length)
    }

  const exceptOneIndexes: Array<number> = []

  for (let i = 0; i < number.length; i++) {
    if (i !== randomIndex1 && i !== randomIndex2 && number[i] !== "-") {
      exceptOneIndexes.push(i)
    }
  }

  return getFillGroup(number, exceptOneIndexes)
}

export { allButTwoChallenge }
