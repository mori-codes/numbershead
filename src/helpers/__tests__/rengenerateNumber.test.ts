import { expect, test } from "vitest"
import { regenerateNumber } from "../regenerateNumber"

type Groups = Array<
  | {
      type: "blank"
      value: Array<[order: number, position: number]>
    }
  | { type: "numbers"; value: string }
>

test("Should regenerate numbers with no blanks", () => {
  const groups: Groups = [{ type: "numbers", value: "555994432" }]
  const result = regenerateNumber(groups, "")

  expect(result).toEqual(groups[0].value)
})

test("Should regenerate numbers with a single blank", () => {
  const groups: Groups = [
    { type: "numbers", value: "555" },
    { type: "blank", value: [[0, 3]] },
    { type: "numbers", value: "94432" },
  ]
  const result = regenerateNumber(groups, "9")

  expect(result).toEqual("555994432")
})

test("Should regenerate a number with full blanks", () => {
  const groups: Groups = [
    {
      type: "blank",
      value: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7],
        [8, 8],
      ],
    },
  ]
  const solution = "555994432"
  const result = regenerateNumber(groups, "555994432")

  expect(result).toEqual(solution)
})
