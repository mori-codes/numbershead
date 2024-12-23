import { useEffect } from "react"

const useNumberDown = (
  onNumberInput: (number: string) => void,
  onBackspace: () => void
) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!isNaN(parseInt(event.key))) {
        onNumberInput(event.key)
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        onBackspace()
      }
    }
    window.addEventListener("keydown", handleKeydown)

    return () => window.removeEventListener("keydown", handleKeydown)
  }, [onBackspace, onNumberInput])
}

export { useNumberDown }
