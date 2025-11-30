"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BusinessProfile } from "@/lib/mock-data";
import {
  CheckCircle2,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Pencil,
  Share2,
  Star,
  Copy,
  Settings,
  Trash2,
  Camera,
  Clock,
  ChevronDown,
} from "lucide-react";

interface ProfileHeaderProps {
  profile: BusinessProfile;
  coverImage?: string;
}

export function ProfileHeader({ profile, coverImage }: ProfileHeaderProps) {
  const defaultCover =
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=400&fit=crop";

  // Get today's day name
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = profile.openingHours.find((h) => h.day === today);

  return (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-44 sm:h-52 md:h-56 bg-muted">
        <img
          src={coverImage || defaultCover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

        {/* Edit Cover Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-3 right-3 gap-1.5 bg-white/95 hover:bg-white text-foreground text-xs h-8 px-3 rounded-lg backdrop-blur-sm border-0"
        >
          <Camera className="h-3.5 w-3.5" />
          Edit Cover
        </Button>
      </div>

      {/* Profile Info Section */}
      <div className="relative px-5 pb-5">
        {/* Avatar - positioned to overlap cover */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 sm:-mt-10">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl border-[3px] border-card ring-0">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}&backgroundColor=6366f1`}
              alt={profile.name}
            />
            <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground text-2xl font-medium">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* Name and Actions Row */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 sm:pt-0 sm:pb-1">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                  {profile.name}
                </h1>
                {profile.isVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-50/80 text-blue-600 dark:bg-blue-950 dark:text-blue-400 gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[13px] text-muted-foreground/80">
                <span className="font-medium text-foreground/70">
                  {profile.category}
                </span>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {profile.address.city}, {profile.address.state}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-[13px] px-3 rounded-lg"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-[13px] px-3 rounded-lg"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg text-muted-foreground/70 hover:text-foreground"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-44 rounded-xl border-border/50"
                >
                  <DropdownMenuItem className="gap-2 text-[13px] rounded-lg">
                    <Share2 className="h-3.5 w-3.5" />
                    Share Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-[13px] rounded-lg">
                    <Copy className="h-3.5 w-3.5" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/40" />
                  <DropdownMenuItem className="gap-2 text-[13px] rounded-lg">
                    <Settings className="h-3.5 w-3.5" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/40" />
                  <DropdownMenuItem className="gap-2 text-[13px] rounded-lg text-destructive focus:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Info Row - Rating, Hours, Status */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border/40">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-[15px]">{profile.rating}</span>
            <span className="text-[13px] text-muted-foreground/70">
              ({profile.totalReviews})
            </span>
          </div>

          {/* Open/Closed Status with Hours Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1.5 group cursor-pointer">
                {profile.isOpen ? (
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50/70 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 text-[11px] font-medium px-2 py-0.5 rounded-md"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                    Open
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-red-50/70 text-red-600 dark:bg-red-950 dark:text-red-400 text-[11px] font-medium px-2 py-0.5 rounded-md"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5" />
                    Closed
                  </Badge>
                )}
                <span className="text-[12px] text-muted-foreground/60 flex items-center gap-0.5 group-hover:text-muted-foreground transition-colors">
                  <Clock className="h-3 w-3" />
                  {todayHours?.hours || "Closed today"}
                  <ChevronDown className="h-3 w-3" />
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-64 p-3 rounded-xl border-border/50"
            >
              <div className="space-y-0.5">
                <h4 className="text-[13px] font-medium mb-2">Opening Hours</h4>
                {profile.openingHours.map((schedule) => (
                  <div
                    key={schedule.day}
                    className={`flex items-center justify-between text-[12px] py-1.5 px-2 rounded-md ${
                      schedule.day === today ? "bg-primary/5 font-medium" : ""
                    }`}
                  >
                    <span
                      className={
                        schedule.day === today
                          ? "text-foreground"
                          : "text-muted-foreground/80"
                      }
                    >
                      {schedule.day}
                    </span>
                    <span
                      className={`${
                        !schedule.isOpen
                          ? "text-red-500/80"
                          : schedule.day === today
                          ? "text-foreground"
                          : "text-muted-foreground/70"
                      }`}
                    >
                      {schedule.isOpen ? schedule.hours : "Closed"}
                    </span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Description - Full width below */}
        {profile.description && (
          <p className="mt-3 text-[13px] text-muted-foreground/70 leading-relaxed">
            {profile.description}
          </p>
        )}
      </div>
    </div>
  );
}
