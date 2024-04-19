import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import { UsersIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import Header from "./header"

const ListTeabags = () => {
  const [teabags, setTeabags] = useState([])
  const [error, setError] = useState(null)
  const [isUserPlusHovered, setIsUserPlusHovered] = useState(false)

  useEffect(() => {
    const fetchTeabags = async () => {
      try {
        const response = await axios.get("http://localhost:4001/10/teabags")
        const teabagsArray = Object.values(response.data.result)
        setTeabags(teabagsArray)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchTeabags()
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
      {error && <p>Une erreur s'est produite : {error}</p>}
      <div className="w-full mb-4 flex justify-center items-center px-8">
        <h1 className="text-4xl font-bold">Teabags</h1>
      </div>
      <div className="w-full px-4 lg:px-0 lg:max-w-4xl">
        <div className="flex justify-end mb-4">
          <UserPlusIcon
            width={36}
            className={isUserPlusHovered ? "text-green-500" : "text-gray-500"}
            onMouseEnter={() => setIsUserPlusHovered(true)}
            onMouseLeave={() => setIsUserPlusHovered(false)}
          />
        </div>
        <div className="space-y-4">
          {teabags.map((teabag) => (
            <div key={teabag.id} className="w-full mb-4">
              <div className="bg-slate-100 flex rounded-lg p-4 items-center hover:bg-slate-200 transition duration-300 px-6 lg:px-10">
                <Image
                  width={42}
                  height={42}
                  src={teabag.image}
                  alt="logo"
                  className="rounded-md"
                />
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between items-center">
                    <a className="text-black font-bold">{teabag.name}</a>
                    <div className="flex items-center">
                      <a className="text-gray-600 text-md mr-1">{teabag.userCount}</a>
                      <UsersIcon width={16}/>
                    </div>
                  </div>
                  <a className="text-gray-600">{teabag.description}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Header></Header>
      </div>
    </div>
  )
}

export default ListTeabags
