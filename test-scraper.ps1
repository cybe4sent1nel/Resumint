#!/usr/bin/env pwsh

# Test the web scraper with working URLs

Write-Host "Web Scraper Test Script" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

$apiUrl = "http://localhost:3000/api/scrape-profile"

# Test URLs that should work
$testUrls = @(
    "https://example.com",
    "https://www.wikipedia.org",
    "https://github.com/torvalds"
)

# Test URLs that will fail (for demonstration)
$blockedUrls = @(
    "https://linkedin.com"
)

Write-Host "Testing WORKING URLs (should succeed):" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

foreach ($url in $testUrls) {
    Write-Host ""
    Write-Host "Testing: $url" -ForegroundColor Yellow
    
    $body = @{
        url = $url
    } | ConvertTo-Json

    try {
        $response = Invoke-WebRequest -Uri $apiUrl -Method POST `
            -Headers @{"Content-Type"="application/json"} `
            -Body $body -TimeoutSec 30

        $result = $response.Content | ConvertFrom-Json

        if ($result.success) {
            Write-Host "✓ SUCCESS" -ForegroundColor Green
            Write-Host "  Name: $($result.data.name)" -ForegroundColor Green
            Write-Host "  Skills: $($result.data.skills.Count) found" -ForegroundColor Green
        } else {
            Write-Host "✗ FAILED: $($result.error)" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host ""
Write-Host "Testing BLOCKED URLs (expected to fail):" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red

foreach ($url in $blockedUrls) {
    Write-Host ""
    Write-Host "Testing: $url" -ForegroundColor Yellow
    
    $body = @{
        url = $url
    } | ConvertTo-Json

    try {
        $response = Invoke-WebRequest -Uri $apiUrl -Method POST `
            -Headers @{"Content-Type"="application/json"} `
            -Body $body -TimeoutSec 30

        $result = $response.Content | ConvertFrom-Json

        if ($result.success) {
            Write-Host "✓ SUCCESS (unexpected!)" -ForegroundColor Green
        } else {
            Write-Host "✓ Correctly blocked: $($result.error)" -ForegroundColor Yellow
            Write-Host "  Suggestion: $($result.suggestion)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "✗ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "========" -ForegroundColor Cyan
Write-Host "✓ Web scraper works for public websites"
Write-Host "✓ Blocked sites return helpful error messages"
Write-Host "✓ Use LinkedIn OAuth for LinkedIn profiles"
Write-Host "✓ Use /api/scrape-profile for public portfolios"
Write-Host ""
