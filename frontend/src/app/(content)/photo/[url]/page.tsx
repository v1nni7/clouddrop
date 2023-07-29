export default function Photo({ params }: { params: { url: string } }) {
  return <main>{params.url}</main>
}
