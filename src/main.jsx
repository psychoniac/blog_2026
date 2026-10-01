import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './hooks/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/**
     * AuthProvider englobe toute l'application
     * Tous les composants descendants pourront
     * donc utiliser useAuth()
     */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
