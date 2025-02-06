"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, seterror] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(password !== confirmPassword){
      seterror("your Password doesnot match")
    }

    try {
     const res =  await fetch("/api/auth/register",{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({email,password})
     })

     const data = res.json()

     if(!res.ok){
      seterror("Registration Failed")
     }
     router.push("/login")
    } catch (error) {
      
    }
  }
  return (
    <div>Register</div>
  )
}
