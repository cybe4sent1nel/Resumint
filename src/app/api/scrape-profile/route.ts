import { NextRequest, NextResponse } from "next/server"
import { scrapeProfile } from "@/lib/web-scraper"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const url = body?.url

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url.startsWith("http") ? url : "https://" + url)
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid URL format" },
        { status: 400 }
      )
    }

    // Scrape the profile
    let profile
    try {
      profile = await scrapeProfile(url)
    } catch (scrapeError) {
      // If scraping fails, return helpful error
      throw scrapeError
    }

    // Check if we got any meaningful data
    if (!profile || Object.keys(profile).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not extract any data from the provided URL. Try a publicly accessible URL.",
          suggestion: "The URL may require authentication, be behind a firewall, or not be a valid website."
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: profile,
      message: "Profile data scraped successfully"
    })
  } catch (error) {
    console.error("Scrape API error:", error)

    let statusCode = 500
    let errorMessage = "Failed to scrape profile"
    let suggestion = ""

    if (error instanceof Error) {
      const msg = error.message.toLowerCase()

      if (msg.includes("999") || msg.includes("access denied") || msg.includes("blocking automated")) {
        statusCode = 403
        errorMessage = "Website blocked the request"
        suggestion = "This website may be blocking automated scrapers. Try using the LinkedIn import feature instead."
      } else if (msg.includes("404") || msg.includes("not found")) {
        statusCode = 404
        errorMessage = "URL not found"
        suggestion = "The page doesn't exist. Check the URL and try again."
      } else if (msg.includes("timeout")) {
        statusCode = 408
        errorMessage = "Request timeout"
        suggestion = "The website took too long to respond. Try again in a moment or try a different URL."
      } else if (msg.includes("connection") || msg.includes("refused")) {
        statusCode = 503
        errorMessage = "Could not connect to the server"
        suggestion = "The server is not accessible. Check your internet connection or try a different URL."
      } else if (msg.includes("invalid url") || msg.includes("domain not found")) {
        statusCode = 400
        errorMessage = "Invalid URL"
        suggestion = "Make sure the URL is correct. Example: https://example.com"
      } else if (msg.includes("no content") || msg.includes("no html")) {
        statusCode = 400
        errorMessage = "No content received"
        suggestion = "The URL might not be a valid website. Try a different URL."
      } else if (msg.includes("401") || msg.includes("unauthorized")) {
        statusCode = 401
        errorMessage = "Authentication required"
        suggestion = "This URL requires login. Try a publicly accessible profile URL."
      } else {
        errorMessage = error.message.substring(0, 200)
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        ...(suggestion && { suggestion })
      },
      { status: statusCode }
    )
  }
}
