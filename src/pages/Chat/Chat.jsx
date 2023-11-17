import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import ClipLoader from "react-spinners/ClipLoader";
import { useDeleteChatMutation, useGetMessageQuery, useSendTextMutation } from '../../redux/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { v4 as uuidv4 } from 'uuid';
function Chat() {
  const email = localStorage.getItem('thesBotToken');
const {id} = useParams()
const formatUriHistory = id =="medicAi"?'medicalhistory': id ==='ThespainAi'?'thespianhistory':id=='PsychologyAi'?'psychologyhistory': id==='relationshipAi'? 'relationshiphistory' :id==='teacherAi'?'teacherhistory':'financehistory'
const formatUriDelete = id =="medicAi"?'medicalconversation': id ==='ThespainAi'?'thespianconversation':id==='PsychologyAi'?'psychologyconversation': id==='relationshipAi'? 'relationshipconversation' :id==='teacherAi'?'teacherconversation':'financeconversation'

 const {data, isLoading, error, isSuccess} =useGetMessageQuery({email, formatUriHistory})
 const [sendText, {isLoading:loading}] = useSendTextMutation()
 const [deleteChat, {isLoading:deleteLoading}] =  useDeleteChatMutation()
 const [chatHistory, setChatHistory] = useState([])
const [text, settext] = useState('')
const navigate = useNavigate()
// console.log(data, error, isLoading)
const formatUri = id =="medicAi"?'medical': id ==='ThespainAi'?'thespian':id==='PsychologyAi'?'psychology': id==='relationshipAi'? 'relationship' :id==='teacherAi'?'teacher':'finance'
const formatText = id =="medicAi"?'MedicalAI': id ==='ThespainAi'?'ThespianAI':id==='PsychologyAi'?'PsychologyAI': id==='relationshipAi'? 'RelationshipAI' :id==='teacherAi'?'TeacherAI':'FinanceAI'

const [responseText, setresponseText] = useState('')
const chatContainerRef = useRef(null);

useEffect(() => {
  if(data){
   if(data?.chat_history){
     // Assuming you have a state variable called 'messages' and 'setMessages' to manage the messages array
 
 const updatedMessages = data?.chat_history?.map((messageItem) => {
   // Transform text_input into user message format
   const userMessage = {
     role: 'user',
     content: messageItem.prompt,
     id: uuidv4()
   };
 
   // Transform message into assistant message format
   const assistantMessage = {
     role: 'assistant',
     content: messageItem.completion,
     id: uuidv4(),
   };
 
   // Return both user and assistant messages
   return [userMessage, assistantMessage];
 });
 
 // Flatten the array to get a single array of messages
 const flattenedMessages = updatedMessages.flat();
 
 // Update the state with the new messages
 setChatHistory(flattenedMessages);
 
   }
  }
 }, [data])

 // ... (rest of your code)

 useEffect(() => {
   // Scroll to the bottom when chatHistory changes
   if (chatContainerRef.current) {
     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
   }
 }, [chatHistory]);


 useEffect(() => {
  if(responseText){
    const updatedMessages = [
      ...chatHistory,
      { role: 'assistant', content: responseText, id:uuidv4() },
    ];

    // Update the state with the new array
    setChatHistory(updatedMessages);
    setresponseText('')
 

  }
  }, [responseText])

  const handleSend = async()=>{
    if(text==''){
      toast.success("please ask a your question", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else{
      const userMessage = { role: 'user', content: text.trim() , id:uuidv4()};
      // Add the user message to the state and clear the input
      setChatHistory((prevMessages) => [...prevMessages, userMessage]);
      settext('')
      try {
        const data = await sendText({
          email:email,
          text,
          uri:formatUri
          }).unwrap()
          if(data){
            setresponseText(data)
          }
      
      } catch (error) {
        
      }
    }
   }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default behavior (e.g., newline in textarea)
      handleSend(); // Call your existing handleSend function
    }
  };
  const LogOutFunc =()=>{
    localStorage.removeItem("")
    navigate('/login')
  }
  const handleDelete = async()=>{
    try {
      const data = await deleteChat({
        email:email,
        formatUriDelete
        }).unwrap()
      
      if(data){
        setChatHistory([])
        toast.success("all messages are clear successfully", {
          position: toast.POSITION.TOP_LEFT
        });
      }
    
    } catch (error) {
      const message = error?.message ?error?.message :'something went wrong!'
      toast.error(message, {
        position: toast.POSITION.TOP_LEFT
      });
    }
   }
  return (
    <div className="bg-cover relative bg-center flex flex-col h-screen bg-ImageThree">
  <div className='relative'>
  <h1 className='h-[20%] lg:text-7xl text-2xl pt-5 text-center text-white font-bold'>{formatText}</h1>
  <div className='absolute flex left-1 gap-3 top-[50%]'>
<button className='text-white' onClick={()=>{
  navigate(-1)
}}>
  <ArrowBackIcon/>
</button>

  </div>
  <div className='absolute flex right-1 gap-3 top-[50%]'>
<button className='text-white' onClick={handleDelete}>
  <DeleteForeverIcon/>
</button>
<button onClick={LogOutFunc} className='text-white'>
  <LogoutIcon/>
</button>
  </div>
  </div>
    
{
  isLoading  &&    <div className="lg:h-[85%] h-[85%]  w-full flex justify-center items-center" >
  <ClipLoader
            color="white"
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
  </div>

  
}

{
  deleteLoading  &&    <div className="lg:h-[85%] h-[85%] w-full flex justify-center items-center" >
  <ClipLoader
            color="white"
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
  </div>

  
}
    {/* Chat messages container with scrolling */}
 {
  !isLoading && !deleteLoading &&   <div className="lg:h-[85%] h-[85%]  w-full overflow-y-auto"  ref={chatContainerRef}>
  <div className='h-auto mt-2 flex flex-col gap-8'>
    {chatHistory.length > 0 && chatHistory.map((chat) => {
      if (chat?.role === "assistant") {
        return (
        <div key={chat?.id}>
           {
          chat?.content !=='' &&  <div key={chat?.id} className="flex-row justify-start lg:w-1/2 w-2/3 ml-auto h-auto  text-lg rounded-2xl bg-emerald-100 rounded-br-none p-3">
          {chat?.content}
        </div>
         }
        </div>
        )
      } else {
        return (
      <div key={chat?.id}>
         {
          chat?.content !=='' &&  <div key={chat?.id} className="flex-row justify-end lg:w-1/2 w-2/3 mr-auto h-auto rounded-2xl  text-lg bg-emerald-100 rounded-bl-none p-3">
          {chat?.content}
        </div> 
         }
      </div>
        )
      }
    })}
  </div>
</div>
 }
  
    {/* Send Input */}
    <div className="lg:h-[8%] h-auto flex    items-center justify-center">
      <div className='flex h-full lg:w-3/6 w-[90%] px-2 bg-white rounded-md'>
        <input
          type="text"
          className="flex-1  text-lg p-2 bg-transparent rounded-ms sm:w-full"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => settext(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
        />
        <button className="mt-1" onClick={handleSend}>
          {!loading && <SendIcon />}
          <ClipLoader
            color="blue"
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </button>
      </div>
    </div>
  </div>
  

  )
}

export default Chat