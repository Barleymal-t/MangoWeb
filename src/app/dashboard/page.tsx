"use client"
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

const Dashboard = () => {
  const router = useRouter();

  return (
    <div>
      <ModeToggle/>
      <Button onClick={()=>router.push("/auth/signin")}>Click me</Button>
    </div>
  )
}

export default Dashboard
