import { useState } from 'react'
import { deleteClient } from '../api'

export function useDeleteClient(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete(id: string) {
    setIsLoading(true)
    try {
      await deleteClient(id)
      onSuccess()
    } finally {
      setIsLoading(false)
    }
  }

  return { handleDelete, isLoading }
}
