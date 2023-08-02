import Link from 'next/link'
import {
  IoAddOutline,
  IoCompassOutline,
  IoFolderOutline,
  IoHome,
  IoHomeOutline,
  IoPersonOutline,
} from 'react-icons/io5'

export default function Navbar() {
  return (
    <>
      <nav className="fixed bottom-0 left-0 flex w-full justify-center p-2">
        <div className="h-16 w-full rounded-full bg-neutral-700 px-4 shadow shadow-neutral-700 sm:max-w-lg">
          <div className="grid h-full grid-cols-5 place-items-center text-2xl text-white">
            <Link
              href="/timeline"
              className="flex h-full w-1/2 items-center justify-center border-t-4 border-indigo-500"
            >
              {/* <IoHomeOutline /> */}

              <IoHome className="text-indigo-500" />
            </Link>

            <IoCompassOutline />

            <button className="-translate-y-5 rounded-full bg-indigo-500 p-4 shadow shadow-indigo-500 transition-colors hover:bg-indigo-600 hover:shadow-indigo-600">
              <IoAddOutline className="text-2xl" />
            </button>

            <IoFolderOutline />

            <IoPersonOutline />
          </div>
        </div>
      </nav>
    </>
  )
}
