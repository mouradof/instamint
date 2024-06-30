import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useAppContext from "@/app/hooks/useContext.jsx"
import Image from "next/image"
import Feed from "@/app/components/Feed.jsx"

const TeabagFeed = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    action: { getTeabagById }
  } = useAppContext()
  const [teabag, setTeabag] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeabag = async () => {
      try {
        const [error, data] = await getTeabagById({ teabagId: id })

        if (error) {
          setError(error)

          return
        }

        setTeabag(data.result)
      } catch (error) {
        setError(error.message)
      }
    }

    if (id) {
      fetchTeabag()
    }
  }, [id, getTeabagById])

  if (error) {
    return <p className="text-red-500">ERROR: {error}</p>
  }

  if (!teabag) {
    return <p>Loading...</p>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{teabag.name}</h1>
      {teabag.imageUrl && (
        <div className="mb-4">
          <Image src={teabag.imageUrl} alt={teabag.name} width={256} height={256} className="rounded-md" />
        </div>
      )}
      <p className="text-gray-600 text-lg mb-4">Number of users: {teabag.userCount}</p>

      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <Feed type="teabag" teabagId={id} />
    </div>
  )
}

export default TeabagFeed
