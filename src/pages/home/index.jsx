import React, { useState, useEffect } from "react"
import Tab from "../../app/components/business/TabPost.jsx"
import Feed from "../../app/components/business/FeedPost.jsx"
import Header from "../../app/components/common/Header.jsx"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { PlusCircleIcon as PlusCircleIconSolid } from "@heroicons/react/24/solid"
import Modal from "../../app/components/common/Modal.jsx"
import PostForm from "../../app/components/business/PostForm.jsx"

const Home = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "forYou")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab)
  }, [activeTab])

  return (
    <div className="relative max-w-md mx-auto min-h-screen pb-16">
      <div className="fixed top-0 left-0 w-full bg-white z-10 pt-5">
        <Header logoUrl="/images/Instamint.png" altText="Logo Instamint" />
        <div className="absolute top-4 right-4">
          <PaperAirplaneIcon
            className="h-6 w-6 rotate-[315deg] text-green-600 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="flex justify-around bg-white py-2">
          <Tab title="For You" isActive={activeTab === "forYou"} onClick={() => setActiveTab("forYou")} />
          <Tab title="Subscribed" isActive={activeTab === "subscribed"} onClick={() => setActiveTab("subscribed")} />
        </div>
      </div>
      <Feed type={activeTab} />
      <button
        className="fixed bottom-20 right-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircleIconSolid className="h-8 w-8 " />
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Post">
        <PostForm />
      </Modal>
    </div>
  )
}

Home.isPublicPage = false

export default Home
