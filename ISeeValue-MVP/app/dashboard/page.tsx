'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, Users, Calendar, Bell, ShoppingBag, User, MessageCircle, TrendingUp, DollarSign, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from 'recharts'
import Link from 'next/link'
import { useProtectedRoute } from '../hooks/useProtectedRoute'
import { useAuth } from '../context/AuthContext'

// Updated color palette
const colors = {
  white: '#ffffff',
  black: '#000000',
  green: '#24ff45',
  lime: '#b6ff24',
  purple: '#824579',
  darkGreen: '#528058',
  olive: '#708052',
  accent: '#E30B5D',
  orange: '#F23005'
}

const platformData = [
  { name: 'Jan', inquiries: 4000, revenue: 2400 },
  { name: 'Feb', inquiries: 3000, revenue: 1398 },
  { name: 'Mar', inquiries: 2000, revenue: 9800 },
  { name: 'Apr', inquiries: 2780, revenue: 3908 },
  { name: 'May', inquiries: 1890, revenue: 4800 },
  { name: 'Jun', inquiries: 2390, revenue: 3800 },
]

const impactGoalsData = [
  { goal: 'No Poverty', progress: 65 },
  { goal: 'Zero Hunger', progress: 50 },
  { goal: 'Good Health', progress: 75 },
  { goal: 'Quality Education', progress: 80 },
  { goal: 'Gender Equality', progress: 60 },
  { goal: 'Clean Water', progress: 70 },
  { goal: 'Affordable Energy', progress: 55 },
]

export default function Dashboard() {
  const { isLoading, user } = useProtectedRoute()
  const { logout } = useAuth()

  const [stats, setStats] = useState({
    views: { value: 735, change: '+2.8%' },
    requests: { value: 76, change: '+5.2%' },
    alerts: { value: 8, change: '-0.1%' }
  })

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New partnership opportunity', time: '2 hours ago' },
    { id: 2, message: 'Project milestone achieved', time: '1 day ago' },
    { id: 3, message: 'Funding goal reached', time: '3 days ago' },
  ])
  const [ongoingListings, setOngoingListings] = useState([
    { id: 1, title: 'Sustainable Agriculture Project', status: 'In Progress' },
    { id: 2, title: 'Clean Energy Initiative', status: 'Funding' },
    { id: 3, title: 'Education for All Campaign', status: 'Planning' },
  ])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-[#a76d9f] to-[#e95b8f] border-none hover-effect">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-white">Welcome Back, {user.name}</h1>
              <p className="text-white mb-4">Keep track of your campaigns and impact. You have {notifications.length} new notifications since your last login.</p>
              <Link href="/notifications">
                <Button className="bg-white text-[#E30B5D] hover:bg-opacity-90 transition-all hover-effect">
                  View Notifications
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              {/* You can add an illustration here */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Views" 
          value={stats.views.value} 
          change={stats.views.change}
          data={platformData}
          color={colors.green}
        />
        <StatCard 
          title="Requests" 
          value={stats.requests.value} 
          change={stats.requests.change}
          data={platformData}
          color={colors.lime}
        />
        <StatCard 
          title="Alerts" 
          value={stats.alerts.value} 
          change={stats.alerts.change}
          data={platformData}
          color={colors.purple}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover-effect">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Platform Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={platformData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: colors.olive, fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: colors.olive, fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: colors.white,
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: `0 2px 8px ${colors.black}20`
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="inquiries" 
                    stroke={colors.accent} 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={colors.lime} 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center items-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#E30B5D] mr-2"></div>
                <span className="text-sm text-[#708052]">Inquiries</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#b6ff24] mr-2"></div>
                <span className="text-sm text-[#708052]">Revenue</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-effect">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Impact Goals Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactGoalsData} layout="vertical" barSize={10}>
                  <XAxis type="number" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis dataKey="goal" type="category" width={120} axisLine={false} tickLine={false} fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: colors.white,
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: `0 2px 8px ${colors.black}20`
                    }}
                  />
                  <Bar 
                    dataKey="progress" 
                    fill={colors.accent}
                    radius={[0, 4, 4, 0]}
                  >
                    {impactGoalsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[Object.keys(colors)[index % Object.keys(colors).length]]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="hover-effect">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/marketplace" className="w-full">
              <Button className="w-full bg-[#E30B5D] hover:bg-[#F23005] text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                <ShoppingBag className="mr-2 h-5 w-5" /> Browse Marketplace
              </Button>
            </Link>
            <Link href="/profile" className="w-full">
              <Button variant="outline" className="w-full hover:bg-[#24ff45] hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105">
                <User className="mr-2 h-5 w-5" /> Update Profile
              </Button>
            </Link>
            <Link href="/chat" className="w-full">
              <Button variant="outline" className="w-full hover:bg-[#b6ff24] hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105">
                <MessageCircle className="mr-2 h-5 w-5" /> Start a Conversation
              </Button>
            </Link>
            <Link href="/analytics" className="w-full">
              <Button variant="outline" className="w-full hover:bg-[#824579] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                <TrendingUp className="mr-2 h-5 w-5" /> View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="hover-effect">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className="flex items-start">
                  <Bell className="mr-2 h-5 w-5 text-[#E30B5D]" />
                  <div>
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-[#708052]">{notification.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Ongoing Listings and Projects */}
      <Card className="hover-effect">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Ongoing Listings and Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {ongoingListings.map((listing) => (
              <li key={listing.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{listing.title}</p>
                  <p className="text-xs text-[#708052]">{listing.status}</p>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-[#528058] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value, change, data, color }) {
  const isPositive = change.startsWith('+')
  
  return (
    <Card className="hover-effect">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-[#708052]">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <span className={`text-sm ${isPositive ? 'text-[#24ff45]' : 'text-[#E30B5D]'}`}>
            {change}
          </span>
        </div>
        <div className="h-[60px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={4}>
              <Bar 
                dataKey="inquiries" 
                fill={color}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

