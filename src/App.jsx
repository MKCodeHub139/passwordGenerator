import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
 const [length,setLength] =useState(7)
 const [password,setPassword]=useState('')
 const [charAllowed,setCharAllowed] =useState(false)
 const [numAllowed,setNumAllowed]  =useState(false)
 let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
 const refS = useRef(null)
 
 
 
 const passwordG =useCallback(()=>{
   let pass =''
   
   if(charAllowed) str+='!~@#$%^&*(){}[]'
   if(numAllowed) str += '0123456789'
   for(let i =1 ; i<=length ; i++){
     let char =Math.floor(Math.random() *str.length +1)
     pass +=str.charAt(char)
    }
    setPassword(pass)
  },[length,charAllowed,numAllowed,setPassword])
  useEffect(()=>{
    passwordG()
  },[length,charAllowed,numAllowed,setPassword])
  
  const copy = useCallback(()=>{
    refS.current?.select()
    navigator.clipboard.writeText(password)

  },[password])
  useEffect(()=>{
copy()
  },[length,charAllowed,numAllowed,setPassword])
  return (
    <div className='w-full h-[100vh] bg-[#b4f59a] flex justify-center pt-22'>
      <div className="card  w-1/2 h-1/3 text-center shadow-lg  px-5">
    <h1 className='text-4xl text-shadow'>Password Generator </h1>

    <div className="inputs">
      <div className="password bg-white flex justify-between h-8 my-3 items-center rounded ">
      <input ref={refS} type="text" name="" id="" className='w-full h-full mx-3 outline-0' value={password} placeholder='Password' readOnly/>
      <button className='px-5 h-full text-white cursor-pointer text-xl bg-[#000] hover:bg-[#292828]'  onClick={copy}>copy</button>
      </div>
      <div className="changes h-20 flex items-center gap-6 ml-5">
        <div className="range flex gap-2">
          <input type="range" name="" id="" min={5} max={100} value={length} onChange={(e)=> setLength(e.target.value)}/>
          <label htmlFor="length">length({length})</label>
        </div>
        <div className="char-allowed  flex gap-2">
          <input type="checkbox" name="" id="" value={charAllowed} onChange={()=>setCharAllowed((prev)=>!prev)}/>
            <label htmlFor="char Allowed">characters</label>

        </div>
        <div className="num-allowed flex gap-2">
          <input type="checkbox" name="" id="" value={numAllowed}  onChange={()=>setNumAllowed((prev)=>!prev)} />
        <label htmlFor="num Allowed">numbers</label>

        </div>
      </div>
    </div>

      </div>
    </div>
  )
}

export default App
