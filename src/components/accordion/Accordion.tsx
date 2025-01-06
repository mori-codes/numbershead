type Props = {
  title: string
  children: React.ReactNode
}
const Accordion = ({ title, children }: Props) => {
  return (
    <details>
      <summary>{title}</summary>
      {children}
    </details>
  )
}
export { Accordion }
