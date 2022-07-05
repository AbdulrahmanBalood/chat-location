
 import React, { useState,useEffect } from 'react'

 import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
 
 const SecondChat = () => {
   const [username, setUsername] = useState('')


   function createDirectChat(creds) {
     getOrCreateChat(
       creds,
       { is_direct_chat: true, usernames: [username] },
       () => setUsername('')
     )
   }

 
   function renderChatForm(creds) {
     return (
       <div>
         <input 
           disabled
           value={username} 
           onChange={(e) => setUsername(e.target.value)} 
         />
         <button onClick={() => createDirectChat(creds)}>
           Create
         </button>
       </div>
     )
   }
 
   return (
     <ChatEngine
       height='100vh'
       userName='A'
       userSecret='123'
       projectID='d67cbe99-2ebd-4131-8e12-658e6c458947'
       renderNewChatForm={(creds) => renderChatForm(creds)}
     />
   )
 }
 export default SecondChat;