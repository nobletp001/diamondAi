import React from 'react'
import thespain  from "../../assets/ThespianAI.jpeg"
import medIn  from "../../assets/medicalAI.jpeg"
import human  from "../../assets/human.jpeg"
import teacher  from "../../assets/TeacherAI.jpeg"
import finance  from "../../assets/FinanceAI.jpeg"
import RelationshipAI  from "../../assets/PsychologyAI.jpeg"
import { useNavigate } from 'react-router-dom'






function Home() {
   const naviagte = useNavigate()
   const goToChat =(n)=>{
      naviagte(`/chat/${n}`)
   }
  return (
    <div className=" bg-cover relative bg-center flex flex-col   h-screen  bg-ImageTwo">
    <h1 className=' text-7xl pt-5 text-center text-white font-bold'>DIAMONDAI(Animation)</h1>
    <h1 className=' text-lg  text-center text-white font-bold'>MY ALL IN ALL ASSISTANT</h1>
  <div className='flex-1 flex flex-col justify-center items-center'>
 <div className='lg:w-[45%] w-[90%] lg:h-[60%] h-[50%] bg-Img py-16 px-10 flex justify-between flex-col'>
 <div className=' flex flex-wrap gap-5'>
<button 
onClick={()=>goToChat('ThespainAi')}
className='flex-1 flex justify-center items-center flex-col'>
    <img src={thespain} alt="thespain"  className='w-8 h-8 lg:w-12 lg:h-12' />
   <p className='text-white font-thin lg:text-lg text-sm'>ThespAIn</p> 
</button>
<button
onClick={()=>goToChat('medicAi')}
className='flex-1 flex justify-center items-center flex-col'>
<img src={medIn} alt="medIn"  className='w-8 h-8 lg:w-12 lg:h-12' />

   <p className='text-white font-thin lg:text-lg text-sm'>MedicAI</p> 
</button>
<button 
onClick={()=>goToChat('PsychologyAi')}
className='flex-1 flex justify-center items-center flex-col'>
<img src={human} alt="human"  className='w-8 h-8 lg:w-12 lg:h-12' />

   <p className='text-white font-thin lg:text-lg text-sm'>PsychologyAI</p> 
</button>

 </div>
 <div className=' flex flex-wrap gap-5 mt-10'>
<button
onClick={()=>goToChat('relationshipAi')}
className='flex-1 flex justify-center items-center flex-col'>
<img src={RelationshipAI} alt="thespain"  className='w-8 h-8 lg:w-12 lg:h-12' />

   <p className='text-white font-thin lg:text-lg text-sm'>RelationshipAI</p> 
</button>
<button
onClick={()=>goToChat('teacherAi')}
className='flex-1 flex justify-center items-center flex-col'>
<img src={teacher} alt="teacher"  className='w-8 h-8 lg:w-12 lg:h-12' />

   <p className='text-white font-thin lg:text-lg text-sm'>TeacherAI</p> 
</button>
<button 
onClick={()=>goToChat('financeAi')}
className='flex-1 flex justify-center items-center flex-col'>
<img src={finance} alt="finance"  className='w-8 h-8 lg:w-12 lg:h-12' />

   <p className='text-white font-thin lg:text-lg text-sm'>FinanceAI</p> 
</button>

 </div>
 </div>
  </div>
    </div>
  )
}

export default Home