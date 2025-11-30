"use client";

import { useState } from "react";
// Card components reserved for future use
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Photo } from "@/lib/mock-data";
import {
  Upload,
  Image as ImageIcon,
  Eye,
  MoreHorizontal,
  Trash2,
  Download,
  Star,
  Grid3X3,
  LayoutGrid,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PhotosTabProps {
  photos: Photo[];
}

const photoTypeLabels: Record<Photo["type"], string> = {
  cover: "Cover",
  logo: "Logo",
  interior: "Interior",
  exterior: "Exterior",
  product: "Product",
  team: "Team",
};

const photoTypeColors: Record<Photo["type"], string> = {
  cover: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  logo: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  interior:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  exterior: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  product: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
  team: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400",
};

export function PhotosTab({ photos }: PhotosTabProps) {
  const [filter, setFilter] = useState<string>("all");
  const [gridSize, setGridSize] = useState<"small" | "large">("large");

  const filteredPhotos =
    filter === "all" ? photos : photos.filter((p) => p.type === filter);

  const photoCounts = photos.reduce((acc, photo) => {
    acc[photo.type] = (acc[photo.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Photo Gallery</h2>
          <p className="text-sm text-muted-foreground">
            {photos.length} photos • Showcase your business with high-quality
            images
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Photos</SelectItem>
              <SelectItem value="cover">Cover</SelectItem>
              <SelectItem value="logo">Logo</SelectItem>
              <SelectItem value="interior">Interior</SelectItem>
              <SelectItem value="exterior">Exterior</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-r-none",
                gridSize === "large" && "bg-accent"
              )}
              onClick={() => setGridSize("large")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-l-none",
                gridSize === "small" && "bg-accent"
              )}
              onClick={() => setGridSize("small")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Photos
          </Button>
        </div>
      </div>

      {/* Photo Type Summary */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(photoTypeLabels).map(([type, label]) => (
          <Badge
            key={type}
            variant="secondary"
            className={cn(
              "cursor-pointer transition-all",
              filter === type
                ? photoTypeColors[type as Photo["type"]]
                : "hover:bg-accent"
            )}
            onClick={() => setFilter(filter === type ? "all" : type)}
          >
            {label}
            <span className="ml-1.5 opacity-60">{photoCounts[type] || 0}</span>
          </Badge>
        ))}
      </div>

      {/* Photo Grid */}
      <div
        className={cn(
          "grid gap-4",
          gridSize === "large"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        )}
      >
        {/* Upload Card */}
        <div
          className={cn(
            "border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-accent/50 transition-colors cursor-pointer group",
            gridSize === "large" ? "aspect-[4/3] p-6" : "aspect-square p-4"
          )}
        >
          <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Upload className="h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Upload Photo</p>
            <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB</p>
          </div>
        </div>

        {/* Photo Cards */}
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className={cn(
              "group relative rounded-xl overflow-hidden border border-border bg-card",
              gridSize === "large" ? "aspect-[4/3]" : "aspect-square"
            )}
          >
            <img
              src={photo.url}
              alt={`${photo.type} photo`}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Type Badge */}
            <Badge
              className={cn(
                "absolute top-2 left-2 text-[10px]",
                photoTypeColors[photo.type]
              )}
            >
              {photoTypeLabels[photo.type]}
            </Badge>

            {/* Cover/Logo indicator */}
            {(photo.type === "cover" || photo.type === "logo") && (
              <div className="absolute top-2 right-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
            )}

            {/* Hover Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5 text-white text-xs">
                <Eye className="h-3.5 w-3.5" />
                <span>{photo.views.toLocaleString()}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Star className="h-4 w-4" />
                    Set as Cover
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Upload date */}
            <div className="absolute bottom-3 left-3 text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
              {photo.uploadedAt}
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No photos found</h3>
          <p className="text-sm text-muted-foreground">
            {filter !== "all"
              ? `No ${
                  photoTypeLabels[filter as Photo["type"]]
                } photos uploaded yet`
              : "Upload your first photo to get started"}
          </p>
        </div>
      )}
    </div>
  );
}
