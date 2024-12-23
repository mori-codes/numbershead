import { z } from "zod"

const formats = ["phone", "zip", "pin", "any"] as const

type NumberFormat = (typeof formats)[number]

const StoredNumber = z.object({
  id: z.number(),
  format: z.enum(formats),
  label: z.string().optional(),
  number: z.string(),
  attempts: z.number(),
})

export { formats, StoredNumber }
export type { NumberFormat }
