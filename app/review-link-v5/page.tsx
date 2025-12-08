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
  ChevronRight,
  Sparkles,
  Eye,
  Settings2,
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

// Layout V5: Tab-Based Edit/Preview Toggle (Simple, Clean)

export default function ReviewLinkPageV5() {
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
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

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
            V5
          </Badge>
          <div className="ml-auto flex items-center gap-3">
            {/* Main View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "edit" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("edit")}
                className="h-7 px-3 gap-1.5 rounded-md"
              >
                <Settings2 className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                variant={viewMode === "preview" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("preview")}
                className="h-7 px-3 gap-1.5 rounded-md"
              >
                <Eye className="h-3.5 w-3.5" />
                Preview
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <ThemeToggle />
            <Button size="sm" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Publish
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-muted/30">
          {viewMode === "edit" ? (
            /* Edit Mode - Full Width Form */
            <div className="max-w-3xl mx-auto p-6 space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Review Link Settings
                </h1>
                <p className="text-muted-foreground mt-1">
                  Configure how your review link looks and behaves
                </p>
              </div>

              {/* Section: Link */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Link Settings</h2>
                </div>
                <div className="rounded-xl bg-background border border-border/50 p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>URL Slug</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-lg">
                        review.yourdomain.com/
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
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <code className="flex-1 text-sm truncate">{reviewUrl}</code>
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Link Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable your review link
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
              </section>

              {/* Section: Appearance */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <h2 className="text-lg font-semibold">Appearance</h2>
                </div>
                <div className="rounded-xl bg-background border border-border/50 p-6 space-y-6">
                  <div className="space-y-3">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() =>
                          updateSettings({ theme: "light", useGradient: false })
                        }
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all",
                          !settings.useGradient && settings.theme === "light"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="w-full h-20 rounded-lg bg-white border border-gray-200 mb-2" />
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button
                        onClick={() =>
                          updateSettings({ theme: "dark", useGradient: false })
                        }
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all",
                          !settings.useGradient && settings.theme === "dark"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="w-full h-20 rounded-lg bg-gray-900 border border-gray-700 mb-2" />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                      <button
                        onClick={() => updateSettings({ useGradient: true })}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all",
                          settings.useGradient
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="w-full h-20 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-2" />
                        <span className="text-sm font-medium">Gradient</span>
                      </button>
                    </div>
                  </div>

                  {settings.useGradient ? (
                    <div className="space-y-3">
                      <Label>Gradient Preset</Label>
                      <div className="grid grid-cols-6 gap-3">
                        {gradientPresets.map((g) => (
                          <button
                            key={g.name}
                            onClick={() =>
                              updateSettings({
                                gradientFrom: g.from,
                                gradientTo: g.to,
                              })
                            }
                            className={cn(
                              "aspect-square rounded-xl border-2 transition-all hover:scale-105",
                              settings.gradientFrom === g.from
                                ? "border-foreground ring-2 ring-offset-2 ring-foreground"
                                : "border-transparent"
                            )}
                            style={{
                              background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                            }}
                            title={g.name}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Label>Accent Color</Label>
                      <div className="grid grid-cols-8 gap-3">
                        {colorPresets.map((c) => (
                          <button
                            key={c.value}
                            onClick={() =>
                              updateSettings({ primaryColor: c.value })
                            }
                            className={cn(
                              "aspect-square rounded-xl border-2 transition-all hover:scale-105",
                              settings.primaryColor === c.value
                                ? "border-foreground ring-2 ring-offset-2 ring-foreground"
                                : "border-transparent"
                            )}
                            style={{ backgroundColor: c.value }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Section: Content */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold">Content</h2>
                </div>
                <div className="rounded-xl bg-background border border-border/50 p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Headline</Label>
                      <Input
                        value={settings.headline}
                        onChange={(e) =>
                          updateSettings({ headline: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subheadline</Label>
                      <Textarea
                        value={settings.subheadline}
                        onChange={(e) =>
                          updateSettings({ subheadline: e.target.value })
                        }
                        rows={1}
                        className="resize-none"
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex items-center justify-between p-3 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/50">
                      <span className="text-sm">Business Name</span>
                      <Switch
                        checked={settings.showBusinessName}
                        onCheckedChange={(checked) =>
                          updateSettings({ showBusinessName: checked })
                        }
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/50">
                      <span className="text-sm">Logo</span>
                      <Switch
                        checked={settings.showBusinessLogo}
                        onCheckedChange={(checked) =>
                          updateSettings({ showBusinessLogo: checked })
                        }
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/50">
                      <span className="text-sm">Address</span>
                      <Switch
                        checked={settings.showBusinessAddress}
                        onCheckedChange={(checked) =>
                          updateSettings({ showBusinessAddress: checked })
                        }
                      />
                    </label>
                  </div>
                </div>
              </section>

              {/* Section: Responses */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">
                    Response Configuration
                  </h2>
                </div>
                <div className="rounded-xl bg-background border border-border/50 p-6 space-y-6">
                  <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Rating Threshold</Label>
                      <Badge variant="outline">
                        {settings.minRatingToRedirect}+ stars = positive
                      </Badge>
                    </div>
                    <Slider
                      value={[settings.minRatingToRedirect]}
                      onValueChange={([v]) =>
                        updateSettings({ minRatingToRedirect: v })
                      }
                      min={1}
                      max={5}
                      step={1}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Positive */}
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 space-y-3">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-700 dark:text-green-400">
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
                    {/* Negative */}
                    <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-orange-600" />
                        <span className="font-semibold text-orange-700 dark:text-orange-400">
                          Negative (1–{settings.minRatingToRedirect - 1} stars)
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
                      <label className="flex items-center justify-between">
                        <span className="text-sm">Feedback form</span>
                        <Switch
                          checked={settings.showFeedbackForm}
                          onCheckedChange={(checked) =>
                            updateSettings({ showFeedbackForm: checked })
                          }
                        />
                      </label>
                      <Input
                        placeholder="Button text"
                        value={settings.negativeCtaText}
                        onChange={(e) =>
                          updateSettings({ negativeCtaText: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            /* Preview Mode - Full Screen */
            <div className="h-full flex flex-col">
              {/* Preview Header */}
              <div className="flex items-center justify-center gap-3 py-3 border-b border-border/40 bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
                  <Button
                    variant={previewMode === "mobile" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                    className="h-7 px-3 gap-1.5"
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    Mobile
                  </Button>
                  <Button
                    variant={previewMode === "desktop" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                    className="h-7 px-3 gap-1.5"
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    Desktop
                  </Button>
                </div>
                {selectedRating > 0 && (
                  <>
                    <Separator orientation="vertical" className="h-6" />
                    <Badge
                      variant={isPositiveRating ? "default" : "secondary"}
                      className={
                        isPositiveRating ? "bg-green-500" : "bg-orange-500"
                      }
                    >
                      {isPositiveRating ? "Positive" : "Negative"} Flow
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedRating(0);
                        setHoveredRating(0);
                      }}
                    >
                      Reset
                    </Button>
                  </>
                )}
              </div>

              {/* Preview Canvas */}
              <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                <div
                  className={cn(
                    "transition-all duration-500",
                    previewMode === "mobile" ? "w-[320px]" : "w-full max-w-3xl"
                  )}
                >
                  <div
                    className={cn(
                      "overflow-hidden shadow-2xl",
                      previewMode === "mobile"
                        ? "rounded-[3rem] border-[12px] border-gray-900 dark:border-gray-800"
                        : "rounded-2xl border border-border/60"
                    )}
                  >
                    {previewMode === "mobile" && (
                      <div className="h-8 bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
                        <div className="w-24 h-6 bg-black rounded-full" />
                      </div>
                    )}
                    {previewMode === "desktop" && (
                      <div className="h-10 bg-gray-100 dark:bg-gray-900 border-b flex items-center px-4 gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="h-6 bg-white dark:bg-gray-800 rounded-lg text-xs flex items-center px-4 text-muted-foreground truncate">
                            {reviewUrl}
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className={cn(
                        "transition-all",
                        previewMode === "mobile"
                          ? "min-h-[580px]"
                          : "min-h-[480px]"
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
                            <MapPin className="h-4 w-4" />{" "}
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
                            "text-sm mb-8 max-w-sm",
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
                          {[1, 2, 3, 4, 5].map((r) => (
                            <button
                              key={r}
                              onMouseEnter={() => setHoveredRating(r)}
                              onMouseLeave={() => setHoveredRating(0)}
                              onClick={() => {
                                setSelectedRating(r);
                                setPreviewFeedback("");
                              }}
                              className="transition-all hover:scale-110 active:scale-95"
                            >
                              <Star
                                className={cn(
                                  "h-10 w-10 transition-all",
                                  r <= (hoveredRating || selectedRating)
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
                              "w-full max-w-sm h-24 p-4 rounded-xl text-sm resize-none mb-6",
                              settings.useGradient || settings.theme === "dark"
                                ? "bg-white/10 text-white placeholder:text-white/40"
                                : "bg-gray-100 text-gray-900 placeholder:text-gray-400"
                            )}
                          />
                        )}
                        {selectedRating > 0 && (
                          <button
                            className={cn(
                              "px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg",
                              settings.useGradient
                                ? "bg-white/20 text-white backdrop-blur-sm"
                                : isPositiveRating
                                ? "bg-green-500 text-white"
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
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
