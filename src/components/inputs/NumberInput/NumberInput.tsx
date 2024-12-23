type Props = {
  value: string
  onChange: (newValue: string) => void
}

const parseInputValue = (value: string) => {
  let finalValue = ""

  for (const character of value) {
    if (!isNaN(parseInt(character))) {
      finalValue += character
    }

    if (character === "-" && finalValue[finalValue.length - 1] !== "-") {
      finalValue += character
    }
  }

  return finalValue
}

const NumberInput = ({ value, onChange }: Props) => {
  return (
    <input
      value={value}
      onChange={(event) => onChange(parseInputValue(event.target.value))}
      placeholder="666555777 or 444-333"
    />
  )
}

export { NumberInput }
