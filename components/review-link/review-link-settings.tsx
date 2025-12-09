"use client";

import type { ReviewLinkConfig } from "./review-link-builder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Copy,
  ExternalLink,
  QrCode,
  Check,
  ArrowLeft,
  ArrowRight,
  Mail,
  Bell,
  Link2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { LogoUpload } from "./logo-upload";
import { CoverUpload } from "./cover-upload";

interface ReviewLinkSettingsProps {
  config: ReviewLinkConfig;
  updateConfig: (updates: Partial<ReviewLinkConfig>) => void;
  resetPreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

const STEPS = [
  { id: 1, title: "Content", subtitle: "Write your headlines and messages" },
  {
    id: 2,
    title: "Responses",
    subtitle: "Configure rating flows and messages",
  },
  { id: 3, title: "Appearance", subtitle: "Customize colors and branding" },
  {
    id: 4,
    title: "Link & Sharing",
    subtitle: "Get your review link and settings",
  },
];

export function ReviewLinkSettings({
  config,
  updateConfig,
  resetPreview,
  onSaveDraft,
  onPublish,
}: ReviewLinkSettingsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const reviewUrl = `https://review.gbpmanager.com/${config.customSlug}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Step Indicator */}
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
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
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

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {STEPS[currentStep - 1].title}
          </h2>
          <p className="text-zinc-500 text-base">
            {STEPS[currentStep - 1].subtitle}
          </p>
        </div>

        {/* STEP 1: Content */}
        {currentStep === 1 && (
          <div className="space-y-8 max-w-2xl">
            <div>
              <Label className="text-base font-semibold text-white mb-3 block">
                Main Headline
              </Label>
              <Input
                value={config.headline}
                onChange={(e) => updateConfig({ headline: e.target.value })}
                className="h-14 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 rounded-xl text-base"
                placeholder="How was your experience?"
              />
            </div>

            <div>
              <Label className="text-base font-semibold text-white mb-3 block">
                Supporting Text
              </Label>
              <Textarea
                value={config.subheadline}
                onChange={(e) => updateConfig({ subheadline: e.target.value })}
                className="border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 rounded-xl resize-none text-base min-h-[120px]"
                placeholder="We value your feedback! Please take a moment to rate your visit."
              />
            </div>

            <div className="border-t border-white/[0.06] pt-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Display Options
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-base font-medium text-white">
                      Show business name
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">
                      Display your business name at the top
                    </p>
                  </div>
                  <Switch
                    checked={config.showBusinessName}
                    onCheckedChange={(checked) =>
                      updateConfig({ showBusinessName: checked })
                    }
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800"
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-base font-medium text-white">
                      Show logo
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">
                      Display your business logo
                    </p>
                  </div>
                  <Switch
                    checked={config.showLogo}
                    onCheckedChange={(checked) =>
                      updateConfig({ showLogo: checked })
                    }
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800"
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-base font-medium text-white">
                      Show address
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">
                      Display your business address
                    </p>
                  </div>
                  <Switch
                    checked={config.showAddress}
                    onCheckedChange={(checked) =>
                      updateConfig({ showAddress: checked })
                    }
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Responses */}
        {currentStep === 2 && (
          <div className="space-y-8 max-w-2xl">
            {/* Rating Threshold */}
            <div className="border border-white/[0.08] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-base font-medium text-white">
                  Rating Threshold
                </p>
                <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                  {config.minRatingForGoogle}+ stars = positive
                </span>
              </div>
              <Slider
                value={[config.minRatingForGoogle]}
                onValueChange={(value) =>
                  updateConfig({ minRatingForGoogle: value[0] })
                }
                min={1}
                max={5}
                step={1}
                className="w-full mb-3"
              />
              <p className="text-sm text-zinc-500">
                Ratings at or above this will redirect to Google. Lower ratings
                will show the feedback form.
              </p>
            </div>

            {/* Positive Response */}
            <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-semibold text-emerald-400">
                  Positive Response ({config.minRatingForGoogle}+ stars)
                </span>
              </div>

              <div>
                <Label className="text-sm text-zinc-400 mb-2 block">
                  Headline
                </Label>
                <Input
                  value={config.positiveHeadline}
                  onChange={(e) =>
                    updateConfig({ positiveHeadline: e.target.value })
                  }
                  className="h-12 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-emerald-500/30 rounded-xl"
                  placeholder="Thank you! 🎉"
                />
              </div>

              <div>
                <Label className="text-sm text-zinc-400 mb-2 block">
                  Message
                </Label>
                <Textarea
                  value={config.positiveSubheadline}
                  onChange={(e) =>
                    updateConfig({ positiveSubheadline: e.target.value })
                  }
                  className="border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-emerald-500/30 rounded-xl resize-none min-h-[80px]"
                  placeholder="We're thrilled you had a great experience!"
                />
              </div>

              <div>
                <Label className="text-sm text-zinc-400 mb-2 block">
                  Button Text
                </Label>
                <Input
                  value={config.positiveCtaText}
                  onChange={(e) =>
                    updateConfig({ positiveCtaText: e.target.value })
                  }
                  className="h-12 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-emerald-500/30 rounded-xl"
                  placeholder="Leave a Google Review"
                />
              </div>

              <div>
                <Label className="text-sm text-zinc-400 mb-2 block">
                  Google Review URL *
                </Label>
                <Input
                  value={config.positiveRedirectUrl}
                  onChange={(e) =>
                    updateConfig({ positiveRedirectUrl: e.target.value })
                  }
                  className="h-12 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-emerald-500/30 rounded-xl"
                  placeholder="https://g.page/r/your-business/review"
                />
                <p className="text-xs text-zinc-500 mt-2">
                  Paste your Google review link here
                </p>
              </div>
            </div>

            {/* Negative Response */}
            <div className="border border-orange-500/20 bg-orange-500/5 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-sm font-semibold text-orange-400">
                  Negative Response (below {config.minRatingForGoogle} stars)
                </span>
              </div>

              <div>
                <Label className="text-sm text-zinc-400 mb-2 block">
                  Headline
                </Label>
                <Input
                  value={config.negativeHeadline}
                  onChange={(e) =>
                    updateConfig({ negativeHeadline: e.target.value })
                  }
                  className="h-12 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/30 rounded-xl"
                  placeholder="We're sorry to hear that"
                />
              </div>

              <div>
                <Label className="text-sm text-zinc-400 mb-2 block">
                  Message
                </Label>
                <Textarea
                  value={config.negativeSubheadline}
                  onChange={(e) =>
                    updateConfig({ negativeSubheadline: e.target.value })
                  }
                  className="border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/30 rounded-xl resize-none min-h-[80px]"
                  placeholder="We appreciate your honesty. Please let us know how we can improve."
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-white">
                    Enable feedback form
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Collect private feedback from unhappy customers
                  </p>
                </div>
                <Switch
                  checked={config.enableFeedbackForLowRating}
                  onCheckedChange={(checked) =>
                    updateConfig({ enableFeedbackForLowRating: checked })
                  }
                  className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-zinc-800"
                />
              </div>

              {config.enableFeedbackForLowRating && (
                <>
                  <div>
                    <Label className="text-sm text-zinc-400 mb-2 block">
                      Button Text
                    </Label>
                    <Input
                      value={config.negativeCtaText}
                      onChange={(e) =>
                        updateConfig({ negativeCtaText: e.target.value })
                      }
                      className="h-12 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/30 rounded-xl"
                      placeholder="Submit Feedback"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-zinc-400 mb-2 block">
                      Feedback Placeholder
                    </Label>
                    <Input
                      value={config.feedbackPlaceholder}
                      onChange={(e) =>
                        updateConfig({ feedbackPlaceholder: e.target.value })
                      }
                      className="h-12 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/30 rounded-xl"
                      placeholder="Tell us what went wrong..."
                    />
                  </div>
                </>
              )}
            </div>

            {/* Email Notifications */}
            <div className="border border-white/[0.08] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-semibold text-white">
                  Email Notifications
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-white">
                    Notify on negative feedback
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Get an email when someone leaves a low rating
                  </p>
                </div>
                <Switch
                  checked={config.notifyOnNegative}
                  onCheckedChange={(checked) =>
                    updateConfig({ notifyOnNegative: checked })
                  }
                  className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800"
                />
              </div>

              {config.notifyOnNegative && (
                <div>
                  <Label className="text-sm text-zinc-400 mb-2 block">
                    Notification Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      type="email"
                      value={config.notifyEmail}
                      onChange={(e) =>
                        updateConfig({ notifyEmail: e.target.value })
                      }
                      className="h-12 pl-12 border border-white/[0.08] bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 rounded-xl"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Appearance */}
        {currentStep === 3 && (
          <div className="space-y-8 max-w-2xl">
            {/* Theme Selection */}
            <div>
              <Label className="text-base font-semibold text-white mb-4 block">
                Page Theme
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => updateConfig({ theme: "light" })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    config.theme === "light"
                      ? "border-emerald-500"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="w-full h-20 rounded-lg bg-white mb-3"></div>
                  <span
                    className={`text-sm ${
                      config.theme === "light"
                        ? "text-white font-medium"
                        : "text-zinc-500"
                    }`}
                  >
                    Light
                  </span>
                </button>

                <button
                  onClick={() => updateConfig({ theme: "dark" })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    config.theme === "dark"
                      ? "border-emerald-500"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="w-full h-20 rounded-lg bg-zinc-900 border border-white/10 mb-3"></div>
                  <span
                    className={`text-sm ${
                      config.theme === "dark"
                        ? "text-white font-medium"
                        : "text-zinc-500"
                    }`}
                  >
                    Dark
                  </span>
                </button>
              </div>
            </div>

            {/* Primary Color */}
            <div>
              <Label className="text-base font-semibold text-white mb-4 block">
                Accent Color
              </Label>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl shadow-lg"
                  style={{ backgroundColor: config.primaryColor }}
                />
                <div className="flex gap-3">
                  {[
                    "#22C55E",
                    "#3B82F6",
                    "#8B5CF6",
                    "#F59E0B",
                    "#EF4444",
                    "#EC4899",
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateConfig({ primaryColor: color })}
                      className={`w-12 h-12 rounded-xl transition-all hover:scale-110 border-2 ${
                        config.primaryColor === color
                          ? "border-white scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Logo Upload */}
            <div className="border border-white/10 rounded-xl p-6 space-y-4">
              <Label className="text-base font-semibold text-white block">
                Custom Logo
              </Label>
              <LogoUpload
                value={config.logoUrl}
                onChange={(url) => updateConfig({ logoUrl: url })}
              />
            </div>

            {/* Cover Image Upload */}
            <div className="border border-white/10 rounded-xl p-6 space-y-4">
              <Label className="text-base font-semibold text-white block">
                Cover Image
              </Label>
              <p className="text-sm text-zinc-500 -mt-2">
                Optional background image for your review page
              </p>
              <CoverUpload
                value={config.coverUrl}
                onChange={(url) => updateConfig({ coverUrl: url })}
              />
            </div>
          </div>
        )}

        {/* STEP 4: Link & Sharing */}
        {currentStep === 4 && (
          <div className="space-y-8 max-w-2xl">
            {/* Custom Slug */}
            <div>
              <Label className="text-base font-semibold text-white mb-3 block">
                Custom URL Slug
              </Label>
              <div className="flex items-center gap-2 border border-white/[0.08] rounded-xl p-4 bg-white/[0.02]">
                <span className="text-sm text-zinc-500">
                  review.gbpmanager.com/
                </span>
                <Input
                  value={config.customSlug}
                  onChange={(e) =>
                    updateConfig({
                      customSlug: e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-"),
                    })
                  }
                  className="flex-1 h-10 border-0 bg-transparent text-white placeholder:text-zinc-600 focus-visible:ring-0 px-0"
                  placeholder="your-business"
                />
              </div>
            </div>

            {/* Share Link */}
            <div>
              <Label className="text-base font-semibold text-white mb-3 block">
                Share Your Link
              </Label>
              <div className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                <Link2 className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-300 font-mono truncate flex-1">
                  {reviewUrl}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2.5 hover:bg-white/[0.06] rounded-lg transition-colors text-zinc-400 hover:text-white"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
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

            {/* Link Active Toggle */}
            <div className="flex items-center justify-between py-4 border border-white/[0.08] rounded-xl px-6">
              <div>
                <p className="text-base font-medium text-white">Link Active</p>
                <p className="text-sm text-zinc-500 mt-1">
                  Enable or pause this review link
                </p>
              </div>
              <Switch
                checked={config.isActive}
                onCheckedChange={(checked) =>
                  updateConfig({ isActive: checked })
                }
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-800"
              />
            </div>

            {/* Status Indicator */}
            <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  {config.status === "published" ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    {config.status === "published"
                      ? "Link Published!"
                      : "Ready to Publish"}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {config.status === "published"
                      ? "Your review link is live and collecting reviews."
                      : "Your review link is ready. Click Publish to make it live."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
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

        <div className="flex items-center gap-3">
          {currentStep === STEPS.length ? (
            <>
              <Button
                onClick={onSaveDraft}
                variant="outline"
                className="h-12 px-6 border-white/10 text-white hover:bg-white/5 rounded-xl"
              >
                Save Draft
              </Button>
              <Button
                onClick={onPublish}
                className="h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </>
          ) : (
            <Button
              onClick={nextStep}
              className="h-12 px-8 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-medium"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
