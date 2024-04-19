import React, { useState, useEffect } from "react"
import Tab from "@/components/tab"
import Feed from "@/components/feed"
import BottomNav from "@/components/bottomNav"
import Image from "next/image"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useNavigation } from "@/context/navigationContext"

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("forYou")
  const { setActivePage } = useNavigation()

  useEffect(() => {
    setActivePage("homepage")
  }, [setActivePage])

  return (
    <div className="relative max-w-md mx-auto min-h-screen pb-16">
      <div className="fixed top-0 left-0 w-full bg-white z-10 pt-5">
        <div className="flex justify-between items-center pl-4 pr-4">
          <div>
            <Image
              src="/instamint.png"
              alt="Logo Instamint"
              width={100}
              height={100}
            />
          </div>
          <div>
            <PaperAirplaneIcon className="h-6 w-6 rotate-[315deg] text-green-600" />
          </div>
        </div>
        <div className="flex justify-around bg-white py-2">
          <Tab
            title="For You"
            isActive={activeTab === "forYou"}
            onClick={() => setActiveTab("forYou")}
          />
          <Tab
            title="Subscribed"
            isActive={activeTab === "subscribed"}
            onClick={() => setActiveTab("subscribed")}
          />
        </div>
      </div>
      <div className="pt-24">
        <Feed type={activeTab} />
      </div>
      <BottomNav />
    </div>
  )
}

export default HomePage
