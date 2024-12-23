const getFillGroup = (number: string, indexes: Array<number>) => {
  const groups = []
  let nextIndex = 0
  let currentBlanks: Array<[order: number, position: number]> = []

  for (const [i, index] of Object.entries(indexes)) {
    if (nextIndex === index) {
      currentBlanks.push([parseInt(i), index])
      nextIndex = index + 1
    } else {
      // Push all blanks
      if (currentBlanks.length > 0) {
        groups.push({
          type: "blank" as const,
          value: currentBlanks,
        })
      }

      // Push numbers between the gap
      groups.push({
        type: "numbers" as const,
        value: number.slice(nextIndex, index),
      })

      // Start collecting blanks again
      currentBlanks = [[parseInt(i), index]]
      nextIndex = index + 1
    }
  }

  // Are there remaining blanks?
  if (currentBlanks.length > 0) {
    groups.push({
      type: "blank" as const,
      value: currentBlanks,
    })
  }

  // Are there remaining numbers
  if (nextIndex < number.length) {
    groups.push({
      type: "numbers" as const,
      value: number.slice(nextIndex, number.length),
    })
  }

  return groups
}

export { getFillGroup }
