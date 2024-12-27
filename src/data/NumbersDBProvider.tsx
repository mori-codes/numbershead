import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { StoredNumber } from "../types/storage"
import { z } from "zod"

const DB_NAME = "numbersdb"
const OBJECT_STORE_NAME = "numbers"
const DB_VERSION = 1

type SNumber = z.infer<typeof StoredNumber>

const NumbersDBContext = createContext<{
  readAllNumbers: () => Promise<Array<SNumber>> | undefined
  addNumber: (newNumber: Omit<SNumber, "id">) => Promise<unknown> | undefined
  deleteNumber: (numberID: number) => Promise<unknown> | undefined
  getNumber: (numberId: number) => Promise<SNumber> | undefined
  updateNumber: (
    numberId: number,
    fields: Partial<Omit<SNumber, "id">>
  ) => Promise<Partial<SNumber>> | undefined
} | null>(null)

type Props = {
  children: React.ReactNode
}

const NumbersDBProvider = ({ children }: Props) => {
  const [db, setDb] = useState<IDBDatabase | null>()

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      console.error("You don't have permission to use indexDB")
    }

    request.onsuccess = () => {
      setDb(request.result)
    }

    request.onupgradeneeded = () => {
      const tempDB = request.result

      tempDB.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      })
    }
  }, [])

  const readAllNumbers = useCallback(() => {
    if (db) {
      const promise = new Promise<Array<SNumber>>((resolve, reject) => {
        const transaction = db.transaction(OBJECT_STORE_NAME, "readonly")
        const objectStore = transaction.objectStore(OBJECT_STORE_NAME)
        const request = objectStore.getAll()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request.onsuccess = (event: any) => {
          const { success, data, error } = z
            .array(StoredNumber)
            .safeParse(event.target.result)

          if (success && data !== undefined) {
            resolve(data)
          } else {
            reject(error)
          }
        }

        request.onerror = (error) => {
          reject(error)
        }
      })

      return promise
    }
  }, [db])

  const addNumber = useCallback(
    (newNumber: Omit<SNumber, "id">) => {
      if (db) {
        const promise = new Promise((resolve, reject) => {
          const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite")
          const objectStore = transaction.objectStore(OBJECT_STORE_NAME)
          objectStore.add(newNumber)

          transaction.oncomplete = (event) => {
            resolve(event)
          }

          transaction.onerror = (error) => {
            reject(error)
          }
        })

        return promise
      }
    },
    [db]
  )

  const deleteNumber = useCallback(
    (numberId: number) => {
      if (db) {
        const promise = new Promise((resolve, reject) => {
          const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite")
          const objectStore = transaction.objectStore(OBJECT_STORE_NAME)
          objectStore.delete(numberId)

          transaction.oncomplete = (event) => {
            resolve(event)
          }

          transaction.onerror = (error) => {
            reject(error)
          }
        })

        return promise
      }
    },
    [db]
  )

  const getNumber = useCallback(
    (numberId: number) => {
      if (db) {
        const promise = new Promise<SNumber>((resolve, reject) => {
          const transaction = db.transaction(OBJECT_STORE_NAME, "readonly")
          const objectStore = transaction.objectStore(OBJECT_STORE_NAME)
          const request = objectStore.get(numberId)

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          request.onsuccess = (event: any) => {
            const { success, data, error } = StoredNumber.safeParse(
              event.target.result
            )

            if (success && data !== undefined) {
              resolve(data)
            } else {
              reject(error)
            }
          }

          request.onerror = (error) => {
            reject(error)
          }
        })

        return promise
      }
    },
    [db]
  )

  const updateNumber = useCallback(
    (numberId: number, fields: Partial<Omit<SNumber, "id">>) => {
      if (db) {
        const promise = new Promise<Partial<SNumber>>((resolve, reject) => {
          const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite")
          const objectStore = transaction.objectStore(OBJECT_STORE_NAME)
          const request = objectStore.get(numberId)

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          request.onsuccess = (event: any) => {
            const { success, data, error } = StoredNumber.safeParse(
              event.target.result
            )

            if (!success || data === undefined) {
              reject(error)
            }

            const newData = { ...data, ...fields }

            const requestUpdate = objectStore.put(newData)

            requestUpdate.onsuccess = () => resolve(newData)
            requestUpdate.onerror = (error) => reject(error)
          }

          request.onerror = (error) => {
            reject(error)
          }
        })

        return promise
      }
    },
    [db]
  )

  const result = useMemo(
    () => ({
      addNumber,
      readAllNumbers,
      getNumber,
      updateNumber,
      deleteNumber,
    }),
    [addNumber, deleteNumber, getNumber, readAllNumbers, updateNumber]
  )

  return (
    <NumbersDBContext.Provider value={result}>
      {children}
    </NumbersDBContext.Provider>
  )
}

export { NumbersDBProvider, NumbersDBContext }
