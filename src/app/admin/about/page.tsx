"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, Plus, Trash2 } from "lucide-react"

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState({
    vision: "",
    howItWorks: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" }
    ],
    features: [
      { title: "", description: "" }
    ],
    faqs: [
      { question: "", answer: "" }
    ],
    developer: {
      name: "Fahad Khan",
      title: "Full Stack Developer & AI Enthusiast",
      bio: ""
    }
  })

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const res = await fetch("/api/admin/about")
      if (res.ok) {
        const data = await res.json()
        if (data.content) {
          setContent(data.content)
        }
      }
    } catch (error) {
      console.error("Failed to load content:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      })
      
      if (res.ok) {
        alert("About page updated successfully!")
      } else {
        alert("Failed to update")
      }
    } catch (error) {
      alert("Error saving content")
    } finally {
      setLoading(false)
    }
  }

  const addFeature = () => {
    setContent({
      ...content,
      features: [...content.features, { title: "", description: "" }]
    })
  }

  const removeFeature = (index: number) => {
    const newFeatures = content.features.filter((_, i) => i !== index)
    setContent({ ...content, features: newFeatures })
  }

  const addFaq = () => {
    setContent({
      ...content,
      faqs: [...content.faqs, { question: "", answer: "" }]
    })
  }

  const removeFaq = (index: number) => {
    const newFaqs = content.faqs.filter((_, i) => i !== index)
    setContent({ ...content, faqs: newFaqs })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit About Page</h1>
        <Button onClick={handleSave} disabled={loading} className="gap-2">
          <Save className="h-4 w-4" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Vision Section */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Vision Statement</h2>
        <Textarea
          value={content.vision}
          onChange={(e) => setContent({ ...content, vision: e.target.value })}
          rows={5}
          className="w-full"
          placeholder="Enter your vision statement..."
        />
      </Card>

      {/* How It Works */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">How It Works (3 Steps)</h2>
        {content.howItWorks.map((step, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <label className="block text-sm font-medium mb-2">Step {index + 1} Title</label>
            <Input
              value={step.title}
              onChange={(e) => {
                const newSteps = [...content.howItWorks]
                newSteps[index].title = e.target.value
                setContent({ ...content, howItWorks: newSteps })
              }}
              placeholder="Step title"
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={step.description}
              onChange={(e) => {
                const newSteps = [...content.howItWorks]
                newSteps[index].description = e.target.value
                setContent({ ...content, howItWorks: newSteps })
              }}
              placeholder="Step description"
              rows={2}
            />
          </div>
        ))}
      </Card>

      {/* Features */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Features</h2>
          <Button onClick={addFeature} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Feature
          </Button>
        </div>
        {content.features.map((feature, index) => (
          <div key={index} className="mb-4 p-4 border rounded relative">
            <Button
              onClick={() => removeFeature(index)}
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={feature.title}
              onChange={(e) => {
                const newFeatures = [...content.features]
                newFeatures[index].title = e.target.value
                setContent({ ...content, features: newFeatures })
              }}
              placeholder="Feature title"
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={feature.description}
              onChange={(e) => {
                const newFeatures = [...content.features]
                newFeatures[index].description = e.target.value
                setContent({ ...content, features: newFeatures })
              }}
              placeholder="Feature description"
              rows={2}
            />
          </div>
        ))}
      </Card>

      {/* FAQs */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">FAQs</h2>
          <Button onClick={addFaq} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add FAQ
          </Button>
        </div>
        {content.faqs.map((faq, index) => (
          <div key={index} className="mb-4 p-4 border rounded relative">
            <Button
              onClick={() => removeFaq(index)}
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <label className="block text-sm font-medium mb-2">Question</label>
            <Input
              value={faq.question}
              onChange={(e) => {
                const newFaqs = [...content.faqs]
                newFaqs[index].question = e.target.value
                setContent({ ...content, faqs: newFaqs })
              }}
              placeholder="FAQ question"
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-2">Answer</label>
            <Textarea
              value={faq.answer}
              onChange={(e) => {
                const newFaqs = [...content.faqs]
                newFaqs[index].answer = e.target.value
                setContent({ ...content, faqs: newFaqs })
              }}
              placeholder="FAQ answer"
              rows={3}
            />
          </div>
        ))}
      </Card>

      {/* Developer Info */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Developer Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              value={content.developer.name}
              onChange={(e) => setContent({
                ...content,
                developer: { ...content.developer, name: e.target.value }
              })}
              placeholder="Developer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={content.developer.title}
              onChange={(e) => setContent({
                ...content,
                developer: { ...content.developer, title: e.target.value }
              })}
              placeholder="Professional title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <Textarea
              value={content.developer.bio}
              onChange={(e) => setContent({
                ...content,
                developer: { ...content.developer, bio: e.target.value }
              })}
              rows={4}
              placeholder="Developer bio"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
