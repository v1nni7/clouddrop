import Container from '@/components/Container'
import Posts from '@/components/Posts'

export default function Timeline() {
  return (
    <>
      <Container>
        <h2 className="mb-4 text-2xl font-semibold">Meus uploads</h2>
        <Posts />
      </Container>
    </>
  )
}
