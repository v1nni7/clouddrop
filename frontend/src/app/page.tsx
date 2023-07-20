import Navbar from '@/components/Navbar'
import FormUpload from '@/components/FormUpload'

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="m-auto flex max-w-7xl flex-1 flex-col items-center justify-center p-12 px-20 text-center">
        <div className="mb-4 flex w-full items-center">
          <FormUpload />
        </div>

        <div className="grid w-full grid-cols-3 gap-4">
          <div className="h-48 w-full rounded-lg bg-zinc-300 p-4">
            <div className=""></div>
          </div>
        </div>
      </main>
    </>
  )
}
