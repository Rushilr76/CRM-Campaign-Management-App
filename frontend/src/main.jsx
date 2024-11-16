import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import SignupPage from './pages/SignupPage.jsx'
import Layout from './Layout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/DashBoard.jsx'
import AudiencePage from './pages/AudiencePage.jsx'
import CampaignPage from './pages/CampaignPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<App/>}/>
      <Route path='/signup' element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/audience" element={<AudiencePage />} />
      <Route path="/campaign" element={<CampaignPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="313838992249-dup89qmpvm10hbi9m4j1ptahbej66edo.apps.googleusercontent.com">
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </GoogleOAuthProvider>
)
