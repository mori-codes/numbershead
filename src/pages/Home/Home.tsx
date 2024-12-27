import { StartButton } from "../../components/buttons"
import { NumberCard } from "../../components/cards/NumberCard/NumberCard"
import { useAllNumbers, useDeleteNumber } from "../../data/numbers.hooks"
import { getFormatLabel } from "../../helpers/getFormatLabel"
import styles from "./Home.module.css"

const Home = () => {
  const { data, refetchData } = useAllNumbers()
  const { deleteNumber } = useDeleteNumber()

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <StartButton to="/new" />
        <div className={styles["saved-numbers"]}>
          {data
            ? data.map((storedNumber) => (
                <NumberCard
                  key={storedNumber.id}
                  id={storedNumber.id}
                  label={
                    storedNumber.label ?? getFormatLabel(storedNumber.format)
                  }
                  format={storedNumber.format}
                  number={storedNumber.number}
                  attempts={storedNumber.attempts}
                  deleteNumber={() => {
                    deleteNumber(storedNumber.id)
                    refetchData()
                  }}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  )
}
export { Home }
