import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar'
import { SidebarProvider } from './components/SidebarContext'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ISeeValue',
  description: 'Connect, Collaborate, and Create Impact',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <AuthProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-grow transition-all duration-300 ml-[60px] sidebar-expanded:ml-[240px]">
                <main className="p-8">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

