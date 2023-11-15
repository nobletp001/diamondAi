import React from 'react'
import  { useRegisterMutation} from '../../redux/api'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
function Login() {
  const [email, setEmail] =React.useState('')
  const [register, {isLoading}] =useRegisterMutation()
  const [emailError, setEmailError] = React.useState("")
 const navigate =  useNavigate()
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sendRegister =async()=>{
    if(email ===''){
      setEmailError('email is required')
return
    }
    else if(!emailRegex.test(email)){
      setEmailError('not a valid email')
      return
    }

try {
  const d = await register(email).unwrap()
 if(d?.message =="User signed in successfully"){
  localStorage.setItem("thesBotToken", email)
   navigate('/')
   toast.success("User signed in successfully !", {
    position: toast.POSITION.TOP_LEFT
  });
 }
} catch (error) {
  // console.log(error)
  const message = error?.message ?error?.message :'something went wrong!'
  toast.error(message, {
    position: toast.POSITION.TOP_LEFT
  });
}
  }
  return (
    <div
      className="bg-cover relative bg-center bg-fixed h-screen flex flex-col p-5 items-center bg-blue-500"
     
    >
 <h1 className='text-white text-xl font-semibold'>DIAMONDAI (Animation)</h1>
      <div className=" lg:w-[43%] w-5/6 mx-auto  flex-1 flex flex-col justify-center items-center">

<div className='p-2'>
<div className="mb-4">
<div className=" flex border-b-2 border-white">
          <input
            className="w-full px-4 py-2 text-white  border-none bg-transparent rounded"
            type="text"
            placeholder="Email"
            onChange={(e)=>{
              setEmailError('')
              setEmail(e.target.value)
            }}
          />
        </div>
      {emailError &&   <p className="text-red-600 text-sm">{emailError} </p>}
</div>
         <p className='text-white text-base text-center font-light'>
         *By using the app, you agree to the use your conversation data for fine-tuning
processes to enhance our service and provide you with a better experience.

</p>
</div>
        <div className='mt-8'>
          <button onClick={sendRegister} className="w-64 rounded-full text-lg bg-white text-black p-2 ">
          <ClipLoader
        color="blue"
        loading={isLoading}
        className='pt-2'
        // cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {
        !isLoading && 'Log in/Sign Up'
      }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login