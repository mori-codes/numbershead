import { Lock, Map, Number, Phone } from "../components/icons"
import { NumberFormat } from "../types/storage"

const getFormatIcon = (format: NumberFormat) => {
  switch (format) {
    case "phone":
      return Phone
    case "pin":
      return Lock
    case "zip":
      return Map
    case "any":
      return Number
  }
}

export { getFormatIcon }
