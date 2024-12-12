import React from 'react'
import DisplayCandleSticks from "@/components/DisplayCandleSticks"
import { ChatBotCard } from '@/components/Chatbot'

const Dashboard = () => {
  return (
    <div className='m-2 w-full'>
      <DisplayCandleSticks />
      <ChatBotCard />
    </div>
  )
}

export default Dashboard
