type Props = {
  value: string
  onChange: (newValue: string) => void
}

const NumberInput = ({ value, onChange }: Props) => {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="666555777 or 444-333-444"
    />
  )
}

export { NumberInput }
