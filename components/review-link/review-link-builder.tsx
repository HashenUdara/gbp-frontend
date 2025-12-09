"use client"

import { useState } from "react"
import { ReviewLinkSidebar } from "./review-link-sidebar"
import { ReviewLinkSettings } from "./review-link-settings"
import { ReviewPagePreview } from "./review-page-preview"

export interface ReviewLinkConfig {
  businessName: string
  businessLogo: string
  headline: string
  subheadline: string
  thankYouMessage: string
  primaryColor: string
  backgroundColor: string
  showRatingFirst: boolean
  minRatingForGoogle: number
  enableFeedbackForLowRating: boolean
  customSlug: string
  isActive: boolean
  showBusinessName: boolean
  showLogo: boolean
  showAddress: boolean
  feedbackPlaceholder: string
  buttonText: string
}

const defaultConfig: ReviewLinkConfig = {
  businessName: "TechCafe Downtown",
  businessLogo: "/cafe-logo.png",
  headline: "How was your experience?",
  subheadline: "We value your feedback! Please take a moment to rate your visit.",
  thankYouMessage: "Thank you for your feedback! We truly appreciate it.",
  primaryColor: "#22C55E",
  backgroundColor: "#ffffff",
  showRatingFirst: true,
  minRatingForGoogle: 4,
  enableFeedbackForLowRating: true,
  customSlug: "techcafe-downtown",
  isActive: true,
  showBusinessName: true,
  showLogo: true,
  showAddress: false,
  feedbackPlaceholder: "Tell us more about your experience...",
  buttonText: "Submit Review",
}

export function ReviewLinkBuilder() {
  const [config, setConfig] = useState<ReviewLinkConfig>(defaultConfig)
  const [previewRating, setPreviewRating] = useState<number>(0)
  const [previewStep, setPreviewStep] = useState<"rating" | "feedback" | "redirect" | "thankyou">("rating")

  const updateConfig = (updates: Partial<ReviewLinkConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const resetPreview = () => {
    setPreviewRating(0)
    setPreviewStep("rating")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="flex">
        <ReviewLinkSidebar />
        <main className="flex-1 lg:pl-64">
          <div className="h-screen flex">
            {/* Left Panel - Settings Wizard */}
            <div className="w-[520px] flex flex-col border-r border-white/[0.06]">
              <ReviewLinkSettings config={config} updateConfig={updateConfig} resetPreview={resetPreview} />
            </div>

            {/* Right Panel - Preview */}
            <div className="flex-1 flex flex-col bg-[#0A0A0B]">
              <div className="px-8 py-6 border-b border-white/[0.06]">
                <span className="text-sm text-zinc-500">Preview</span>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ReviewPagePreview
                  config={config}
                  previewRating={previewRating}
                  setPreviewRating={setPreviewRating}
                  previewStep={previewStep}
                  setPreviewStep={setPreviewStep}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
