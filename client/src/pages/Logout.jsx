import React, { useEffect } from 'react'
import { useAuth } from '../common/store/auth'
import { Navigate } from 'react-router-dom';
import Notification from '@/Modules/Notification';

export default function Logout() {

  const { LogoutUser,isLoggedIn } = useAuth();
  useEffect(() => {
    try {
      if(isLoggedIn){
        LogoutUser();
        Notification("Successfully Logged out ✅","success")
      } 
    } catch (error) {
      Notification("Failed to Logout ❌","error")
    }
  }, [LogoutUser])
  return (
    <Navigate to="/login" />
  )
}
