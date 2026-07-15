import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { formatFileSize } from '../../utils/helpers'
import clsx from 'clsx'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export default function ImageUploader({
  value = [],      // array of { file, preview, url } objects or URL strings
  onChange,
  multiple = true,
  maxFiles = 10,
  label = 'Upload Images',
}) {
  const [errors, setErrors] = useState([])

  const onDrop = useCallback(
    (accepted, rejected) => {
      const errs = []

      rejected.forEach((rej) => {
        rej.errors.forEach((e) => {
          if (e.code === 'file-too-large') errs.push(`${rej.file.name}: exceeds 5 MB limit`)
          else if (e.code === 'file-invalid-type') errs.push(`${rej.file.name}: not a valid image`)
          else errs.push(`${rej.file.name}: ${e.message}`)
        })
      })

      setErrors(errs)

      const newItems = accepted.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }))

      const merged = multiple ? [...value, ...newItems].slice(0, maxFiles) : newItems.slice(0, 1)
      onChange?.(merged)
    },
    [value, onChange, multiple, maxFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] },
    multiple,
    maxSize: MAX_FILE_SIZE,
  })

  function removeItem(index) {
    const item = value[index]
    if (item?.preview) URL.revokeObjectURL(item.preview)
    onChange?.(value.filter((_, i) => i !== index))
  }

  function getPreviewSrc(item) {
    if (typeof item === 'string') return item
    return item.preview || item.url || ''
  }

  function getName(item) {
    if (typeof item === 'string') return item.split('/').pop()
    return item.name || 'image'
  }

  function getSize(item) {
    if (typeof item === 'string' || !item.size) return null
    return formatFileSize(item.size)
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={clsx(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-150',
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <Upload size={28} className={isDragActive ? 'text-primary-500' : 'text-gray-400'} />
          <p className="text-sm font-medium">
            {isDragActive ? 'Drop images here' : label}
          </p>
          <p className="text-xs text-gray-400">
            Drag & drop or click — JPG, PNG, GIF, WebP · Max 5 MB per file
            {multiple && maxFiles && ` · Up to ${maxFiles} files`}
          </p>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((e, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-danger-600 bg-danger-50 px-3 py-2 rounded-lg">
              <AlertCircle size={13} />
              {e}
            </div>
          ))}
        </div>
      )}

      {/* Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {value.map((item, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square">
              {getPreviewSrc(item) ? (
                <img
                  src={getPreviewSrc(item)}
                  alt={getName(item)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageIcon size={24} className="text-gray-400" />
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center gap-1 p-2">
                <p className="text-white text-[10px] text-center truncate w-full">{getName(item)}</p>
                {getSize(item) && (
                  <p className="text-white/70 text-[10px]">{getSize(item)}</p>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeItem(i) }}
                  className="mt-1 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
