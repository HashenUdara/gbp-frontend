"use client";

import { useState } from "react";
import { ReviewLinkSidebar } from "./review-link-sidebar";
import { ReviewLinkSettings } from "./review-link-settings";
import { ReviewPagePreview } from "./review-page-preview";

export interface ReviewLinkConfig {
  // Link Settings
  customSlug: string;
  isActive: boolean;
  status: "draft" | "published";

  // Appearance
  theme: "light" | "dark";
  primaryColor: string;

  // Content
  headline: string;
  subheadline: string;
  showBusinessName: boolean;
  showLogo: boolean;
  showAddress: boolean;

  // Positive Response
  positiveHeadline: string;
  positiveSubheadline: string;
  positiveCtaText: string;
  positiveRedirectUrl: string;

  // Negative Response
  negativeHeadline: string;
  negativeSubheadline: string;
  negativeCtaText: string;
  enableFeedbackForLowRating: boolean;
  feedbackPlaceholder: string;

  // Behavior
  minRatingForGoogle: number;

  // Top 5 Features
  logoUrl: string;
  coverUrl: string;
  notifyEmail: string;
  notifyOnNegative: boolean;
}

const defaultConfig: ReviewLinkConfig = {
  // Link Settings
  customSlug: "techcafe-downtown",
  isActive: true,
  status: "draft",

  // Appearance
  theme: "light",
  primaryColor: "#22C55E",

  // Content
  headline: "How was your experience?",
  subheadline:
    "We value your feedback! Please take a moment to rate your visit.",
  showBusinessName: true,
  showLogo: true,
  showAddress: false,

  // Positive Response
  positiveHeadline: "Thank you! 🎉",
  positiveSubheadline:
    "We're thrilled you had a great experience! Would you mind sharing your feedback on Google?",
  positiveCtaText: "Leave a Google Review",
  positiveRedirectUrl: "",

  // Negative Response
  negativeHeadline: "We're sorry to hear that",
  negativeSubheadline:
    "We appreciate your honesty. Please let us know how we can improve.",
  negativeCtaText: "Submit Feedback",
  enableFeedbackForLowRating: true,
  feedbackPlaceholder:
    "Tell us what went wrong and how we can make it right...",

  // Behavior
  minRatingForGoogle: 4,

  // Top 5 Features
  logoUrl: "",
  coverUrl: "",
  notifyEmail: "",
  notifyOnNegative: false,
};

export function ReviewLinkBuilder() {
  const [config, setConfig] = useState<ReviewLinkConfig>(defaultConfig);
  const [previewRating, setPreviewRating] = useState<number>(0);
  const [previewStep, setPreviewStep] = useState<
    "rating" | "feedback" | "redirect" | "thankyou"
  >("rating");

  const updateConfig = (updates: Partial<ReviewLinkConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetPreview = () => {
    setPreviewRating(0);
    setPreviewStep("rating");
  };

  const handleSaveDraft = () => {
    updateConfig({ status: "draft" });
    // TODO: API call to save draft
    console.log("Saving draft:", config);
  };

  const handlePublish = () => {
    updateConfig({ status: "published" });
    // TODO: API call to publish
    console.log("Publishing:", config);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="flex">
        <ReviewLinkSidebar />
        <main className="flex-1 lg:pl-64">
          <div className="h-screen flex">
            {/* Left Panel - Settings Wizard */}
            <div className="w-[520px] flex flex-col border-r border-white/[0.06]">
              <ReviewLinkSettings
                config={config}
                updateConfig={updateConfig}
                resetPreview={resetPreview}
                onSaveDraft={handleSaveDraft}
                onPublish={handlePublish}
              />
            </div>

            {/* Right Panel - Preview */}
            <div className="flex-1 flex flex-col bg-[#0A0A0B]">
              <div className="px-8 py-6 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-sm text-zinc-500">Preview</span>
                {config.status === "draft" && (
                  <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                    Draft
                  </span>
                )}
                {config.status === "published" && (
                  <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                    Published
                  </span>
                )}
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
  );
}
