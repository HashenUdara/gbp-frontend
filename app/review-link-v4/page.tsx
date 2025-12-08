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
  ChevronDown,
  ChevronUp,
  Grip,
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

// Layout V4: Bottom Panel Mobile-First (Instagram/TikTok Editor Style)

export default function ReviewLinkPageV4() {
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
  const [activeTab, setActiveTab] = useState<
    "link" | "style" | "content" | "responses"
  >("link");
  const [panelExpanded, setPanelExpanded] = useState(true);

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

  const tabs = [
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
            V4
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
              <Button
                variant={previewMode === "mobile" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
                className="h-7 px-2.5 rounded-full"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant={previewMode === "desktop" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
                className="h-7 px-2.5 rounded-full"
              >
                <Monitor className="h-3.5 w-3.5" />
              </Button>
            </div>
            <ThemeToggle />
            <Button size="sm" className="h-8">
              Publish
            </Button>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
          {/* Preview Area - Takes most of the space */}
          <div
            className={cn(
              "flex-1 flex items-center justify-center p-4 transition-all duration-300",
              panelExpanded ? "pb-2" : "pb-4"
            )}
          >
            <div
              className={cn(
                "transition-all duration-500 ease-out",
                previewMode === "mobile" ? "w-[300px]" : "w-full max-w-2xl"
              )}
            >
              {/* Device Frame */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  previewMode === "mobile"
                    ? "rounded-[2.5rem] border-[10px] border-gray-900 dark:border-gray-800 shadow-2xl"
                    : "rounded-xl border border-border/60 shadow-2xl"
                )}
              >
                {previewMode === "mobile" && (
                  <div className="h-7 bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
                    <div className="w-20 h-5 bg-black rounded-full" />
                  </div>
                )}

                {previewMode === "desktop" && (
                  <div className="h-9 bg-gray-100 dark:bg-gray-900 border-b border-border/40 flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-2">
                      <div className="h-5 bg-white dark:bg-gray-800 rounded text-[10px] flex items-center px-3 text-muted-foreground truncate">
                        {reviewUrl}
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "transition-all duration-500",
                    previewMode === "mobile" ? "min-h-[450px]" : "min-h-[350px]"
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
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
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

                    {settings.showBusinessName && (
                      <h2
                        className={cn(
                          "text-sm font-semibold mb-1",
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
                          "text-xs mb-4 flex items-center gap-1",
                          settings.useGradient || settings.theme === "dark"
                            ? "text-white/50"
                            : "text-gray-400"
                        )}
                      >
                        <MapPin className="h-3 w-3" />
                        {mockBusinessProfile.address.city}
                      </p>
                    )}

                    <h1
                      className={cn(
                        "text-xl font-bold mb-2",
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
                        "text-xs mb-5 max-w-[220px]",
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
                              rating <= (hoveredRating || selectedRating)
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

                    {isNegativeRating && settings.showFeedbackForm && (
                      <textarea
                        value={previewFeedback}
                        onChange={(e) => setPreviewFeedback(e.target.value)}
                        placeholder={settings.feedbackPlaceholder}
                        className={cn(
                          "w-full max-w-[220px] h-20 p-3 rounded-xl text-xs resize-none mb-4",
                          settings.useGradient || settings.theme === "dark"
                            ? "bg-white/10 text-white placeholder:text-white/40"
                            : "bg-gray-100 text-gray-900 placeholder:text-gray-400"
                        )}
                      />
                    )}

                    {selectedRating > 0 && (
                      <button
                        className={cn(
                          "px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95",
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
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {previewMode === "mobile" && (
                <div className="h-1 w-24 mx-auto mt-2 bg-gray-900 dark:bg-gray-800 rounded-full" />
              )}
            </div>
          </div>

          {/* Bottom Panel */}
          <div
            className={cn(
              "bg-background border-t border-border/40 rounded-t-3xl shadow-2xl transition-all duration-300",
              panelExpanded ? "h-[320px]" : "h-[52px]"
            )}
          >
            {/* Drag Handle */}
            <button
              onClick={() => setPanelExpanded(!panelExpanded)}
              className="w-full flex items-center justify-center py-2 hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </button>

            {/* Tab Bar */}
            <div className="flex border-b border-border/40 px-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setPanelExpanded(true);
                  }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium transition-all border-b-2 -mb-px",
                    activeTab === tab.id
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden xs:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {panelExpanded && (
              <div className="p-4 overflow-auto h-[calc(320px-52px-40px)]">
                {activeTab === "link" && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label className="text-xs text-muted-foreground">
                          URL Slug
                        </Label>
                        <Input
                          value={settings.slug}
                          onChange={(e) =>
                            updateSettings({ slug: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div className="flex items-end gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCopy}
                          className="h-9 w-9"
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
                          className="h-9 w-9"
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Link Active</span>
                      <Switch
                        checked={settings.isActive}
                        onCheckedChange={(checked) =>
                          updateSettings({ isActive: checked })
                        }
                      />
                    </div>
                  </div>
                )}

                {activeTab === "style" && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateSettings({ theme: "light" })}
                        className={cn(
                          "flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2",
                          settings.theme === "light"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <div className="w-5 h-5 rounded-full bg-white border border-gray-200" />
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button
                        onClick={() => updateSettings({ theme: "dark" })}
                        className={cn(
                          "flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2",
                          settings.theme === "dark"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <div className="w-5 h-5 rounded-full bg-gray-900 border border-gray-700" />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                      <button
                        onClick={() =>
                          updateSettings({ useGradient: !settings.useGradient })
                        }
                        className={cn(
                          "flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2",
                          settings.useGradient
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                        <span className="text-sm font-medium">Gradient</span>
                      </button>
                    </div>
                    {settings.useGradient ? (
                      <div className="flex gap-2 overflow-x-auto pb-2">
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
                              "w-14 h-14 rounded-xl shrink-0 border-2 transition-all",
                              settings.gradientFrom === g.from
                                ? "border-foreground scale-105"
                                : "border-transparent"
                            )}
                            style={{
                              background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {colorPresets.map((c) => (
                          <button
                            key={c.value}
                            onClick={() =>
                              updateSettings({ primaryColor: c.value })
                            }
                            className={cn(
                              "w-10 h-10 rounded-full shrink-0 border-2 transition-all",
                              settings.primaryColor === c.value
                                ? "border-foreground scale-110"
                                : "border-transparent"
                            )}
                            style={{ backgroundColor: c.value }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "content" && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Headline
                      </Label>
                      <Input
                        value={settings.headline}
                        onChange={(e) =>
                          updateSettings({ headline: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Subheadline
                      </Label>
                      <Textarea
                        value={settings.subheadline}
                        onChange={(e) =>
                          updateSettings({ subheadline: e.target.value })
                        }
                        rows={2}
                        className="mt-1 resize-none"
                      />
                    </div>
                    <div className="flex gap-4">
                      {[
                        { key: "showBusinessName", label: "Name" },
                        { key: "showBusinessLogo", label: "Logo" },
                        { key: "showBusinessAddress", label: "Address" },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Switch
                            checked={
                              settings[
                                item.key as keyof ReviewLinkSettings
                              ] as boolean
                            }
                            onCheckedChange={(checked) =>
                              updateSettings({ [item.key]: checked })
                            }
                            className="scale-75"
                          />
                          <span className="text-sm">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "responses" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Threshold</span>
                      <div className="flex-1">
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
                      <Badge variant="outline" className="font-mono text-xs">
                        {settings.minRatingToRedirect}+
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                        <span className="text-xs font-medium text-green-600">
                          Positive ({settings.minRatingToRedirect}+)
                        </span>
                        <Input
                          placeholder="Headline"
                          value={settings.positiveHeadline}
                          onChange={(e) =>
                            updateSettings({ positiveHeadline: e.target.value })
                          }
                          className="h-8 text-xs"
                        />
                        <Input
                          placeholder="Button"
                          value={settings.positiveCtaText}
                          onChange={(e) =>
                            updateSettings({ positiveCtaText: e.target.value })
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-2 p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                        <span className="text-xs font-medium text-orange-600">
                          Negative (1–{settings.minRatingToRedirect - 1})
                        </span>
                        <Input
                          placeholder="Headline"
                          value={settings.negativeHeadline}
                          onChange={(e) =>
                            updateSettings({ negativeHeadline: e.target.value })
                          }
                          className="h-8 text-xs"
                        />
                        <Input
                          placeholder="Button"
                          value={settings.negativeCtaText}
                          onChange={(e) =>
                            updateSettings({ negativeCtaText: e.target.value })
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
