"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Heart, Eye, Upload, Star } from "lucide-react"

const Home: React.FC = () => {
  const navigate = useNavigate()

  const [photos] = useState([
    {
      id: 1,
      title: "Moon Over Clouds",
      photographer: "John Doe",
      image: "/images/DSC00220.JPG",
      likes: 245,
      views: 1200,
      uploadDate: "2024-03-15",
      description: "Moonlight casting a serene glow over the clouds at dusk.",
      tags: ["sunset", "mountains", "nature", "landscape"],
    },
    {
      id: 2,
      title: "Architecturel Wonders",
      photographer: "Jane Smith",
      image: "/images/DSC00643.JPG",
      likes: 189,
      views: 890,
      uploadDate: "2024-03-14",
      description: "The vibrant city comes alive at night with stunning lights.",
      tags: ["city", "night", "lights", "urban", "architecture"],
    },
    {
      id: 3,
      title: "Ocean Waves",
      photographer: "Mike Johnson",
      image: "/images/DSC00272.JPG",
      likes: 312,
      views: 1500,
      uploadDate: "2024-03-13",
      description: "Peaceful waves crashing on the shore during a calm morning.",
      tags: ["ocean", "waves", "beach", "nature", "peaceful"],
    },
    {
      id: 4,
      title: "Lovely Cat",
      photographer: "Sarah Wilson",
      image: "/images/DSC00372.JPG",
      likes: 156,
      views: 720,
      uploadDate: "2024-03-12",
      description: "A lovely cat on a car.",
      tags: ["forest", "path", "trees", "nature", "mystery"],
    },
    {
      id: 5,
      title: "A Rainbow",
      photographer: "David Brown",
      image: "/images/P1010956.JPG",
      likes: 203,
      views: 980,
      uploadDate: "2024-03-11",
      description: "A rainbow over sea after a storm, showcasing nature's beauty.",
      tags: ["desert", "landscape", "sand", "dunes", "vast"],
    },
    {
      id: 6,
      title: "Duck in the lake",
      photographer: "Lisa Garcia",
      image: "/images/DSC00776.JPG",
      likes: 278,
      views: 1100,
      uploadDate: "2024-03-10",
      description: "Duck in the lake, enjoying a peaceful moment.",
      tags: ["architecture", "urban", "modern", "building", "design"],
    },
  ])

  const photoOfTheDay = {
    id: 7,
    title: "Golden Hour Reflection",
    photographer: "Alex Thompson",
    image: "/images/P1010982.JPG",
    likes: 456,
    views: 2300,
    description:
      "A breathtaking capture of the golden hour reflecting on a pristine lake, showcasing the perfect harmony between light and water.",
    tags: ["golden hour", "reflection", "lake", "sunset", "nature"],
  }

  const handlePhotoClick = (photoId: number) => {
    navigate(`/photo/${photoId}`)
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Photo of the Day */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Main text */}
            <div className="animate-slide-up">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Fotoğraflarınızla
                <span className="text-gray-300"> Dünyayı Güzelleştirin</span>
              </h1>
              <p className="text-lg mb-6 text-gray-200 leading-relaxed">
                Objektifinizden çıkan her kare, dünyanın güzelliğini paylaşmanın bir yolu. Fotoğraflarınızı paylaşın,
                keşfedin ve ilham verin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/mypage"
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center group"
                >
                  <Upload className="mr-2 w-5 h-5" />
                  Fotoğraf Yükle
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-center"
                >
                  Keşfet
                </Link>
              </div>
            </div>

            {/* Right side - Photo of the Day */}
            <div className="animate-slide-up">
              {/* Title outside the frame */}
              <div className="mb-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Günün Fotoğrafı</h2>
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
              </div>

              {/* Photo frame */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-600">
                <div className="cursor-pointer" onClick={() => handlePhotoClick(photoOfTheDay.id)}>
                  <img
                    src={photoOfTheDay.image || "/placeholder.svg"}
                    alt={photoOfTheDay.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Shared Photos */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Son Paylaşılan Fotoğraflar</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Topluluk üyelerinin en son paylaştığı muhteşem fotoğrafları keşfedin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
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

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Daha Fazla Fotoğraf Gör
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Fotoğraflarınızı Paylaşmaya Hazır mısınız?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Objektifinizden çıkan her kare, binlerce kişiye ilham verebilir. Hemen katılın ve fotoğraflarınızı dünyayla
            paylaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mypage"
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <Upload className="mr-2 w-5 h-5" />
              Hemen Başla
            </Link>
            <Link
              to="/about"
              className="border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-200"
            >
              Daha Fazla Bilgi
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
