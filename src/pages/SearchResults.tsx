"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Heart, Eye, Search } from "lucide-react"

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Mock database - gerçek uygulamada API'den gelecek
  const allPhotos = [
    {
      id: 1,
      title: "Sunset Over Mountains",
      photographer: "John Doe",
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
      likes: 245,
      views: 1200,
      uploadDate: "2024-03-15",
      tags: ["sunset", "mountains", "nature", "landscape", "golden hour"],
    },
    {
      id: 2,
      title: "City Lights at Night",
      photographer: "Jane Smith",
      image: "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800",
      likes: 189,
      views: 890,
      uploadDate: "2024-03-14",
      tags: ["city", "night", "lights", "urban", "architecture", "long exposure"],
    },
    {
      id: 3,
      title: "Ocean Waves",
      photographer: "Mike Johnson",
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800",
      likes: 312,
      views: 1500,
      uploadDate: "2024-03-13",
      tags: ["ocean", "waves", "beach", "nature", "peaceful", "morning"],
    },
    {
      id: 4,
      title: "Forest Path",
      photographer: "Sarah Wilson",
      image: "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=800",
      likes: 156,
      views: 720,
      uploadDate: "2024-03-12",
      tags: ["forest", "path", "trees", "nature", "mystery", "hiking"],
    },
    {
      id: 5,
      title: "Desert Landscape",
      photographer: "David Brown",
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
      likes: 203,
      views: 980,
      uploadDate: "2024-03-11",
      tags: ["desert", "landscape", "sand", "dunes", "vast", "patterns"],
    },
    {
      id: 6,
      title: "Urban Architecture",
      photographer: "Lisa Garcia",
      image: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=800",
      likes: 278,
      views: 1100,
      uploadDate: "2024-03-10",
      tags: ["architecture", "urban", "modern", "building", "design", "geometric"],
    },
    {
      id: 7,
      title: "Golden Hour Reflection",
      photographer: "Alex Thompson",
      image: "https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=800",
      likes: 456,
      views: 2300,
      uploadDate: "2024-03-15",
      tags: ["golden hour", "reflection", "lake", "sunset", "nature", "peaceful"],
    },
  ]

  useEffect(() => {
    setLoading(true)

    // Arama işlemi - etiketlere göre filtreleme
    const searchResults = allPhotos.filter((photo) => {
      const searchTerm = query.toLowerCase()
      return (
        photo.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        photo.title.toLowerCase().includes(searchTerm) ||
        photo.photographer.toLowerCase().includes(searchTerm)
      )
    })

    // Simulated loading delay
    setTimeout(() => {
      setResults(searchResults)
      setLoading(false)
    }, 500)
  }, [query])

  const handlePhotoClick = (photoId: number) => {
    navigate(`/photo/${photoId}`)
  }

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="w-6 h-6 text-gray-400" />
            <h1 className="text-3xl font-bold text-white">Arama Sonuçları</h1>
          </div>
          <p className="text-gray-300">
            "<span className="font-semibold text-white">{query}</span>" için {loading ? "..." : results.length} sonuç
            bulundu
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-xl">Aranıyor...</div>
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Sonuç bulunamadı</h3>
            <p className="text-gray-500 mb-6">
              "<span className="font-semibold">{query}</span>" için herhangi bir fotoğraf bulunamadı.
            </p>
            <p className="text-gray-500 text-sm">
              Farklı etiketler deneyin: sunset, nature, city, architecture, ocean, forest
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((photo) => (
              <div
                key={photo.id}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 cursor-pointer"
                onClick={() => handlePhotoClick(photo.id)}
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={photo.image || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{photo.title}</h3>
                  <p className="text-gray-300 mb-4">
                    Fotoğrafçı: <span className="font-semibold">{photo.photographer}</span>
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {photo.tags.slice(0, 3).map((tag: string, index: number) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults
