import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import portrait from '../assets/hero-pfp.png'
import CursorGrid from './visuals/CursorGrid.jsx'


function ScrollRevealWord({ word, index, count, progress }) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * 0.8
  const end = Math.min(1, start + 0.22)
  const opacity = useTransform(progress, (value) => {
    if (value <= start) return 0.15
    if (value >= end) return 1
    return 0.15 + (0.85 * (value - start)) / (end - start)
  })

  return <motion.span aria-hidden="true" style={{ opacity }}>{word}</motion.span>
}

export default function Hero() {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const { scrollY: pageScrollY } = useScroll()
  const headlineProgress = useTransform(pageScrollY, [0, Math.max(window.innerHeight * 0.9, 1)], [0, 1])
  const { scrollYProgress: servicesEntry } = useScroll({ target: servicesRef, offset: ['start end', 'start center'] })
  const entrySpring = useSpring(servicesEntry, { stiffness: 120, damping: 22, mass: 0.8 })
  const servicesY = useTransform(entrySpring, [0, 1], [45, 0])
  const servicesScale = useTransform(entrySpring, [0, 1], [0.94, 1])
  const servicesClip = useTransform(entrySpring, [0, 0.86, 1], [
    'inset(42% 46% 42% 46% round 20px)',
    'inset(0% 0% 0% 0% round 0px)',
    'inset(0% 0% 0% 0% round 0px)',
  ])
  const servicesTiltX = useTransform(entrySpring, [0, 1], [22, 0])
  const servicesTiltY = useTransform(entrySpring, [0, 1], [-16, 0])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -65])
  return (
    <>
    <section className="hero-section" id="home" ref={heroRef}>
      <CursorGrid />
      <motion.div className="hero-copy" style={{ y: copyY }}>
        <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER</p>
        <h1 aria-label="HI, I AM SAMEER PALKAR.">
          <ScrollRevealWord word="HI," index={0} count={5} progress={headlineProgress} />{' '}
          <ScrollRevealWord word="I" index={1} count={5} progress={headlineProgress} />{' '}
          <ScrollRevealWord word="AM" index={2} count={5} progress={headlineProgress} />
          <br />
          <span className="hero-name-line"><ScrollRevealWord word="SAMEER" index={3} count={5} progress={headlineProgress} />{' '}
          <ScrollRevealWord word="PALKAR." index={4} count={5} progress={headlineProgress} /></span>
        </h1>
        <article className="intro-card">
          <div className="card-topline"><span>ABOUT ME</span></div>
          <p>I’m a software engineer working across backend development, full-stack technologies, and artificial intelligence. I build scalable applications, solve complex problems, and explore new technologies to develop efficient and practical solutions for real-world challenges.</p>
          <div className="hero-actions">
            <motion.a className="contact-button" href="mailto:palkarsameer04@gmail.com" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>CONTACT ME <span>↗</span></motion.a>
          </div>
        </article>
      </motion.div>
      <motion.div className="portrait-wrap" whileHover={{ rotateY: -2, rotateX: 1 }} transition={{ type: 'spring', stiffness: 170, damping: 18 }}>
        <div className="portrait-meta"><span>BASED IN BENGALURU, INDIA</span></div>
        <div className="portrait-frame">
          <img src={portrait} alt="Sameer Palkar" />
        </div>
        <div className="portrait-actions">
          <motion.a className="portfolio-button portfolio-button--projects" href="#projects" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>View Projects <span aria-hidden="true">↗</span></motion.a>
          <motion.a className="portfolio-button portfolio-button--resume" href="/resume.pdf" target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>View Resume <span aria-hidden="true">↗</span></motion.a>
        </div>
      <motion.div className="scroll-cue" animate={{ y: [0, 8, 0], opacity: 1 }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true"><span>SCROLL TO EXPLORE</span><i>↓</i></motion.div>
      </motion.div>
    </section>
    <div className="home-title-scroll-runway" aria-hidden="true" />
    <motion.section
      className="home-services scroll-panel"
      id="projects"
      ref={servicesRef}
      style={{ y: servicesY, scale: servicesScale, clipPath: servicesClip, rotateX: servicesTiltX, rotateY: servicesTiltY, transformOrigin: 'center center', transformPerspective: 1000 }}
    >
      <div className="section-intro"><p className="eyebrow">01 / WHAT I DO</p><h2>What I <span>do.</span></h2></div>
      <div className="service-list">
        {[
          ['01','Full-stack development','From interface to APIs, I build dependable products end to end.','↗'],
          ['02','Backend & systems','Thoughtful architecture, clean integrations, and room to grow.','↗'],
          ['03','AI & machine learning','Building practical intelligent tools that solve real problems.','↗'],
          ['04','3D modelling & design','Creating thoughtful 3D models and visual designs.','↗'],
        ].map(([n,title,body,arrow])=><motion.article className="service-row" key={n} initial={{opacity:0,x:35}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.55,delay:Number(n)*.07}}><span className="row-number">{n}</span><div><h3>{title}</h3><p>{body}</p></div><span className="row-arrow">{arrow}</span></motion.article>)}
      </div>
    </motion.section>
    <section className="home-contact scroll-panel">
      <CursorGrid /><p className="eyebrow"><span className="status-dot"/> OPEN TO WHAT'S NEXT</p><h2>Have a good<br/>problem to solve?</h2><p>Let’s make something thoughtful, useful, and a little unexpected.</p><a className="contact-button" href="mailto:palkarsameer04@gmail.com">START A CONVERSATION <span>↗</span></a></section>
    </>
  )
}
