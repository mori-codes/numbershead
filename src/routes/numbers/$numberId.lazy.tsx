import { createLazyFileRoute } from "@tanstack/react-router"
import { Challenge } from "../../pages/Challenge/Challenge"
import { useNumber } from "../../data/numbers.hooks"
import { InvalidChallenge } from "../../pages/Challenge/InvalidChallenge"
import { LoadingChallenge } from "../../pages/Challenge/LoadingChallenge"

const ChallengePageWrapper = () => {
  const { numberId } = Route.useParams()

  const { data, error, refetchData } = useNumber(Number(numberId))

  if (error) {
    return <InvalidChallenge />
  }

  if (!data) {
    return <LoadingChallenge />
  }

  return <Challenge number={data} refetchNumber={refetchData} />
}

export const Route = createLazyFileRoute("/numbers/$numberId")({
  component: ChallengePageWrapper,
})
