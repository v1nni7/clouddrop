import { IoSearchSharp } from 'react-icons/io5'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text text-2xl font-bold text-transparent">
        CloudDrop
      </h1>

      <button className="rounded-full bg-neutral-800 p-2">
        <IoSearchSharp className="text-2xl text-neutral-300" />
      </button>
    </header>
  )
}
