import React, { useState, useEffect } from "react"
import Tab from "@/components/tab"
import Feed from "@/components/feed"
import BottomNav from "@/components/bottomNav"
import Header from "@/components/header"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useNavigation } from "@/context/navigationContext"

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("forYou")
  const { setActivePage } = useNavigation()

  useEffect(() => {
    setActivePage("groups")
  }, [setActivePage])

  return (
    <div className="relative max-w-md mx-auto min-h-screen pb-16">
      <div className="fixed top-0 left-0 w-full bg-white z-10 pt-5">
        <Header logoUrl="/instamint.png" altText="Logo Instamint" />
        <div className="absolute top-4 right-4">
          <PaperAirplaneIcon className="h-6 w-6 rotate-[315deg] text-green-600" />
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
