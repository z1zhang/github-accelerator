import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { siteConfig } from "@/config/site"

export default function DocsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex flex-col space-y-1">
            <Link href="/docs" className="font-medium">
              Getting Started
            </Link>
            <Link href="/docs#api-reference" className="text-muted-foreground hover:text-foreground">
              API Reference
            </Link>
            <Link href="/docs#rate-limits" className="text-muted-foreground hover:text-foreground">
              Rate Limits
            </Link>
            <Link href="/docs#caching" className="text-muted-foreground hover:text-foreground">
              Caching
            </Link>
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-3xl">
          <div className="space-y-6">
            <div>
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Documentation</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Learn how to use GitHub Accelerator to speed up access to GitHub content.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Getting Started</h2>
              <p>
                {siteConfig.name} provides a simple API to accelerate access to GitHub releases, archives, and raw
                files. No authentication is required for public repositories.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <p className="font-medium">Base URL</p>
                <code className="text-sm">https://{siteConfig.domain}/api</code>
              </div>
            </div>
            <div className="space-y-4" id="api-reference">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">API Reference</h2>
              <Tabs defaultValue="releases">
                <TabsList>
                  <TabsTrigger value="releases">Releases</TabsTrigger>
                  <TabsTrigger value="archives">Archives</TabsTrigger>
                  <TabsTrigger value="raw">Raw Files</TabsTrigger>
                </TabsList>
                <TabsContent value="releases" className="space-y-4">
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Release Assets</h3>
                  <p>Access GitHub release assets with accelerated delivery.</p>
                  <div className="rounded-lg bg-muted p-4 space-y-2">
                    <p className="font-medium">Endpoint</p>
                    <code className="text-sm">
                      /api/release/{"{owner}"}/{"{repo}"}/{"{tag}"}/{"{filename}"}
                    </code>
                    <p className="font-medium mt-4">Parameters</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>
                        <code>owner</code> - GitHub repository owner
                      </li>
                      <li>
                        <code>repo</code> - GitHub repository name
                      </li>
                      <li>
                        <code>tag</code> - Release tag (e.g., v1.0.0)
                      </li>
                      <li>
                        <code>filename</code> - Asset filename
                      </li>
                    </ul>
                    <p className="font-medium mt-4">Query Parameters</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>
                        <code>preview</code> - Set to "false" to force download instead of preview (default: true)
                      </li>
                      <li>
                        <code>refresh</code> - Set to "true" to bypass cache
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="archives" className="space-y-4">
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Repository Archives</h3>
                  <p>Download repository archives in ZIP or TAR format with accelerated delivery.</p>
                  <div className="rounded-lg bg-muted p-4 space-y-2">
                    <p className="font-medium">Endpoint</p>
                    <code className="text-sm">
                      /api/archive/{"{owner}"}/{"{repo}"}/{"{ref}"}/{"{format}"}
                    </code>
                    <p className="font-medium mt-4">Parameters</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>
                        <code>owner</code> - GitHub repository owner
                      </li>
                      <li>
                        <code>repo</code> - GitHub repository name
                      </li>
                      <li>
                        <code>ref</code> - Branch, tag, or commit SHA
                      </li>
                      <li>
                        <code>format</code> - Archive format (zip or tar.gz)
                      </li>
                    </ul>
                    <p className="font-medium mt-4">Query Parameters</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>
                        <code>preview</code> - Set to "false" to force download instead of preview (default: true)
                      </li>
                      <li>
                        <code>refresh</code> - Set to "true" to bypass cache
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="raw" className="space-y-4">
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Raw Files</h3>
                  <p>Access raw files from GitHub repositories with accelerated delivery.</p>
                  <div className="rounded-lg bg-muted p-4 space-y-2">
                    <p className="font-medium">Endpoint</p>
                    <code className="text-sm">
                      /api/raw/{"{owner}"}/{"{repo}"}/{"{ref}"}/{"{path}"}
                    </code>
                    <p className="font-medium mt-4">Parameters</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>
                        <code>owner</code> - GitHub repository owner
                      </li>
                      <li>
                        <code>repo</code> - GitHub repository name
                      </li>
                      <li>
                        <code>ref</code> - Branch, tag, or commit SHA
                      </li>
                      <li>
                        <code>path</code> - File path within the repository
                      </li>
                    </ul>
                    <p className="font-medium mt-4">Query Parameters</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>
                        <code>preview</code> - Set to "false" to force download instead of preview (default: true)
                      </li>
                      <li>
                        <code>refresh</code> - Set to "true" to bypass cache
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-4" id="rate-limits">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Rate Limits</h2>
              <p>
                GitHub Accelerator implements rate limiting to ensure fair usage and to prevent abuse. The following
                limits apply:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>100 requests per minute per IP address</li>
                <li>1,000 requests per hour per IP address</li>
                <li>10,000 requests per day per IP address</li>
              </ul>
              <p>If you need higher limits, please contact us for custom solutions.</p>
            </div>
            <div className="space-y-4" id="caching">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Caching</h2>
              <p>GitHub Accelerator uses a multi-layered caching strategy to ensure fast content delivery:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Edge caching at global CDN locations</li>
                <li>In-memory caching for frequently accessed content</li>
                <li>Persistent storage for large files</li>
              </ul>
              <p>Cache TTL (Time To Live) varies by content type:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Release assets: 7 days</li>
                <li>Repository archives: 24 hours</li>
                <li>Raw files: 1 hour</li>
              </ul>
              <p>
                You can force a cache refresh by appending <code>?refresh=true</code> to any API URL.
              </p>
            </div>
            <div className="space-y-4" id="preview-mode">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Preview Mode</h2>
              <p>
                GitHub Accelerator supports previewing files directly in the browser instead of downloading them. This
                is enabled by default for all file types that can be previewed in a browser.
              </p>
              <p>Supported preview types include:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Text files (.txt, .md, .js, .html, etc.)</li>
                <li>Images (.png, .jpg, .gif, .svg)</li>
                <li>PDFs (.pdf)</li>
              </ul>
              <p>For other file types, a download option will be provided.</p>
              <p>
                To force a file to download instead of preview, append <code>?preview=false</code> to any API URL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

