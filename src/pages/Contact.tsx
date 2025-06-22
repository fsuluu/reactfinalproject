"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Camera, Users, Heart } from "lucide-react"

const Contact: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    alert("Mesajınız için teşekkürler! En kısa sürede size dönüş yapacağız.")
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "E-posta",
      details: ["info@photoshare.com", "support@photoshare.com", "community@photoshare.com"],
    },
    {
      icon: Phone,
      title: "Telefon",
      details: ["+90 212 555 0123", "+90 212 555 0124"],
    },
    {
      icon: MapPin,
      title: "Adres",
      details: ["PhotoShare Merkezi", "Levent Mahallesi, Foto Sokak No:1", "Beşiktaş, İstanbul 34330"],
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      details: ["Pazartesi - Cuma: 09:00 - 18:00", "Cumartesi: 10:00 - 16:00", "Pazar: Kapalı"],
    },
  ]

  const supportTopics = [
    { icon: Camera, title: "Teknik Destek", description: "Fotoğraf yükleme ve platform kullanımı" },
    { icon: Users, title: "Topluluk", description: "Topluluk kuralları ve etkileşim" },
    { icon: Heart, title: "Geri Bildirim", description: "Öneriler ve iyileştirme fikirleri" },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">İletişim</h1>
          <p className="text-xl leading-relaxed">
            Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin. PhotoShare topluluğunun
            bir parçası olduğunuz için teşekkürler!
          </p>
        </div>
      </section>

      {/* Support Topics */}
      <section className="py-16 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Size Nasıl Yardımcı Olabiliriz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-600"
              >
                <topic.icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{topic.title}</h3>
                <p className="text-gray-300">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-8 border border-gray-600">
              <h2 className="text-3xl font-bold text-white mb-8">Bize Yazın</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">E-posta Adresi *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Konu *</label>
                  <select
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-white"
                  >
                    <option value="">Bir konu seçin</option>
                    <option value="technical">Teknik Destek</option>
                    <option value="community">Topluluk Soruları</option>
                    <option value="feedback">Geri Bildirim</option>
                    <option value="partnership">İş Birliği</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mesaj *</label>
                  <textarea
                    required
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Mesajı Gönder
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">İletişim Bilgileri</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  PhotoShare ekibi olarak, kullanıcılarımızın deneyimini iyileştirmek ve sorularını yanıtlamak için
                  buradayız. Bize ulaşmaktan çekinmeyin!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-gray-600 to-gray-700 p-3 rounded-lg">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-300 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Sık Sorulan Sorular</h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 shadow-md border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Fotoğraf yükleme limiti var mı?</h3>
              <p className="text-gray-300">
                Hayır, PhotoShare'de sınırsız fotoğraf yükleyebilirsiniz. Sadece her fotoğrafın maksimum 10MB olması
                gerekiyor.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 shadow-md border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Hangi dosya formatları destekleniyor?</h3>
              <p className="text-gray-300">
                JPEG, PNG, TIFF ve RAW formatlarını destekliyoruz. En iyi kalite için JPEG formatını öneriyoruz.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 shadow-md border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Fotoğraflarım güvende mi?</h3>
              <p className="text-gray-300">
                Evet, tüm fotoğraflarınız güvenli sunucularımızda saklanır ve sadece siz kontrol edebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Hemen Başlayın!</h2>
          <p className="text-xl mb-8 text-gray-200">
            PhotoShare topluluğuna katılın ve fotoğraflarınızı dünyayla paylaşmaya başlayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Ücretsiz Kayıt Ol
            </button>
            <button className="border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-200">
              Platform Turunu İzle
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
