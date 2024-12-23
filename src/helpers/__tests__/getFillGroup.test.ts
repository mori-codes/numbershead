import { expect, test } from "vitest"
import { getFillGroup } from "../getFillGroup"

const LONG_NUMBER = "555999432"

test("Should generate correctly a single blank space", () => {
  const result = getFillGroup(LONG_NUMBER, [5])

  expect(result).toStrictEqual([
    { type: "numbers", value: "55599" },
    { type: "blank", value: [[0, 5]] },
    { type: "numbers", value: "432" },
  ])
})

test("Should generate correctly multiple blank spaces", () => {
  const result = getFillGroup(LONG_NUMBER, [2, 5])

  expect(result).toStrictEqual([
    { type: "numbers", value: "55" },
    { type: "blank", value: [[0, 2]] },
    { type: "numbers", value: "99" },
    { type: "blank", value: [[1, 5]] },
    { type: "numbers", value: "432" },
  ])
})

test("Should generate correctly multiple blank spaces next to each other", () => {
  const result = getFillGroup(LONG_NUMBER, [4, 5])

  expect(result).toStrictEqual([
    { type: "numbers", value: "5559" },
    {
      type: "blank",
      value: [
        [0, 4],
        [1, 5],
      ],
    },
    { type: "numbers", value: "432" },
  ])
})

test("Should generate correctly multiple blank spaces next to each other, multiple times", () => {
  const result = getFillGroup(LONG_NUMBER, [1, 2, 4, 5])

  expect(result).toStrictEqual([
    { type: "numbers", value: "5" },
    {
      type: "blank",
      value: [
        [0, 1],
        [1, 2],
      ],
    },
    { type: "numbers", value: "9" },
    {
      type: "blank",
      value: [
        [2, 4],
        [3, 5],
      ],
    },
    { type: "numbers", value: "432" },
  ])
})

test("Should generate correctly blank spaces at the beginning and at the end of the number", () => {
  const result = getFillGroup(LONG_NUMBER, [0, 8])

  expect(result).toStrictEqual([
    { type: "blank", value: [[0, 0]] },
    { type: "numbers", value: "5599943" },
    { type: "blank", value: [[1, 8]] },
  ])
})

test("Should generate correctly a full blank number", () => {
  const result = getFillGroup(LONG_NUMBER, [0, 1, 2, 3, 4, 5, 6, 7, 8])

  expect(result).toStrictEqual([
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
  ])
})
