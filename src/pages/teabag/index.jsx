import React, { useState, useEffect } from "react"
import axios from "axios"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import Modal from "../../app/components/common/Modal.jsx"
import AddTeabagForm from "../../app/components/form/AddTeabag.jsx"
import Toast from "../../app/components/common/Toast.jsx"
import TeabagCard from "../../app/components/business/TeabagCard.jsx"

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
      const response = await axios.get("http://localhost:4001/teabags/10")
      setTeabags(response.data.result)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchTeabags()
  }, [])

  const onSubmitTeabag = async teabagData => {
    try {
      const newTeabag = teabagData.result
      const numberOfUsers = teabagData.numberOfUsers
      newTeabag.userCount = numberOfUsers
      setTeabags(prevTeabags => [...prevTeabags, newTeabag])
      await fetchTeabags()
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
      {error && <p className="text-red-500">ERROR: {error}</p>}
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
        {isModalOpen && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />}
        <Modal isOpen={isModalOpen} onClose={closeModal} title={"Add teabag"}>
          <AddTeabagForm onSubmit={onSubmitTeabag} closeModal={closeModal} />
        </Modal>
        <div className="space-y-4 overflow-y-auto max-h-[70vh]">
          {teabags.map(teabag => (
            <TeabagCard key={teabag.id} teabag={teabag} />
          ))}
        </div>
      </div>
      {toastMessage && <Toast message={toastMessage} isSuccess={isSuccessToast} />}
    </div>
  )
}

export default ListTeabags
