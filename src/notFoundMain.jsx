import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFound from './components/NotFound.jsx'
import './index.css'

// Entry for the static 404.html served by Netlify/Vercel for unknown URLs
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotFound />
  </React.StrictMode>,
)

