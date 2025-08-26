import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Setting from './components/layout/setting.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <Setting />
    <App />
  </StrictMode>,
)
