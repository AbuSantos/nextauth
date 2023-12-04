import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const Nav = async () => {
  const session = await getServerSession(options)
  return (
    <div>
      <header className="bg-gray-600 text-gray-100">
        <nav className="flex justify-between items-center w-full px-10 py-4">
          <div>My Site</div>
          <div className="flex gap-10">
            <Link href="/"> Home</Link>
            <Link href="/createUser"> Create User</Link>
            <Link href="/clientmember">Client Member</Link>
            <Link href="/member"> Member</Link>
            <Link href="/public"> Public</Link>
            {
              //when we sign out, it sends us back home
              session ? (
                <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
              ) : (
                <Link href="/api/auth/signin">Login </Link>
              )
            }
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Nav
