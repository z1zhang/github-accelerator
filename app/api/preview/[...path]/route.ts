import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = params

  if (!path || path.length === 0) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  // Construct the API URL
  const apiUrl = `/api/${path.join("/")}`

  // Get the file extension
  const fileName = path[path.length - 1]
  const fileExtension = fileName.includes(".") ? fileName.substring(fileName.lastIndexOf(".")).toLowerCase() : ""

  // Determine if this is a file type that needs special handling
  const needsSpecialHandling = [
    // Archives
    ".zip",
    ".tar.gz",
    // Binary formats
    ".exe",
    ".dll",
    ".so",
    ".bin",
    // Complex document formats
    ".docx",
    ".xlsx",
    ".pptx",
  ].includes(fileExtension)

  if (needsSpecialHandling) {
    // Redirect to the preview page
    return NextResponse.redirect(new URL(`/preview/${path.join("/")}`, request.url))
  }

  // For other file types, redirect to the API with preview=true
  return NextResponse.redirect(new URL(`${apiUrl}?preview=true`, request.url))
}

