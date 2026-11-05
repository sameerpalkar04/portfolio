import { useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import AboutPage from './pages/AboutPage.jsx'
import './App.css'

function AppLayout() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('dark')
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1900)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }), 0)
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }, [location.pathname, location.hash, reducedMotion])

  return (
    <MotionConfig reducedMotion="user">
      <>
        <Preloader visible={loading} onEnter={() => setLoading(false)} />
        <main
          id="top"
          className={`site-shell theme-${theme} ${loading ? 'is-loading' : 'is-ready'}`}
        >
          <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              className="route-content"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Hero theme={theme} />} />
                <Route path="/about" element={<AboutPage theme={theme} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
          <Footer />
        </main>
      </>
    </MotionConfig>
  )
}

export default function App() {
  return <BrowserRouter><AppLayout /></BrowserRouter>
}
