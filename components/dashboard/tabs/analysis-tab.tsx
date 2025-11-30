"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/stat-card";
import { BusinessStats, AnalyticsData } from "@/lib/mock-data";
import {
  Eye,
  Search,
  MousePointer,
  Phone,
  Navigation,
  Globe,
  Calendar,
  Download,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

interface AnalysisTabProps {
  stats: BusinessStats;
  analyticsData: AnalyticsData[];
  searchSources: { name: string; value: number; color: string }[];
  actionsBreakdown: { name: string; value: number; percentage: number }[];
}

export function AnalysisTab({
  stats,
  analyticsData,
  searchSources,
  actionsBreakdown,
}: AnalysisTabProps) {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Performance Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Track how customers find and interact with your business
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Views"
          value={stats.views.value}
          change={stats.views.change}
          period={stats.views.period}
          icon={<Eye className="h-4 w-4" />}
        />
        <StatCard
          title="Search Appearances"
          value={stats.searches.value}
          change={stats.searches.change}
          period={stats.searches.period}
          icon={<Search className="h-4 w-4" />}
        />
        <StatCard
          title="Total Actions"
          value={stats.actions.value}
          change={stats.actions.change}
          period={stats.actions.period}
          icon={<MousePointer className="h-4 w-4" />}
        />
        <StatCard
          title="Phone Calls"
          value={stats.calls.value}
          change={stats.calls.change}
          period={stats.calls.period}
          icon={<Phone className="h-4 w-4" />}
        />
        <StatCard
          title="Directions"
          value={stats.directions.value}
          change={stats.directions.change}
          period={stats.directions.period}
          icon={<Navigation className="h-4 w-4" />}
        />
        <StatCard
          title="Website Clicks"
          value={stats.websiteClicks.value}
          change={stats.websiteClicks.change}
          period={stats.websiteClicks.period}
          icon={<Globe className="h-4 w-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views & Searches Trend */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Views & Searches Trend
              </CardTitle>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  Views
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                  Searches
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient
                      id="viewsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="searchesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#viewsGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="searches"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#searchesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Actions Over Time */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Customer Actions
              </CardTitle>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Actions
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  Calls
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="actions" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="calls" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Search Sources */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              How Customers Find You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={searchSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {searchSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {searchSources.map((source) => (
                <div
                  key={source.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-muted-foreground">{source.name}</span>
                  <span className="font-medium">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Actions Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actionsBreakdown.map((action) => (
                <div key={action.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {action.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        {action.value.toLocaleString()}
                      </span>
                      <Badge variant="secondary" className="font-normal">
                        {action.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${action.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
