import type React from "react"
import { Camera, Users, Heart, Globe } from "lucide-react"

const About: React.FC = () => {
  const values = [
    {
      icon: Camera,
      title: "Yaratıcılık",
      description: "Her fotoğrafın arkasındaki yaratıcı vizyonu destekler ve teşvik ederiz.",
    },
    {
      icon: Users,
      title: "Topluluk",
      description: "Fotoğrafçıları bir araya getirerek güçlü bir topluluk oluşturuyoruz.",
    },
    {
      icon: Heart,
      title: "Tutku",
      description: "Fotoğrafa olan tutkumuzu paylaşıyor ve bu sevgiyi yaygınlaştırıyoruz.",
    },
    {
      icon: Globe,
      title: "Küresel Bakış",
      description: "Dünyanın her yerinden fotoğrafçıları bir araya getiriyoruz.",
    },
  ]

  const features = [
    "Sınırsız fotoğraf yükleme",
    "Yüksek kaliteli görüntü desteği",
    "Topluluk etkileşimi ve geri bildirim",
    "Günün fotoğrafı seçimi",
    "Fotoğrafçı profilleri ve portföyler",
    "Gelişmiş arama ve keşif özellikleri",
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Hakkımızda</h1>
          <p className="text-xl leading-relaxed">
            PhotoShare, fotoğraf tutkunlarının bir araya geldiği, yaratıcılığın paylaşıldığı ve ilhamın doğduğu bir
            platformdur.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <Camera className="w-8 h-8 text-gray-400 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Misyonumuz</h2>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Fotoğrafçılara yaratıcılıklarını sergileyebilecekleri, eserlerini paylaşabilecekleri ve diğer fotoğraf
                  tutkunlarıyla bağlantı kurabilecekleri güvenli ve ilham verici bir platform sunmak.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Globe className="w-8 h-8 text-gray-400 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Vizyonumuz</h2>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Dünyanın en büyük fotoğraf paylaşım topluluğu olmak ve fotoğrafçılık sanatının gelişimine katkıda
                  bulunarak, görsel hikaye anlatımının gücünü herkese ulaştırmak.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Photography community"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Hikayemiz</h2>
          <div className="prose prose-lg mx-auto text-gray-300">
            <p className="text-xl leading-relaxed mb-6">
              PhotoShare, fotoğrafçılık tutkusundan doğan bir projedir. 2024 yılında, fotoğrafçıların eserlerini
              paylaşabileceği ve birbirleriyle etkileşim kurabileceği bir platform yaratma fikriyle başladık.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Amacımız, her seviyeden fotoğrafçıya hitap eden, kullanıcı dostu ve ilham verici bir ortam sunmaktı.
              Profesyonel fotoğrafçılardan amatör meraklılara kadar herkesin yaratıcılığını sergileyebileceği bir alan
              yaratmak istedik.
            </p>
            <p className="text-lg leading-relaxed">
              Bugün, binlerce fotoğrafçının bir araya geldiği, günlük yüzlerce fotoğrafın paylaşıldığı ve sürekli
              büyüyen bir topluluk haline geldik. Her gün yeni hikayeler, yeni perspektifler ve yeni dostluklar doğuyor.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-600"
              >
                <value.icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Platform Özellikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center border border-gray-600"
              >
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-4 flex-shrink-0"></div>
                <p className="text-gray-300 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Topluluğumuza Katılın</h2>
          <p className="text-xl mb-8 text-gray-200">
            Fotoğraflarınızı paylaşın, diğer fotoğrafçılarla tanışın ve yaratıcılığınızı geliştirin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Hemen Başlayın
            </button>
            <button className="border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-200">
              Daha Fazla Bilgi
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
