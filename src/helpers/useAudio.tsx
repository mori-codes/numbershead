/* eslint-disable react-refresh/only-export-components */
import { createContext, use, useCallback, useEffect, useState } from "react"

type Sound = "chime" | "keystroke"

const AudioContext = createContext<{
  playSound: (sound: Sound) => void
  muted: boolean
  setMuted: (muted: boolean) => void
} | null>(null)

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [muted, setMuted] = useState(false)
  const [chimeAudio, setChimeAudio] = useState<HTMLAudioElement | undefined>()
  const [keystrokeAudio, setKeystrokeAudio] = useState<
    HTMLAudioElement | undefined
  >()

  const playSound = useCallback(
    (sound: Sound) => {
      if (muted) {
        return
      }

      switch (sound) {
        case "chime":
          {
            if (chimeAudio !== undefined) {
              chimeAudio.play()
              if (!chimeAudio.ended) {
                chimeAudio.currentTime = 0
              }
            }
          }
          break
        case "keystroke":
          {
            if (keystrokeAudio !== undefined) {
              keystrokeAudio.play()
              if (!keystrokeAudio.ended) {
                keystrokeAudio.currentTime = 0
              }
            }
          }
          break
      }
    },
    [keystrokeAudio, chimeAudio, muted]
  )

  useEffect(() => {
    setChimeAudio(new Audio("/sounds/chime.wav"))
    setKeystrokeAudio(new Audio("/sounds/keystroke.wav"))
  }, [])

  return (
    <AudioContext value={{ playSound, muted, setMuted }}>
      {children}
    </AudioContext>
  )
}

const useAudioContext = () => {
  const context = use(AudioContext)

  if (!context) {
    throw new Error("useAudioContext should be used within a AudioProvider")
  }

  return context
}

export { useAudioContext, AudioProvider }
