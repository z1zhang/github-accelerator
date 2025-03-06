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
              <span>
                <a href="/">GitHub Accelerator</a>
              </span>
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

          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="examples">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-5xl space-y-12">
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Usage Examples</h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    See how to use our API to accelerate GitHub content delivery
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Accelerate Release Assets</h3>
                    <div className="rounded-lg bg-card p-6">
                    <pre className="overflow-x-auto text-sm">
                      <code>
                        {`# Original GitHub URL
https://github.com/user/repo/releases/download/v1.0.0/app.zip

# Accelerated URL with preview
https://your-domain.com/api/release/user/repo/v1.0.0/app.zip

# Accelerated URL with forced download
https://your-domain.com/api/release/user/repo/v1.0.0/app.zip?preview=false`}
                      </code>
                    </pre>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Accelerate Repository Archives</h3>
                    <div className="rounded-lg bg-card p-6">
                    <pre className="overflow-x-auto text-sm">
                      <code>
                        {`# Original GitHub URL
https://github.com/user/repo/archive/refs/heads/main.zip

# Accelerated URL with preview
https://your-domain.com/api/archive/user/repo/main/zip

# Accelerated URL with forced download
https://your-domain.com/api/archive/user/repo/main/zip?preview=false`}
                      </code>
                    </pre>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Accelerate Raw Files</h3>
                    <div className="rounded-lg bg-card p-6">
                    <pre className="overflow-x-auto text-sm">
                      <code>
                        {`# Original GitHub URL
https://raw.githubusercontent.com/user/repo/main/README.md

# Accelerated URL with preview (default)
https://your-domain.com/api/raw/user/repo/main/README.md

# Accelerated URL with forced download
https://your-domain.com/api/raw/user/repo/main/README.md?preview=false`}
                      </code>
                    </pre>
                    </div>
                  </div>
                </div>
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

