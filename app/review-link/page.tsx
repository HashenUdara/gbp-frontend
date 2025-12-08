"use client";

import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { GBPSidebar } from "@/components/gbp-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  ExternalLink,
  QrCode,
  Check,
  Star,
  MapPin,
  Smartphone,
  Monitor,
  Globe,
  Palette,
  Type,
  Zap,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from "lucide-react";
import {
  mockReviewLinkSettings,
  colorPresets,
  gradientPresets,
  getReviewLinkUrl,
  type ReviewLinkSettings,
} from "@/lib/review-link-data";
import { mockBusinessProfile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Link", icon: Globe },
  { id: 2, label: "Style", icon: Palette },
  { id: 3, label: "Content", icon: Type },
  { id: 4, label: "Responses", icon: Zap },
];

export default function ReviewLinkPage() {
  const [settings, setSettings] = useState<ReviewLinkSettings>(
    mockReviewLinkSettings
  );
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "mobile"
  );
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [previewFeedback, setPreviewFeedback] = useState("");

  const reviewUrl = getReviewLinkUrl(settings.slug);

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateSettings = (updates: Partial<ReviewLinkSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  // Determine if the selected rating is positive or negative
  const isPositiveRating = selectedRating >= settings.minRatingToRedirect;
  const isNegativeRating =
    selectedRating > 0 && selectedRating < settings.minRatingToRedirect;

  return (
    <SidebarProvider>
      <GBPSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border/40 px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger className="-ml-1 text-muted-foreground/70 hover:text-foreground" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-border/40" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/profile"
                  className="text-muted-foreground/70 hover:text-foreground text-[13px]"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-border" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[13px] font-medium">
                  Review Link
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-muted/30">
          <div className="p-3 sm:p-4 md:p-6 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  Review Link
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Create a shareable link to collect customer reviews
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={settings.isActive ? "default" : "secondary"}
                  className={cn(
                    "px-3 py-1",
                    settings.isActive &&
                      "bg-green-500/10 text-green-600 border-green-500/20"
                  )}
                >
                  {settings.isActive ? "Active" : "Inactive"}
                </Badge>
                <Switch
                  checked={settings.isActive}
                  onCheckedChange={(checked: boolean) =>
                    updateSettings({ isActive: checked })
                  }
                />
              </div>
            </div>

            {/* Main Layout - Balanced Split */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 min-h-[calc(100vh-180px)]">
              {/* Settings Panel - Left Side */}
              <div className="space-y-4 order-last col-span-3 lg:order-first">
                {/* Step Navigation */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-background border border-border/50">
                  {steps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-all",
                        activeStep === step.id
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <step.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{step.label}</span>
                      <span className="sm:hidden">{step.id}</span>
                    </button>
                  ))}
                </div>

                {/* Step Content */}
                <div className="rounded-xl bg-background border border-border/50 overflow-hidden">
                  {/* Step 1: Link Settings */}
                  {activeStep === 1 && (
                    <div className="p-5 space-y-5">
                      <div>
                        <h3 className="text-base font-medium mb-1">
                          Your Review Link
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Customize and share your unique review URL
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="slug" className="text-sm font-medium">
                            URL Slug
                          </Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                              review.yourdomain.com/
                            </span>
                            <Input
                              id="slug"
                              value={settings.slug}
                              onChange={(e) =>
                                updateSettings({ slug: e.target.value })
                              }
                              className="rounded-l-none"
                              placeholder="your-business"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/50 border border-border/50">
                          <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="flex-1 text-sm font-medium truncate">
                            {reviewUrl}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="shrink-0 h-8"
                          >
                            {copied ? (
                              <>
                                <Check className="h-4 w-4 text-green-500 mr-1.5" />{" "}
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-1.5" /> Copy
                              </>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-8 w-8"
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button
                          onClick={() => setActiveStep(2)}
                          className="gap-2"
                        >
                          Next: Style <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Style Settings */}
                  {activeStep === 2 && (
                    <div className="p-5 space-y-5">
                      <div>
                        <h3 className="text-base font-medium mb-1">
                          Appearance
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Customize the look of your review page
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Theme</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => updateSettings({ theme: "light" })}
                              className={cn(
                                "flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all",
                                settings.theme === "light"
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <div className="w-4 h-4 rounded-full bg-white border border-gray-200" />
                              <span className="text-sm font-medium">Light</span>
                            </button>
                            <button
                              onClick={() => updateSettings({ theme: "dark" })}
                              className={cn(
                                "flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all",
                                settings.theme === "dark"
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <div className="w-4 h-4 rounded-full bg-gray-900 border border-gray-700" />
                              <span className="text-sm font-medium">Dark</span>
                            </button>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">
                              Use Gradient Background
                            </Label>
                            <Switch
                              checked={settings.useGradient}
                              onCheckedChange={(checked: boolean) =>
                                updateSettings({ useGradient: checked })
                              }
                            />
                          </div>
                        </div>

                        {!settings.useGradient ? (
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Accent Color
                            </Label>
                            <div className="grid grid-cols-8 gap-2">
                              {colorPresets.map((color) => (
                                <button
                                  key={color.value}
                                  onClick={() =>
                                    updateSettings({
                                      primaryColor: color.value,
                                    })
                                  }
                                  className={cn(
                                    "aspect-square rounded-lg border-2 transition-all hover:scale-105",
                                    settings.primaryColor === color.value
                                      ? "border-foreground ring-2 ring-foreground ring-offset-2"
                                      : "border-transparent"
                                  )}
                                  style={{ backgroundColor: color.value }}
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Gradient
                            </Label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {gradientPresets.map((gradient) => (
                                <button
                                  key={gradient.name}
                                  onClick={() =>
                                    updateSettings({
                                      gradientFrom: gradient.from,
                                      gradientTo: gradient.to,
                                    })
                                  }
                                  className={cn(
                                    "aspect-square rounded-lg border-2 transition-all hover:scale-105",
                                    settings.gradientFrom === gradient.from
                                      ? "border-foreground ring-2 ring-foreground ring-offset-2"
                                      : "border-transparent"
                                  )}
                                  style={{
                                    background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                                  }}
                                  title={gradient.name}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          onClick={() => setActiveStep(1)}
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => setActiveStep(3)}
                          className="gap-2"
                        >
                          Next: Content <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Initial Content */}
                  {activeStep === 3 && (
                    <div className="p-5 space-y-5">
                      <div>
                        <h3 className="text-base font-medium mb-1">
                          Initial Page Content
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          What customers see before rating
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="headline"
                            className="text-sm font-medium"
                          >
                            Headline
                          </Label>
                          <Input
                            id="headline"
                            value={settings.headline}
                            onChange={(e) =>
                              updateSettings({ headline: e.target.value })
                            }
                            placeholder="How was your experience?"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="subheadline"
                            className="text-sm font-medium"
                          >
                            Subheadline
                          </Label>
                          <Textarea
                            id="subheadline"
                            value={settings.subheadline}
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>
                            ) =>
                              updateSettings({ subheadline: e.target.value })
                            }
                            placeholder="We value your feedback..."
                            className="resize-none"
                            rows={2}
                          />
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <Label className="text-sm font-medium">
                            Display Options
                          </Label>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between py-1">
                              <span className="text-sm">
                                Show business name
                              </span>
                              <Switch
                                checked={settings.showBusinessName}
                                onCheckedChange={(checked: boolean) =>
                                  updateSettings({ showBusinessName: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between py-1">
                              <span className="text-sm">Show logo</span>
                              <Switch
                                checked={settings.showBusinessLogo}
                                onCheckedChange={(checked: boolean) =>
                                  updateSettings({ showBusinessLogo: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between py-1">
                              <span className="text-sm">Show address</span>
                              <Switch
                                checked={settings.showBusinessAddress}
                                onCheckedChange={(checked: boolean) =>
                                  updateSettings({
                                    showBusinessAddress: checked,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          onClick={() => setActiveStep(2)}
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => setActiveStep(4)}
                          className="gap-2"
                        >
                          Next: Responses <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Response Settings */}
                  {activeStep === 4 && (
                    <div className="p-5 space-y-5">
                      <div>
                        <h3 className="text-base font-medium mb-1">
                          Rating Responses
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Customize what happens after a customer rates
                        </p>
                      </div>

                      {/* Rating Threshold */}
                      <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">
                            Rating Threshold
                          </Label>
                          <Badge variant="outline" className="font-mono">
                            {settings.minRatingToRedirect}+ ★ = Positive
                          </Badge>
                        </div>
                        <Slider
                          value={[settings.minRatingToRedirect]}
                          onValueChange={([value]: number[]) =>
                            updateSettings({ minRatingToRedirect: value })
                          }
                          min={1}
                          max={5}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 star</span>
                          <span>5 stars</span>
                        </div>
                      </div>

                      {/* Positive Response Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                            <ThumbsUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Positive Response ({settings.minRatingToRedirect}
                              –5 stars)
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Redirect happy customers to Google
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 pl-10">
                          <div className="space-y-2">
                            <Label className="text-sm">Headline</Label>
                            <Input
                              value={settings.positiveHeadline}
                              onChange={(e) =>
                                updateSettings({
                                  positiveHeadline: e.target.value,
                                })
                              }
                              placeholder="Thank you! 🎉"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Message</Label>
                            <Textarea
                              value={settings.positiveSubheadline}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                              ) =>
                                updateSettings({
                                  positiveSubheadline: e.target.value,
                                })
                              }
                              placeholder="We're thrilled you had a great experience!"
                              className="resize-none"
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label className="text-sm">Button Text</Label>
                              <Input
                                value={settings.positiveCtaText}
                                onChange={(e) =>
                                  updateSettings({
                                    positiveCtaText: e.target.value,
                                  })
                                }
                                placeholder="Leave a Google Review"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Redirect URL</Label>
                              <Input
                                value={settings.positiveRedirectUrl}
                                onChange={(e) =>
                                  updateSettings({
                                    positiveRedirectUrl: e.target.value,
                                  })
                                }
                                placeholder="https://g.page/..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Negative Response Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <ThumbsDown className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Negative Response (1–
                              {settings.minRatingToRedirect - 1} stars)
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Capture feedback privately
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 pl-10">
                          <div className="space-y-2">
                            <Label className="text-sm">Headline</Label>
                            <Input
                              value={settings.negativeHeadline}
                              onChange={(e) =>
                                updateSettings({
                                  negativeHeadline: e.target.value,
                                })
                              }
                              placeholder="We're sorry to hear that"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Message</Label>
                            <Textarea
                              value={settings.negativeSubheadline}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                              ) =>
                                updateSettings({
                                  negativeSubheadline: e.target.value,
                                })
                              }
                              placeholder="Please let us know how we can improve."
                              className="resize-none"
                              rows={2}
                            />
                          </div>

                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Show feedback form
                              </span>
                            </div>
                            <Switch
                              checked={settings.showFeedbackForm}
                              onCheckedChange={(checked: boolean) =>
                                updateSettings({ showFeedbackForm: checked })
                              }
                            />
                          </div>

                          {settings.showFeedbackForm && (
                            <div className="space-y-2">
                              <Label className="text-sm">
                                Feedback Placeholder
                              </Label>
                              <Input
                                value={settings.feedbackPlaceholder}
                                onChange={(e) =>
                                  updateSettings({
                                    feedbackPlaceholder: e.target.value,
                                  })
                                }
                                placeholder="Tell us what went wrong..."
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label className="text-sm">Button Text</Label>
                            <Input
                              value={settings.negativeCtaText}
                              onChange={(e) =>
                                updateSettings({
                                  negativeCtaText: e.target.value,
                                })
                              }
                              placeholder="Submit Feedback"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          onClick={() => setActiveStep(3)}
                        >
                          Back
                        </Button>
                        <Button className="gap-2">
                          Save Changes <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Panel - Right Side */}
              <div className="order-first col-span-4 lg:order-last">
                <div className="lg:sticky lg:top-16">
                  {/* Preview Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Preview</span>
                      {selectedRating > 0 && (
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              isPositiveRating
                                ? "bg-green-500"
                                : "bg-orange-500"
                            )}
                          />
                          <span className="text-xs text-muted-foreground">
                            {isPositiveRating ? "Positive" : "Negative"} flow
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {selectedRating > 0 && (
                        <button
                          onClick={() => {
                            setSelectedRating(0);
                            setHoveredRating(0);
                            setPreviewFeedback("");
                          }}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Reset
                        </button>
                      )}
                      <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border/50">
                        <Button
                          variant={
                            previewMode === "mobile" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setPreviewMode("mobile")}
                          className="h-7 w-7 p-0"
                        >
                          <Smartphone className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant={
                            previewMode === "desktop" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setPreviewMode("desktop")}
                          className="h-7 w-7 p-0"
                        >
                          <Monitor className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Preview Canvas */}
                  <div className="rounded-2xl bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 border border-border/50 p-4 sm:p-6 md:p-8 min-h-[480px] max-h-[calc(100vh-180px)] flex items-center justify-center overflow-hidden">
                    <div
                      className={cn(
                        "transition-all duration-500 ease-out",
                        previewMode === "mobile"
                          ? "w-[280px]"
                          : "w-full max-w-lg"
                      )}
                    >
                      {/* Device Frame */}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-500",
                          previewMode === "mobile"
                            ? "rounded-[2.5rem] border-[8px] border-gray-900 dark:border-gray-800 shadow-2xl shadow-black/20"
                            : "rounded-xl border border-border/60 shadow-2xl shadow-black/10"
                        )}
                      >
                        {/* Notch for Mobile */}
                        {previewMode === "mobile" && (
                          <div className="h-7 bg-gray-900 dark:bg-gray-800 flex items-center justify-center relative">
                            <div className="w-20 h-5 bg-black rounded-full" />
                          </div>
                        )}

                        {/* Desktop Browser Bar */}
                        {previewMode === "desktop" && (
                          <div className="h-10 bg-gray-100 dark:bg-gray-900 border-b border-border/40 flex items-center px-4 gap-3">
                            <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-400" />
                              <div className="w-3 h-3 rounded-full bg-yellow-400" />
                              <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 mx-4">
                              <div className="h-6 bg-white dark:bg-gray-800 rounded-lg text-xs flex items-center px-4 text-muted-foreground">
                                <Globe className="h-3 w-3 mr-2 text-muted-foreground/50" />
                                <span className="truncate">{reviewUrl}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Preview Content */}
                        <div
                          className={cn(
                            "transition-all duration-500",
                            previewMode === "mobile"
                              ? "min-h-[480px]"
                              : "min-h-[360px]"
                          )}
                          style={
                            settings.useGradient
                              ? {
                                  background: `linear-gradient(135deg, ${settings.gradientFrom}, ${settings.gradientTo})`,
                                }
                              : {
                                  backgroundColor:
                                    settings.theme === "dark"
                                      ? "#09090b"
                                      : "#ffffff",
                                }
                          }
                        >
                          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                            {/* Logo */}
                            {settings.showBusinessLogo && (
                              <div
                                className="w-14 h-14 rounded-full mb-4 flex items-center justify-center text-white text-xl font-bold shadow-lg"
                                style={{
                                  backgroundColor: settings.useGradient
                                    ? "rgba(255,255,255,0.15)"
                                    : settings.primaryColor,
                                }}
                              >
                                {mockBusinessProfile.name.charAt(0)}
                              </div>
                            )}

                            {/* Business Info */}
                            {(settings.showBusinessName ||
                              settings.showBusinessAddress) && (
                              <div className="mb-5">
                                {settings.showBusinessName && (
                                  <h2
                                    className={cn(
                                      "text-sm font-semibold",
                                      settings.useGradient ||
                                        settings.theme === "dark"
                                        ? "text-white/90"
                                        : "text-gray-800"
                                    )}
                                  >
                                    {mockBusinessProfile.name}
                                  </h2>
                                )}
                                {settings.showBusinessAddress && (
                                  <p
                                    className={cn(
                                      "text-[11px] mt-0.5 flex items-center justify-center gap-1",
                                      settings.useGradient ||
                                        settings.theme === "dark"
                                        ? "text-white/50"
                                        : "text-gray-400"
                                    )}
                                  >
                                    <MapPin className="h-2.5 w-2.5" />
                                    {mockBusinessProfile.address.city}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Dynamic Content */}
                            <div className="mb-5">
                              <h1
                                className={cn(
                                  "text-xl font-bold mb-2",
                                  settings.useGradient ||
                                    settings.theme === "dark"
                                    ? "text-white"
                                    : "text-gray-900"
                                )}
                              >
                                {selectedRating === 0
                                  ? settings.headline
                                  : isPositiveRating
                                  ? settings.positiveHeadline
                                  : settings.negativeHeadline}
                              </h1>
                              <p
                                className={cn(
                                  "text-xs leading-relaxed max-w-[220px] mx-auto",
                                  settings.useGradient ||
                                    settings.theme === "dark"
                                    ? "text-white/70"
                                    : "text-gray-500"
                                )}
                              >
                                {selectedRating === 0
                                  ? settings.subheadline
                                  : isPositiveRating
                                  ? settings.positiveSubheadline
                                  : settings.negativeSubheadline}
                              </p>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1.5 mb-5">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  onMouseEnter={() => setHoveredRating(rating)}
                                  onMouseLeave={() => setHoveredRating(0)}
                                  onClick={() => {
                                    setSelectedRating(rating);
                                    setPreviewFeedback("");
                                  }}
                                  className="transition-all duration-200 hover:scale-110 active:scale-95"
                                >
                                  <Star
                                    className={cn(
                                      "h-8 w-8 transition-all duration-200",
                                      rating <=
                                        (hoveredRating || selectedRating)
                                        ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                                        : settings.useGradient ||
                                          settings.theme === "dark"
                                        ? "text-white/20"
                                        : "text-gray-200"
                                    )}
                                  />
                                </button>
                              ))}
                            </div>

                            {/* Feedback Form for Negative */}
                            {isNegativeRating && settings.showFeedbackForm && (
                              <textarea
                                value={previewFeedback}
                                onChange={(e) =>
                                  setPreviewFeedback(e.target.value)
                                }
                                placeholder={settings.feedbackPlaceholder}
                                className={cn(
                                  "w-full max-w-[220px] h-20 p-3 rounded-xl text-xs resize-none mb-4 border-0 focus:ring-2 focus:ring-white/20 focus:outline-none transition-all",
                                  settings.useGradient ||
                                    settings.theme === "dark"
                                    ? "bg-white/10 text-white placeholder:text-white/40"
                                    : "bg-gray-100 text-gray-900 placeholder:text-gray-400"
                                )}
                              />
                            )}

                            {/* CTA Button */}
                            {selectedRating > 0 && (
                              <button
                                className={cn(
                                  "px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md",
                                  settings.useGradient
                                    ? "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                                    : isPositiveRating
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                )}
                              >
                                {isPositiveRating
                                  ? settings.positiveCtaText
                                  : settings.negativeCtaText}
                                <ExternalLink className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Phone Home Indicator */}
                      {previewMode === "mobile" && (
                        <div className="h-1 w-24 mx-auto mt-2 bg-gray-900 dark:bg-gray-800 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
