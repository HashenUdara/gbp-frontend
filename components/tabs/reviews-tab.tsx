"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ThumbsUp, MessageSquare, Flag, TrendingUp, Send, ChevronDown, ChevronUp } from "lucide-react"

const reviews = [
  {
    id: 1,
    author: "Sarah Mitchell",
    avatar: "/woman-profile.png",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely love this place! The coffee is incredible and the atmosphere is perfect for getting work done. Fast WiFi and friendly staff. Will definitely be coming back!",
    replied: true,
    reply:
      "Thank you so much for your kind words, Sarah! We're thrilled you enjoyed your time with us. Looking forward to seeing you again soon! ☕",
    helpful: 12,
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "/asian-man-profile.png",
    rating: 4,
    date: "5 days ago",
    text: "Great coworking space with good coffee. Only giving 4 stars because it can get quite crowded during peak hours. Would recommend coming early to secure a good spot.",
    replied: false,
    helpful: 8,
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar: "/latina-woman-profile.png",
    rating: 5,
    date: "1 week ago",
    text: "The best cafe in the tech district! I host my team meetings here every week. The private meeting rooms are a game-changer. Coffee quality is consistently excellent.",
    replied: true,
    reply:
      "Emily, we're so glad our meeting rooms work well for your team! Thank you for making us your regular spot. See you next week!",
    helpful: 15,
  },
  {
    id: 4,
    author: "David Park",
    avatar: "/man-profile-photo-korean.jpg",
    rating: 3,
    date: "2 weeks ago",
    text: "Coffee is good but prices are a bit steep. The atmosphere is nice but I wish there were more power outlets available. Service was friendly though.",
    replied: false,
    helpful: 4,
  },
  {
    id: 5,
    author: "Jessica Taylor",
    avatar: "/blonde-woman-profile.png",
    rating: 5,
    date: "3 weeks ago",
    text: "Hidden gem! Amazing cold brew and the pastries are to die for. The staff remembered my order after just two visits. This is customer service done right!",
    replied: true,
    reply: "Jessica, thank you! Our team loves building relationships with our regulars. Your usual will be ready! 😊",
    helpful: 20,
  },
]

const ratingDistribution = [
  { stars: 5, count: 156, percentage: 68 },
  { stars: 4, count: 52, percentage: 23 },
  { stars: 3, count: 15, percentage: 6 },
  { stars: 2, count: 4, percentage: 2 },
  { stars: 1, count: 2, percentage: 1 },
]

export function ReviewsTab() {
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [expandedReplies, setExpandedReplies] = useState<number[]>([])

  const toggleReply = (id: number) => {
    setExpandedReplies((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const averageRating = 4.6
  const totalReviews = 229

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Customer Reviews</h2>
          <p className="text-sm text-muted-foreground">Manage and respond to customer feedback</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="recent">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="unreplied">Needs Reply</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Summary */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-foreground">{averageRating}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(averageRating) ? "fill-warning text-warning" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{totalReviews} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-3">{item.stars}</span>
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Stats */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg. Response Time</span>
                <span className="text-foreground font-medium">4 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pending Replies</span>
                <span className="text-foreground font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Trend */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating Trend</p>
                <p className="text-2xl font-bold text-success">+0.3</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your rating has improved compared to last month. Keep up the great work!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {review.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{review.author}</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "fill-warning text-warning" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                    {!review.replied && (
                      <Badge variant="secondary" className="bg-warning/10 text-warning border-0">
                        Needs Reply
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{review.text}</p>

                  {/* Existing Reply */}
                  {review.replied && review.reply && (
                    <div className="mt-4 pl-4 border-l-2 border-primary/30">
                      <button
                        onClick={() => toggleReply(review.id)}
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        Your response
                        {expandedReplies.includes(review.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      {expandedReplies.includes(review.id) && (
                        <p className="text-sm text-muted-foreground mt-2">{review.reply}</p>
                      )}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="mt-4 space-y-3">
                      <Textarea
                        placeholder="Write your response..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-4">
                    {!review.replied && replyingTo !== review.id && (
                      <Button variant="outline" size="sm" onClick={() => setReplyingTo(review.id)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
