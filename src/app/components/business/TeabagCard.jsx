import { UsersIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

const TeabagCard = ({ teabag }) => {
  return (
    <div className="w-full mb-4">
      <div className="bg-slate-100 flex rounded-lg p-4 items-center hover:bg-slate-200 transition duration-300 px-6 lg:px-10 md:h-32">
        {teabag.image ? (
          <div className="w-16 h-16">
            {/* I have a warning in the console, I didn't find much information, it seems that it is due to a recent update of Next. https://github.com/vercel/next.js/issues/65161 I'll skip for now because we have no time*/}
            <Image src={teabag.imageBucket} alt="logo" width={42} height={42} className="rounded-md w-full h-full" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
        )}
        <div className="ml-3 flex-grow">
          <div className="flex justify-between items-center">
            <a className="text-black font-bold">{teabag.name}</a>
            <div className="flex items-center">
              <a className="text-gray-600 text-md mr-1">{teabag.userCount}</a>
              <UsersIcon width={16} />
            </div>
          </div>
          <p className="text-gray-600 text-sm md:text-base line-clamp-3">{teabag.description}</p>
        </div>
      </div>
    </div>
  )
}

export default TeabagCard
