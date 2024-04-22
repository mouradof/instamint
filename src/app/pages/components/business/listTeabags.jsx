import React, { useState, useEffect } from "react"
import axios from "axios"
import { UsersIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import Modal from "../common/Modal.jsx"
import AddTeabagForm from "../form/AddTeabag.jsx"
import Image from "next/image"
import Toast from "../common/Toast.jsx"

const ListTeabags = () => {
  const [teabags, setTeabags] = useState([])
  const [error, setError] = useState(null)
  const [isUserPlusHovered, setIsUserPlusHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [isSuccessToast, setIsSuccessToast] = useState(true)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const fetchTeabags = async () => {
    try {
      const response = await axios.get("http://localhost:4001/10/teabags")
      setTeabags(response.data.result)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchTeabags()
  }, [])

  const onSubmitTeabag = async (teabagData) => {
    try {
      const newTeabag = teabagData.result
      const numberOfUsers = teabagData.numberOfUsers
      newTeabag.userCount = numberOfUsers
      setTeabags((prevTeabags) => [...prevTeabags, newTeabag])
      closeModal()
      setToastMessage("Teabag created with success !")
      setIsSuccessToast(true)
    } catch (error) {
      setError(error.message)
      setToastMessage("Teabag cannot be created !")
      setIsSuccessToast(false)
    }
  }

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  return (
    <div className="relative flex flex-col items-center w-full">
      {error && <p>ERROR: {error}</p>}
      <div className="w-full mb-4 flex justify-center items-center px-8">
        <h1 className="text-4xl font-bold">Teabags</h1>
      </div>
      <div className="w-full px-4 lg:px-0 lg:max-w-4xl">
        <div className="flex justify-end mb-4">
          <UserPlusIcon
            width={36}
            className={isUserPlusHovered ? "text-green-500" : "text-gray-500"}
            onMouseEnter={() => setIsUserPlusHovered(true)}
            onMouseLeave={() => setIsUserPlusHovered(false)}
            onClick={openModal}
          />
        </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal} title={"Add teabag"}>
          <AddTeabagForm onSubmit={onSubmitTeabag} closeModal={closeModal} />
        </Modal>
        <div className="space-y-4 overflow-y-auto max-h-[70vh]">
          {teabags.map((teabag) => (
            <div key={teabag.id} className="w-full mb-4">
              <div className="bg-slate-100 flex rounded-lg p-4 items-center hover:bg-slate-200 transition duration-300 px-6 lg:px-10">
                {teabag.image ? (
                  <Image
                    width={42}
                    height={42}
                    src={teabag.image}
                    alt="logo"
                    className="rounded-md"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
                )}
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between items-center">
                    <a className="text-black font-bold">{teabag.name}</a>
                    <div className="flex items-center">
                      <a className="text-gray-600 text-md mr-1">{teabag.userCount}</a>
                      <UsersIcon width={16} />
                    </div>
                  </div>
                  <a className="text-gray-600">{teabag.description}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {toastMessage && (
        <Toast message={toastMessage} isSuccess={isSuccessToast} />
      )}
    </div>
  )
}

export default ListTeabags
