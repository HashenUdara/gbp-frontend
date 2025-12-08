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
  ArrowLeft,
  Sparkles,
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

// Layout V3: Wizard/Step-Based Flow (Typeform-style)

const steps = [
  {
    id: 1,
    title: "Link Setup",
    subtitle: "Configure your review URL",
    icon: Globe,
  },
  {
    id: 2,
    title: "Appearance",
    subtitle: "Choose your theme and colors",
    icon: Palette,
  },
  {
    id: 3,
    title: "Content",
    subtitle: "Write your headlines and messages",
    icon: Type,
  },
  {
    id: 4,
    title: "Responses",
    subtitle: "Set up positive & negative flows",
    icon: Zap,
  },
  {
    id: 5,
    title: "Publish",
    subtitle: "Review and launch your link",
    icon: Sparkles,
  },
];

export default function ReviewLinkPageV3() {
  const [settings, setSettings] = useState<ReviewLinkSettings>(
    mockReviewLinkSettings
  );
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "mobile"
  );
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [previewFeedback, setPreviewFeedback] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const reviewUrl = getReviewLinkUrl(settings.slug);

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateSettings = (updates: Partial<ReviewLinkSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const isPositiveRating = selectedRating >= settings.minRatingToRedirect;
  const isNegativeRating =
    selectedRating > 0 && selectedRating < settings.minRatingToRedirect;

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

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
          <Badge
            variant="outline"
            className="ml-2 text-[10px] px-1.5 py-0 text-muted-foreground"
          >
            V3
          </Badge>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-hidden bg-background">
          {/* Progress Bar */}
          <div className="h-1 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="h-[calc(100vh-52px)] flex">
            {/* Left Side - Step Content */}
            <div className="flex-1 flex flex-col">
              {/* Step Header */}
              <div className="p-8 pb-0">
                <div className="flex items-center gap-3 mb-2">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => setCurrentStep(step.id)}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                          currentStep === step.id
                            ? "bg-primary text-primary-foreground"
                            : currentStep > step.id
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {currentStep > step.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          step.id
                        )}
                      </button>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "w-8 h-0.5 mx-1",
                            currentStep > step.id ? "bg-green-500" : "bg-muted"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {steps[currentStep - 1].title}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {steps[currentStep - 1].subtitle}
                  </p>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 overflow-auto p-8 pt-6">
                <div className="max-w-xl">
                  {/* Step 1: Link */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">
                          Custom URL
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Choose a memorable slug for your review link
                        </p>
                        <div className="flex">
                          <span className="inline-flex items-center px-4 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-lg">
                            review.yourdomain.com/
                          </span>
                          <Input
                            value={settings.slug}
                            onChange={(e) =>
                              updateSettings({ slug: e.target.value })
                            }
                            className="rounded-l-none text-lg h-12"
                            placeholder="your-business"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-3">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Your full link</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-sm bg-background px-3 py-2 rounded-lg truncate">
                            {reviewUrl}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            className="shrink-0"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div>
                          <Label className="text-base font-medium">
                            Activate Link
                          </Label>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Make your review link publicly accessible
                          </p>
                        </div>
                        <Switch
                          checked={settings.isActive}
                          onCheckedChange={(checked) =>
                            updateSettings({ isActive: checked })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Appearance */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">
                          Theme Mode
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            {
                              value: "light",
                              label: "Light",
                              bg: "bg-white",
                              border: "border-gray-200",
                            },
                            {
                              value: "dark",
                              label: "Dark",
                              bg: "bg-gray-900",
                              border: "border-gray-700",
                            },
                          ].map((theme) => (
                            <button
                              key={theme.value}
                              onClick={() =>
                                updateSettings({
                                  theme: theme.value as "light" | "dark",
                                })
                              }
                              className={cn(
                                "p-4 rounded-xl border-2 transition-all flex items-center gap-3",
                                settings.theme === theme.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-lg border",
                                  theme.bg,
                                  theme.border
                                )}
                              />
                              <span className="text-base font-medium">
                                {theme.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div>
                          <Label className="text-base font-medium">
                            Gradient Background
                          </Label>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Use a colorful gradient instead
                          </p>
                        </div>
                        <Switch
                          checked={settings.useGradient}
                          onCheckedChange={(checked) =>
                            updateSettings({ useGradient: checked })
                          }
                        />
                      </div>

                      {!settings.useGradient ? (
                        <div className="space-y-3">
                          <Label className="text-base font-medium">
                            Accent Color
                          </Label>
                          <div className="grid grid-cols-4 gap-3">
                            {colorPresets.map((color) => (
                              <button
                                key={color.value}
                                onClick={() =>
                                  updateSettings({ primaryColor: color.value })
                                }
                                className={cn(
                                  "aspect-square rounded-xl border-2 transition-all hover:scale-105 flex items-center justify-center",
                                  settings.primaryColor === color.value
                                    ? "border-foreground scale-105"
                                    : "border-transparent"
                                )}
                                style={{ backgroundColor: color.value }}
                              >
                                {settings.primaryColor === color.value && (
                                  <Check className="h-6 w-6 text-white drop-shadow-md" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Label className="text-base font-medium">
                            Gradient Style
                          </Label>
                          <div className="grid grid-cols-3 gap-3">
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
                                  "aspect-video rounded-xl border-2 transition-all hover:scale-105 flex items-center justify-center",
                                  settings.gradientFrom === gradient.from
                                    ? "border-foreground scale-105"
                                    : "border-transparent"
                                )}
                                style={{
                                  background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                                }}
                              >
                                {settings.gradientFrom === gradient.from && (
                                  <Check className="h-6 w-6 text-white drop-shadow-md" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Content */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-medium">
                          Main Headline
                        </Label>
                        <Input
                          value={settings.headline}
                          onChange={(e) =>
                            updateSettings({ headline: e.target.value })
                          }
                          className="text-lg h-12"
                          placeholder="How was your experience?"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-medium">
                          Supporting Text
                        </Label>
                        <Textarea
                          value={settings.subheadline}
                          onChange={(e) =>
                            updateSettings({ subheadline: e.target.value })
                          }
                          className="text-base min-h-[100px] resize-none"
                          placeholder="We value your feedback..."
                        />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          Display Options
                        </Label>
                        {[
                          {
                            key: "showBusinessName",
                            label: "Show business name",
                            desc: "Display your business name at the top",
                          },
                          {
                            key: "showBusinessLogo",
                            label: "Show logo",
                            desc: "Display your business logo",
                          },
                          {
                            key: "showBusinessAddress",
                            label: "Show address",
                            desc: "Display your business location",
                          },
                        ].map((option) => (
                          <div
                            key={option.key}
                            className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                          >
                            <div>
                              <span className="font-medium">
                                {option.label}
                              </span>
                              <p className="text-sm text-muted-foreground">
                                {option.desc}
                              </p>
                            </div>
                            <Switch
                              checked={
                                settings[
                                  option.key as keyof ReviewLinkSettings
                                ] as boolean
                              }
                              onCheckedChange={(checked) =>
                                updateSettings({ [option.key]: checked })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Responses */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-medium">
                            Rating Threshold
                          </Label>
                          <Badge
                            variant="secondary"
                            className="text-sm font-mono"
                          >
                            {settings.minRatingToRedirect}+ stars = positive
                          </Badge>
                        </div>
                        <Slider
                          value={[settings.minRatingToRedirect]}
                          onValueChange={([value]) =>
                            updateSettings({ minRatingToRedirect: value })
                          }
                          min={1}
                          max={5}
                          step={1}
                          className="mt-2"
                        />
                      </div>

                      <div className="p-4 rounded-xl border-2 border-green-500/30 bg-green-500/5 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-700 dark:text-green-400">
                              Positive Response
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {settings.minRatingToRedirect}–5 stars
                            </p>
                          </div>
                        </div>
                        <Input
                          placeholder="Thank you headline"
                          value={settings.positiveHeadline}
                          onChange={(e) =>
                            updateSettings({ positiveHeadline: e.target.value })
                          }
                        />
                        <Textarea
                          placeholder="Thank you message"
                          value={settings.positiveSubheadline}
                          onChange={(e) =>
                            updateSettings({
                              positiveSubheadline: e.target.value,
                            })
                          }
                          rows={2}
                          className="resize-none"
                        />
                        <Input
                          placeholder="Button text (e.g., Leave a Google Review)"
                          value={settings.positiveCtaText}
                          onChange={(e) =>
                            updateSettings({ positiveCtaText: e.target.value })
                          }
                        />
                      </div>

                      <div className="p-4 rounded-xl border-2 border-orange-500/30 bg-orange-500/5 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Star className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-orange-700 dark:text-orange-400">
                              Negative Response
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              1–{settings.minRatingToRedirect - 1} stars
                            </p>
                          </div>
                        </div>
                        <Input
                          placeholder="We're sorry headline"
                          value={settings.negativeHeadline}
                          onChange={(e) =>
                            updateSettings({ negativeHeadline: e.target.value })
                          }
                        />
                        <Textarea
                          placeholder="Apology message"
                          value={settings.negativeSubheadline}
                          onChange={(e) =>
                            updateSettings({
                              negativeSubheadline: e.target.value,
                            })
                          }
                          rows={2}
                          className="resize-none"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Include feedback form</span>
                          <Switch
                            checked={settings.showFeedbackForm}
                            onCheckedChange={(checked) =>
                              updateSettings({ showFeedbackForm: checked })
                            }
                          />
                        </div>
                        <Input
                          placeholder="Button text (e.g., Submit Feedback)"
                          value={settings.negativeCtaText}
                          onChange={(e) =>
                            updateSettings({ negativeCtaText: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Publish */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                          <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">
                          Ready to Launch!
                        </h2>
                        <p className="text-muted-foreground">
                          Your review link is configured and ready to collect
                          feedback
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold">Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-2 border-b border-border/50">
                            <span className="text-muted-foreground">URL</span>
                            <span className="font-mono">{settings.slug}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border/50">
                            <span className="text-muted-foreground">Theme</span>
                            <span className="capitalize">
                              {settings.useGradient
                                ? "Gradient"
                                : settings.theme}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border/50">
                            <span className="text-muted-foreground">
                              Positive threshold
                            </span>
                            <span>{settings.minRatingToRedirect}+ stars</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">
                              Status
                            </span>
                            <Badge
                              variant={
                                settings.isActive ? "default" : "secondary"
                              }
                            >
                              {settings.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Button size="lg" className="w-full gap-2">
                        <Sparkles className="h-5 w-5" />
                        Publish Review Link
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="p-6 border-t border-border/40 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                {currentStep < steps.length ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="gap-2"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="gap-2">
                    <Sparkles className="h-4 w-4" /> Publish
                  </Button>
                )}
              </div>
            </div>

            {/* Right Side - Mini Preview */}
            <div className="hidden lg:block w-[400px] border-l border-border/40 bg-muted/30 p-6">
              <div className="sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Preview
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant={previewMode === "mobile" ? "secondary" : "ghost"}
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

                <div
                  className={cn(
                    "mx-auto transition-all duration-300",
                    previewMode === "mobile" ? "w-[240px]" : "w-full"
                  )}
                >
                  <div
                    className={cn(
                      "overflow-hidden shadow-xl",
                      previewMode === "mobile"
                        ? "rounded-[2rem] border-[6px] border-gray-900 dark:border-gray-800"
                        : "rounded-lg border border-border"
                    )}
                  >
                    {previewMode === "mobile" && (
                      <div className="h-5 bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
                        <div className="w-16 h-3 bg-black rounded-full" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "transition-all",
                        previewMode === "mobile"
                          ? "min-h-[400px]"
                          : "min-h-[300px]"
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
                      <div className="p-4 flex flex-col items-center justify-center min-h-full text-center">
                        {settings.showBusinessLogo && (
                          <div
                            className="w-10 h-10 rounded-full mb-3 flex items-center justify-center text-white text-sm font-bold"
                            style={{
                              backgroundColor: settings.useGradient
                                ? "rgba(255,255,255,0.15)"
                                : settings.primaryColor,
                            }}
                          >
                            {mockBusinessProfile.name.charAt(0)}
                          </div>
                        )}
                        {settings.showBusinessName && (
                          <p
                            className={cn(
                              "text-xs font-medium mb-3",
                              settings.useGradient || settings.theme === "dark"
                                ? "text-white/80"
                                : "text-gray-700"
                            )}
                          >
                            {mockBusinessProfile.name}
                          </p>
                        )}
                        <h3
                          className={cn(
                            "text-sm font-bold mb-1",
                            settings.useGradient || settings.theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                          )}
                        >
                          {settings.headline}
                        </h3>
                        <p
                          className={cn(
                            "text-[10px] mb-4 max-w-[180px]",
                            settings.useGradient || settings.theme === "dark"
                              ? "text-white/60"
                              : "text-gray-500"
                          )}
                        >
                          {settings.subheadline}
                        </p>
                        <div className="flex gap-1 mb-4">
                          {[1, 2, 3, 4, 5].map((r) => (
                            <Star
                              key={r}
                              className={cn(
                                "h-5 w-5",
                                settings.useGradient ||
                                  settings.theme === "dark"
                                  ? "text-white/20"
                                  : "text-gray-200"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {previewMode === "mobile" && (
                    <div className="h-1 w-16 mx-auto mt-2 bg-gray-900 dark:bg-gray-800 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
