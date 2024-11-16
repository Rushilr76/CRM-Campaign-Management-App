/* eslint-disable no-unused-vars */
import React from 'react'
import {Outlet} from "react-router-dom"
import Header from './components/Header'
import Hero from './pages/CoverPage'
import Footer from './components/Footer'

function Layout() {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default Layout