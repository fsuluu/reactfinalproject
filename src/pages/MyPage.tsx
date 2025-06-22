"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, Camera, Heart, Eye, Edit, Trash2, Plus, User, Settings } from "lucide-react"

const MyPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"photos" | "profile" | "upload">("photos")
  const [userPhotos, setUserPhotos] = useState([
    {
      id: 1,
      title: "Sunset Over Mountains",
      image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600",
      likes: 245,
      views: 1200,
      uploadDate: "2024-03-15",
      description: "A beautiful sunset captured during my hiking trip.",
    },
    {
      id: 2,
      title: "City Lights at Night",
      image: "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=600",
      likes: 189,
      views: 890,
      uploadDate: "2024-03-14",
      description: "The vibrant city comes alive at night.",
    },
    {
      id: 3,
      title: "Ocean Waves",
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=600",
      likes: 312,
      views: 1500,
      uploadDate: "2024-03-13",
      description: "Peaceful waves crashing on the shore.",
    },
  ])

  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    image: null as File | null,
  })

  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate photographer capturing life's beautiful moments.",
    location: "Istanbul, Turkey",
    website: "www.johndoe-photography.com",
  })

  const [editingPhoto, setEditingPhoto] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  })

  const handlePhotoClick = (photoId: number) => {
    navigate(`/photo/${photoId}`)
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadForm.title && uploadForm.description) {
      const newPhoto = {
        id: Date.now(),
        title: uploadForm.title,
        description: uploadForm.description,
        image: "https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=600",
        likes: 0,
        views: 0,
        uploadDate: new Date().toISOString().split("T")[0],
      }
      setUserPhotos([newPhoto, ...userPhotos])
      setUploadForm({ title: "", description: "", image: null })
      setActiveTab("photos")
      alert("Fotoğraf başarıyla yüklendi!")
    }
  }

  const handleDelete = (photoId: number) => {
    if (confirm("Bu fotoğrafı silmek istediğinizden emin misiniz?")) {
      setUserPhotos(userPhotos.filter((photo) => photo.id !== photoId))
    }
  }

  const handleEdit = (photo: any) => {
    setEditingPhoto(photo.id)
    setEditForm({
      title: photo.title,
      description: photo.description,
    })
  }

  const handleSaveEdit = () => {
    setUserPhotos(
      userPhotos.map((photo) =>
        photo.id === editingPhoto ? { ...photo, title: editForm.title, description: editForm.description } : photo,
      ),
    )
    setEditingPhoto(null)
    setEditForm({ title: "", description: "" })
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Profil bilgileri güncellendi!")
  }

  const userStats = {
    totalPhotos: userPhotos.length,
    totalLikes: userPhotos.reduce((sum, photo) => sum + photo.likes, 0),
    totalViews: userPhotos.reduce((sum, photo) => sum + photo.views, 0),
  }

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{profileForm.name}</h1>
              <p className="text-xl text-gray-300 mb-4">{profileForm.bio}</p>
              <div className="flex space-x-6 text-gray-300">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.totalPhotos}</div>
                  <div className="text-sm">Fotoğraf</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.totalLikes}</div>
                  <div className="text-sm">Beğeni</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userStats.totalViews}</div>
                  <div className="text-sm">Görüntüleme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: "photos", label: "Fotoğraflarım", icon: Camera },
              { key: "upload", label: "Fotoğraf Yükle", icon: Plus },
              { key: "profile", label: "Profil Ayarları", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-gray-400 text-white"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* My Photos Tab */}
          {activeTab === "photos" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Fotoğraflarım</h2>
                <button
                  onClick={() => setActiveTab("upload")}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Yeni Fotoğraf
                </button>
              </div>

              {userPhotos.length === 0 ? (
                <div className="text-center py-16">
                  <Camera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">Henüz fotoğraf yüklemediniz</h3>
                  <p className="text-gray-500 mb-6">İlk fotoğrafınızı yükleyerek başlayın!</p>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Fotoğraf Yükle
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {userPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-600"
                    >
                      <div
                        className="aspect-w-16 aspect-h-12 cursor-pointer"
                        onClick={() => handlePhotoClick(photo.id)}
                      >
                        <img
                          src={photo.image || "/placeholder.svg"}
                          alt={photo.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        {editingPhoto === photo.id ? (
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white"
                            />
                            <textarea
                              value={editForm.description}
                              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white"
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSaveEdit}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                              >
                                Kaydet
                              </button>
                              <button
                                onClick={() => setEditingPhoto(null)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                              >
                                İptal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-lg font-bold text-white mb-2">{photo.title}</h3>
                            <p className="text-gray-300 text-sm mb-4">{photo.description}</p>
                            <div className="flex items-center justify-between mb-4">
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
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(photo)}
                                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Düzenle
                              </button>
                              <button
                                onClick={() => handleDelete(photo.id)}
                                className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Sil
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Yeni Fotoğraf Yükle</h2>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 border border-gray-600">
                <form onSubmit={handleUpload} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Fotoğraf Seç</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Fotoğrafınızı buraya sürükleyin veya seçin</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setUploadForm({ ...uploadForm, image: e.target.files?.[0] || null })}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors inline-block"
                      >
                        Dosya Seç
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Başlık *</label>
                    <input
                      type="text"
                      required
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Fotoğrafınıza bir başlık verin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Açıklama *</label>
                    <textarea
                      required
                      rows={4}
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Fotoğrafınız hakkında kısa bir açıklama yazın"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Fotoğrafı Yükle
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Profil Ayarları</h2>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 border border-gray-600">
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Biyografi</label>
                    <textarea
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Kendiniz hakkında kısa bir açıklama yazın"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Konum</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Şehir, Ülke"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="https://www.example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Profili Güncelle
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default MyPage
