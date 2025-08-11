"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import LoginOverlay from "./LoginOverlay"
import SignupOverlay from "./SignupOverlay"

export default function UIWrapper({ children }: { children: React.ReactNode }) {
  const [loginOverlay, setLoginOverlay] = useState(false)
  const [signupOverlay, setSignupOverlay] = useState(false)
  const [inputOverlay, setInputOverlay] = useState(false);

  return (
    <>
      <Navbar
        setLoginOverlay={setLoginOverlay}
        setSignupOverlay={setSignupOverlay}
      />
      <LoginOverlay isOpen={loginOverlay} onClose={() => setLoginOverlay(false)} />
      <SignupOverlay isOpen={signupOverlay} onClose={() => setSignupOverlay(false)} />
      <main>{children}</main>
    </>
  )
}