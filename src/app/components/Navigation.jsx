import Link from "next/link"

const Navigation = () => {
  return (
    <nav>
      {/* Insère ici d'autres liens si nécessaire */}
      <Link href="/profile">Profile</Link>&nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/logout">Logout</Link>&nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/login">Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/register">Register</Link>&nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/home">home</Link>&nbsp;&nbsp;&nbsp;&nbsp;
    </nav>
  )
}

export default Navigation
