import { Accordion } from "../../components/accordion"
import styles from "./About.module.css"

const About = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["inner-container"]}>
        <Accordion title="Is this page safe?">
          All of your data is stored locally on your device/browser. Any
          knowledgeable person can obtain the numbers you have stored on this
          app if they have access to your system. Avoid storing sensitive
          information and specially do not run scripts that you don't understand
          while using this site.
        </Accordion>
        <Accordion title="Am I sending any personal info to a server?">
          No, as said before all of your numbers are stored in your device.
          There is no way for the developer or any other actor to obtain this
          data externally. In any case, the source code of this project is open
          if you want to verify:{" "}
          <a href="https://github.com/mori-codes/numbershead">
            Link to the project
          </a>
        </Accordion>
        <Accordion title="Credits">
          <ul>
            <li>
              Chime 0005.wav by radian -- https://freesound.org/s/62980/ --
              License: Attribution 3.0
            </li>
          </ul>
        </Accordion>
      </div>
    </div>
  )
}
export { About }
