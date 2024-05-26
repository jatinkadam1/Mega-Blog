import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/auth'
import { login, logout } from './store/authSlice' 
import Header from "../src/components/Header"
import Footer from "../src/components/Footer"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>hello
      <div className='w-full block'>
        <Header/>
        <Footer/>
      </div>
    </div>
  ): null
}

export default App
