"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload, ImageIcon, Eye, Trash2, MoreHorizontal, Camera, Users, Grid3X3, List } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const photos = [
  {
    id: 1,
    url: "/modern-coffee-shop.png",
    category: "interior",
    views: 1240,
    uploadedBy: "owner",
    date: "2024-01-15",
  },
  {
    id: 2,
    url: "/latte-art-coffee.jpg",
    category: "products",
    views: 890,
    uploadedBy: "owner",
    date: "2024-01-14",
  },
  {
    id: 3,
    url: "/coworking-space-people-working.jpg",
    category: "interior",
    views: 2100,
    uploadedBy: "customer",
    date: "2024-01-13",
  },
  {
    id: 4,
    url: "/cafe-exterior-storefront.jpg",
    category: "exterior",
    views: 1560,
    uploadedBy: "owner",
    date: "2024-01-12",
  },
  { id: 5, url: "/barista-making-coffee.jpg", category: "team", views: 780, uploadedBy: "owner", date: "2024-01-11" },
  {
    id: 6,
    url: "/pastries-display-cafe.jpg",
    category: "products",
    views: 920,
    uploadedBy: "owner",
    date: "2024-01-10",
  },
  {
    id: 7,
    url: "/tech-event-presentation.jpg",
    category: "events",
    views: 1450,
    uploadedBy: "customer",
    date: "2024-01-09",
  },
  {
    id: 8,
    url: "/outdoor-seating-cafe.jpg",
    category: "exterior",
    views: 670,
    uploadedBy: "owner",
    date: "2024-01-08",
  },
  {
    id: 9,
    url: "/coffee-beans-roasting.png",
    category: "products",
    views: 540,
    uploadedBy: "owner",
    date: "2024-01-07",
  },
]

const categories = [
  { id: "all", label: "All Photos", count: 9 },
  { id: "interior", label: "Interior", count: 2 },
  { id: "exterior", label: "Exterior", count: 2 },
  { id: "products", label: "Products", count: 3 },
  { id: "team", label: "Team", count: 1 },
  { id: "events", label: "Events", count: 1 },
]

export function PhotosTab() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)

  const filteredPhotos =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Photo Gallery</h2>
          <p className="text-sm text-muted-foreground">Manage photos that appear on your Google Business Profile</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Photos
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{photos.length}</p>
                <p className="text-xs text-muted-foreground">Total Photos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Camera className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {photos.filter((p) => p.uploadedBy === "owner").length}
                </p>
                <p className="text-xs text-muted-foreground">Owner Photos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {photos.filter((p) => p.uploadedBy === "customer").length}
                </p>
                <p className="text-xs text-muted-foreground">Customer Photos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Eye className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {photos.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {cat.count}
                  </Badge>
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="bg-card border-border overflow-hidden group">
            {viewMode === "grid" ? (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.url || "/placeholder.svg"}
                    alt={`Photo ${photo.id}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" onClick={() => setSelectedPhoto(photo)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Photo Details</DialogTitle>
                        </DialogHeader>
                        <img src={photo.url || "/placeholder.svg"} alt="" className="w-full rounded-lg" />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{photo.views.toLocaleString()} views</span>
                          <span>Uploaded {photo.date}</span>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Badge variant="secondary" className="absolute top-2 right-2 text-xs capitalize">
                    {photo.uploadedBy}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs capitalize">
                      {photo.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {photo.views.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={photo.url || "/placeholder.svg"}
                    alt={`Photo ${photo.id}`}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {photo.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {photo.uploadedBy}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {photo.views.toLocaleString()} views • Uploaded {photo.date}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Set as Cover</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
