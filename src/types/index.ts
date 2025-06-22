// Photo types
export interface Photo {
    id: number
    title: string
    photographer: string
    image: string
    likes: number
    views: number
    uploadDate: string
    description: string
    tags: string[]
    camera?: string
    lens?: string
    settings?: CameraSettings
    location?: string
  }
  
  export interface CameraSettings {
    aperture: string
    shutter: string
    iso: string
    focal: string
  }
  
  // User types
  export interface User {
    id: number
    name: string
    email: string
    bio: string
    location: string
    website: string
    avatar?: string
  }
  
  // Form types
  export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
  }
  
  export interface UploadFormData {
    title: string
    description: string
    tags: string
    image: File | null
  }
  
  export interface ProfileFormData {
    name: string
    email: string
    bio: string
    location: string
    website: string
  }
  
  // Search types
  export interface SearchFilters {
    query: string
    sortBy: "newest" | "oldest" | "most_liked" | "most_viewed"
    tags: string[]
  }
  
  // Context types
  export interface AppContextType {
    user: User | null
    photos: Photo[]
    favorites: number[]
    searchHistory: string[]
    setUser: (user: User | null) => void
    addPhoto: (photo: Omit<Photo, "id" | "likes" | "views" | "uploadDate">) => void
    updatePhoto: (id: number, updates: Partial<Photo>) => void
    deletePhoto: (id: number) => void
    toggleFavorite: (photoId: number) => void
    addToSearchHistory: (query: string) => void
  }
  