import Posts from '@/components/Posts'

export default function Timeline() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-2xl font-semibold">Meus uploads</h2>
        <Posts />
      </main>
    </>
  )
}
