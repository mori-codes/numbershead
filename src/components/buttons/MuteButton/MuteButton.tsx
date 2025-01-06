import { useAudioContext } from "../../../helpers/useAudio"
import styles from "./MutteButton.module.css"

const MuteButton = () => {
  const { muted, setMuted } = useAudioContext()
  return (
    <button
      onClick={() => setMuted(!muted)}
      className={styles.button}
      aria-label="Mute sound effects"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
        <path d="M16 9a5 5 0 0 1 0 6" />
        {!muted ? (
          <line x1="2" y1="2.2" x2="20" y2="20">
            <animate
              calcMode="spline"
              keySplines="0.1 0.8 0.2 1;"
              fill="freeze"
              ref={(elem: SVGAnimateElement) => elem && elem.beginElement()}
              key="ma1"
              attributeName="x1"
              values="2;10"
              dur="0.2s"
            />
            <animate
              calcMode="spline"
              keySplines="0.1 0.8 0.2 1;"
              fill="freeze"
              ref={(elem: SVGAnimateElement) => elem && elem.beginElement()}
              key="ma2"
              attributeName="y1"
              values="2.2;10"
              dur="0.2s"
            />
            <animate
              calcMode="spline"
              keySplines="0.1 0.8 0.2 1;"
              fill="freeze"
              ref={(elem: SVGAnimateElement) => elem && elem.beginElement()}
              key="ma3"
              attributeName="x2"
              values="20;10"
              dur="0.2s"
            />
            <animate
              calcMode="spline"
              keySplines="0.1 0.8 0.2 1;"
              fill="freeze"
              ref={(elem: SVGAnimateElement) => elem && elem.beginElement()}
              key="ma4"
              attributeName="y2"
              values="20;10"
              dur="0.2s"
            />
          </line>
        ) : (
          <line x1="2" y1="2.2" x2="20" y2="20">
            <animate
              calcMode="spline"
              keySplines="0.1 0.8 0.2 1;"
              fill="freeze"
              ref={(elem: SVGAnimateElement) => elem && elem.beginElement()}
              key="a1"
              attributeName="x1"
              values="10;2"
              dur="0.2s"
            />
            <animate
              calcMode="spline"
              keySplines="0.1 0.8 0.2 1;"
              fill="freeze"
              ref={(elem: SVGAnimateElement) => elem && elem.beginElement()}
              key="a2"
              attributeName="y1"
              values="10;2.2"
              dur="0.2s"
            />
            <animate
              calcMode="spline"
              keySplines="0.1 0.8 0.2 1;"
              fill="freeze"
              ref={(elem: SVGAnimateElement) => elem && elem.beginElement()}
              key="a3"
              attributeName="x2"
              values="10;20"
              dur="0.2s"
            />
            <animate
              calcMode="spline"
              keySplines="0.1 0.8 0.2 1;"
              fill="freeze"
              ref={(elem: SVGAnimateElement) => elem && elem.beginElement()}
              key="a4"
              attributeName="y2"
              values="10;20"
              dur="0.2s"
            />
          </line>
        )}
        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
      </svg>
    </button>
  )
}

export { MuteButton }
