"use client"

import type React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Send } from "lucide-react"
import type { ContactFormData } from "../../types"

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void
  loading?: boolean
}

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Ad en az 2 karakter olmalıdır").required("Ad gereklidir"),
  email: Yup.string().email("Geçerli bir e-posta adresi giriniz").required("E-posta gereklidir"),
  subject: Yup.string().required("Konu seçiniz"),
  message: Yup.string().min(10, "Mesaj en az 10 karakter olmalıdır").required("Mesaj gereklidir"),
})

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, loading = false }) => {
  const formik = useFormik<ContactFormData>({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }: { resetForm: () => void }) => {
      onSubmit(values)
      resetForm()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Ad Soyad *</label>
          <input
            type="text"
            {...formik.getFieldProps("name")}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-white placeholder-gray-400 ${
              formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Adınız ve soyadınız"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-red-400">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">E-posta Adresi *</label>
          <input
            type="email"
            {...formik.getFieldProps("email")}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-white placeholder-gray-400 ${
              formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="ornek@email.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Konu *</label>
        <select
          {...formik.getFieldProps("subject")}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-white ${
            formik.touched.subject && formik.errors.subject ? "border-red-500" : "border-gray-600"
          }`}
        >
          <option value="">Bir konu seçin</option>
          <option value="technical">Teknik Destek</option>
          <option value="community">Topluluk Soruları</option>
          <option value="feedback">Geri Bildirim</option>
          <option value="partnership">İş Birliği</option>
          <option value="other">Diğer</option>
        </select>
        {formik.touched.subject && formik.errors.subject && (
          <p className="mt-1 text-sm text-red-400">{formik.errors.subject}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Mesaj *</label>
        <textarea
          rows={6}
          {...formik.getFieldProps("message")}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-white placeholder-gray-400 ${
            formik.touched.message && formik.errors.message ? "border-red-500" : "border-gray-600"
          }`}
          placeholder="Mesajınızı buraya yazın..."
        />
        {formik.touched.message && formik.errors.message && (
          <p className="mt-1 text-sm text-red-400">{formik.errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !formik.isValid}
        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center group"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
        )}
        {loading ? "Gönderiliyor..." : "Mesajı Gönder"}
      </button>
    </form>
  )
}
