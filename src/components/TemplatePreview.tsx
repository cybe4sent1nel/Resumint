"use client"

import { UniqueTemplate } from "@/lib/unique-templates"

interface TemplatePreviewProps {
  template: UniqueTemplate
  isHovered?: boolean
}

export function TemplatePreview({ template, isHovered = false }: TemplatePreviewProps) {
  const colors = template.colorScheme

  const getLayoutPreview = () => {
    switch (template.layout) {
      case "minimal-clean":
        return (
          <div className="space-y-3">
            {template.hasProfilePic && (
              <div className="flex justify-center mb-2">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              </div>
            )}
            <div
              className="h-1.5 w-24 mx-auto"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="space-y-1">
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.accent }}
              />
              <div
                className="h-0.5 w-5/6"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
            <div className="space-y-1">
              <div
                className="h-0.5 w-4/5"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-3/4"
                style={{ backgroundColor: colors.secondary }}
              />
            </div>
          </div>
        )

      case "sidebar-accent":
        return (
          <div className="flex gap-2 h-full">
            <div
              className="w-1/3 flex flex-col gap-1"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="h-1 bg-white m-1" />
              <div className="h-1 bg-white/50 m-1" />
            </div>
            <div className="flex-1 space-y-1">
              <div
                className="h-0.5 w-4/5"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-3/4"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        )

      case "split-column":
        return (
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              {template.hasProfilePic && (
                <div
                  className="w-6 h-6 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.primary }}
              />
              <div
                className="h-0.5 w-4/5"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
            <div
              className="w-1 flex-shrink-0"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="flex-1 space-y-1">
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-5/6"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        )

      case "infographic":
        return (
          <div className="space-y-2">
            <div className="flex gap-1 items-center">
              <div
                className="flex-1 h-1 rounded-full"
                style={{ backgroundColor: colors.primary, width: "75%" }}
              />
              <span className="text-[7px]" style={{ color: colors.primary }}>
                75%
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <div
                className="flex-1 h-1 rounded-full"
                style={{ backgroundColor: colors.accent, width: "85%" }}
              />
              <span className="text-[7px]" style={{ color: colors.accent }}>
                85%
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <div
                className="flex-1 h-1 rounded-full"
                style={{ backgroundColor: colors.secondary, width: "65%" }}
              />
              <span className="text-[7px]" style={{ color: colors.secondary }}>
                65%
              </span>
            </div>
          </div>
        )

      case "modern-gradient":
        return (
          <div className="space-y-2">
            <div
              className="h-2 w-20 rounded-full"
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`
              }}
            />
            <div className="space-y-1">
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-5/6"
                style={{ backgroundColor: colors.accent }}
              />
              <div
                className="h-0.5 w-4/5"
                style={{ backgroundColor: colors.primary }}
              />
            </div>
          </div>
        )

      case "professional-grid":
        return (
          <div className="grid grid-cols-2 gap-1">
            <div>
              <div
                className="h-1 w-3/4 mb-1"
                style={{ backgroundColor: colors.primary }}
              />
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
            <div>
              <div
                className="h-1 w-2/3 mb-1"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
            <div className="col-span-2">
              <div
                className="h-0.5 w-5/6"
                style={{ backgroundColor: colors.primary }}
              />
            </div>
          </div>
        )

      case "creative-borders":
        return (
          <div
            className="p-1 space-y-1"
            style={{ borderLeft: `3px solid ${colors.primary}` }}
          >
            <div
              className="h-1 w-3/4"
              style={{ backgroundColor: colors.primary }}
            />
            <div
              className="h-0.5 w-full"
              style={{ backgroundColor: colors.accent }}
            />
            <div
              className="h-0.5 w-4/5"
              style={{ backgroundColor: colors.secondary }}
            />
          </div>
        )

      case "tech-focused":
        return (
          <div className="space-y-1.5 font-mono text-[6px]">
            <div
              className="px-1 py-0.5"
              style={{
                backgroundColor: colors.background,
                border: `0.5px solid ${colors.primary}`
              }}
            >
              <div style={{ color: colors.primary }}>{">"} npm run build</div>
            </div>
            <div className="space-y-0.5">
              <div
                className="h-0.5 w-4/5"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-3/4"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        )

      case "academic-formal":
        return (
          <div className="space-y-1 font-serif">
            <div
              className="h-0.5 w-full border-b"
              style={{ borderColor: colors.primary }}
            />
            <div
              className="text-[7px] font-bold"
              style={{ color: colors.primary }}
            >
              JOHN DOE
            </div>
            <div className="space-y-1">
              <div
                className="text-[6px] font-bold"
                style={{ color: colors.secondary }}
              >
                EDUCATION
              </div>
              <div
                className="h-0.5 w-5/6"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        )

      case "corporate-classic":
        return (
          <div className="space-y-2">
            <div
              className="h-1.5 w-20"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="space-y-1">
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-5/6"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        )

      case "artistic-flow":
        return (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-1">
                <div
                  className="w-1 rounded-full"
                  style={{ backgroundColor: colors.primary, height: `${8 + i * 4}px` }}
                />
                <div className="flex-1 space-y-0.5">
                  <div
                    className="h-0.5 w-3/4"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <div
                    className="h-0.5 w-2/3"
                    style={{ backgroundColor: colors.secondary }}
                  />
                </div>
              </div>
            ))}
          </div>
        )

      case "minimalist-serif":
        return (
          <div className="space-y-2 font-serif text-[6px]">
            <div className="italic" style={{ color: colors.primary }}>
              Professional Resume
            </div>
            <div className="space-y-0.5">
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-4/5"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        )

      case "bold-modern":
        return (
          <div className="space-y-2">
            <div
              className="h-2 w-full"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="space-y-1">
              <div
                className="h-0.5 w-5/6"
                style={{ backgroundColor: colors.secondary }}
              />
              <div
                className="h-0.5 w-3/4"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        )

      case "elegant-ornate":
        return (
          <div className="space-y-2">
            <div className="text-center">
              <div
                className="h-1 w-8 mx-auto mb-1"
                style={{ backgroundColor: colors.primary }}
              />
            </div>
            <div className="space-y-1">
              <div
                className="h-0.5 w-full"
                style={{ backgroundColor: colors.accent }}
              />
              <div
                className="h-0.5 w-5/6 mx-auto"
                style={{ backgroundColor: colors.secondary }}
              />
            </div>
          </div>
        )

      case "startup-trendy":
        return (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              <div
                className="h-1 flex-1"
                style={{ backgroundColor: colors.primary }}
              />
              <div
                className="h-1 flex-1"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
            <div
              className="h-0.5 w-full"
              style={{ backgroundColor: colors.secondary }}
            />
          </div>
        )

      default:
        return <div>Default</div>
    }
  }

  return (
    <div
      className={`w-full h-64 p-4 overflow-hidden transition-all duration-300 ${
        isHovered ? "shadow-lg" : ""
      }`}
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.borderColor || colors.accent}`
      }}
    >
      {getLayoutPreview()}
    </div>
  )
}
