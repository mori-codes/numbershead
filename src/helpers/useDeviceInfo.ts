import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 600

const useDeviceInfo = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    window.addEventListener("resize", checkWidth)
    checkWidth()

    return () => window.removeEventListener("resize", checkWidth)
  })

  return {
    isMobile,
  }
}

export { useDeviceInfo }
