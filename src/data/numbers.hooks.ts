import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { NumbersDBContext } from "./NumbersDBProvider"
import { StoredNumber } from "../types/storage"
import { z } from "zod"

type SNumber = z.infer<typeof StoredNumber>

const useAllNumbers = () => {
  const context = useContext(NumbersDBContext)

  if (!context) {
    throw new Error("Can't invoke useAllNumbers outside NumbersDBContext")
  }

  const { readAllNumbers } = context
  const runningQuery = useRef(false)
  const [data, setData] = useState<Array<SNumber> | undefined>()
  const [error, setError] = useState<unknown | undefined>()

  useEffect(() => {
    if (!runningQuery.current) {
      runningQuery.current = true
      readAllNumbers()
        ?.then((data) => setData(data))
        .catch((exception) => setError(exception))
        .finally(() => {
          runningQuery.current = false
        })
    }
  }, [readAllNumbers])

  const refetchData = useCallback(() => {
    if (!runningQuery.current) {
      runningQuery.current = true
      readAllNumbers()
        ?.then((data) => setData(data))
        .catch((exception) => setError(exception))
        .finally(() => {
          runningQuery.current = false
        })
    }
  }, [readAllNumbers])

  return { data, error, refetchData }
}

const useAddNumber = () => {
  const context = useContext(NumbersDBContext)

  if (!context) {
    throw new Error("Can't invoke useAllNumbers outside NumbersDBContext")
  }

  const { addNumber } = context

  return { addNumber }
}

const useDeleteNumber = () => {
  const context = useContext(NumbersDBContext)

  if (!context) {
    throw new Error("Can't invoke useAllNumbers outside NumbersDBContext")
  }

  const { deleteNumber } = context

  return { deleteNumber }
}

const useNumber = (numberId: number) => {
  const context = useContext(NumbersDBContext)

  if (!context) {
    throw new Error("Can't invoke useAllNumbers outside NumbersDBContext")
  }

  const { getNumber } = context
  const runningQuery = useRef(false)
  const [data, setData] = useState<SNumber | undefined>()
  const [error, setError] = useState<unknown | undefined>()

  useEffect(() => {
    if (!runningQuery.current) {
      runningQuery.current = true
      getNumber(numberId)
        ?.then((data) => setData(data))
        .catch((exception) => setError(exception))
        .finally(() => {
          runningQuery.current = false
        })
    }
  }, [getNumber, numberId])

  const refetchData = useCallback(() => {
    if (!runningQuery.current) {
      runningQuery.current = true
      getNumber(numberId)
        ?.then((data) => setData(data))
        .catch((exception) => setError(exception))
        .finally(() => {
          runningQuery.current = false
        })
    }
  }, [getNumber, numberId])

  return { data, error, refetchData }
}

const useUpdateNumber = () => {
  const context = useContext(NumbersDBContext)

  if (!context) {
    throw new Error("Can't invoke useAllNumbers outside NumbersDBContext")
  }

  const { updateNumber } = context

  return { updateNumber }
}

export {
  useNumber,
  useAllNumbers,
  useAddNumber,
  useUpdateNumber,
  useDeleteNumber,
}
