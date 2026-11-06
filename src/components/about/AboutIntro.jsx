import { motion } from 'framer-motion'
import portrait from '../../assets/about-pfp.png'
import CursorGrid from '../visuals/CursorGrid.jsx'

const coursework = ['Database Management Systems', 'Operating Systems', 'Computer Networks', 'Data Structures & Algorithms', 'Web Programming', 'Artificial Intelligence & Machine Learning']

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.5H2v13h3.2v-13ZM3.6 2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM22 14c0-3.9-2.1-5.7-4.8-5.7a4.2 4.2 0 0 0-3.8 2V8.5H10v13h3.4v-6.4c0-1.7.3-3.4 2.5-3.4s2.2 2 2.2 3.5v6.3H22V14Z" /></svg>
}
function GithubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.7 2.4 4.3 1.7.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.7 0c2.2-1.5 3.1-1.2 3.1-1.2.6 1.5.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg>
}
function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7" /></svg>
}

export default function AboutIntro() {
  return (
    <section className="about-intro">
      <CursorGrid />
      <div className="about-portrait-column">
        <motion.h1 className="about-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>ABOUT ME<span>.</span></motion.h1>
        <motion.div className="about-portrait" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: 1.012 }}><img src={portrait} alt="Sameer Palakar" /></motion.div>
      </div>
      <motion.article className="education-card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}>
        <p className="about-summary">I'm a software engineer working across backend development, full-stack technologies, and artificial intelligence. I build scalable applications, solve complex problems, and explore new technologies to develop efficient and practical solutions for real-world challenges.</p>
        <div className="education-details">
          <h2>EDUCATION</h2>
          <div className="education-rule" />
          <h3>Bachelor of Technology - Computer Science &amp; Engineering</h3>
          <p>Vellore Institute of Technology, Vellore</p>
          <p className="graduation">Graduation: August 2026</p>
          <span className="gpa-pill">CGPA: 9.27</span>
          <p className="coursework-label">Relevant Coursework</p>
          <ul className="coursework-list">{coursework.map((course) => <li key={course}>{course}</li>)}</ul>
        </div>
        <div className="about-actions">
          <motion.a className="contact-button resume-download" href="/resume.pdf" target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>DOWNLOAD RESUME <span>↗</span></motion.a>
          <motion.a className="social-button" href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" whileHover={{ y: -4, rotate: -5 }} whileTap={{ scale: 0.95 }}><LinkedInIcon /></motion.a>
          <motion.a className="social-button" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" whileHover={{ y: -4, rotate: -5 }} whileTap={{ scale: 0.95 }}><GithubIcon /></motion.a>
          <motion.a className="social-button" href="mailto:palkarsameer04@gmail.com" aria-label="Email" whileHover={{ y: -4, rotate: -5 }} whileTap={{ scale: 0.95 }}><MailIcon /></motion.a>
        </div>
      </motion.article>
    </section>
  )
}
