#!/bin/bash

echo "Testing LinkedIn Scraping (Will Fail - Expected)"
echo "=================================================="
echo ""

URL="https://www.linkedin.com/in/fahad-cybersecurity-ai/"

echo "URL: $URL"
echo ""
echo "Making request to /api/scrape-profile..."
echo ""

curl -X POST http://localhost:3000/api/scrape-profile \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"$URL\"}" \
  -w "\n\nResponse Time: %{time_total}s\n" \
  2>/dev/null | jq '.'

echo ""
echo "Expected Response:"
echo "==================="
echo '{
  "success": false,
  "error": "Access denied (999) - Website blocked automated requests",
  "suggestion": "Use LinkedIn OAuth instead (/import/linkedin)"
}'

echo ""
echo "Why it fails:"
echo "============="
echo "✗ LinkedIn returns status 999 to block automated scrapers"
echo "✗ No User-Agent rotation can bypass this"
echo "✗ No retry will help"
echo ""
echo "Solution:"
echo "========="
echo "Use the official LinkedIn OAuth flow instead:"
echo "  URL: /import/linkedin"
echo "  Method: Official OAuth"
echo "  Security: ✅ Safe, approved by LinkedIn"
echo "  Speed: Instant"
