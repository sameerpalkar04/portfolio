export default function Preloader({ visible, onEnter }) {
  return (
    <div className={`preloader ${visible ? '' : 'preloader--hidden'}`} aria-hidden={!visible}>
      <div className="loader-orbit orbit-one" /><div className="loader-orbit orbit-two" />
      <div className="loader-content">
        <span className="loader-monogram">SP</span>
        <p className="loader-kicker">PORTFOLIO · 2026</p>
        <div className="loader-name">SAMEER<br />PALKAR<span>.</span></div>
        <div className="loader-progress"><i /></div>
        <div className="loader-bottom"><button onClick={onEnter}>SKIP INTRO ↗</button></div>
      </div>
    </div>
  )
}
