import { type NextRequest, NextResponse } from "next/server"

// Cache duration in seconds
const CACHE_DURATION = 60 * 60 * 24 // 24 hours

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string; ref: string; format: string } },
) {
  const { owner, repo, ref, format } = params

  // Check if we should bypass cache
  const { searchParams } = new URL(request.url)
  const refresh = searchParams.get("refresh") === "true"
  // Add preview mode parameter
  const preview = searchParams.get("preview") !== "false" // Default to preview mode

  // Validate format
  if (format !== "zip" && format !== "tar.gz") {
    return NextResponse.json({ error: "Invalid format. Supported formats: zip, tar.gz" }, { status: 400 })
  }

  // Construct GitHub URL
  const githubUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${ref}.${format}`

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

    // Get the content type based on format
    const contentType = format === "zip" ? "application/zip" : "application/gzip"

    // Set content disposition based on preview mode
    // Note: Archives typically can't be previewed directly in the browser,
    // but we'll set it to inline for consistency
    const contentDisposition = preview ? "inline" : `attachment; filename="${repo}-${ref}.${format}"`

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
    console.error("Error fetching archive:", error)
    return NextResponse.json({ error: "Failed to fetch repository archive" }, { status: 500 })
  }
}

