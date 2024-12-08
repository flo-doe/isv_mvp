import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function LoadingScreen() {
 const [progress, setProgress] = useState(0)

 useEffect(() => {
   const timer = setInterval(() => {
     setProgress((oldProgress) => {
       if (oldProgress === 100) {
         clearInterval(timer)
         return 100
       }
       const newProgress = oldProgress + 20
       return Math.min(newProgress, 100)
     })
   }, 1000)

   return () => clearInterval(timer)
 }, [])

 return (
   <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#E30B5D]/80 via-[#824579]/70 to-[#a76d9f]/60">
     <motion.div
       className="w-64 h-64 mb-8"
       animate={{
         scale: [1, 1.2, 1],
         rotate: [0, 360],
       }}
       transition={{
         duration: 2,
         ease: "easeInOut",
         times: [0, 0.5, 1],
         repeat: Infinity,
       }}
     >
       <svg viewBox="0 0 100 100" className="w-full h-full">
         <circle
           cx="50"
           cy="50"
           r="45"
           fill="none"
           stroke="#FFFFFF"
           strokeWidth="8"
           strokeLinecap="round"
           strokeDasharray="283"
           strokeDashoffset={283 - (283 * progress) / 100}
         />
       </svg>
     </motion.div>
     <h2 className="text-3xl font-bold mb-4 text-white text-center">
       Organizing Your Information
     </h2>
     <p className="text-xl font-semibold text-white mb-2">{progress}%</p>
     <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
       <motion.div
         className="h-full bg-white"
         initial={{ width: 0 }}
         animate={{ width: `${progress}%` }}
         transition={{ duration: 0.5 }}
       />
     </div>
     <p className="mt-4 text-white text-center max-w-md">
       Our AI agent is processing your data to provide you with the best experience. This may take a few moments.
     </p>
   </div>
 )
}

