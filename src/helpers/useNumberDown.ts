import { useEffect } from "react"
import { useAudioContext } from "./useAudio"

const useNumberDown = (
  onNumberInput: (number: string) => void,
  onBackspace: () => void
) => {
  const { playSound } = useAudioContext()
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!isNaN(parseInt(event.key))) {
        playSound("keystroke")
        onNumberInput(event.key)
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        playSound("keystroke")
        onBackspace()
      }
    }
    window.addEventListener("keydown", handleKeydown)

    return () => window.removeEventListener("keydown", handleKeydown)
  }, [onBackspace, onNumberInput, playSound])
}

export { useNumberDown }
