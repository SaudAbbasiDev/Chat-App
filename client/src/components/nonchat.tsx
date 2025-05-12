import { MessageSquare } from 'lucide-react'

const Nonchat = () => {
  return (
   <>
    <div className="h-screen flex flex-col items-center justify-center w-screen">
      <div className="flex flex-col items-center gap-4">
        <MessageSquare className="w-16 h-16 text-primary animate-bounce" />
        <h1 className="text-2xl font-bold text-gray-800">Start a Conversation</h1>
        <p className="text-gray-600 text-center">
          Select a user from the sidebar to start chatting
        </p>
      </div>
    </div>

    
    
   </>
  )
}

export default Nonchat
