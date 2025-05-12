import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CampaignContextProvider } from './Context/CampaignContext'

createRoot(document.getElementById('root')).render(
  
    <CampaignContextProvider>
    <App />
    </CampaignContextProvider>
  
)
