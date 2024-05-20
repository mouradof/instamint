import React, { useState } from "react"
import { MagnifyingGlassIcon as MagnifyingGlassIconSolid } from "@heroicons/react/24/solid"
import useAppContext from "@/app/hooks/useContext.jsx"

const Search = ({ toggleSearch }) => {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const {
    state: { session },
    action: { getUserProfile }
  } = useAppContext()

  const handleSearch = async e => {
    const { value } = e.target
    setQuery(value)

    if (!session) {
      return
    }

    if (value.length > 0) {
      try {
        const response = await getUserProfile({ search: value })

        const [error, users] = response

        if (error) {
          throw new Error(error)
        }

        setSuggestions(users)
      } catch (err) {
        setSuggestions([])
      }
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="relative max-w-md mx-auto bg-white rounded-lg z-50" style={{ width: "80%" }}>
        <div className="flex items-center bg-gray-200 p-2 rounded">
          <MagnifyingGlassIconSolid className="h-6 w-6 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className="bg-gray-200 flex-1 ml-2 p-1 outline-none"
            placeholder="Search users..."
          />
        </div>
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded z-50">
            {suggestions.map(user => (
              <div key={user.id} className="flex items-center p-2 border-b last:border-b-0">
                <img src={user.profileImage} alt={user.username} className="h-8 w-8 rounded-full" />
                <span className="ml-2">{user.username}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="fixed inset-0 z-40" onClick={toggleSearch}></div>
    </div>
  )
}

export default Search
