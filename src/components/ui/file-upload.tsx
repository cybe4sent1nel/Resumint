"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LottieAnimation } from "@/components/animations"

interface FileUploadProps {
  onUpload?: (file: File) => Promise<void>
  accept?: string
  maxSize?: number // in MB
  className?: string
}

export function FileUpload({ 
  onUpload, 
  accept = ".pdf,.doc,.docx", 
  maxSize = 5,
  className = "" 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSize}MB`
    }
    
    const acceptedTypes = accept.split(",").map(t => t.trim())
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    
    if (!acceptedTypes.some(type => type === fileExtension || type === file.type)) {
      return `File type not accepted. Please upload: ${accept}`
    }
    
    return null
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    setError(null)

    const droppedFile = e.dataTransfer.files[0]
    if (!droppedFile) return

    const validationError = validateFile(droppedFile)
    if (validationError) {
      setError(validationError)
      return
    }

    setFile(droppedFile)
    await uploadFile(droppedFile)
  }, [accept, maxSize])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    const validationError = validateFile(selectedFile)
    if (validationError) {
      setError(validationError)
      return
    }

    setFile(selectedFile)
    await uploadFile(selectedFile)
  }

  const uploadFile = async (fileToUpload: File) => {
    setUploading(true)
    setUploadComplete(false)
    
    try {
      if (onUpload) {
        await onUpload(fileToUpload)
      } else {
        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      setUploadComplete(true)
    } catch (err: any) {
      setError(err.message || "Upload failed")
      setFile(null)
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setUploadComplete(false)
    setError(null)
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {uploading ? (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border-2 border-purple-500"
          >
            <LottieAnimation
              animationPath="/animations/Upload data.json"
              className="w-full max-w-xs mx-auto h-48 mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Uploading...</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Please wait while we process your file
            </p>
          </motion.div>
        ) : uploadComplete ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl shadow-xl border-2 border-green-500"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400">
              Upload Complete!
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              {file?.name}
            </p>
            <Button
              onClick={removeFile}
              variant="outline"
              className="border-green-500"
            >
              Upload Another File
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative p-8 border-2 border-dashed rounded-2xl transition-all ${
              isDragging
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-105"
                : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            }`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept={accept}
              onChange={handleFileSelect}
            />
            
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className={`w-16 h-16 mb-4 ${
                isDragging ? "text-purple-500" : "text-neutral-400"
              }`} />
              
              <h3 className="text-xl font-bold mb-2">
                {isDragging ? "Drop your file here" : "Drag & Drop your file"}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                or click to browse
              </p>
              
              <Button
                type="button"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Select File
              </Button>
              
              <p className="text-sm text-neutral-500 mt-4">
                Accepted formats: {accept} • Max size: {maxSize}MB
              </p>
            </label>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {file && !uploading && !uploadComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-semibold text-sm">{file.name}</p>
                    <p className="text-xs text-neutral-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-neutral-500 hover:text-red-500 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
