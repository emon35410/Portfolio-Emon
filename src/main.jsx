import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NotFound from './components/NotFound.jsx'
import './index.css'

// Single-page portfolio: only the root path is a valid page.
// Any other path (e.g. /blog, /random) renders the 404 page.
const KNOWN_PATHS = ['/', '/index.html']
const isKnownPath = KNOWN_PATHS.includes(window.location.pathname.replace(/\/+$/, '') || '/')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isKnownPath ? <App /> : <NotFound />}
  </React.StrictMode>,
)
