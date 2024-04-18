import React from "react"
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/profile/editProfile">Edit Profile</Link>
            </nav>
        </header>
    )
}

export default Header
