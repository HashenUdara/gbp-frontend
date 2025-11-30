// Types for Google Business Profile data
export interface BusinessProfile {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  website: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  isOpen: boolean;
  openingHours: {
    day: string;
    hours: string;
    isOpen: boolean;
  }[];
  attributes: string[];
  serviceAreas: string[];
  profileCompletion: number;
  profileCompletionItems: {
    item: string;
    completed: boolean;
  }[];
}

export interface BusinessStats {
  views: { value: number; change: number; period: string };
  searches: { value: number; change: number; period: string };
  actions: { value: number; change: number; period: string };
  calls: { value: number; change: number; period: string };
  directions: { value: number; change: number; period: string };
  websiteClicks: { value: number; change: number; period: string };
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  reply?: string;
  replyDate?: string;
  isNew: boolean;
}

export interface Post {
  id: string;
  type: "update" | "offer" | "event" | "product";
  title: string;
  content: string;
  image?: string;
  date: string;
  views: number;
  clicks: number;
  status: "published" | "scheduled" | "draft";
}

export interface Photo {
  id: string;
  url: string;
  type: "cover" | "logo" | "interior" | "exterior" | "product" | "team";
  uploadedAt: string;
  views: number;
}

export interface QnA {
  id: string;
  question: string;
  askedBy: string;
  askedAt: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
  upvotes: number;
}

export interface AnalyticsData {
  date: string;
  views: number;
  searches: number;
  actions: number;
  calls: number;
}

// Mock Business Profile
export const mockBusinessProfile: BusinessProfile = {
  id: "bp_001",
  name: "The Urban Café",
  category: "Coffee Shop",
  description:
    "A cozy neighborhood café serving artisan coffee, fresh pastries, and light meals. Perfect for remote work or catching up with friends in a warm, inviting atmosphere.",
  phone: "+1 (555) 123-4567",
  website: "https://theurbancafe.com",
  email: "hello@theurbancafe.com",
  address: {
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
  },
  coordinates: {
    lat: 37.7749,
    lng: -122.4194,
  },
  rating: 4.7,
  totalReviews: 234,
  isVerified: true,
  isOpen: true,
  openingHours: [
    { day: "Monday", hours: "7:00 AM - 8:00 PM", isOpen: true },
    { day: "Tuesday", hours: "7:00 AM - 8:00 PM", isOpen: true },
    { day: "Wednesday", hours: "7:00 AM - 8:00 PM", isOpen: true },
    { day: "Thursday", hours: "7:00 AM - 8:00 PM", isOpen: true },
    { day: "Friday", hours: "7:00 AM - 10:00 PM", isOpen: true },
    { day: "Saturday", hours: "8:00 AM - 10:00 PM", isOpen: true },
    { day: "Sunday", hours: "8:00 AM - 6:00 PM", isOpen: true },
  ],
  attributes: [
    "Dine-in",
    "Takeout",
    "Delivery",
    "Outdoor seating",
    "Free Wi-Fi",
    "Wheelchair accessible",
    "Dog friendly",
    "Good for groups",
  ],
  serviceAreas: ["San Francisco", "Oakland", "Berkeley"],
  profileCompletion: 85,
  profileCompletionItems: [
    { item: "Business description", completed: true },
    { item: "Business hours", completed: true },
    { item: "Phone number", completed: true },
    { item: "Website", completed: true },
    { item: "Business category", completed: true },
    { item: "Profile photo", completed: true },
    { item: "Cover photo", completed: true },
    { item: "Menu/Services", completed: false },
    { item: "Products", completed: false },
    { item: "Business attributes", completed: true },
  ],
};

// Mock Business Stats
export const mockBusinessStats: BusinessStats = {
  views: { value: 12547, change: 12.3, period: "vs last month" },
  searches: { value: 8234, change: 8.1, period: "vs last month" },
  actions: { value: 1256, change: -2.4, period: "vs last month" },
  calls: { value: 342, change: 5.6, period: "vs last month" },
  directions: { value: 567, change: 15.2, period: "vs last month" },
  websiteClicks: { value: 891, change: 7.8, period: "vs last month" },
};

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: "rev_001",
    author: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely love this place! The coffee is exceptional and the atmosphere is perfect for working remotely. Staff is super friendly.",
    reply:
      "Thank you so much Sarah! We're thrilled you enjoyed your visit. Looking forward to seeing you again soon!",
    replyDate: "1 day ago",
    isNew: true,
  },
  {
    id: "rev_002",
    author: "Mike Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    rating: 4,
    date: "5 days ago",
    text: "Great coffee and pastries. Can get a bit crowded during lunch hours but definitely worth the visit. The avocado toast is a must-try!",
    isNew: true,
  },
  {
    id: "rev_003",
    author: "Emily Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    rating: 5,
    date: "1 week ago",
    text: "Best latte in the city! The baristas really know their craft. Love the cozy interior design too.",
    reply:
      "Thanks Emily! Our baristas will be happy to hear this. Hope to see you soon!",
    replyDate: "6 days ago",
    isNew: false,
  },
  {
    id: "rev_004",
    author: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 3,
    date: "2 weeks ago",
    text: "Coffee is good but service was a bit slow during my visit. Maybe they were short-staffed.",
    isNew: false,
  },
  {
    id: "rev_005",
    author: "Jessica Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    rating: 5,
    date: "2 weeks ago",
    text: "My go-to spot for meetings! Fast WiFi, plenty of outlets, and the cold brew is unmatched.",
    isNew: false,
  },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: "post_001",
    type: "offer",
    title: "Happy Hour Special! ☕",
    content:
      "Get 20% off all espresso drinks from 3-5 PM this week only. Perfect for your afternoon pick-me-up!",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    date: "2 hours ago",
    views: 1234,
    clicks: 89,
    status: "published",
  },
  {
    id: "post_002",
    type: "event",
    title: "Live Jazz Night 🎷",
    content:
      "Join us this Friday for live jazz music from 7-10 PM. Featuring local artist Marcus Thompson.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
    date: "1 day ago",
    views: 2456,
    clicks: 156,
    status: "published",
  },
  {
    id: "post_003",
    type: "update",
    title: "New Menu Items!",
    content:
      "We've added 5 new specialty drinks to our menu including our signature Lavender Honey Latte.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    date: "3 days ago",
    views: 3789,
    clicks: 234,
    status: "published",
  },
  {
    id: "post_004",
    type: "product",
    title: "Coffee Beans Now Available",
    content:
      "Take home our house-roasted beans! Available in light, medium, and dark roast.",
    date: "1 week ago",
    views: 1567,
    clicks: 67,
    status: "published",
  },
];

// Mock Photos
export const mockPhotos: Photo[] = [
  {
    id: "photo_001",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600",
    type: "cover",
    uploadedAt: "1 month ago",
    views: 5678,
  },
  {
    id: "photo_002",
    url: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600",
    type: "logo",
    uploadedAt: "2 months ago",
    views: 8923,
  },
  {
    id: "photo_003",
    url: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600",
    type: "interior",
    uploadedAt: "2 weeks ago",
    views: 2345,
  },
  {
    id: "photo_004",
    url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600",
    type: "interior",
    uploadedAt: "3 weeks ago",
    views: 1890,
  },
  {
    id: "photo_005",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    type: "product",
    uploadedAt: "1 week ago",
    views: 3456,
  },
  {
    id: "photo_006",
    url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600",
    type: "product",
    uploadedAt: "1 week ago",
    views: 2890,
  },
  {
    id: "photo_007",
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600",
    type: "exterior",
    uploadedAt: "1 month ago",
    views: 4123,
  },
  {
    id: "photo_008",
    url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600",
    type: "team",
    uploadedAt: "2 weeks ago",
    views: 1567,
  },
];

// Mock Q&A
export const mockQnA: QnA[] = [
  {
    id: "qna_001",
    question: "Do you have vegan milk options?",
    askedBy: "Local Guide",
    askedAt: "3 days ago",
    answer:
      "Yes! We offer oat milk, almond milk, soy milk, and coconut milk at no extra charge.",
    answeredBy: "The Urban Café (Owner)",
    answeredAt: "2 days ago",
    upvotes: 12,
  },
  {
    id: "qna_002",
    question: "Is there parking available nearby?",
    askedBy: "John D.",
    askedAt: "1 week ago",
    answer:
      "There's street parking on Main Street (2-hour limit) and a public parking garage on Oak Street, just a 2-minute walk away.",
    answeredBy: "The Urban Café (Owner)",
    answeredAt: "1 week ago",
    upvotes: 8,
  },
  {
    id: "qna_003",
    question: "Can I bring my laptop to work here?",
    askedBy: "Remote Worker",
    askedAt: "2 weeks ago",
    answer:
      "Absolutely! We have fast WiFi, plenty of power outlets, and comfortable seating for remote work.",
    answeredBy: "The Urban Café (Owner)",
    answeredAt: "2 weeks ago",
    upvotes: 24,
  },
  {
    id: "qna_004",
    question: "Do you take reservations for large groups?",
    askedBy: "Maria S.",
    askedAt: "3 weeks ago",
    upvotes: 5,
  },
  {
    id: "qna_005",
    question: "What are the peak hours to avoid crowds?",
    askedBy: "Coffee Lover",
    askedAt: "1 month ago",
    answer:
      "Our quietest times are usually 2-4 PM on weekdays. Mornings (8-10 AM) and lunch (12-1 PM) tend to be busiest.",
    answeredBy: "The Urban Café (Owner)",
    answeredAt: "1 month ago",
    upvotes: 15,
  },
];

// Mock Analytics Data (last 30 days)
export const mockAnalyticsData: AnalyticsData[] = Array.from(
  { length: 30 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      views: Math.floor(300 + Math.random() * 200 + i * 5),
      searches: Math.floor(200 + Math.random() * 150 + i * 3),
      actions: Math.floor(30 + Math.random() * 20 + i * 0.5),
      calls: Math.floor(5 + Math.random() * 15),
    };
  }
);

// Search sources breakdown
export const mockSearchSources = [
  { name: "Direct", value: 45, color: "#6366f1" },
  { name: "Discovery", value: 35, color: "#8b5cf6" },
  { name: "Branded", value: 20, color: "#a855f7" },
];

// Actions breakdown
export const mockActionsBreakdown = [
  { name: "Website", value: 891, percentage: 35 },
  { name: "Directions", value: 567, percentage: 22 },
  { name: "Calls", value: 342, percentage: 14 },
  { name: "Messages", value: 234, percentage: 9 },
  { name: "Bookings", value: 512, percentage: 20 },
];
