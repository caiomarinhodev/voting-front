import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

type NotFoundPageProps = {
  defaultInitialPage?: string
}

const NotFoundPage = ({
  defaultInitialPage = 'dashboard',
}: NotFoundPageProps) => {
  const route = useRouter()

  const handleClick = () => {
    route.push(`/`)
  }

  return (
    <div className="w-full h-full ">
      <div className="flex flex-row h-full justify-between self-center align-center max-w-[1000px] mx-auto">
        <div className="col-span-4 self-center align-center mr-20">
          <div className="mb-4 block flex px-18 text-center">
            <h1 className="align-center">
              Página não encontrada
            </h1>
          </div>
          <div className="mb-6 block flex px-18">
            <p>
              A página que você está procurando não existe ou foi removida.
            </p>
          </div>
          <div className="mb-4 flex justify-center text-center px-18">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClick}
            >
              Voltar
            </button>
          </div>
        </div>

        <div className="col-span-6 w-full">
          <Image
            src={'/not_found_404.svg'}
            alt="dashImage"
            width={613}
            height={549}
            className="grow"
          />
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
