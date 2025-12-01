"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/primitives";
import { Photo } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
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

// ============================================
// Types
// ============================================

interface PhotosTabProps {
  photos: Photo[];
  onUpload?: () => void;
  onDelete?: (photo: Photo) => void;
  onSetAsCover?: (photo: Photo) => void;
  onDownload?: (photo: Photo) => void;
}

type PhotoType = Photo["type"];
type GridSize = "small" | "large";

// ============================================
// Constants
// ============================================

const PHOTO_TYPE_CONFIG: Record<PhotoType, { label: string; color: string }> = {
  cover: {
    label: "Cover",
    color:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  },
  logo: {
    label: "Logo",
    color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  },
  interior: {
    label: "Interior",
    color:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  },
  exterior: {
    label: "Exterior",
    color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  },
  product: {
    label: "Product",
    color: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
  },
  team: {
    label: "Team",
    color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400",
  },
};

const FILTER_OPTIONS = [
  { value: "all", label: "All Photos" },
  { value: "cover", label: "Cover" },
  { value: "logo", label: "Logo" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "product", label: "Product" },
  { value: "team", label: "Team" },
];

// ============================================
// Sub-components
// ============================================

interface GridToggleProps {
  gridSize: GridSize;
  onChange: (size: GridSize) => void;
}

function GridToggle({ gridSize, onChange }: GridToggleProps) {
  return (
    <div className="flex items-center border border-border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9 rounded-r-none",
          gridSize === "large" && "bg-accent"
        )}
        onClick={() => onChange("large")}
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
        onClick={() => onChange("small")}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface PhotoTypeBadgesProps {
  photos: Photo[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function PhotoTypeBadges({
  photos,
  activeFilter,
  onFilterChange,
}: PhotoTypeBadgesProps) {
  // Count photos by type
  const counts = React.useMemo(
    () =>
      photos.reduce((acc, photo) => {
        acc[photo.type] = (acc[photo.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    [photos]
  );

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(PHOTO_TYPE_CONFIG).map(([type, config]) => (
        <Badge
          key={type}
          variant="secondary"
          className={cn(
            "cursor-pointer transition-all",
            activeFilter === type ? config.color : "hover:bg-accent"
          )}
          onClick={() => onFilterChange(activeFilter === type ? "all" : type)}
        >
          {config.label}
          <span className="ml-1.5 opacity-60">{counts[type] || 0}</span>
        </Badge>
      ))}
    </div>
  );
}

interface UploadCardProps {
  gridSize: GridSize;
  onClick?: () => void;
}

function UploadCard({ gridSize, onClick }: UploadCardProps) {
  return (
    <div
      className={cn(
        "border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-accent/50 transition-colors cursor-pointer group",
        gridSize === "large" ? "aspect-4/3 p-6" : "aspect-square p-4"
      )}
      onClick={onClick}
    >
      <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Upload className="h-6 w-6" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">Upload Photo</p>
        <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB</p>
      </div>
    </div>
  );
}

interface PhotoCardProps {
  photo: Photo;
  gridSize: GridSize;
  onSetAsCover?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

function PhotoCard({
  photo,
  gridSize,
  onSetAsCover,
  onDownload,
  onDelete,
}: PhotoCardProps) {
  const config = PHOTO_TYPE_CONFIG[photo.type];

  return (
    <div
      className={cn(
        "group relative rounded-xl overflow-hidden border border-border bg-card",
        gridSize === "large" ? "aspect-4/3" : "aspect-square"
      )}
    >
      <img
        src={photo.url}
        alt={`${photo.type} photo`}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Type Badge */}
      <Badge className={cn("absolute top-2 left-2 text-[10px]", config.color)}>
        {config.label}
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
            <DropdownMenuItem className="gap-2" onClick={onSetAsCover}>
              <Star className="h-4 w-4" />
              Set as Cover
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" onClick={onDownload}>
              <Download className="h-4 w-4" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 text-destructive focus:text-destructive"
              onClick={onDelete}
            >
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
  );
}

// ============================================
// Main Component
// ============================================

export function PhotosTab({
  photos,
  onUpload,
  onDelete,
  onSetAsCover,
  onDownload,
}: PhotosTabProps) {
  const [filter, setFilter] = React.useState<string>("all");
  const [gridSize, setGridSize] = React.useState<GridSize>("large");

  // Filter photos
  const filteredPhotos = React.useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.type === filter)),
    [photos, filter]
  );

  // Grid classes based on size
  const gridClasses =
    gridSize === "large"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">Photo Gallery</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {photos.length} photos • Showcase your business with high-quality
            images
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px] sm:w-40">
              <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {FILTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <GridToggle gridSize={gridSize} onChange={setGridSize} />
          <Button
            className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm ml-auto sm:ml-0"
            onClick={onUpload}
          >
            <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Upload Photos</span>
            <span className="xs:hidden">Upload</span>
          </Button>
        </div>
      </div>

      {/* Photo Type Summary */}
      <PhotoTypeBadges
        photos={photos}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {/* Photo Grid */}
      <div className={cn("grid gap-2 sm:gap-4", gridClasses)}>
        <UploadCard gridSize={gridSize} onClick={onUpload} />

        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            gridSize={gridSize}
            onSetAsCover={() => onSetAsCover?.(photo)}
            onDownload={() => onDownload?.(photo)}
            onDelete={() => onDelete?.(photo)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <EmptyState
          icon={ImageIcon}
          title="No photos found"
          description={
            filter !== "all"
              ? `No ${
                  PHOTO_TYPE_CONFIG[filter as PhotoType]?.label || ""
                } photos uploaded yet`
              : "Upload your first photo to get started"
          }
          action={
            <Button onClick={onUpload} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Photo
            </Button>
          }
        />
      )}
    </div>
  );
}
