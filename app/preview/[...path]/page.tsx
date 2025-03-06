"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Download, FileText, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function PreviewPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const path = Array.isArray(params.path) ? params.path : [params.path as string]

  const [content, setContent] = useState<string | null>(null)
  const [contentType, setContentType] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Determine the type of content (release, archive, raw)
  const contentPath = path[0]
  const isRelease = contentPath === "release"
  const isArchive = contentPath === "archive"
  const isRaw = contentPath === "raw"

  // Construct the API URL
  const apiUrl = `/api/${path.join("/")}`

  // Construct the download URL (same as API URL but with preview=false)
  const downloadUrl = `${apiUrl}?preview=false`

  // Construct the original GitHub URL
  let githubUrl = ""
  if (path.length >= 4) {
    const owner = path[1]
    const repo = path[2]
    const ref = path[3]

    if (isRelease && path.length >= 5) {
      const tag = path[3]
      const fileName = path.slice(4).join("/")
      githubUrl = `https://github.com/${owner}/${repo}/releases/download/${tag}/${fileName}`
    } else if (isArchive && path.length >= 5) {
      const format = path[4]
      githubUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${ref}.${format}`
    } else if (isRaw && path.length >= 5) {
      const filePath = path.slice(4).join("/")
      githubUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${filePath}`
    }
  }

  // Get the file extension
  const fileName = path[path.length - 1]
  const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase()

  // Determine if this is a file that can be previewed
  const isPreviewable = siteConfig.previewableExtensions.includes(fileExtension)

  // Determine if this is an image file
  const isImageFile = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(fileExtension)

  // Determine if this is a PDF file
  const isPdfFile = fileExtension === ".pdf"

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)

        // Only fetch content for previewable files that are not images or PDFs
        if (isPreviewable && !isImageFile && !isPdfFile) {
          const response = await fetch(apiUrl)

          if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`)
          }

          setContentType(response.headers.get("Content-Type"))
          const text = await response.text()
          setContent(text)
        }

        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setLoading(false)
      }
    }

    if (isPreviewable && !isImageFile && !isPdfFile) {
      fetchContent()
    } else {
      setLoading(false)
    }
  }, [apiUrl, isPreviewable, isImageFile, isPdfFile])

  // Render the appropriate preview based on file type
  const renderPreview = () => {
    if (loading) {
      return <div className="flex justify-center p-8">Loading...</div>
    }

    if (error) {
      return <div className="text-red-500 p-4">{error}</div>
    }

    if (isPreviewable && !isImageFile && !isPdfFile && content) {
      console.log(content)
      return (
        <div className="bg-muted rounded-lg p-4 overflow-auto max-h-[70vh]">
          <pre className="text-sm whitespace-pre-wrap">{content}</pre>
        </div>
      )
    }

    if (isImageFile) {
      return (
        <div className="flex justify-center p-4">
          <img src={apiUrl || "/placeholder.svg"} alt={fileName} className="max-w-full max-h-[70vh] object-contain" />
        </div>
      )
    }

    if (isPdfFile) {
      return (
        <div className="h-[70vh]">
          <iframe src={apiUrl} className="w-full h-full border-0 rounded-lg" title={fileName}></iframe>
        </div>
      )
    }

    // For other file types, show a message and download button
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-4">
        <FileText size={64} className="text-muted-foreground" />
        <p className="text-center">This file type ({fileExtension}) cannot be previewed directly in the browser.</p>
        <Button asChild>
          <a href={downloadUrl}>
            <Download className="mr-2 h-4 w-4" />
            Download File
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{fileName}</h1>
            <p className="text-muted-foreground">
              {isRelease ? "Release Asset" : isArchive ? "Repository Archive" : "Raw File"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href={downloadUrl}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
            {githubUrl && (
              <Button variant="outline" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="border rounded-lg">{renderPreview()}</div>
      </div>
    </div>
  )
}

