import React from 'react'
import { useDispatch } from 'react-redux'
import authSlice from '../store/authSlice'
import { logout } from '../store/authSlice'
import authService from '../Appwrite/auth'

const HeaderLogout = () => {
    const dispatch = useDispatch()
    const loagoutHandle = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default HeaderLogout