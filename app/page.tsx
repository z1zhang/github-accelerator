import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { UrlConverter } from "@/components/url-converter"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Github className="h-6 w-6" />
            <span>{siteConfig.name}</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/examples">
                <Button variant="ghost">Examples</Button>
              </Link>
              <Link href="/docs">
                <Button variant="ghost">Documentation</Button>
              </Link>
              <Link href={siteConfig.githubRepo} target="_blank">
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Accelerate GitHub Content Delivery
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Fast, reliable access to GitHub releases, archives, and project files with global edge caching.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <UrlConverter />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Release Files</CardTitle>
                  <CardDescription>Accelerate access to GitHub release assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Quickly download release assets from any GitHub repository with our global edge caching.</p>
                </CardContent>
                <CardFooter>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    /api/release/user/repo/tag/file
                  </code>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Repository Archives</CardTitle>
                  <CardDescription>Fast access to repository ZIP and TAR archives</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Download repository archives faster with our caching layer, supporting both ZIP and TAR formats.
                  </p>
                </CardContent>
                <CardFooter>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    /api/archive/user/repo/ref/format
                  </code>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Raw Files</CardTitle>
                  <CardDescription>Accelerated access to raw repository files</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Quickly fetch individual files from any GitHub repository with proper content-type handling.</p>
                </CardContent>
                <CardFooter>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    /api/raw/user/repo/ref/path
                  </code>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>File Preview</CardTitle>
                  <CardDescription>Preview files directly in your browser</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>View text files, images, PDFs and more directly in your browser without downloading them first.</p>
                </CardContent>
                <CardFooter>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    /api/raw/user/repo/ref/path
                  </code>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

