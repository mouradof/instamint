import React from "react"
import Image from "next/image"

const Header = ({ logoUrl, altText }) => {
  return (
    <header className="flex justify-between items-center pl-4 pr-4">
      <Image src={logoUrl} alt={altText} width={100} height={100} />
    </header>
  )
}

export default Header
