// Review Link Types and Mock Data

export interface ReviewLinkSettings {
  id: string;
  businessId: string;
  slug: string;
  isActive: boolean;
  
  // Appearance
  theme: 'light' | 'dark';
  primaryColor: string;
  gradientFrom?: string;
  gradientTo?: string;
  useGradient: boolean;
  
  // Content - Initial
  headline: string;
  subheadline: string;
  showBusinessName: boolean;
  showBusinessLogo: boolean;
  showBusinessAddress: boolean;
  
  // Content - Positive Response (high ratings)
  positiveHeadline: string;
  positiveSubheadline: string;
  positiveCtaText: string;
  positiveRedirectUrl: string;
  
  // Content - Negative Response (low ratings)
  negativeHeadline: string;
  negativeSubheadline: string;
  negativeCtaText: string;
  negativeRedirectUrl: string;
  showFeedbackForm: boolean;
  feedbackPlaceholder: string;
  
  // Behavior
  minRatingToRedirect: number; // 1-5, ratings below this show negative response
  
  // Analytics
  createdAt: string;
  updatedAt: string;
}

export interface ReviewLinkAnalytics {
  totalVisits: number;
  totalClicks: number;
  averageRating: number;
  ratingDistribution: {
    rating: number;
    count: number;
  }[];
  recentActivity: {
    date: string;
    visits: number;
    clicks: number;
  }[];
}

export const colorPresets = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Indigo', value: '#6366f1' },
];

export const gradientPresets = [
  { name: 'Ocean', from: '#667eea', to: '#764ba2' },
  { name: 'Sunset', from: '#f093fb', to: '#f5576c' },
  { name: 'Forest', from: '#11998e', to: '#38ef7d' },
  { name: 'Fire', from: '#f12711', to: '#f5af19' },
  { name: 'Sky', from: '#a1c4fd', to: '#c2e9fb' },
  { name: 'Berry', from: '#8e2de2', to: '#4a00e0' },
];

export const mockReviewLinkSettings: ReviewLinkSettings = {
  id: 'rl_001',
  businessId: 'biz_001',
  slug: 'sunset-cafe-reviews',
  isActive: true,
  
  theme: 'light',
  primaryColor: '#3b82f6',
  gradientFrom: '#667eea',
  gradientTo: '#764ba2',
  useGradient: false,
  
  headline: 'How was your experience?',
  subheadline: 'We value your feedback! Please take a moment to rate your visit.',
  showBusinessName: true,
  showBusinessLogo: true,
  showBusinessAddress: false,
  
  // Positive response
  positiveHeadline: 'Thank you! 🎉',
  positiveSubheadline: 'We\'re thrilled you had a great experience! Would you mind sharing your feedback on Google?',
  positiveCtaText: 'Leave a Google Review',
  positiveRedirectUrl: 'https://g.page/r/sunset-cafe/review',
  
  // Negative response
  negativeHeadline: 'We\'re sorry to hear that',
  negativeSubheadline: 'We appreciate your honesty. Please let us know how we can improve.',
  negativeCtaText: 'Submit Feedback',
  negativeRedirectUrl: '/feedback',
  showFeedbackForm: true,
  feedbackPlaceholder: 'Tell us what went wrong and how we can make it right...',
  
  minRatingToRedirect: 4,
  
  createdAt: '2024-10-15T10:30:00Z',
  updatedAt: '2024-11-28T14:20:00Z',
};

export const mockReviewLinkAnalytics: ReviewLinkAnalytics = {
  totalVisits: 1247,
  totalClicks: 892,
  averageRating: 4.3,
  ratingDistribution: [
    { rating: 5, count: 423 },
    { rating: 4, count: 289 },
    { rating: 3, count: 112 },
    { rating: 2, count: 45 },
    { rating: 1, count: 23 },
  ],
  recentActivity: [
    { date: '2024-11-28', visits: 45, clicks: 32 },
    { date: '2024-11-27', visits: 52, clicks: 41 },
    { date: '2024-11-26', visits: 38, clicks: 28 },
    { date: '2024-11-25', visits: 61, clicks: 48 },
    { date: '2024-11-24', visits: 47, clicks: 35 },
    { date: '2024-11-23', visits: 55, clicks: 42 },
    { date: '2024-11-22', visits: 49, clicks: 38 },
  ],
};

// Helper function to generate preview URL
export const getReviewLinkUrl = (slug: string) => {
  return `https://review.yourdomain.com/${slug}`;
};
