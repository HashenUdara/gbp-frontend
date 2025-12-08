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
  Settings,
  Eye,
  X,
  ChevronRight,
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

// Layout V2: Full-Screen Preview with Floating Settings Panel (Carrd-style)

export default function ReviewLinkPageV2() {
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
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<
    "link" | "style" | "content" | "responses"
  >("link");

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

  const sections = [
    { id: "link", label: "Link", icon: Globe },
    { id: "style", label: "Style", icon: Palette },
    { id: "content", label: "Content", icon: Type },
    { id: "responses", label: "Responses", icon: Zap },
  ] as const;

  return (
    <SidebarProvider>
      <GBPSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border/40 px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
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
            V2
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 relative overflow-hidden">
          {/* Full-Screen Preview Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
            {/* Floating Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 p-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border/50 shadow-lg">
              <div className="flex items-center gap-1">
                <Button
                  variant={previewMode === "mobile" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                  className="h-8 px-3 rounded-full"
                >
                  <Smartphone className="h-4 w-4 mr-1.5" />
                  Mobile
                </Button>
                <Button
                  variant={previewMode === "desktop" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                  className="h-8 px-3 rounded-full"
                >
                  <Monitor className="h-4 w-4 mr-1.5" />
                  Desktop
                </Button>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant={settingsOpen ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="h-8 px-3 rounded-full"
              >
                <Settings className="h-4 w-4 mr-1.5" />
                Settings
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button size="sm" className="h-8 px-4 rounded-full gap-2">
                <Sparkles className="h-4 w-4" />
                Publish
              </Button>
            </div>

            {/* Centered Preview */}
            <div className="absolute inset-0 flex items-center justify-center p-8 pt-20">
              <div
                className={cn(
                  "transition-all duration-500 ease-out",
                  previewMode === "mobile" ? "w-[340px]" : "w-full max-w-3xl"
                )}
              >
                {/* Device Frame */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500",
                    previewMode === "mobile"
                      ? "rounded-[3rem] border-[12px] border-gray-900 dark:border-gray-800 shadow-2xl"
                      : "rounded-2xl border border-border/60 shadow-2xl"
                  )}
                >
                  {previewMode === "mobile" && (
                    <div className="h-8 bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
                      <div className="w-24 h-6 bg-black rounded-full" />
                    </div>
                  )}

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
                        ? "min-h-[600px]"
                        : "min-h-[500px]"
                    )}
                    style={
                      settings.useGradient
                        ? {
                            background: `linear-gradient(135deg, ${settings.gradientFrom}, ${settings.gradientTo})`,
                          }
                        : {
                            backgroundColor:
                              settings.theme === "dark" ? "#09090b" : "#ffffff",
                          }
                    }
                  >
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                      {settings.showBusinessLogo && (
                        <div
                          className="w-20 h-20 rounded-full mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-xl"
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
                        <h2
                          className={cn(
                            "text-lg font-semibold mb-1",
                            settings.useGradient || settings.theme === "dark"
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
                            "text-sm mb-8 flex items-center gap-1.5",
                            settings.useGradient || settings.theme === "dark"
                              ? "text-white/50"
                              : "text-gray-400"
                          )}
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          {mockBusinessProfile.address.city}
                        </p>
                      )}

                      <h1
                        className={cn(
                          "text-2xl font-bold mb-3",
                          settings.useGradient || settings.theme === "dark"
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
                          "text-sm mb-8 max-w-xs",
                          settings.useGradient || settings.theme === "dark"
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

                      <div className="flex gap-2 mb-8">
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
                                "h-10 w-10 transition-all duration-200",
                                rating <= (hoveredRating || selectedRating)
                                  ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                                  : settings.useGradient ||
                                    settings.theme === "dark"
                                  ? "text-white/20"
                                  : "text-gray-200"
                              )}
                            />
                          </button>
                        ))}
                      </div>

                      {isNegativeRating && settings.showFeedbackForm && (
                        <textarea
                          value={previewFeedback}
                          onChange={(e) => setPreviewFeedback(e.target.value)}
                          placeholder={settings.feedbackPlaceholder}
                          className={cn(
                            "w-full max-w-xs h-24 p-4 rounded-xl text-sm resize-none mb-6 border-0 focus:ring-2 focus:ring-white/20 focus:outline-none",
                            settings.useGradient || settings.theme === "dark"
                              ? "bg-white/10 text-white placeholder:text-white/40"
                              : "bg-gray-100 text-gray-900 placeholder:text-gray-400"
                          )}
                        />
                      )}

                      {selectedRating > 0 && (
                        <button
                          className={cn(
                            "px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg",
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
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {previewMode === "mobile" && (
                  <div className="h-1.5 w-32 mx-auto mt-3 bg-gray-900 dark:bg-gray-800 rounded-full" />
                )}
              </div>
            </div>

            {/* Floating Settings Panel */}
            <div
              className={cn(
                "absolute top-16 right-4 bottom-4 w-[380px] transition-all duration-300 z-10",
                settingsOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 pointer-events-none"
              )}
            >
              <div className="h-full rounded-2xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl flex flex-col overflow-hidden">
                {/* Panel Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <h2 className="font-semibold">Customize</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSettingsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Section Tabs */}
                <div className="flex border-b border-border/50">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "flex-1 py-3 text-sm font-medium transition-all border-b-2 -mb-px",
                        activeSection === section.id
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>

                {/* Section Content */}
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {activeSection === "link" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">URL Slug</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                            review.site/
                          </span>
                          <Input
                            value={settings.slug}
                            onChange={(e) =>
                              updateSettings({ slug: e.target.value })
                            }
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
                        <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="flex-1 text-xs truncate">
                          {reviewUrl}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCopy}
                          className="h-7 w-7 shrink-0"
                        >
                          {copied ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                        <span className="text-sm font-medium">Link Active</span>
                        <Switch
                          checked={settings.isActive}
                          onCheckedChange={(checked) =>
                            updateSettings({ isActive: checked })
                          }
                        />
                      </div>
                    </>
                  )}

                  {activeSection === "style" && (
                    <>
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Theme</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {["light", "dark"].map((theme) => (
                            <button
                              key={theme}
                              onClick={() =>
                                updateSettings({
                                  theme: theme as "light" | "dark",
                                })
                              }
                              className={cn(
                                "flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all",
                                settings.theme === theme
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-4 h-4 rounded-full border",
                                  theme === "light"
                                    ? "bg-white border-gray-200"
                                    : "bg-gray-900 border-gray-700"
                                )}
                              />
                              <span className="text-sm font-medium capitalize">
                                {theme}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">
                          Gradient Background
                        </Label>
                        <Switch
                          checked={settings.useGradient}
                          onCheckedChange={(checked) =>
                            updateSettings({ useGradient: checked })
                          }
                        />
                      </div>
                      {!settings.useGradient ? (
                        <div className="space-y-2">
                          <Label className="text-sm">Accent Color</Label>
                          <div className="grid grid-cols-8 gap-2">
                            {colorPresets.map((color) => (
                              <button
                                key={color.value}
                                onClick={() =>
                                  updateSettings({ primaryColor: color.value })
                                }
                                className={cn(
                                  "aspect-square rounded-lg border-2 transition-all hover:scale-105",
                                  settings.primaryColor === color.value
                                    ? "border-foreground ring-2 ring-foreground ring-offset-2"
                                    : "border-transparent"
                                )}
                                style={{ backgroundColor: color.value }}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label className="text-sm">Gradient Preset</Label>
                          <div className="grid grid-cols-3 gap-2">
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
                                  "aspect-video rounded-lg border-2 transition-all hover:scale-105",
                                  settings.gradientFrom === gradient.from
                                    ? "border-foreground ring-2 ring-foreground ring-offset-2"
                                    : "border-transparent"
                                )}
                                style={{
                                  background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {activeSection === "content" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Headline</Label>
                        <Input
                          value={settings.headline}
                          onChange={(e) =>
                            updateSettings({ headline: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Subheadline
                        </Label>
                        <Textarea
                          value={settings.subheadline}
                          onChange={(e) =>
                            updateSettings({ subheadline: e.target.value })
                          }
                          rows={2}
                          className="resize-none"
                        />
                      </div>
                      <Separator />
                      <Label className="text-sm font-medium">Display</Label>
                      <div className="space-y-2">
                        {[
                          { key: "showBusinessName", label: "Business name" },
                          { key: "showBusinessLogo", label: "Logo" },
                          { key: "showBusinessAddress", label: "Address" },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between py-1"
                          >
                            <span className="text-sm">{item.label}</span>
                            <Switch
                              checked={
                                settings[
                                  item.key as keyof ReviewLinkSettings
                                ] as boolean
                              }
                              onCheckedChange={(checked) =>
                                updateSettings({ [item.key]: checked })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {activeSection === "responses" && (
                    <>
                      <div className="space-y-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">
                            Rating Threshold
                          </Label>
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {settings.minRatingToRedirect}+ ★
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
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm font-medium">
                            Positive ({settings.minRatingToRedirect}+ stars)
                          </span>
                        </div>
                        <Input
                          placeholder="Headline"
                          value={settings.positiveHeadline}
                          onChange={(e) =>
                            updateSettings({ positiveHeadline: e.target.value })
                          }
                        />
                        <Textarea
                          placeholder="Message"
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
                          placeholder="Button text"
                          value={settings.positiveCtaText}
                          onChange={(e) =>
                            updateSettings({ positiveCtaText: e.target.value })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <X className="h-3 w-3 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium">
                            Negative (1–{settings.minRatingToRedirect - 1}{" "}
                            stars)
                          </span>
                        </div>
                        <Input
                          placeholder="Headline"
                          value={settings.negativeHeadline}
                          onChange={(e) =>
                            updateSettings({ negativeHeadline: e.target.value })
                          }
                        />
                        <Textarea
                          placeholder="Message"
                          value={settings.negativeSubheadline}
                          onChange={(e) =>
                            updateSettings({
                              negativeSubheadline: e.target.value,
                            })
                          }
                          rows={2}
                          className="resize-none"
                        />
                        <div className="flex items-center justify-between py-1">
                          <span className="text-sm">Feedback form</span>
                          <Switch
                            checked={settings.showFeedbackForm}
                            onCheckedChange={(checked) =>
                              updateSettings({ showFeedbackForm: checked })
                            }
                          />
                        </div>
                        <Input
                          placeholder="Button text"
                          value={settings.negativeCtaText}
                          onChange={(e) =>
                            updateSettings({ negativeCtaText: e.target.value })
                          }
                        />
                      </div>
                    </>
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
