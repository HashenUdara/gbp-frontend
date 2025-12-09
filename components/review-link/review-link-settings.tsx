"use client"

import type { ReviewLinkConfig } from "./review-link-builder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Copy, ExternalLink, QrCode, Check, ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

interface ReviewLinkSettingsProps {
  config: ReviewLinkConfig
  updateConfig: (updates: Partial<ReviewLinkConfig>) => void
  resetPreview: () => void
}

const STEPS = [
  { id: 1, title: "Content", subtitle: "Write your headlines and messages" },
  { id: 2, title: "Behavior", subtitle: "Configure rating and redirect rules" },
  { id: 3, title: "Appearance", subtitle: "Customize colors and styling" },
  { id: 4, title: "Sharing", subtitle: "Get your review link and QR code" },
]

export function ReviewLinkSettings({ config, updateConfig, resetPreview }: ReviewLinkSettingsProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const reviewUrl = `https://review.gbpmanager.com/${config.customSlug}`
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reviewUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-8 py-8 border-b border-white/[0.06]">
        <div className="flex items-center justify-between max-w-xl">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    currentStep > step.id
                      ? "bg-emerald-500 text-white"
                      : currentStep === step.id
                        ? "bg-white text-zinc-900"
                        : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </button>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-1 transition-colors ${
                    currentStep > step.id ? "bg-emerald-500" : "bg-zinc-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{STEPS[currentStep - 1].title}</h2>
          <p className="text-zinc-500 text-base">{STEPS[currentStep - 1].subtitle}</p>
        </div>

        {currentStep === 1 && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <Label className="text-base font-semibold text-white mb-3 block">Main Headline</Label>
              <Input
                value={config.headline}
                onChange={(e) => updateConfig({ headline: e.target.value })}
                className="h-14 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 rounded-xl text-base"
                placeholder="How was your experience?"
              />
            </div>

            <div>
              <Label className="text-base font-semibold text-white mb-3 block">Supporting Text</Label>
              <Textarea
                value={config.subheadline}
                onChange={(e) => updateConfig({ subheadline: e.target.value })}
                className="border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 rounded-xl resize-none text-base min-h-[120px]"
                placeholder="We value your feedback! Please take a moment to rate your visit."
              />
            </div>

            <div className="border-t border-white/[0.06] pt-8">
              <h3 className="text-xl font-semibold text-white mb-6">Display Options</h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-base font-medium text-white">Show business name</p>
                    <p className="text-sm text-zinc-500 mt-1">Display your business name at the top</p>
                  </div>
                  <Switch checked={true} className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800" />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-base font-medium text-white">Show logo</p>
                    <p className="text-sm text-zinc-500 mt-1">Display your business logo</p>
                  </div>
                  <Switch checked={true} className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800" />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-base font-medium text-white">Show address</p>
                    <p className="text-sm text-zinc-500 mt-1">Display your business address</p>
                  </div>
                  <Switch
                    checked={false}
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between py-4 border border-white/[0.08] rounded-xl px-6">
              <div>
                <p className="text-base font-medium text-white">Rating First</p>
                <p className="text-sm text-zinc-500 mt-1">Ask for rating before feedback</p>
              </div>
              <Switch
                checked={config.showRatingFirst}
                onCheckedChange={(checked) => updateConfig({ showRatingFirst: checked })}
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800"
              />
            </div>

            <div className="border border-white/[0.08] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-base font-medium text-white">Google Redirect Threshold</p>
                <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                  {config.minRatingForGoogle}+ stars
                </span>
              </div>
              <Slider
                value={[config.minRatingForGoogle]}
                onValueChange={(value) => updateConfig({ minRatingForGoogle: value[0] })}
                min={1}
                max={5}
                step={1}
                className="w-full mb-3"
              />
              <p className="text-sm text-zinc-500">Ratings at or above this will redirect to Google review page</p>
            </div>

            <div className="flex items-center justify-between py-4 border border-white/[0.08] rounded-xl px-6">
              <div>
                <p className="text-base font-medium text-white">Private Feedback</p>
                <p className="text-sm text-zinc-500 mt-1">Collect feedback for ratings below threshold</p>
              </div>
              <Switch
                checked={config.enableFeedbackForLowRating}
                onCheckedChange={(checked) => updateConfig({ enableFeedbackForLowRating: checked })}
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800"
              />
            </div>

            <div className="flex items-center justify-between py-4 border border-white/[0.08] rounded-xl px-6">
              <div>
                <p className="text-base font-medium text-white">Link Active</p>
                <p className="text-sm text-zinc-500 mt-1">Enable or pause this review link</p>
              </div>
              <Switch
                checked={config.isActive}
                onCheckedChange={(checked) => updateConfig({ isActive: checked })}
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-800"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <Label className="text-base font-semibold text-white mb-4 block">Brand Color</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl shadow-lg" style={{ backgroundColor: config.primaryColor }} />
                <div className="flex gap-3">
                  {["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateConfig({ primaryColor: color })}
                      className={`w-12 h-12 rounded-xl transition-all hover:scale-110 border-2 ${
                        config.primaryColor === color ? "border-white scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold text-white mb-4 block">Page Background</Label>
              <div className="flex gap-4">
                {[
                  { color: "#ffffff", label: "Light" },
                  { color: "#F4F4F5", label: "Gray" },
                  { color: "#18181B", label: "Dark" },
                  { color: "#09090B", label: "Black" },
                ].map((bg) => (
                  <button
                    key={bg.color}
                    onClick={() => updateConfig({ backgroundColor: bg.color })}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-20 h-20 rounded-xl border-2 transition-all ${
                        config.backgroundColor === bg.color
                          ? "border-white scale-105"
                          : "border-white/10 hover:border-white/30"
                      }`}
                      style={{ backgroundColor: bg.color }}
                    />
                    <span
                      className={`text-sm ${config.backgroundColor === bg.color ? "text-white font-medium" : "text-zinc-500"}`}
                    >
                      {bg.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold text-white mb-3 block">Thank You Message</Label>
              <Textarea
                value={config.thankYouMessage}
                onChange={(e) => updateConfig({ thankYouMessage: e.target.value })}
                className="border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 rounded-xl resize-none text-base min-h-[100px]"
                placeholder="Thank you for your feedback! We truly appreciate it."
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <Label className="text-base font-semibold text-white mb-3 block">Custom URL Slug</Label>
              <div className="flex items-center gap-2 border border-white/[0.08] rounded-xl p-4 bg-white/[0.02]">
                <span className="text-sm text-zinc-500">review.gbpmanager.com/</span>
                <Input
                  value={config.customSlug}
                  onChange={(e) => updateConfig({ customSlug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="flex-1 h-10 border-0 bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-0 px-0"
                  placeholder="your-business"
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold text-white mb-3 block">Share Your Link</Label>
              <div className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                <span className="text-sm text-zinc-300 font-mono truncate flex-1">{reviewUrl}</span>
                <button
                  onClick={copyToClipboard}
                  className="p-2.5 hover:bg-white/[0.06] rounded-lg transition-colors text-zinc-400 hover:text-white"
                >
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.06] rounded-xl transition-colors">
                  <QrCode className="w-5 h-5" />
                  Download QR Code
                </button>
                <button className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.06] rounded-xl transition-colors">
                  <ExternalLink className="w-5 h-5" />
                  Open Preview
                </button>
              </div>
            </div>

            <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">Setup Complete!</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Your review link is ready to share. Customers can now leave reviews and you'll see them in your
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-8 py-6 border-t border-white/[0.06] flex items-center justify-between">
        <Button
          onClick={prevStep}
          disabled={currentStep === 1}
          variant="ghost"
          className="h-12 px-6 text-white disabled:opacity-30 hover:bg-white/[0.06] rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep === STEPS.length}
          className="h-12 px-8 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-medium disabled:opacity-30"
        >
          {currentStep === STEPS.length ? "Done" : "Continue"}
          {currentStep < STEPS.length && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
