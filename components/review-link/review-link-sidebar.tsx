"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Building2,
  Settings,
  ChevronDown,
  Plus,
  LayoutDashboard,
  Link2,
  BarChart3,
  FileText,
  HelpCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "review-link", label: "Review Link", icon: Link2, href: "/review-link", active: true },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "#" },
  { id: "campaigns", label: "Campaigns", icon: FileText, href: "#" },
]

export function ReviewLinkSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#0A0A0B] fixed h-screen border-r border-white/[0.06]">
      <div className="p-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <Building2 className="w-4 h-4 text-zinc-900" />
          </div>
          <span className="font-semibold text-white">GBP Manager</span>
        </div>
      </div>

      {/* Business Switcher */}
      <div className="px-3 mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors text-left">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-xs font-semibold text-white">TC</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">TechCafe Downtown</p>
                <p className="text-xs text-zinc-500">Active</p>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#141415] border-white/[0.08]">
            <DropdownMenuItem className="text-zinc-300 focus:bg-white/[0.06] focus:text-white">
              <Building2 className="w-4 h-4 mr-2" />
              TechCafe Downtown
            </DropdownMenuItem>
            <DropdownMenuItem className="text-zinc-300 focus:bg-white/[0.06] focus:text-white">
              <Building2 className="w-4 h-4 mr-2" />
              TechCafe Uptown
            </DropdownMenuItem>
            <DropdownMenuItem className="text-zinc-300 focus:bg-white/[0.06] focus:text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Business
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                item.active ? "bg-white/[0.08] text-white" : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300",
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300 transition-colors">
          <HelpCircle className="w-4 h-4" />
          Help
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  )
}
