"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Eye, MousePointer, Phone, Navigation, TrendingUp, Download, Search, MapPin, Users } from "lucide-react"

const viewsData = [
  { month: "Jan", views: 8400, clicks: 2100, calls: 580 },
  { month: "Feb", views: 9200, clicks: 2400, calls: 620 },
  { month: "Mar", views: 8800, clicks: 2300, calls: 590 },
  { month: "Apr", views: 10200, clicks: 2800, calls: 710 },
  { month: "May", views: 11500, clicks: 3100, calls: 780 },
  { month: "Jun", views: 12847, clicks: 3429, calls: 847 },
]

const searchData = [
  { term: "coffee shop near me", searches: 4200 },
  { term: "coworking space downtown", searches: 2800 },
  { term: "techcafe", searches: 2100 },
  { term: "best coffee tech district", searches: 1800 },
  { term: "wifi cafe", searches: 1400 },
]

const deviceData = [
  { name: "Mobile", value: 65, color: "#635bff" },
  { name: "Desktop", value: 28, color: "#00d4ff" },
  { name: "Tablet", value: 7, color: "#a78bfa" },
]

const discoveryData = [
  { type: "Search", percentage: 72 },
  { type: "Maps", percentage: 24 },
  { type: "Direct", percentage: 4 },
]

const demographicsData = [
  { age: "18-24", male: 15, female: 18 },
  { age: "25-34", male: 28, female: 32 },
  { age: "35-44", male: 22, female: 20 },
  { age: "45-54", male: 12, female: 14 },
  { age: "55+", male: 8, female: 10 },
]

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
          <p className="text-sm text-muted-foreground">Track how customers find and interact with your business</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Views", value: "12,847", change: "+12.5%", icon: Eye },
          { title: "Website Clicks", value: "3,429", change: "+8.2%", icon: MousePointer },
          { title: "Phone Calls", value: "847", change: "-3.1%", icon: Phone },
          { title: "Direction Requests", value: "2,156", change: "+15.7%", icon: Navigation },
        ].map((metric) => (
          <Card key={metric.title} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span
                  className={`text-xs font-medium ${
                    metric.change.startsWith("+") ? "text-success" : "text-destructive"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635bff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#635bff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#635bff"
                  strokeWidth={2}
                  fill="url(#viewsGradient)"
                  name="Views"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#00d4ff"
                  strokeWidth={2}
                  fill="url(#clicksGradient)"
                  name="Clicks"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#635bff]" />
              <span className="text-sm text-muted-foreground">Profile Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00d4ff]" />
              <span className="text-sm text-muted-foreground">Website Clicks</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Queries */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Search className="w-5 h-5" />
              Top Search Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchData.map((item, index) => (
                <div key={item.term} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.term}</span>
                    <span className="text-sm text-muted-foreground">{item.searches.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(item.searches / searchData[0].searches) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {deviceData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-medium text-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discovery Methods */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              How Customers Find You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discoveryData.map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.type}</span>
                    <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Customer Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                  <XAxis type="number" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="age" type="category" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="male" fill="#635bff" radius={[0, 4, 4, 0]} name="Male" />
                  <Bar dataKey="female" fill="#00d4ff" radius={[0, 4, 4, 0]} name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#635bff]" />
                <span className="text-sm text-muted-foreground">Male</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00d4ff]" />
                <span className="text-sm text-muted-foreground">Female</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
