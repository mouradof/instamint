import React, { useState } from "react"
import Tab from "../../app/components/business/TabPost"
import Feed from "../../app/components/business/FeedPost"
import BottomNav from "../../app/components/common/BottomNav"
import Header from "../../app/components/common/Header"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"

const Home = () => {
  const [activeTab, setActiveTab] = useState("forYou")

  return (
    <div className="relative max-w-md mx-auto min-h-screen pb-16">
      <div className="fixed top-0 left-0 w-full bg-white z-10 pt-5">
        <Header logoUrl="/images/Instamint.png" altText="Logo Instamint" />
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

export default Home
