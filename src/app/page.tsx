"use client"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useRouter} from "next/navigation"

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <ModeToggle/>
      <Button onClick={()=>router.push("/auth/signin")}>Click me</Button>
    </div>
  )
}
