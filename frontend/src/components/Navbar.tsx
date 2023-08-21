import {
  IoCloudUploadOutline,
  IoCompassOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5'
import decoded from 'jwt-decode'
import { cookies } from 'next/headers'

import NavLink from './NavLink'
import ModalFormPost from './ModalFormPost'

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
      <nav className="fixed bottom-2 left-0 flex w-full justify-center p-2">
        <div className="h-16 w-full rounded-full bg-neutral-700 px-4 shadow shadow-neutral-700 sm:max-w-lg">
          <div className="grid h-full grid-cols-5 place-items-center text-2xl text-white">
            <NavLink pathname="/uploads">
              <IoCloudUploadOutline />
            </NavLink>

            <NavLink pathname="/explore">
              <IoCompassOutline />
            </NavLink>

            <ModalFormPost />

            <NavLink pathname={`/${user?.username}`}>
              <IoPersonOutline />
            </NavLink>

            <NavLink pathname="/settings">
              <IoSettingsOutline />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}
