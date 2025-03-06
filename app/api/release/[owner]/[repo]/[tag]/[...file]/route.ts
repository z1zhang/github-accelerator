import { type NextRequest, NextResponse } from "next/server"

// Cache duration in seconds
const CACHE_DURATION = 60 * 60 * 24 * 7 // 7 days

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string; tag: string; file: string[] } },
) {
  const { owner, repo, tag, file } = params
  const filename = file.join("/")

  // Check if we should bypass cache
  const { searchParams } = new URL(request.url)
  const refresh = searchParams.get("refresh") === "true"
  // Add preview mode parameter
  const preview = searchParams.get("preview") !== "false" // Default to preview mode

  // Construct GitHub URL
  const githubUrl = `https://github.com/${owner}/${repo}/releases/download/${tag}/${filename}`

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

    // Get the content type and other headers from the response
    const contentType = response.headers.get("content-type") || "application/octet-stream"
    const contentLength = response.headers.get("content-length")

    // Set content disposition based on preview mode
    const contentDisposition = preview ? "inline" : `attachment; filename="${filename}"`

    // Get the response body as an array buffer
    const buffer = await response.arrayBuffer()

    // Create a new response with the buffer
    const newResponse = new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
        "Cache-Control": `public, max-age=${CACHE_DURATION}`,
      },
    })

    if (contentLength) {
      newResponse.headers.set("Content-Length", contentLength)
    }

    return newResponse
  } catch (error) {
    console.error("Error fetching release asset:", error)
    return NextResponse.json({ error: "Failed to fetch release asset" }, { status: 500 })
  }
}

