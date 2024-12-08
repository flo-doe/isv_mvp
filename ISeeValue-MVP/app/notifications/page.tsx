'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, MessageCircle, Trash2, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

type Notification = {
  id: number
  type: 'notification' | 'message'
  content: string
  sender?: string
  timestamp: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'notification', content: 'Your project "Sustainable Agriculture" has been approved', timestamp: '2 hours ago', read: false },
    { id: 2, type: 'message', content: 'Hi, I\'d like to discuss your recent proposal', sender: 'Jane Doe', timestamp: '1 day ago', read: true },
    { id: 3, type: 'notification', content: 'New partnership opportunity available', timestamp: '3 days ago', read: false },
    { id: 4, type: 'message', content: 'Meeting scheduled for next week', sender: 'John Smith', timestamp: '1 week ago', read: true },
  ])

  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const filteredNotifications = filter === 'all' ? notifications : notifications.filter(n => !n.read)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications & Messages</h1>
        <Select value={filter} onValueChange={(value: 'all' | 'unread') => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter notifications" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <NotificationList 
            notifications={filteredNotifications} 
            markAsRead={markAsRead} 
            deleteNotification={deleteNotification} 
          />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationList 
            notifications={filteredNotifications.filter(n => n.type === 'notification')} 
            markAsRead={markAsRead} 
            deleteNotification={deleteNotification} 
          />
        </TabsContent>
        <TabsContent value="messages">
          <NotificationList 
            notifications={filteredNotifications.filter(n => n.type === 'message')} 
            markAsRead={markAsRead} 
            deleteNotification={deleteNotification} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationList({ notifications, markAsRead, deleteNotification }) {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className={`mb-4 ${notification.read ? 'bg-gray-50' : 'bg-white border-l-4 border-l-[#E30B5D]'}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  {notification.type === 'notification' ? 
                    <Bell className="inline-block mr-2 text-[#E30B5D]" size={16} /> : 
                    <MessageCircle className="inline-block mr-2 text-[#824579]" size={16} />
                  }
                  {notification.type === 'message' ? `Message from ${notification.sender}` : 'Notification'}
                </CardTitle>
                <CardDescription>{notification.timestamp}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notification.content}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  {!notification.read && (
                    <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                      Mark as Read
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </ScrollArea>
  )
}

