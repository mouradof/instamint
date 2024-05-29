import { useEffect } from "react"
import { useRouter } from "next/router"

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("session")

    router.push("/login")
  }, [router])

  return <div>Logging out... Please wait.</div>
}

export default Logout
