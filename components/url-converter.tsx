"use client"

import { useState } from "react"
import {Copy, Check, ExternalLink} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/config/site"
import { useToast } from "@/components/ui/use-toast"

export function UrlConverter() {
  const [inputUrl, setInputUrl] = useState("")
  const [outputUrl, setOutputUrl] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  const convertUrl = () => {
    // GitHub raw content URL pattern
    const rawPattern = /^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/
    // GitHub blob URL pattern
    const blobPattern = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/
    // GitHub release asset URL pattern
    const releasePattern = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/releases\/download\/([^/]+)\/(.+)$/

    let match = inputUrl.match(rawPattern) || inputUrl.match(blobPattern)
    if (match) {
      const [, owner, repo, ref, path] = match
      setOutputUrl(`https://${siteConfig.domain}/api/raw/${owner}/${repo}/${ref}/${path}`)
    } else if ((match = inputUrl.match(releasePattern))) {
      const [, owner, repo, tag, filename] = match
      setOutputUrl(`https://${siteConfig.domain}/api/release/${owner}/${repo}/${tag}/${filename}`)
    } else {
      setOutputUrl("Invalid GitHub URL")
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputUrl)
      setIsCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "The accelerated URL has been copied to your clipboard.",
        duration: 2000,
      })
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "An error occurred while copying the URL.",
        variant: "destructive",
      })
    }
  }

  const openUrl = () => {
    window.open(outputUrl, "_blank")
  }

  return (
    <div className="flex flex-col w-full items-center space-y-4">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Paste GitHub file URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={convertUrl}>Convert</Button>
      </div>
      {outputUrl && (
        <div className="w-full bg-muted p-4 rounded-md">
          <p className="font-medium mb-2">Accelerated URL:</p>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={outputUrl}
              readOnly
              onClick={(e) => e.currentTarget.select()}
              className="flex-grow font-mono text-sm"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={copyToClipboard}
              title="Copy to clipboard"
              className="transition-all duration-200 ease-in-out"
            >
              {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
                size="icon"
                variant="outline"
                onClick={openUrl}
                title="Open in new tab"
                className={"transition-all duration-200 ease-in-out"}
            >
                <ExternalLink className="h-4 w-4" />

            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

