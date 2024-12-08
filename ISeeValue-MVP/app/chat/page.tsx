'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, FileUp, X, Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '../components/SidebarContext'
import { Check, CheckCheck, Clock } from 'lucide-react'

type Message = {
  id: number
  sender: 'user' | 'assistant'
  content: string
  timestamp: string
  status: MessageStatus
  attachment?: {
    name: string
    url: string
  }
}

type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read'

type ChatHistory = {
  id: number
  title: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  category: 'recent' | 'archived'
  agentName: string
  agentAvatar: string
}

export default function ChatPage() {
  const { isExpanded } = useSidebar()
  const [activeChat, setActiveChat] = useState<number>(1)
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    { 
      id: 1, 
      title: 'Sustainability Advisor', 
      lastMessage: 'Here are some eco-friendly alternatives...',
      timestamp: '2 hours ago',
      unreadCount: 0,
      category: 'recent',
      agentName: 'EcoBot',
      agentAvatar: '/ecobot-avatar.png'
    },
    { 
      id: 2, 
      title: 'Market Analyst', 
      lastMessage: 'Based on current trends, I recommend...',
      timestamp: '1 day ago',
      unreadCount: 2,
      category: 'recent',
      agentName: 'MarketMind',
      agentAvatar: '/marketmind-avatar.png'
    },
    { 
      id: 3, 
      title: 'Innovation Assistant', 
      lastMessage: 'Have you considered implementing...',
      timestamp: '1 week ago',
      unreadCount: 0,
      category: 'archived',
      agentName: 'InnovatAI',
      agentAvatar: '/innovatai-avatar.png'
    },
  ])
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({
    1: [
      { id: 1, sender: 'assistant', content: "Hello! I'm EcoBot, your sustainability advisor. How can I help you today?", timestamp: '10:00 AM', status: 'read' },
      { id: 2, sender: 'user', content: "Hi EcoBot! I'm looking for ways to reduce our company's carbon footprint.", timestamp: '10:05 AM', status: 'read' },
      { id: 3, sender: 'assistant', content: "Great initiative! Here are some eco-friendly alternatives to consider: 1. Switch to renewable energy sources, 2. Implement a comprehensive recycling program, 3. Encourage remote work to reduce commuting emissions. Would you like more details on any of these?", timestamp: '10:07 AM', status: 'read' },
    ],
    2: [
      { id: 1, sender: 'assistant', content: "Welcome back! I'm MarketMind, your market analysis AI. What would you like to know about current market trends?", timestamp: '2:00 PM', status: 'read' },
      { id: 2, sender: 'user', content: "Hi MarketMind. Can you give me an overview of the renewable energy market?", timestamp: '2:05 PM', status: 'read' },
      { id: 3, sender: 'assistant', content: "The renewable energy market is experiencing rapid growth. Solar and wind power are leading the charge, with decreasing costs and increasing efficiency. Government incentives and growing environmental awareness are driving adoption. Would you like a more detailed analysis of a specific sector?", timestamp: '2:08 PM', status: 'delivered' },
    ],
    3: [
      { id: 1, sender: 'assistant', content: "Greetings! I'm InnovatAI, your innovation assistant. Ready to brainstorm some groundbreaking ideas?", timestamp: '3:00 PM', status: 'read' },
      { id: 2, sender: 'user', content: "Hello InnovatAI. We're looking for innovative ways to improve our product's energy efficiency.", timestamp: '3:05 PM', status: 'read' },
      { id: 3, sender: 'assistant', content: "Excellent focus! Have you considered implementing smart power management systems? These can significantly reduce energy consumption by optimizing usage patterns. Another avenue to explore is the use of advanced materials that enhance insulation and heat dissipation. Would you like to dive deeper into either of these concepts?", timestamp: '3:08 PM', status: 'read' },
    ]
  })
  const [input, setInput] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = () => {
    if (input.trim() || attachment) {
      const newMessage: Message = { 
        id: messages[activeChat].length + 1, 
        sender: 'user', 
        content: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sending',
        attachment: attachment ? {
          name: attachment.name,
          url: URL.createObjectURL(attachment)
        } : undefined
      }
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...prev[activeChat], newMessage]
      }))
      setInput('')
      setAttachment(null)
      setIsTyping(true)

      // Simulate message status changes
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [activeChat]: prev[activeChat].map(msg => 
            msg.id === newMessage.id ? {...msg, status: 'sent' as MessageStatus} : msg
          )
        }))
      }, 1000)

      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [activeChat]: prev[activeChat].map(msg => 
            msg.id === newMessage.id ? {...msg, status: 'delivered' as MessageStatus} : msg
          )
        }))
      }, 2000)

      // Simulate assistant response
      setTimeout(() => {
        setIsTyping(false)
        const assistantMessage: Message = { 
          id: messages[activeChat].length + 2, 
          sender: 'assistant', 
          content: getAssistantResponse(activeChat, input),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        }
        setMessages(prev => ({
          ...prev,
          [activeChat]: [...prev[activeChat], assistantMessage]
        }))
        setMessages(prev => ({
          ...prev,
          [activeChat]: prev[activeChat].map(msg => 
            msg.sender === 'user' ? {...msg, status: 'read' as MessageStatus} : msg
          )
        }))
      }, 3000)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setAttachment(file)
    } else {
      alert('Please upload a PDF file')
    }
  }

  const getAssistantResponse = (chatId: number, userInput: string): string => {
    const responses = {
      1: "That's a great point about sustainability. Based on your input, I'd suggest looking into renewable energy solutions for your company. Solar panels or wind turbines could significantly reduce your carbon footprint. Would you like more specific recommendations?",
      2: "Interesting question about the market. Given the current trends, renewable energy stocks are showing strong growth potential. Companies focusing on solar and wind technologies are particularly promising. Would you like a more detailed analysis of specific companies?",
      3: "Your focus on energy efficiency is commendable. Have you considered implementing IoT devices to monitor and optimize energy usage in real-time? This could lead to significant improvements in your product's efficiency. I'd be happy to elaborate on this or explore other innovative solutions."
    }
    return responses[chatId as keyof typeof responses] || "I understand. Can you provide more context or specific questions about your needs?"
  }

  const MessageStatus = ({ status }: { status: MessageStatus }) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-gray-400" />
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)]">
      {/* Chat History Sidebar */}
      <div className="w-80 border-r bg-white">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search chats..."
              className="pl-9"
            />
          </div>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="recent">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                {chatHistories
                  .filter(chat => chat.category === 'recent')
                  .map((chat) => (
                    <button
                      key={chat.id}
                      className={`w-full text-left p-3 hover:bg-gray-100 rounded-lg space-y-1 ${activeChat === chat.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={chat.agentAvatar} alt={chat.agentName} />
                            <AvatarFallback>{chat.agentName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{chat.title}</div>
                            <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                            <div className="text-xs text-gray-400">{chat.timestamp}</div>
                          </div>
                        </div>
                        {chat.unreadCount > 0 && (
                          <span className="bg-[#E30B5D] text-white text-xs px-2 py-1 rounded-full">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="archived">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                {chatHistories
                  .filter(chat => chat.category === 'archived')
                  .map((chat) => (
                    <button
                      key={chat.id}
                      className={`w-full text-left p-3 hover:bg-gray-100 rounded-lg space-y-1 ${activeChat === chat.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={chat.agentAvatar} alt={chat.agentName} />
                            <AvatarFallback>{chat.agentName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{chat.title}</div>
                            <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                            <div className="text-xs text-gray-400">{chat.timestamp}</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages[activeChat].map((message) => (
              <motion.div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex items-end gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={message.sender === 'user' ? "/user-avatar.png" : chatHistories.find(chat => chat.id === activeChat)?.agentAvatar} />
                    <AvatarFallback>{message.sender === 'user' ? 'U' : chatHistories.find(chat => chat.id === activeChat)?.agentName[0]}</AvatarFallback>
                  </Avatar>
                  <div 
                    className={`rounded-lg p-4 ${
                      message.sender === 'user' 
                        ? 'bg-[#E30B5D] text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="mb-1">{message.content}</div>
                    {message.attachment && (
                      <div className="mt-2">
                        <a 
                          href={message.attachment.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`${message.sender === 'user' ? 'text-white' : 'text-blue-500'} underline`}
                        >
                          {message.attachment.name}
                        </a>
                      </div>
                    )}
                    <div className={`text-xs flex items-center gap-1 ${message.sender === 'user' ? 'text-pink-100 justify-end' : 'text-gray-500'}`}>
                      {message.timestamp}
                      {message.sender === 'user' && <MessageStatus status={message.status} />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-gray-100 text-gray-500 rounded-lg p-3">
                  Assistant is typing...
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t bg-white p-4">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <FileUp className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Upload PDF</h4>
                    <p className="text-sm text-muted-foreground">
                      Select a PDF file to upload and discuss.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="pdf"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {attachment && (
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-sm truncate">{attachment.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => setAttachment(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              className="bg-[#E30B5D] hover:bg-[#C00A4E] text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

