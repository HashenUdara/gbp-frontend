"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { OverviewTab } from "@/components/dashboard/tabs/overview-tab";
import { AnalysisTab } from "@/components/dashboard/tabs/analysis-tab";
import { PhotosTab } from "@/components/dashboard/tabs/photos-tab";
import { ReviewsTab } from "@/components/dashboard/tabs/reviews-tab";
import { PostsTab } from "@/components/dashboard/tabs/posts-tab";
import { QnATab } from "@/components/dashboard/tabs/qna-tab";
import {
  mockBusinessProfile,
  mockBusinessStats,
  mockReviews,
  mockPosts,
  mockPhotos,
  mockQnA,
  mockAnalyticsData,
  mockSearchSources,
  mockActionsBreakdown,
} from "@/lib/mock-data";
import {
  LayoutDashboard,
  BarChart3,
  ImageIcon,
  MessageSquare,
  FileText,
  HelpCircle,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <ProfileHeader profile={mockBusinessProfile} />

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-center h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 text-foreground">
          <TabsTrigger
            value="overview"
            className="after:-mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent data-[state=active]:after:bg-primary gap-1.5"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="after:-mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent data-[state=active]:after:bg-primary gap-1.5"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Analysis
          </TabsTrigger>
          <TabsTrigger
            value="photos"
            className="after:-mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent data-[state=active]:after:bg-primary gap-1.5"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            Photos
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="after:-mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent data-[state=active]:after:bg-primary gap-1.5"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="posts"
            className="after:-mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent data-[state=active]:after:bg-primary gap-1.5"
          >
            <FileText className="h-3.5 w-3.5" />
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="qna"
            className="after:-mb-1 relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent data-[state=active]:after:bg-primary gap-1.5"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Q&A
          </TabsTrigger>
        </TabsList>

        <div className="mt-5">
          <TabsContent value="overview" className="m-0">
            <OverviewTab
              profile={mockBusinessProfile}
              stats={mockBusinessStats}
              recentReviews={mockReviews}
              recentPosts={mockPosts}
            />
          </TabsContent>

          <TabsContent value="analysis" className="m-0">
            <AnalysisTab
              stats={mockBusinessStats}
              analyticsData={mockAnalyticsData}
              searchSources={mockSearchSources}
              actionsBreakdown={mockActionsBreakdown}
            />
          </TabsContent>

          <TabsContent value="photos" className="m-0">
            <PhotosTab photos={mockPhotos} />
          </TabsContent>

          <TabsContent value="reviews" className="m-0">
            <ReviewsTab
              reviews={mockReviews}
              totalReviews={mockBusinessProfile.totalReviews}
              averageRating={mockBusinessProfile.rating}
            />
          </TabsContent>

          <TabsContent value="posts" className="m-0">
            <PostsTab posts={mockPosts} />
          </TabsContent>

          <TabsContent value="qna" className="m-0">
            <QnATab questions={mockQnA} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
