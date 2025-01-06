type Props = {
  value: string
  onChange: (newValue: string) => void
  onSubmit?: () => void
  autoFocus?: boolean
  censorNumber?: boolean
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

const NumberInput = ({
  value,
  onChange,
  onSubmit,
  autoFocus = false,
  censorNumber = false,
}: Props) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit?.()
    }
  }

  return (
    <input
      value={value}
      onKeyDown={onKeyDown}
      onChange={(event) => onChange(parseInputValue(event.target.value))}
      placeholder="666555777 or 444-333"
      autoFocus={autoFocus}
      type={censorNumber ? "password" : "text"}
    />
  )
}

export { NumberInput }
