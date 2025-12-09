"use client"

import type { ReviewLinkConfig } from "./review-link-builder"
import { Star, ArrowRight, Check, Smartphone, Monitor, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ReviewPagePreviewProps {
  config: ReviewLinkConfig
  previewRating: number
  setPreviewRating: (rating: number) => void
  previewStep: "rating" | "feedback" | "redirect" | "thankyou"
  setPreviewStep: (step: "rating" | "feedback" | "redirect" | "thankyou") => void
}

export function ReviewPagePreview({
  config,
  previewRating,
  setPreviewRating,
  previewStep,
  setPreviewStep,
}: ReviewPagePreviewProps) {
  const [hoveredStar, setHoveredStar] = useState(0)
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile")
  const [feedback, setFeedback] = useState("")

  const handleStarClick = (rating: number) => {
    setPreviewRating(rating)
    if (config.showRatingFirst) {
      setTimeout(() => {
        if (rating >= config.minRatingForGoogle) {
          setPreviewStep("redirect")
          setTimeout(() => setPreviewStep("thankyou"), 1500)
        } else if (config.enableFeedbackForLowRating) {
          setPreviewStep("feedback")
        } else {
          setPreviewStep("thankyou")
        }
      }, 500)
    }
  }

  const handleFeedbackSubmit = () => {
    setPreviewStep("thankyou")
  }

  const resetPreview = () => {
    setPreviewRating(0)
    setPreviewStep("rating")
    setFeedback("")
  }

  const isDarkBackground =
    config.backgroundColor.toLowerCase() === "#18181b" || config.backgroundColor.toLowerCase() === "#09090b"

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/[0.04] rounded-lg p-1">
            <button
              onClick={() => setViewMode("mobile")}
              className={cn(
                "p-2 rounded-md transition-all",
                viewMode === "mobile" ? "bg-white text-zinc-900" : "text-zinc-500 hover:text-white",
              )}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("desktop")}
              className={cn(
                "p-2 rounded-md transition-all",
                viewMode === "desktop" ? "bg-white text-zinc-900" : "text-zinc-500 hover:text-white",
              )}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-zinc-600">Preview</span>
        </div>
        <button
          onClick={resetPreview}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div
          className={cn(
            "bg-white rounded-2xl shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300",
            viewMode === "mobile" ? "w-[375px]" : "w-[720px]",
          )}
        >
          <div className="bg-zinc-100 px-4 py-2.5 flex items-center">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white rounded-lg px-3 py-1.5 text-[11px] text-zinc-500 text-center max-w-[220px] mx-auto truncate font-mono">
                review.gbpmanager.com/{config.customSlug}
              </div>
            </div>
          </div>

          {/* Review Page Content */}
          <div
            className="p-10 min-h-[500px] flex flex-col items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: config.backgroundColor }}
          >
            {previewStep === "rating" && (
              <div className="text-center space-y-8 max-w-sm">
                {/* Logo */}
                <div className="flex justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg"
                    style={{ backgroundColor: config.primaryColor, color: "#ffffff" }}
                  >
                    {config.businessName.charAt(0)}
                  </div>
                </div>

                {/* Business Name & Headline */}
                <div className="space-y-3">
                  <p className={cn("text-sm font-medium", isDarkBackground ? "text-white/50" : "text-zinc-400")}>
                    {config.businessName}
                  </p>
                  <h1
                    className={cn(
                      "text-2xl font-semibold tracking-tight",
                      isDarkBackground ? "text-white" : "text-zinc-900",
                    )}
                  >
                    {config.headline}
                  </h1>
                  <p className={cn("text-sm leading-relaxed", isDarkBackground ? "text-white/50" : "text-zinc-500")}>
                    {config.subheadline}
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => handleStarClick(star)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={cn(
                          "w-12 h-12 transition-all",
                          hoveredStar >= star || previewRating >= star
                            ? "fill-amber-400 text-amber-400"
                            : isDarkBackground
                              ? "text-white/15"
                              : "text-zinc-200",
                        )}
                      />
                    </button>
                  ))}
                </div>

                {previewRating > 0 && (
                  <p
                    className={cn(
                      "text-sm font-medium animate-in fade-in",
                      isDarkBackground ? "text-white/60" : "text-zinc-500",
                    )}
                  >
                    {previewRating === 5 && "Excellent!"}
                    {previewRating === 4 && "Great!"}
                    {previewRating === 3 && "Good"}
                    {previewRating === 2 && "Fair"}
                    {previewRating === 1 && "We're sorry"}
                  </p>
                )}
              </div>
            )}

            {previewStep === "feedback" && (
              <div className="text-center space-y-6 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-5 h-5",
                        previewRating >= star
                          ? "fill-amber-400 text-amber-400"
                          : isDarkBackground
                            ? "text-white/15"
                            : "text-zinc-200",
                      )}
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <h2
                    className={cn(
                      "text-xl font-semibold tracking-tight",
                      isDarkBackground ? "text-white" : "text-zinc-900",
                    )}
                  >
                    What could we improve?
                  </h2>
                  <p className={cn("text-sm", isDarkBackground ? "text-white/50" : "text-zinc-500")}>
                    Your feedback helps us get better
                  </p>
                </div>

                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts..."
                  className={cn(
                    "min-h-[120px] resize-none rounded-xl border-0",
                    isDarkBackground
                      ? "bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-white/20"
                      : "bg-zinc-100 focus-visible:ring-zinc-300",
                  )}
                />

                <Button
                  onClick={handleFeedbackSubmit}
                  className="w-full h-12 rounded-xl font-medium text-white"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Send Feedback
                </Button>
              </div>
            )}

            {previewStep === "redirect" && (
              <div className="text-center space-y-6 animate-in fade-in">
                <div className="flex justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center animate-pulse"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <ArrowRight className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2
                    className={cn(
                      "text-xl font-semibold tracking-tight",
                      isDarkBackground ? "text-white" : "text-zinc-900",
                    )}
                  >
                    Opening Google...
                  </h2>
                  <p className={cn("text-sm", isDarkBackground ? "text-white/50" : "text-zinc-500")}>
                    Please share your review there
                  </p>
                </div>
              </div>
            )}

            {previewStep === "thankyou" && (
              <div className="text-center space-y-6 animate-in fade-in zoom-in-95">
                <div className="flex justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Check className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2
                    className={cn(
                      "text-2xl font-semibold tracking-tight",
                      isDarkBackground ? "text-white" : "text-zinc-900",
                    )}
                  >
                    Thank you!
                  </h2>
                  <p className={cn("text-sm", isDarkBackground ? "text-white/50" : "text-zinc-500")}>
                    {config.thankYouMessage}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="py-4 text-center" style={{ backgroundColor: config.backgroundColor }}>
            <p className={cn("text-[10px] tracking-widest", isDarkBackground ? "text-white/20" : "text-zinc-300")}>
              POWERED BY GBP MANAGER
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
