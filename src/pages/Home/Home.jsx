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
    <h1 className=' lg:text-7xl text-2xl pt-5 text-center text-white font-bold'>DiamondAI</h1>
    <h1 className=' lg:text-lg text-sm  text-center text-white font-bold'>MY ALL IN ALL ASSISTANT</h1>
  <div className='flex-1 flex flex-col justify-center items-center'>
 <div className='lg:w-[45%] w-[90%]  h-auto bg-Img py-16 px-10 flex justify-between flex-col'>
<div className='grid grid-cols-3 gap-3'>
  {/* Row 1 */}
  <button
    onClick={() => goToChat('StoryweaverAI')}
    className='flex-1 flex justify-center items-center flex-col  p-4 rounded-md'>
    <img src={thespain} alt="thespain" className='w-8 h-8 lg:w-12 lg:h-12' />
    <p className='text-white font-thin lg:text-lg text-sm'>StoryWeaverAI</p>
  </button>

  <button
    onClick={() => goToChat('medicAi')}
    className='flex-1 flex justify-center items-center flex-col  p-4 rounded-md'>
    <img src={medIn} alt="medIn" className='w-8 h-8 lg:w-12 lg:h-12' />
    <p className='text-white font-thin lg:text-lg text-sm'>MedicAI</p>
  </button>

  <button
    onClick={() => goToChat('PsychologyAi')}
    className='flex-1 flex justify-center items-center flex-col  p-4 rounded-md'>
    <img src={human} alt="human" className='w-8 h-8 lg:w-12 lg:h-12' />
    <p className='text-white font-thin lg:text-lg text-sm'>PsychologyAI</p>
  </button>

  {/* Row 2 */}
  <button
    onClick={() => goToChat('relationshipAi')}
    className='flex-1 flex justify-center items-center flex-col  p-4 rounded-md mt-5'>
    <img src={RelationshipAI} alt="relationshipAi" className='w-8 h-8 lg:w-12 lg:h-12' />
    <p className='text-white font-thin lg:text-lg text-sm'>RelationshipAI</p>
  </button>

  <button
    onClick={() => goToChat('teacherAi')}
    className='flex-1 flex justify-center items-center flex-col  p-4 rounded-md mt-5'>
    <img src={teacher} alt="teacherAi" className='w-8 h-8 lg:w-12 lg:h-12' />
    <p className='text-white font-thin lg:text-lg text-sm'>TeacherAI</p>
  </button>

  <button
    onClick={() => goToChat('financeAi')}
    className='flex-1 flex justify-center items-center flex-col  p-4 rounded-md mt-5'>
    <img src={finance} alt="financeAi" className='w-8 h-8 lg:w-12 lg:h-12' />
    <p className='text-white font-thin lg:text-lg text-sm'>FinanceAI</p>
  </button>
</div>

 </div>
  </div>
    </div>
  )
}

export default Home