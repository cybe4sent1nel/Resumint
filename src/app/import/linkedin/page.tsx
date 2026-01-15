"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Link2, FileText, Sparkles, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export default function LinkedInImportPage() {
  const [activeMethod, setActiveMethod] = useState<'oauth' | 'file-upload' | 'manual-paste' | 'url-import'>('url-import')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [oauthData, setOAuthData] = useState<any>(null)
  const [fileData, setFileData] = useState<any>(null)
  const [manualData, setManualData] = useState<any>(null)
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [urlData, setUrlData] = useState<any>(null)

  // Method 1: LinkedIn OAuth
  const handleLinkedInAuth = async () => {
    setLoading(true)
    try {
      const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
      const redirectUri = `${window.location.origin}/api/auth/linkedin/callback`
      const scope = 'r_liteprofile r_emailaddress'
      
      window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`
    } catch (error) {
      console.error('OAuth error:', error)
    }
    setLoading(false)
  }

  // Method 0: LinkedIn URL Import
  const handleLinkedInUrlImport = async () => {
    if (!linkedinUrl) return
    
    setLoading(true)
    try {
      // Extract username from various LinkedIn URL formats
      let username = ''
      const urlPatterns = [
        /linkedin\.com\/in\/([^\/\?]+)/,
        /linkedin\.com\/pub\/([^\/\?]+)/,
      ]
      
      for (const pattern of urlPatterns) {
        const match = linkedinUrl.match(pattern)
        if (match) {
          username = match[1]
          break
        }
      }
      
      if (!username) {
        alert('Invalid LinkedIn URL. Please use format: https://linkedin.com/in/username')
        setLoading(false)
        return
      }

      // Call scraping API (you'll need to implement this)
      const response = await fetch('/api/linkedin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'url-scrape',
          data: {
            profileUrl: linkedinUrl,
            username,
            enhanceWithAI: true,
          },
        }),
      })

      const result = await response.json()
      setUrlData(result)
      setResult(result)
    } catch (error) {
      console.error('URL import error:', error)
      alert('Failed to import from LinkedIn URL. Try another method.')
    }
    setLoading(false)
  }

  // Method 2: File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const content = event.target?.result as string
        
        let parsedData
        if (file.name.endsWith('.json')) {
          parsedData = JSON.parse(content)
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n')
          const headers = lines[0].split(',')
          parsedData = lines.slice(1).map(line => {
            const values = line.split(',')
            return headers.reduce((obj: any, header, i) => {
              obj[header.trim()] = values[i]?.trim()
              return obj
            }, {})
          })
        }

        setFileData(parsedData)
        await importProfile('file-upload', { exportData: parsedData })
      }
      reader.readAsText(file)
    } catch (error) {
      console.error('File upload error:', error)
    }
    setLoading(false)
  }

  // Method 3: Manual Paste
  const handleManualPaste = async (htmlContent: string) => {
    setLoading(true)
    try {
      setManualData(htmlContent)
      await importProfile('manual-paste', { htmlContent })
    } catch (error) {
      console.error('Manual paste error:', error)
    }
    setLoading(false)
  }

  // Universal Import Function
  const importProfile = async (method: string, data: any) => {
    const response = await fetch('/api/linkedin/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method,
        data: {
          ...data,
          enhanceWithAI: true,
        },
      }),
    })

    const result = await response.json()
    
    if (method === 'oauth') setOAuthData(result)
    if (method === 'file-upload') setFileData(result)
    if (method === 'manual-paste') setManualData(result)

    setResult(result)
  }

  // Merge all available data
  const handleMergeAll = async () => {
    setLoading(true)
    try {
      const profiles = [oauthData?.profile, fileData?.profile, manualData?.profile].filter(Boolean)
      
      const response = await fetch('/api/linkedin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'merge',
          data: {
            profiles,
            enhanceWithAI: true,
          },
        }),
      })

      const mergedResult = await response.json()
      setResult(mergedResult)
    } catch (error) {
      console.error('Merge error:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Import from LinkedIn
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Choose your preferred method - use one or combine all three for maximum accuracy!
          </p>
        </motion.div>

        {/* Import Methods */}
        <Tabs value={activeMethod} onValueChange={(v: any) => setActiveMethod(v)} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 p-1">
            <TabsTrigger value="url-import" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Paste URL
            </TabsTrigger>
            <TabsTrigger value="file-upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Resume
            </TabsTrigger>
            <TabsTrigger value="oauth" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="manual-paste" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Copy HTML
            </TabsTrigger>
          </TabsList>

          {/* Method 0: LinkedIn URL */}
          <TabsContent value="url-import">
            <Card className="p-8 bg-white dark:bg-gray-800">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Link2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Import from LinkedIn URL</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Paste your LinkedIn profile URL to extract your data
                  </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      placeholder="https://www.linkedin.com/in/yourprofile"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                    />
                    <p className="text-xs text-gray-500">
                      Example: https://www.linkedin.com/in/johndoe
                    </p>
                  </div>

                  <ul className="text-left space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Works with public profiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Extracts experience, education, skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>AI-enhanced data processing</span>
                    </li>
                  </ul>

                  <Button
                    onClick={handleLinkedInUrlImport}
                    disabled={loading || !linkedinUrl}
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Importing from LinkedIn...
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5 mr-2" />
                        Import from URL
                      </>
                    )}
                  </Button>
                </div>

                {urlData && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">Successfully imported from LinkedIn URL!</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Method 1: OAuth */}
          <TabsContent value="oauth">
            <Card className="p-8 bg-white dark:bg-gray-800">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Link2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Connect with LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Securely import your profile using LinkedIn's official API
                  </p>
                </div>
                <ul className="text-left max-w-md mx-auto space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Official LinkedIn integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Secure OAuth 2.0 authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Basic profile (name, email, photo)</span>
                  </li>
                </ul>
                <Button
                  onClick={handleLinkedInAuth}
                  disabled={loading}
                  size="lg"
                  className="bg-[#0077B5] hover:bg-[#006399] text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link2 className="w-5 h-5 mr-2" />
                      Sign in with LinkedIn
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Method 2: File Upload */}
          <TabsContent value="file-upload">
            <Card className="p-8 bg-white dark:bg-gray-800">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Upload LinkedIn Data</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Most complete data - includes work history, skills, certifications
                  </p>
                </div>
                <div className="max-w-md mx-auto text-left space-y-4">
                  <p className="text-sm font-semibold">How to download your LinkedIn data:</p>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Go to LinkedIn Settings & Privacy</li>
                    <li>Click "Get a copy of your data"</li>
                    <li>Select "Profiles", "Positions", "Education", "Skills"</li>
                    <li>Download the CSV or JSON files</li>
                    <li>Upload them here</li>
                  </ol>
                </div>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    accept=".csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={loading}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <Upload className="w-12 h-12 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium">Click to upload</p>
                        <p className="text-sm text-gray-500">CSV or JSON files</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Method 3: Manual Paste */}
          <TabsContent value="manual-paste">
            <Card className="p-8 bg-white dark:bg-gray-800">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Copy & Paste Profile</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fastest method - just copy your LinkedIn profile page
                  </p>
                </div>
                <div className="max-w-md mx-auto text-left space-y-4">
                  <p className="text-sm font-semibold">How to copy your profile:</p>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Open your LinkedIn profile page</li>
                    <li>Select all content (Ctrl+A / Cmd+A)</li>
                    <li>Copy (Ctrl+C / Cmd+C)</li>
                    <li>Paste below and we'll extract everything!</li>
                  </ol>
                </div>
                <Textarea
                  placeholder="Paste your LinkedIn profile here..."
                  rows={12}
                  className="font-mono text-sm"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    if (e.target.value.length > 100) {
                      handleManualPaste(e.target.value)
                    }
                  }}
                  disabled={loading}
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Merge Button */}
        {[oauthData, fileData, manualData].filter(Boolean).length > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-8"
          >
            <Button
              onClick={handleMergeAll}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Merge All Data & Enhance with AI
            </Button>
          </motion.div>
        )}

        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <Card className="p-8 bg-white dark:bg-gray-800">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Check className="w-6 h-6 text-green-500" />
                Import Successful! ✨ AI-Enhanced
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Profile Information</h4>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto max-h-96">
                    {JSON.stringify(result.profile, null, 2)}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Generated Resume (AI-Enhanced)</h4>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto max-h-96">
                    {JSON.stringify(result.resume, null, 2)}
                  </pre>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Button className="flex-1">
                  Save Resume
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit Resume
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
