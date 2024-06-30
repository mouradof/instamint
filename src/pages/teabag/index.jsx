import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/router"
import TeabagCard from "@/app/components/business/TeabagCard.jsx"
import Modal from "@/app/components/common/Modal.jsx"
import AddTeabagForm from "@/app/components/form/AddTeabag.jsx"
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon"
import Toast from "@/app/components/common/Toast.jsx"
import useAppContext from "@/app/hooks/useContext.jsx"

const ListTeabags = () => {
  const {
    apiClients,
    state: { session },
    action: { getUserTeabags, createUserTeabag }
  } = useAppContext()
  const [teabags, setTeabags] = useState([])
  const [error, setError] = useState(null)
  const [isUserPlusHovered, setIsUserPlusHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [isSuccessToast, setIsSuccessToast] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const fetchTeabags = useCallback(async () => {
    if (!session || !session.id) {
      return
    }

    setIsLoading(true)

    try {
      const [error, data] = await getUserTeabags({ userId: session.id })

      if (error) {
        setToastMessage(error)
        setIsSuccessToast(false)

        return
      }

      setTeabags(data.result)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [getUserTeabags, session])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session || !session.id) {
          router.push("/login")

          return
        }

        await fetchTeabags()
      } catch (error) {
        setError(error.message)
      }
    }

    fetchData()
  }, [router, apiClients, session, fetchTeabags])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onSubmitTeabag = async teabagData => {
    try {
      const newTeabag = teabagData.result
      const numberOfUsers = teabagData.numberOfUsers
      newTeabag.userCount = numberOfUsers
      setTeabags(prevTeabags => [...prevTeabags, newTeabag])
      await fetchTeabags()
      setToastMessage("Teabag created with success!")
      setIsSuccessToast(true)
    } catch (error) {
      setError(error.message)
      setToastMessage("Teabag cannot be created!")
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

  const filteredTeabags = useMemo(() => teabags.filter(teabag => teabag.isVisible), [teabags])

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="w-full mb-4 flex justify-center items-center px-8">
        <h1 className="text-4xl font-bold">Teabags</h1>
      </div>
      {error && <p className="text-red-500">ERROR: {error}</p>}
      <div className="w-full px-4 lg:px-0 lg:max-w-4xl">
        <div className="flex justify-end mb-4">
          <UserPlusIcon
            width={36}
            className={isUserPlusHovered ? "text-green-500" : "text-gray-500"}
            onMouseEnter={() => setIsUserPlusHovered(true)}
            onMouseLeave={() => setIsUserPlusHovered(false)}
            onClick={openModal}
            aria-label="Add Teabag"
            role="button"
          />
        </div>
        {isModalOpen && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />}
        <Modal isOpen={isModalOpen} onClose={closeModal} title={"Add teabag"}>
          <AddTeabagForm
            onSubmit={onSubmitTeabag}
            closeModal={closeModal}
            idUser={session && session.id}
            createTeabagFunction={createUserTeabag}
          />
        </Modal>
        {isLoading ? (
          <p>Loading...</p>
        ) : teabags.length === 0 ? (
          <p>You have no teabags! You can create your own teabag!</p>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[70vh]">
            {filteredTeabags.map(teabag => (
              <TeabagCard key={teabag.id} teabag={teabag} />
            ))}
          </div>
        )}
      </div>
      {toastMessage && <Toast message={toastMessage} isSuccess={isSuccessToast} />}
    </div>
  )
}

ListTeabags.isPublicPage = false

export default ListTeabags
