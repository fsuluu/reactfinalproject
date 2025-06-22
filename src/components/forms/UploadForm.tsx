"use client"

import type React from "react"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Upload, X } from "lucide-react"
import type { UploadFormData } from "../../types"
import { useApi, api } from "../../hooks/useApi"

interface UploadFormProps {
  onSuccess: (data: any) => void
}

const validationSchema = Yup.object({
  title: Yup.string().min(3, "Başlık en az 3 karakter olmalıdır").required("Başlık gereklidir"),
  description: Yup.string().min(10, "Açıklama en az 10 karakter olmalıdır").required("Açıklama gereklidir"),
  tags: Yup.string().required("En az bir etiket giriniz"),
  image: Yup.mixed()
    .required("Fotoğraf seçiniz")
    .test("fileSize", "Dosya boyutu 10MB'dan küçük olmalıdır", (value) => {
      if (!value) return false
      return (value as File).size <= 10 * 1024 * 1024
    })
    .test("fileType", "Sadece resim dosyaları kabul edilir", (value) => {
      if (!value) return false
      return ["image/jpeg", "image/png", "image/webp"].includes((value as File).type)
    }),
})

export const UploadForm: React.FC<UploadFormProps> = ({ onSuccess }) => {
  const [preview, setPreview] = useState<string | null>(null)
  const { loading, execute } = useApi(() => api.uploadPhoto(new FormData()), { immediate: false })

  const formik = useFormik<UploadFormData>({
    initialValues: {
      title: "",
      description: "",
      tags: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("description", values.description)
        formData.append("tags", values.tags)
        if (values.image) {
          formData.append("image", values.image)
        }

        const result = await execute()
        onSuccess(result)
        resetForm()
        setPreview(null)
      } catch (error) {
        console.error("Upload failed:", error)
      }
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      formik.setFieldValue("image", file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    formik.setFieldValue("image", null)
    setPreview(null)
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Fotoğraf Seç *</label>

        {preview ? (
          <div className="relative">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-gray-500 transition-colors ${
              formik.touched.image && formik.errors.image ? "border-red-500" : "border-gray-600"
            }`}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">Fotoğrafınızı buraya sürükleyin veya seçin</p>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="photo-upload" />
            <label
              htmlFor="photo-upload"
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors inline-block"
            >
              Dosya Seç
            </label>
          </div>
        )}

        {formik.touched.image && formik.errors.image && (
          <p className="mt-1 text-sm text-red-400">{formik.errors.image}</p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Başlık *</label>
        <input
          type="text"
          {...formik.getFieldProps("title")}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder-gray-400 ${
            formik.touched.title && formik.errors.title ? "border-red-500" : "border-gray-600"
          }`}
          placeholder="Fotoğrafınıza bir başlık verin"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="mt-1 text-sm text-red-400">{formik.errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Açıklama *</label>
        <textarea
          rows={4}
          {...formik.getFieldProps("description")}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder-gray-400 ${
            formik.touched.description && formik.errors.description ? "border-red-500" : "border-gray-600"
          }`}
          placeholder="Fotoğrafınız hakkında kısa bir açıklama yazın"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="mt-1 text-sm text-red-400">{formik.errors.description}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Etiketler *</label>
        <input
          type="text"
          {...formik.getFieldProps("tags")}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-white placeholder-gray-400 ${
            formik.touched.tags && formik.errors.tags ? "border-red-500" : "border-gray-600"
          }`}
          placeholder="Etiketleri virgülle ayırın (örn: sunset, nature, landscape)"
        />
        {formik.touched.tags && formik.errors.tags && <p className="mt-1 text-sm text-red-400">{formik.errors.tags}</p>}
        <p className="mt-1 text-xs text-gray-400">Fotoğrafınızın keşfedilmesi için uygun etiketler ekleyin</p>
      </div>

      <button
        type="submit"
        disabled={loading || !formik.isValid}
        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Yükleniyor...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 mr-2" />
            Fotoğrafı Yükle
          </>
        )}
      </button>
    </form>
  )
}
