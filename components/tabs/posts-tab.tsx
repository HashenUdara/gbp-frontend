"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Calendar,
  Eye,
  MousePointer,
  ImageIcon,
  Megaphone,
  Tag,
  CalendarDays,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const posts = [
  {
    id: 1,
    type: "update",
    title: "New Winter Menu Available!",
    content:
      "We're excited to announce our new winter menu featuring spiced lattes, hot chocolate bombs, and seasonal pastries. Come warm up with us! ☕🍂",
    image: "/winter-coffee-drinks-menu.jpg",
    status: "published",
    date: "Nov 25, 2024",
    views: 2340,
    clicks: 189,
  },
  {
    id: 2,
    type: "event",
    title: "Tech Talk: AI in Coffee Industry",
    content:
      "Join us this Saturday for an exciting tech talk about how AI is revolutionizing the coffee industry. Free admission, coffee included!",
    image: "/tech-talk-event-presentation.jpg",
    status: "published",
    date: "Nov 22, 2024",
    eventDate: "Nov 30, 2024",
    views: 1890,
    clicks: 245,
  },
  {
    id: 3,
    type: "offer",
    title: "20% Off All Cold Drinks",
    content:
      "Beat the heat with our refreshing cold drinks! Use code CHILL20 at checkout for 20% off any cold beverage.",
    image: "/cold-coffee-drinks-iced.jpg",
    status: "scheduled",
    date: "Nov 28, 2024",
    views: 0,
    clicks: 0,
    couponCode: "CHILL20",
  },
  {
    id: 4,
    type: "update",
    title: "Extended Holiday Hours",
    content:
      "Great news! We'll be open extended hours throughout the holiday season. Perfect for last-minute gift shopping fuel!",
    image: "/coffee-shop-holiday-decoration.jpg",
    status: "draft",
    date: "Nov 20, 2024",
    views: 0,
    clicks: 0,
  },
]

const postTypeConfig = {
  update: { icon: Megaphone, color: "bg-primary/10 text-primary", label: "Update" },
  event: { icon: CalendarDays, color: "bg-success/10 text-success", label: "Event" },
  offer: { icon: Tag, color: "bg-warning/10 text-warning", label: "Offer" },
}

const statusConfig = {
  published: { color: "bg-success/10 text-success", label: "Published" },
  scheduled: { color: "bg-primary/10 text-primary", label: "Scheduled" },
  draft: { color: "bg-muted text-muted-foreground", label: "Draft" },
}

export function PostsTab() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Posts & Updates</h2>
          <p className="text-sm text-muted-foreground">Create and manage your Google Business Posts</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Post Type</label>
                <Select defaultValue="update">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Enter post title..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea placeholder="Write your post content..." className="min-h-[120px]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Save Draft
                </Button>
                <Button>Publish Now</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{posts.length}</p>
                <p className="text-xs text-muted-foreground">Total Posts</p>
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
                  {posts.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <MousePointer className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{posts.reduce((acc, p) => acc + p.clicks, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {posts.filter((p) => p.status === "scheduled").length}
                </p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => {
          const typeConfig = postTypeConfig[post.type as keyof typeof postTypeConfig]
          const status = statusConfig[post.status as keyof typeof statusConfig]
          const TypeIcon = typeConfig.icon

          return (
            <Card key={post.id} className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary" className={typeConfig.color}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {typeConfig.label}
                      </Badge>
                      <Badge variant="secondary" className={status.color}>
                        {status.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground ml-auto">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.content}</p>

                    {post.type === "event" && post.eventDate && (
                      <div className="flex items-center gap-2 text-sm text-foreground mb-4">
                        <CalendarDays className="w-4 h-4 text-muted-foreground" />
                        Event Date: {post.eventDate}
                      </div>
                    )}

                    {post.type === "offer" && post.couponCode && (
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <Badge variant="outline" className="font-mono">
                          {post.couponCode}
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views.toLocaleString()} views
                        </span>
                        <span className="flex items-center gap-1">
                          <MousePointer className="w-4 h-4" />
                          {post.clicks} clicks
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
