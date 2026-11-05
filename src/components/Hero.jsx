import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import portrait from '../assets/about-pfp.png'

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER</p>
        <h1>HI, I AM<br /><span>SAMEER PALKAR.</span></h1>
        <article className="intro-card">
          <div className="card-topline"><span>ABOUT ME</span><span>01 — 04</span></div>
          <p>I’m a software engineer working across backend development, full-stack technologies, and artificial intelligence. I build scalable applications, solve complex problems, and explore new technologies to develop efficient and practical solutions for real-world challenges.</p>
          <div className="hero-actions">
            <motion.a className="contact-button" href="mailto:palkarsameer04@gmail.com" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>CONTACT ME <span>↗</span></motion.a>
          </div>
        </article>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-meta"><span>BASED IN BENGALURU, INDIA</span></div>
        <div className="portrait-frame">
          <img src={portrait} alt="Sameer Palkar" />
          <span className="portrait-index">SP—01</span>
        </div>
        <div className="portrait-actions">
          <motion.a className="portfolio-button portfolio-button--projects" href="#projects" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>View Projects <span aria-hidden="true">↗</span></motion.a>
          <motion.a className="portfolio-button portfolio-button--resume" href="/resume.pdf" target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>View Resume <span aria-hidden="true">↗</span></motion.a>
        </div>
        <div className="portrait-caption"><span>ENGINEERING IDEAS<br />INTO REALITY.</span><span>CLICK TO EXPLORE ↑</span></div>
      </div>
    </section>
  )
}
