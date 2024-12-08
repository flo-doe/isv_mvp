'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, LayoutDashboard, ShoppingBag, MessageCircle, User, Settings, LogOut } from 'lucide-react'
import Logo from '@/components/ui/logo'
import { useSidebar } from './SidebarContext'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
  { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function Sidebar() {
  const { isExpanded, setIsExpanded } = useSidebar()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <TooltipProvider>
      <motion.div
        className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 overflow-hidden"
        initial={{ width: '240px' }}
        animate={{ width: isExpanded ? '240px' : '60px' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center">
            <Logo collapsed={!isExpanded} />
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-[#E30B5D] hover:text-black transition-colors duration-200"
            >
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          <nav className="flex-grow">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href={item.href} 
                        className={`flex items-center p-4 text-gray-700 hover:bg-gray-100 transition-all duration-200 ${pathname === item.href ? 'bg-gray-100' : ''}`}
                      >
                        <item.icon size={24} className={pathname === item.href ? 'text-[#E30B5D]' : ''} />
                        {isExpanded && (
                          <span className="ml-4">{item.label}</span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={logout}
                  className="flex items-center p-3 w-full text-gray-700 hover:bg-gray-100 transition-all duration-200 text-lg"
                >
                  <LogOut size={28} />
                  {isExpanded && <span className="ml-4">Logout</span>}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

