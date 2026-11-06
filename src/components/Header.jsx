import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Experience', to: '/#experience' },
]
export default function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const light = theme === 'light'
  const location = useLocation()
  useEffect(() => {
    if (!menuOpen) return undefined

    const body = document.body
    const root = document.documentElement
    const previousBody = { overflow: body.style.overflow, touchAction: body.style.touchAction, overscrollBehavior: body.style.overscrollBehavior }
    const previousRoot = { overflow: root.style.overflow, overscrollBehavior: root.style.overscrollBehavior }

    body.style.overflow = 'hidden'
    body.style.touchAction = 'none'
    body.style.overscrollBehavior = 'none'
    root.style.overflow = 'hidden'
    root.style.overscrollBehavior = 'none'

    return () => {
      body.style.overflow = previousBody.overflow
      body.style.touchAction = previousBody.touchAction
      body.style.overscrollBehavior = previousBody.overscrollBehavior
      root.style.overflow = previousRoot.overflow
      root.style.overscrollBehavior = previousRoot.overscrollBehavior
    }
  }, [menuOpen])
  return (
    <header className={`site-header ${light ? 'light-mode' : ''}`}>
      <Link className="wordmark" to="/" aria-label="Sameer Palkar home" onClick={() => setMenuOpen(false)}>ss<span>palkar</span></Link>
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
        {links.map(({ label, to }) => {
          const active = label === 'Home'
            ? location.pathname === '/' && !location.hash
            : label === 'About'
              ? location.pathname === '/about'
              : label === 'Projects'
                ? location.pathname === '/' && location.hash === '#projects'
                : location.pathname === '/' && location.hash === '#experience'
          return <Link key={label} to={to} className={active ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</Link>
        })}
        <a className="header-contact" href="mailto:palkarsameer04@gmail.com" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <button className={`theme-toggle ${light ? 'is-on' : ''}`} type="button" aria-label={`Switch to ${light ? 'dark' : 'light'} mode`} aria-pressed={light} onClick={onToggleTheme}>
        <svg className="mode-icon sun-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
        <span className="toggle-thumb" />
        <svg className="mode-icon moon-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 15.2A8 8 0 0 1 8.8 4.5 8.5 8.5 0 1 0 19.5 15.2Z" /></svg>
      </button>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>
  )
}
