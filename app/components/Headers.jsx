"use client"
import {signOut, useSession} from 'next-auth/react'
import React from 'react'
import Link from 'next/link'
const Headers = () => {
  const {data:session} = useSession()
  const handleSignout = async () =>{
    try {
      await signOut()
    } catch (error) {
      
    }
  }
  return (
    <div>
      <button onClick={handleSignout}>Signout</button>
      {
        session?(
          <div>Welcome</div>
        ):(
          <div>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )
      }
    </div>
  )
}

export default Headers