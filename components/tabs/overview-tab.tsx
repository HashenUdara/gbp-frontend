"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Eye,
  MousePointer,
  Phone,
  Navigation,
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  MapPin,
  Globe,
  Mail,
  MessageSquare,
  Pencil,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

const stats = [
  {
    title: "Profile Views",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
    period: "vs last month",
  },
  {
    title: "Website Clicks",
    value: "3,429",
    change: "+8.2%",
    trend: "up",
    icon: MousePointer,
    period: "vs last month",
  },
  {
    title: "Phone Calls",
    value: "847",
    change: "-3.1%",
    trend: "down",
    icon: Phone,
    period: "vs last month",
  },
  {
    title: "Direction Requests",
    value: "2,156",
    change: "+15.7%",
    trend: "up",
    icon: Navigation,
    period: "vs last month",
  },
]

const businessInfo = {
  name: "TechCafe Downtown",
  category: "Coffee Shop",
  additionalCategories: ["Tech Hub", "Coworking Space", "Event Venue"],
  address: "123 Innovation Street, Tech District, CA 94105",
  phone: "(415) 555-0123",
  website: "https://techcafe.com",
  email: "hello@techcafe.com",
}

const hours = [
  { day: "Monday", hours: "7:00 AM - 10:00 PM" },
  { day: "Tuesday", hours: "7:00 AM - 10:00 PM" },
  { day: "Wednesday", hours: "7:00 AM - 10:00 PM" },
  { day: "Thursday", hours: "7:00 AM - 10:00 PM" },
  { day: "Friday", hours: "7:00 AM - 11:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 11:00 PM" },
  { day: "Sunday", hours: "8:00 AM - 8:00 PM" },
]

const attributes = [
  { label: "Free Wi-Fi", status: true },
  { label: "Wheelchair Accessible", status: true },
  { label: "Outdoor Seating", status: true },
  { label: "Pet Friendly", status: true },
  { label: "Delivery", status: false },
  { label: "Takeout", status: true },
  { label: "Dine-in", status: true },
  { label: "Reservations", status: true },
]

const completionItems = [
  { label: "Business description", complete: true },
  { label: "Business hours", complete: true },
  { label: "Photos (10+ recommended)", complete: true },
  { label: "Products/Services", complete: false },
  { label: "Booking link", complete: false },
  { label: "Social profiles", complete: true },
]

export function OverviewTab() {
  const completionPercentage = Math.round(
    (completionItems.filter((item) => item.complete).length / completionItems.length) * 100,
  )

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Information */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Business Information</CardTitle>
            <Button variant="ghost" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Business Name
                </label>
                <p className="text-sm text-foreground">{businessInfo.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Primary Category
                </label>
                <p className="text-sm text-foreground">{businessInfo.category}</p>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Additional Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {businessInfo.additionalCategories.map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Address
                </label>
                <p className="text-sm text-foreground">{businessInfo.address}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  Phone
                </label>
                <p className="text-sm text-foreground">{businessInfo.phone}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  Website
                </label>
                <p className="text-sm text-primary">{businessInfo.website}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Email
                </label>
                <p className="text-sm text-foreground">{businessInfo.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</label>
              <p className="text-sm text-foreground mt-2 leading-relaxed">
                TechCafe Downtown is your premier destination for exceptional coffee and innovative workspace solutions.
                We combine the warmth of a neighborhood cafe with cutting-edge technology amenities, creating the
                perfect environment for remote workers, entrepreneurs, and tech enthusiasts. Join us for artisanal
                coffee, high-speed connectivity, and community events.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" strokeWidth="8" className="stroke-secondary" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="stroke-primary"
                  strokeDasharray={`${(completionPercentage / 100) * 352} 352`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{completionPercentage}%</span>
              </div>
            </div>

            <div className="space-y-3">
              {completionItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  {item.complete ? (
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-warning flex-shrink-0" />
                  )}
                  <span className={`text-sm ${item.complete ? "text-muted-foreground" : "text-foreground"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Hours */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Business Hours
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hours.map((schedule, index) => {
                const isToday = new Date().getDay() === (index === 6 ? 0 : index + 1)
                return (
                  <div
                    key={schedule.day}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                      isToday ? "bg-secondary" : ""
                    }`}
                  >
                    <span className={`text-sm ${isToday ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                      {schedule.day}
                      {isToday && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Today
                        </Badge>
                      )}
                    </span>
                    <span className={`text-sm ${isToday ? "text-foreground" : "text-muted-foreground"}`}>
                      {schedule.hours}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Attributes */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Attributes & Amenities</CardTitle>
            <Button variant="ghost" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {attributes.map((attr) => (
                <div
                  key={attr.label}
                  className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                    attr.status ? "bg-success/10" : "bg-secondary"
                  }`}
                >
                  {attr.status ? (
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${attr.status ? "text-foreground" : "text-muted-foreground"}`}>
                    {attr.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: "review",
                content: "New 5-star review from Sarah M.",
                time: "2 hours ago",
                icon: Star,
              },
              {
                type: "question",
                content: 'New question: "Do you have vegan options?"',
                time: "5 hours ago",
                icon: MessageSquare,
              },
              {
                type: "photo",
                content: "Photo uploaded by customer",
                time: "1 day ago",
                icon: Eye,
              },
              {
                type: "update",
                content: "Business hours updated",
                time: "2 days ago",
                icon: Clock,
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.content}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
