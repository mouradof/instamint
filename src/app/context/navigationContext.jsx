// context/NavigationContext.jsx
import React, { createContext, useContext, useState } from "react"

const NavigationContext = createContext({
  activePage: "",
  setActivePage: () => {},
})

export const useNavigation = () => useContext(NavigationContext)

export const NavigationProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("homepage")

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavigationContext.Provider>
  )
}
