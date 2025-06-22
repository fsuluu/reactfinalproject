"use client"

import type React from "react"
import { Heart, Eye, User } from "lucide-react"
import type { Photo } from "../types"
import { useAppContext } from "../contexts/AppContext"

interface PhotoCardProps {
  photo: Photo
  onClick: (photoId: number) => void
  showPhotographer?: boolean
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick, showPhotographer = true }) => {
  const { favorites, toggleFavorite } = useAppContext()
  const isFavorite = favorites.includes(photo.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(photo.id)
  }

  return (
    <div
      className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 cursor-pointer"
      onClick={() => onClick(photo.id)}
    >
      <div className="aspect-w-16 aspect-h-12 overflow-hidden relative">
        <img
          src={photo.image || "/placeholder.svg"}
          alt={photo.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-red-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{photo.title}</h3>

        {showPhotographer && (
          <div className="flex items-center space-x-2 mb-4">
            <User className="w-4 h-4 text-gray-400" />
            <p className="text-gray-300">
              <span className="font-semibold">{photo.photographer}</span>
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {photo.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-300">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-red-500" />
              <span className="text-sm">{photo.likes}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span className="text-sm">{photo.views}</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{photo.uploadDate}</span>
        </div>
      </div>
    </div>
  )
}
