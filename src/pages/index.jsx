import React, { useEffect } from "react"
import { useRouter } from "next/router"
import styles from "../app/styles/Home.module.css"
import { useRef } from "react"

export default function Home() {
  const router = useRouter()
  const pageContainerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const pageContainer = pageContainerRef.current

      if (pageContainer) {
        pageContainer.classList.add("fadeOut")
        setTimeout(() => router.push("/login"), 500)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div ref={pageContainerRef} className={styles.pageContainer}>
      <div className={styles.splash}>
        <div className={styles.corners}>
          <div className={`${styles.corner} ${styles["corner--1"]}`}></div>
          <div className={`${styles.corner} ${styles["corner--2"]}`}></div>
          <div className={`${styles.corner} ${styles["corner--3"]}`}></div>
          <div className={`${styles.corner} ${styles["corner--4"]}`}></div>
        </div>
      </div>
    </div>
  )
}

Home.isPublicPage = true
