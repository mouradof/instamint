import React from "react"
import Link from "next/link"
import { UsersIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

const TeabagCard = ({ teabag }) => {
  return (
    <div className="w-full mb-4">
      <Link href={`/teabag/${teabag.id}`}>
        <a className="block bg-slate-100 flex rounded-lg p-4 items-center hover:bg-slate-200 transition duration-300 px-6 lg:px-10 md:h-32">
          {teabag.image ? (
            <div className="w-16 h-16">
              <Image src={teabag.imageBucket} alt="logo" width={42} height={42} className="rounded-md w-full h-full" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
          )}
          <div className="ml-3 flex-grow">
            <div className="flex justify-between items-center">
              <span className="text-black font-bold">{teabag.name}</span>
              <div className="flex items-center">
                <span className="text-gray-600 text-md mr-1">{teabag.userCount}</span>
                <UsersIcon width={16} />
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base line-clamp-3">{teabag.description}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default TeabagCard
