'use client'

import Link from 'next/link'
import { Bell, MessageCircle, User, LayoutDashboard, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Header() {
  const [isHovered, setIsHovered] = useState('')

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold flex items-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center text-[#F24405]"
          >
            <LayoutDashboard className="w-6 h-6 mr-2" />
            ISeeValue
          </motion.span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {[
              { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
              { href: '/chat', label: 'Chat', icon: MessageCircle },
              { href: '/profile', label: 'Profile', icon: User },
            ].map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="hover:text-[#F24405] transition-colors duration-200 flex items-center"
                  onMouseEnter={() => setIsHovered(item.href)}
                  onMouseLeave={() => setIsHovered('')}
                >
                  <motion.div
                    animate={{
                      scale: isHovered === item.href ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-center"
                  >
                    <item.icon className="w-5 h-5 mr-1" />
                    {item.label}
                  </motion.div>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/notifications" className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell className="w-6 h-6 hover:text-[#F24405] transition-colors duration-200" />
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-[#F24405] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                  >
                    3
                  </motion.span>
                </motion.div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

