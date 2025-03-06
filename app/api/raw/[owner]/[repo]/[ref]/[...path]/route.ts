import { type NextRequest, NextResponse } from "next/server"

// Cache duration in seconds
const CACHE_DURATION = 60 * 60 // 1 hour

// Map file extensions to content types
const contentTypeMap: Record<string, string> = {
  ".js": "application/javascript",
  ".jsx": "application/javascript",
  ".ts": "application/typescript",
  ".tsx": "application/typescript",
  ".css": "text/css",
  ".html": "text/html",
  ".json": "application/json",
  ".md": "text/markdown",
  ".txt": "text/plain",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
}

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string; ref: string; path: string[] } },
) {
  const { owner, repo, ref, path } = params
  const filePath = path.join("/")

  // Check if we should bypass cache
  const { searchParams } = new URL(request.url)
  const refresh = searchParams.get("refresh") === "true"
  // Add preview mode parameter
  const preview = searchParams.get("preview") !== "false" // Default to preview mode

  // Construct GitHub URL
  const githubUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${filePath}`

  try {
    // Fetch from GitHub
    const response = await fetch(githubUrl, {
      headers: {
        "User-Agent": "GitHub-Accelerator/1.0",
      },
      cache: refresh ? "no-store" : "force-cache",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from GitHub: ${response.statusText}` },
        { status: response.status },
      )
    }

    // Determine content type based on file extension
    const extension = filePath.substring(filePath.lastIndexOf(".")).toLowerCase()
    const contentType = contentTypeMap[extension] || "application/octet-stream"

    // Set content disposition based on preview mode
    const contentDisposition = preview ? "inline" : `attachment; filename="${path[path.length - 1]}"`

    // Get the response body as an array buffer
    const buffer = await response.arrayBuffer()

    // Create a new response with the buffer
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
        "Cache-Control": `public, max-age=${CACHE_DURATION}`,
      },
    })
  } catch (error) {
    console.error("Error fetching raw file:", error)
    return NextResponse.json({ error: "Failed to fetch raw file" }, { status: 500 })
  }
}

