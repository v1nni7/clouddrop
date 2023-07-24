import Posts from '@/components/Posts'
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

        <Posts />
      </main>
    </>
  )
}
