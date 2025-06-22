"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { AppContextType, User, Photo } from "../types"

// Initial state
const initialState = {
  user: null as User | null,
  photos: [] as Photo[],
  favorites: [] as number[],
  searchHistory: [] as string[],
}

// Action types
type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_PHOTOS"; payload: Photo[] }
  | { type: "ADD_PHOTO"; payload: Photo }
  | { type: "UPDATE_PHOTO"; payload: { id: number; updates: Partial<Photo> } }
  | { type: "DELETE_PHOTO"; payload: number }
  | { type: "TOGGLE_FAVORITE"; payload: number }
  | { type: "ADD_TO_SEARCH_HISTORY"; payload: string }
  | { type: "LOAD_FROM_STORAGE"; payload: typeof initialState }

// Reducer
function appReducer(state: typeof initialState, action: AppAction): typeof initialState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }

    case "SET_PHOTOS":
      return { ...state, photos: action.payload }

    case "ADD_PHOTO":
      return { ...state, photos: [action.payload, ...state.photos] }

    case "UPDATE_PHOTO":
      return {
        ...state,
        photos: state.photos.map((photo) =>
          photo.id === action.payload.id ? { ...photo, ...action.payload.updates } : photo,
        ),
      }

    case "DELETE_PHOTO":
      return {
        ...state,
        photos: state.photos.filter((photo) => photo.id !== action.payload),
        favorites: state.favorites.filter((id) => id !== action.payload),
      }

    case "TOGGLE_FAVORITE":
      const isFavorite = state.favorites.includes(action.payload)
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      }

    case "ADD_TO_SEARCH_HISTORY":
      const newHistory = [action.payload, ...state.searchHistory.filter((item) => item !== action.payload)].slice(0, 10)
      return { ...state, searchHistory: newHistory }

    case "LOAD_FROM_STORAGE":
      return action.payload

    default:
      return state
  }
}

// Context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider component
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("photoShareApp")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: "LOAD_FROM_STORAGE", payload: parsedState })
      } catch (error) {
        console.error("Error loading saved state:", error)
      }
    }

    // Load initial photos if none exist
    if (state.photos.length === 0) {
      const initialPhotos: Photo[] = [
        {
          id: 1,
          title: "Sunset Over Mountains",
          photographer: "John Doe",
          image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
          likes: 245,
          views: 1200,
          uploadDate: "2024-03-15",
          description: "A beautiful sunset captured during my hiking trip in the Rocky Mountains.",
          tags: ["sunset", "mountains", "nature", "landscape", "golden hour"],
          camera: "Canon EOS R5",
          lens: "RF 24-70mm f/2.8L IS USM",
          settings: {
            aperture: "f/8",
            shutter: "1/125s",
            iso: "ISO 100",
            focal: "35mm",
          },
          location: "Rocky Mountains, Colorado",
        },
        {
          id: 2,
          title: "City Lights at Night",
          photographer: "Jane Smith",
          image: "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
          likes: 189,
          views: 890,
          uploadDate: "2024-03-14",
          description: "The vibrant city comes alive at night with stunning lights.",
          tags: ["city", "night", "lights", "urban", "architecture"],
          camera: "Sony A7R IV",
          lens: "FE 16-35mm f/2.8 GM",
          settings: {
            aperture: "f/11",
            shutter: "30s",
            iso: "ISO 200",
            focal: "24mm",
          },
          location: "New York City, USA",
        },
        // Add more initial photos...
      ]
      dispatch({ type: "SET_PHOTOS", payload: initialPhotos })
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("photoShareApp", JSON.stringify(state))
  }, [state])

  // Context value
  const contextValue: AppContextType = {
    user: state.user,
    photos: state.photos,
    favorites: state.favorites,
    searchHistory: state.searchHistory,

    setUser: (user: User | null) => {
      dispatch({ type: "SET_USER", payload: user })
    },

    addPhoto: (photoData: Omit<Photo, "id" | "likes" | "views" | "uploadDate">) => {
      const newPhoto: Photo = {
        ...photoData,
        id: Date.now(),
        likes: 0,
        views: 0,
        uploadDate: new Date().toISOString().split("T")[0],
      }
      dispatch({ type: "ADD_PHOTO", payload: newPhoto })
    },

    updatePhoto: (id: number, updates: Partial<Photo>) => {
      dispatch({ type: "UPDATE_PHOTO", payload: { id, updates } })
    },

    deletePhoto: (id: number) => {
      dispatch({ type: "DELETE_PHOTO", payload: id })
    },

    toggleFavorite: (photoId: number) => {
      dispatch({ type: "TOGGLE_FAVORITE", payload: photoId })
    },

    addToSearchHistory: (query: string) => {
      if (query.trim()) {
        dispatch({ type: "ADD_TO_SEARCH_HISTORY", payload: query.trim() })
      }
    },
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook
export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
