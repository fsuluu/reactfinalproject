"use client"

import { useState, useEffect } from "react"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface ApiOptions {
  immediate?: boolean
}

export function useApi<T>(apiFunction: () => Promise<T>, options: ApiOptions = { immediate: true }) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const result = await apiFunction()
      setState({ data: result, loading: false, error: null })
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      setState({ data: null, loading: false, error: errorMessage })
      throw error
    }
  }

  useEffect(() => {
    if (options.immediate) {
      execute()
    }
  }, [])

  return {
    ...state,
    execute,
    reset: () => setState({ data: null, loading: false, error: null }),
  }
}

// Mock API functions
export const api = {
  // Simulate photo fetching
  fetchPhotos: async (): Promise<any[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
      // Mock photo data
    ]
  },

  // Simulate photo upload
  uploadPhoto: async (formData: FormData): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      id: Date.now(),
      success: true,
      message: "Photo uploaded successfully",
    }
  },

  // Simulate user profile update
  updateProfile: async (profileData: any): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return {
      success: true,
      message: "Profile updated successfully",
    }
  },
}
