'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#E30B5D] text-white rounded-full p-3 shadow-lg hover:bg-[#C00A4E] transition-colors"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col"
          >
            <div className="bg-[#E30B5D] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-bold">Chat Assistant</h3>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              {/* Chat messages would go here */}
            </div>
            <div className="border-t p-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E30B5D]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

