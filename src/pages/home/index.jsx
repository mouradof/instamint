import React, { useState, useEffect } from "react"
import Tab from "../../app/components/business/TabPost.jsx"
import Feed from "../../app/components/business/FeedPost.jsx"
import Header from "../../app/components/common/Header.jsx"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
// import useAppContext from "@/app/hooks/useContext.jsx"

const Home = () => {
  // This is not dead code, we only comment it out to avoid making too many requests to the bucket because we are limited to 20,000 requests in the free version
  // const {
  //   action: { getImagesBucket }
  // } = useAppContext()

  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "forYou")

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab)
  }, [activeTab])

  return (
    <div className="relative max-w-md mx-auto min-h-screen pb-16">
      <div className="fixed top-0 left-0 w-full bg-white z-10 pt-5">
        {/* <Header logoUrl={getImagesBucket("Instamint.png")} altText="Logo Instamint" /> */}
        <Header logoUrl="/images/Instamint.png" altText="Logo Instamint" />
        <div className="absolute top-4 right-4">
          <PaperAirplaneIcon className="h-6 w-6 rotate-[315deg] text-green-600" />
        </div>
        <div className="flex justify-around bg-white py-2">
          <Tab title="For You" isActive={activeTab === "forYou"} onClick={() => setActiveTab("forYou")} />
          <Tab title="Subscribed" isActive={activeTab === "subscribed"} onClick={() => setActiveTab("subscribed")} />
        </div>
      </div>
      <Feed type={activeTab} />
    </div>
  )
}

export default Home
