import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="h-screen">
      <section className="bg-hero-section bg-cover">
        <div className="bg-gradient-to-b from-neutral-800/80 to-neutral-900">
          <div className="space-y-5 border-b-8 border-neutral-900 py-48 text-center text-white">
            <h1 className="mx-1 text-2xl">
              Transforme suas lembraças em tesouros eternos!
            </h1>
            <p className="text-neutral-400">
              Armazene e proteja suas fotos e vídeos na nuvem de maneira segura,
              descomplicada e gratuita
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto space-y-6 p-4 sm:max-w-md sm:py-16">
        <Link
          href="/sign-up"
          className="block rounded-full bg-indigo-500 py-3 text-center align-middle font-alt text-xl text-neutral-300 transition-colors duration-200 hover:bg-indigo-600"
        >
          Criar conta
        </Link>

        <div className="flex items-center">
          <hr className="w-full border-neutral-600" />

          <span className="mx-4 text-neutral-400">ou</span>

          <hr className="w-full border-neutral-600" />
        </div>

        <Link
          href="#"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-700/60 py-3 text-white transition-colors duration-200 hover:bg-zinc-800"
        >
          <FcGoogle className="text-3xl" />
          Entrar com google
        </Link>

        <Link
          href="#"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-700/60 py-3 text-white transition-colors duration-200 hover:bg-zinc-800"
        >
          <div className="rounded-full bg-white">
            <FaFacebook className="text-3xl text-blue-600" />
          </div>
          Entrar com google
        </Link>
      </section>
    </main>
  )
}

//  <main className="h-screen">
//       {/* Hero */}
//       <div className={`h-3/5 bg-[url(../assets/images/top-view.jpg)] bg-cover`}>
//         <div className="h-full bg-gradient-to-b from-neutral-800/60 to-neutral-900">
//           <div className="flex h-full flex-col items-center justify-center space-y-5 px-4 text-center text-white">
//             <h1 className="text-4xl font-medium">
//               Transforme suas lembranças em tesouros eternos!
//             </h1>
//             <p className="text-md text-neutral-400">
//               Armazene e proteja suas fotos e vídeos na nuvem de maneira segura,
//               descomplicada e gratuita.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="space-y-6 p-4">
//         <Link
//           href="/sign-up"
//           className="block w-full rounded-full bg-indigo-500 py-3 text-center font-alt text-xl transition-colors duration-200 hover:bg-indigo-600"
//         >
//           Criar conta
//         </Link>

//         <div className="flex items-center">
//           <hr className="w-full border-neutral-600" />

//           <span className="mx-4 text-neutral-400">ou</span>

//           <hr className="w-full border-neutral-600" />
//         </div>

//         <Link
//           href="#"
//           className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-800 py-3 text-white"
//         >
//           <FcGoogle className="text-3xl" />
//           Entrar com google
//         </Link>
//         <Link
//           href="#"
//           className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-800 py-3 text-white"
//         >
//           <div className="rounded-full bg-white">
//             <FaFacebook className="text-3xl text-blue-600" />
//           </div>
//           Entrar com google
//         </Link>
//       </div>
//     </main>
