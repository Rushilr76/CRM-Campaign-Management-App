/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Header from './components/Header'
import CoverPage from './pages/CoverPage'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Header/> */}
      <CoverPage/>
      {/* <Footer/> */}
    </>
  )
}

export default App
