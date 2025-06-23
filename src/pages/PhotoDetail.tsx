"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Heart, Eye, Share2, Download, User, Calendar, Camera } from "lucide-react"

const PhotoDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const [photo, setPhoto] = useState<any>(null)

  // Mock database - gerçek uygulamada API'den gelecek
  const photoDatabase = {
    1: {
      id: 1,
      title: "Moon Over Clouds",
      photographer: "John Doe",
      image: "/images/DSC00220.JPG",
      likes: 245,
      views: 1200,
      uploadDate: "2024-03-15",
      description:
        "Moon casting a serene glow over the clouds at dusk. The soft light creates a magical atmosphere, perfect for capturing the beauty of nature.",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8L IS USM",
      settings: {
        aperture: "f/8",
        shutter: "1/125s",
        iso: "ISO 100",
        focal: "35mm",
      },
      location: "Rocky Mountains, Colorado",
      tags: ["sunset", "mountains", "nature", "landscape", "golden hour"],
    },
    2: {
      id: 2,
      title: "Architectural Marvels of Turkey",
      photographer: "Jane Smith",
      image: "/images/DSC00221.JPG",
      likes: 189,
      views: 890,
      uploadDate: "2024-03-14",
      description:
        "The vibrant city comes alive at night with stunning lights. This long exposure shot captures the energy of urban life.",
      camera: "Sony A7R IV",
      lens: "FE 16-35mm f/2.8 GM",
      settings: {
        aperture: "f/11",
        shutter: "30s",
        iso: "ISO 200",
        focal: "24mm",
      },
      location: "New York City, USA",
      tags: ["city", "night", "lights", "urban", "architecture", "long exposure"],
    },
    3: {
      id: 3,
      title: "Ocean Waves",
      photographer: "Mike Johnson",
      image: "/images/DSC00272.JPG",
      likes: 312,
      views: 1500,
      uploadDate: "2024-03-13",
      description:
        "Peaceful waves crashing on the shore during a calm morning. The rhythmic motion of the ocean creates a sense of tranquility.",
      camera: "Nikon D850",
      lens: "NIKKOR 70-200mm f/2.8E FL ED VR",
      settings: {
        aperture: "f/5.6",
        shutter: "1/500s",
        iso: "ISO 400",
        focal: "85mm",
      },
      location: "Malibu Beach, California",
      tags: ["ocean", "waves", "beach", "nature", "peaceful", "morning"],
    },
    4: {
      id: 4,
      title: "Lovely Cat",
      photographer: "Sarah Wilson",
      image: "/images/DSC00372.JPG",
      likes: 156,
      views: 720,
      uploadDate: "2024-03-12",
      description:
        "A lovely cat resting on a car in a quiet forest. The soft light filtering through the trees adds a touch of mystery to the scene.",
      camera: "Fujifilm X-T4",
      lens: "XF 18-55mm f/2.8-4 R LM OIS",
      settings: {
        aperture: "f/4",
        shutter: "1/60s",
        iso: "ISO 800",
        focal: "35mm",
      },
      location: "Olympic National Forest, Washington",
      tags: ["forest", "path", "trees", "nature", "mystery", "hiking"],
    },
    5: {
      id: 5,
      title: "A Rainbow",
      photographer: "David Brown",
      image: "/images/P1010956.JPG",
      likes: 203,
      views: 980,
      uploadDate: "2024-03-11",
      description:
        "A Rainbow over seas and mountains, capturing the beauty of nature's colors after a storm. The vibrant hues create a stunning contrast against the landscape.",
      lens: "EF 24-105mm f/4L IS USM",
      settings: {
        aperture: "f/8",
        shutter: "1/250s",
        iso: "ISO 100",
        focal: "50mm",
      },
      location: "Sahara Desert, Morocco",
      tags: ["desert", "landscape", "sand", "dunes", "vast", "patterns"],
    },
    6: {
      id: 6,
      title: "Duck in the Lake",
      photographer: "Lisa Garcia",
      image: "/images/DSC00776.JPG",
      likes: 278,
      views: 1100,
      uploadDate: "2024-03-10",
      description:
        "Duck swimming in a serene lake, enjoying a peaceful moment. The calm waters reflect the surrounding trees and sky, creating a perfect composition.",
      camera: "Sony A7 III",
      lens: "FE 24-70mm f/2.8 GM",
      settings: {
        aperture: "f/8",
        shutter: "1/200s",
        iso: "ISO 200",
        focal: "35mm",
      },
      location: "Downtown Los Angeles, California",
      tags: ["architecture", "urban", "modern", "building", "design", "geometric"],
    },
    7: {
      id: 7,
      title: "Peaceful sea and ship",
      photographer: "Alex Thompson",
      image: "/images/P1010982.JPG",
      likes: 456,
      views: 2300,
      uploadDate: "2024-03-15",
      description:
        "Peaceful sea and ship, capturing the tranquility of the moment. The soft light creates a serene atmosphere, perfect for reflection.",
      camera: "Canon EOS R6",
      lens: "RF 24-105mm f/4L IS USM",
      settings: {
        aperture: "f/8",
        shutter: "1/125s",
        iso: "ISO 100",
        focal: "35mm",
      },
      location: "Lake Serenity, Colorado",
      tags: ["golden hour", "reflection", "lake", "sunset", "nature", "peaceful"],
    },
  }

  const relatedPhotos = [
    {
      id: 1,
      title: "Moon Over Clouds",
      photographer: "John Doe",
      image: "/images/DSC00220.JPG",
      likes: 245,
    },
    {
      id: 2,
      title: "City Lights at Night",
      photographer: "Jane Smith",
      image: "/images/DSC00221.JPG",
      likes: 189,
    },
    {
      id: 3,
      title: "Ocean Waves",
      photographer: "Mike Johnson",
      image: "/images/DSC00272.JPG",
      likes: 312,
    },
  ]

  useEffect(() => {
    const photoId = Number.parseInt(id || "1")
    const foundPhoto = photoDatabase[photoId as keyof typeof photoDatabase]

    if (foundPhoto) {
      setPhoto(foundPhoto)
    } else {
      // Eğer fotoğraf bulunamazsa varsayılan fotoğrafı göster
      setPhoto(photoDatabase[7])
    }
  }, [id])

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: photo?.title,
        text: `${photo?.title} by ${photo?.photographer}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link kopyalandı!")
    }
  }

  const handleDownload = () => {
    if (photo?.image) {
      const link = document.createElement("a")
      link.href = photo.image
      link.download = `${photo.title}.jpg`
      link.click()
    }
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri Dön
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Photo */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-600">
              <img src={photo.image || "/placeholder.svg"} alt={photo.title} className="w-full h-auto object-cover" />

              {/* Photo Actions */}
              <div className="p-6 border-t border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                      <span>{photo.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    <div className="flex items-center space-x-2 text-gray-300">
                      <Eye className="w-5 h-5" />
                      <span>{photo.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleShare}
                      className="p-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Info Sidebar */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
              <h1 className="text-2xl font-bold text-white mb-4">{photo.title}</h1>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{photo.photographer}</p>
                  <p className="text-gray-400 text-sm">Fotoğrafçı</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{photo.uploadDate}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Camera className="w-4 h-4 mr-2" />
                  <span>{photo.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Açıklama</h3>
              <p className="text-gray-300 leading-relaxed">{photo.description}</p>
            </div>

            {/* Camera Settings */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Teknik Detaylar</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Kamera:</span>
                  <span className="text-gray-300">{photo.camera}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lens:</span>
                  <span className="text-gray-300">{photo.lens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Diyafram:</span>
                  <span className="text-gray-300">{photo.settings.aperture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Enstantane:</span>
                  <span className="text-gray-300">{photo.settings.shutter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ISO:</span>
                  <span className="text-gray-300">{photo.settings.iso}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Odak Uzaklığı:</span>
                  <span className="text-gray-300">{photo.settings.focal}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Photos */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-8">Benzer Fotoğraflar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPhotos.map((relatedPhoto) => (
              <div
                key={relatedPhoto.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-600 cursor-pointer"
                onClick={() => navigate(`/photo/${relatedPhoto.id}`)}
              >
                <img
                  src={relatedPhoto.image || "/placeholder.svg"}
                  alt={relatedPhoto.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1">{relatedPhoto.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{relatedPhoto.photographer}</p>
                  <div className="flex items-center text-gray-400">
                    <Heart className="w-4 h-4 mr-1 text-red-500" />
                    <span className="text-sm">{relatedPhoto.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoDetail
