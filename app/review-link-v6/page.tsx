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
  ChevronDown,
  ChevronUp,
  Sparkles,
  X,
  Palette,
  Type,
  MessageSquare,
  Link2,
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

// Layout V6: Notion-style Document Editor with Inline Blocks

type BlockType = "link" | "style" | "content" | "responses";

interface Block {
  id: string;
  type: BlockType;
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
}

export default function ReviewLinkPageV6() {
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
  const [showPreview, setShowPreview] = useState(true);
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "link",
      type: "link",
      label: "Link Settings",
      icon: <Link2 className="h-4 w-4" />,
      collapsed: false,
    },
    {
      id: "style",
      type: "style",
      label: "Appearance",
      icon: <Palette className="h-4 w-4" />,
      collapsed: false,
    },
    {
      id: "content",
      type: "content",
      label: "Content",
      icon: <Type className="h-4 w-4" />,
      collapsed: false,
    },
    {
      id: "responses",
      type: "responses",
      label: "Responses",
      icon: <MessageSquare className="h-4 w-4" />,
      collapsed: false,
    },
  ]);

  const reviewUrl = getReviewLinkUrl(settings.slug);

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateSettings = (updates: Partial<ReviewLinkSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const toggleBlock = (id: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, collapsed: !b.collapsed } : b))
    );
  };

  const isPositiveRating = selectedRating >= settings.minRatingToRedirect;
  const isNegativeRating =
    selectedRating > 0 && selectedRating < settings.minRatingToRedirect;

  const renderBlockContent = (block: Block) => {
    switch (block.type) {
      case "link":
        return (
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                URL Slug
              </Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-lg">
                  review.yourdomain.com/
                </span>
                <Input
                  value={settings.slug}
                  onChange={(e) => updateSettings({ slug: e.target.value })}
                  className="rounded-l-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
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
            <div className="flex items-center justify-between py-2">
              <Label>Link Active</Label>
              <Switch
                checked={settings.isActive}
                onCheckedChange={(checked) =>
                  updateSettings({ isActive: checked })
                }
              />
            </div>
          </div>
        );
      case "style":
        return (
          <div className="space-y-6 pl-6">
            <div className="space-y-3">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                Theme
              </Label>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    updateSettings({ theme: "light", useGradient: false })
                  }
                  className={cn(
                    "flex-1 p-3 rounded-xl border-2 transition-all",
                    !settings.useGradient && settings.theme === "light"
                      ? "border-primary"
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <div className="w-full h-12 rounded-lg bg-white border border-gray-200 mb-2" />
                  <span className="text-xs">Light</span>
                </button>
                <button
                  onClick={() =>
                    updateSettings({ theme: "dark", useGradient: false })
                  }
                  className={cn(
                    "flex-1 p-3 rounded-xl border-2 transition-all",
                    !settings.useGradient && settings.theme === "dark"
                      ? "border-primary"
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <div className="w-full h-12 rounded-lg bg-gray-900 mb-2" />
                  <span className="text-xs">Dark</span>
                </button>
                <button
                  onClick={() => updateSettings({ useGradient: true })}
                  className={cn(
                    "flex-1 p-3 rounded-xl border-2 transition-all",
                    settings.useGradient
                      ? "border-primary"
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <div className="w-full h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-2" />
                  <span className="text-xs">Gradient</span>
                </button>
              </div>
            </div>
            {settings.useGradient ? (
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Gradient
                </Label>
                <div className="flex flex-wrap gap-2">
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
                        "w-10 h-10 rounded-xl border-2 transition-all hover:scale-110",
                        settings.gradientFrom === g.from
                          ? "border-foreground scale-110"
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
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Accent Color
                </Label>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => updateSettings({ primaryColor: c.value })}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                        settings.primaryColor === c.value
                          ? "border-foreground scale-110"
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
        );
      case "content":
        return (
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                Headline
              </Label>
              <Input
                value={settings.headline}
                onChange={(e) => updateSettings({ headline: e.target.value })}
                className="text-lg font-medium"
                placeholder="Your main headline..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                Subheadline
              </Label>
              <Textarea
                value={settings.subheadline}
                onChange={(e) =>
                  updateSettings({ subheadline: e.target.value })
                }
                rows={2}
                className="resize-none"
                placeholder="Supporting text..."
              />
            </div>
            <Separator />
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch
                  checked={settings.showBusinessName}
                  onCheckedChange={(checked) =>
                    updateSettings({ showBusinessName: checked })
                  }
                />
                <span className="text-sm">Show Name</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch
                  checked={settings.showBusinessLogo}
                  onCheckedChange={(checked) =>
                    updateSettings({ showBusinessLogo: checked })
                  }
                />
                <span className="text-sm">Show Logo</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch
                  checked={settings.showBusinessAddress}
                  onCheckedChange={(checked) =>
                    updateSettings({ showBusinessAddress: checked })
                  }
                />
                <span className="text-sm">Show Address</span>
              </label>
            </div>
          </div>
        );
      case "responses":
        return (
          <div className="space-y-6 pl-6">
            <div className="p-4 rounded-lg bg-muted/30 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Rating Threshold
                </Label>
                <Badge variant="outline">
                  {settings.minRatingToRedirect}+ = positive
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
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 space-y-3">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Positive Response
                </span>
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
                    updateSettings({ positiveSubheadline: e.target.value })
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
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-3">
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Negative Response
                </span>
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
                    updateSettings({ negativeSubheadline: e.target.value })
                  }
                  rows={2}
                  className="resize-none"
                />
                <label className="flex items-center justify-between">
                  <span className="text-xs">Feedback Form</span>
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
        );
      default:
        return null;
    }
  };

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
            V6
          </Badge>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Publish
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-muted/30 flex">
          {/* Document Editor */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto">
              {/* Document Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 tracking-tight">
                  Review Link
                </h1>
                <p className="text-muted-foreground">
                  Configure your review link page below
                </p>
              </div>

              {/* Blocks */}
              <div className="space-y-4">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className="rounded-xl border border-border/50 bg-background overflow-hidden"
                  >
                    <button
                      onClick={() => toggleBlock(block.id)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-muted/50">
                        {block.icon}
                      </div>
                      <span className="font-medium flex-1 text-left">
                        {block.label}
                      </span>
                      {block.collapsed ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    {!block.collapsed && (
                      <div className="pb-4 pr-4 border-t border-border/30">
                        <div className="pt-4">{renderBlockContent(block)}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Save Actions */}
              <div className="flex justify-end gap-3 mt-8">
                <Button variant="outline">Reset</Button>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Resizable Preview Panel */}
          {showPreview && (
            <div className="w-[400px] border-l border-border/40 bg-background flex flex-col">
              {/* Preview Header */}
              <div className="flex items-center justify-between p-3 border-b border-border/40">
                <span className="text-sm font-medium">Preview</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
                    <Button
                      variant={previewMode === "mobile" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                      className="h-6 w-6 p-0"
                    >
                      <Smartphone className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant={
                        previewMode === "desktop" ? "secondary" : "ghost"
                      }
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                      className="h-6 w-6 p-0"
                    >
                      <Monitor className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setShowPreview(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-auto p-4 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                <div
                  className={cn(
                    "mx-auto transition-all duration-500",
                    previewMode === "mobile" ? "w-[280px]" : "w-full"
                  )}
                >
                  <div
                    className={cn(
                      "overflow-hidden shadow-xl",
                      previewMode === "mobile"
                        ? "rounded-[2.5rem] border-[10px] border-gray-900"
                        : "rounded-xl border border-border/60"
                    )}
                  >
                    {previewMode === "mobile" && (
                      <div className="h-6 bg-gray-900 flex items-center justify-center">
                        <div className="w-20 h-5 bg-black rounded-full" />
                      </div>
                    )}
                    <div
                      className={cn("min-h-[400px]")}
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
                        {settings.showBusinessLogo && (
                          <div
                            className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-white text-xl font-bold shadow-lg"
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
                              "text-xs mb-6 flex items-center gap-1",
                              settings.useGradient || settings.theme === "dark"
                                ? "text-white/50"
                                : "text-gray-400"
                            )}
                          >
                            <MapPin className="h-3 w-3" />{" "}
                            {mockBusinessProfile.address.city}
                          </p>
                        )}
                        <h1
                          className={cn(
                            "text-lg font-bold mb-2",
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
                            "text-xs mb-6 max-w-[200px]",
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
                        <div className="flex gap-1.5 mb-6">
                          {[1, 2, 3, 4, 5].map((r) => (
                            <button
                              key={r}
                              onMouseEnter={() => setHoveredRating(r)}
                              onMouseLeave={() => setHoveredRating(0)}
                              onClick={() => {
                                setSelectedRating(r);
                                setPreviewFeedback("");
                              }}
                              className="transition-all hover:scale-110"
                            >
                              <Star
                                className={cn(
                                  "h-8 w-8 transition-all",
                                  r <= (hoveredRating || selectedRating)
                                    ? "fill-yellow-400 text-yellow-400"
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
                              "w-full h-20 p-3 rounded-xl text-xs resize-none mb-4",
                              settings.useGradient || settings.theme === "dark"
                                ? "bg-white/10 text-white placeholder:text-white/40"
                                : "bg-gray-100 text-gray-900 placeholder:text-gray-400"
                            )}
                          />
                        )}
                        {selectedRating > 0 && (
                          <button
                            className={cn(
                              "px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md",
                              settings.useGradient
                                ? "bg-white/20 text-white"
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
                    <div className="h-1 w-24 mx-auto mt-2 bg-gray-900 rounded-full" />
                  )}
                </div>

                {/* Rating State Indicator */}
                {selectedRating > 0 && (
                  <div className="mt-4 flex items-center justify-center gap-2">
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
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preview Toggle (when hidden) */}
          {!showPreview && (
            <Button
              variant="outline"
              size="sm"
              className="fixed bottom-4 right-4 shadow-lg"
              onClick={() => setShowPreview(true)}
            >
              Show Preview
            </Button>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
