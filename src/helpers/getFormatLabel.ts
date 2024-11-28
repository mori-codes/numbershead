import { NumberFormat } from "../types/storage"

const getFormatLabel = (format: NumberFormat) => {
  switch (format) {
    case "phone":
      return "Phone Number"
    case "pin":
      return "PIN"
    case "zip":
      return "ZIP Code"
    case "any":
      return "Any"
  }
}

export { getFormatLabel }
