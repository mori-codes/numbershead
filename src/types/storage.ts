const formats = ["phone", "zip", "pin", "any"] as const

type NumberFormat = (typeof formats)[number]

export { formats }
export type { NumberFormat }
