'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
const Member = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callback=/clientmember')
    },
  })
  return (
    <div>
      <h1>CientMember Server Session</h1>
    </div>
  )
}

export default Member
