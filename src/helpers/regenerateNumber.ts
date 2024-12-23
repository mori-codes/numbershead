const regenerateNumber = (
  groups: Array<
    | {
        type: "blank"
        value: Array<[order: number, position: number]>
      }
    | { type: "numbers"; value: string }
  >,
  solution: string
) => {
  let finalNumber = ""
  for (const group of groups) {
    if (group.type === "blank") {
        for (const [order] of group.value){
            finalNumber += solution[order]
        }
    }
    else {
        finalNumber += group.value
    }
  }

  return finalNumber
}

export { regenerateNumber }
