import React, { useState, useEffect } from "react"
import axios from "axios"

const ListTeabags = () => {
  const [teabags, setTeabags] = useState([])
  const [error, setError] = useState(null)

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
    <div>
      {error && <p>Une erreur s'est produite : {error}</p>}
      <ul>
        {teabags.map(teabag => (
          <li key={teabag.id}>
            <strong>Name:</strong> {teabag.name}<br />
            <strong>Description:</strong> {teabag.description}<br />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListTeabags
