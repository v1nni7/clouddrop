import {
  IoAddOutline,
  IoCompassOutline,
  IoFolderOutline,
  IoHomeOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import decoded from 'jwt-decode'
import { cookies } from 'next/headers'

import NavLink from './NavLink'

type User = {
  username: string
} | null

export default function Navbar() {
  let user: User = null
  const token = cookies().get('clouddrop.token')?.value

  if (token) {
    user = decoded(token)
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 flex w-full justify-center p-2">
        <div className="h-16 w-full rounded-full bg-neutral-700 px-4 shadow shadow-neutral-700 sm:max-w-lg">
          <div className="grid h-full grid-cols-5 place-items-center text-2xl text-white">
            <NavLink pathname="/timeline">
              <IoHomeOutline />
            </NavLink>

            <IoCompassOutline />

            <button className="-translate-y-5 rounded-full bg-indigo-500 p-4 shadow shadow-indigo-500 transition-colors hover:bg-indigo-600 hover:shadow-indigo-600">
              <IoAddOutline className="text-2xl" />
            </button>

            <IoFolderOutline />

            <NavLink pathname={`/${user?.username}`}>
              <IoPersonOutline />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}
