import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SkillGroup from './SkillGroup.jsx'

const groups = [
  { title: 'Languages', skills: [
    { name: 'Java', color: 'ED8B00', logo: 'openjdk' }, { name: 'Python', color: '3776AB', logo: 'python' }, { name: 'C++', color: '00599C', logo: 'cplusplus' }, { name: 'C', color: 'A8B9CC', logo: 'c', logoColor: 'white' }, { name: 'JavaScript', color: 'F7DF1E', logo: 'javascript', logoColor: 'black' }, { name: 'TypeScript', color: '3178C6', logo: 'typescript' }, { name: 'HTML5', color: 'E34F26', logo: 'html5' }, { name: 'CSS3', color: '1572B6', logo: 'css3' }, { name: 'SQL', color: '4169E1', logo: 'postgresql' }, { name: 'PL/SQL', color: 'F80000', logo: 'oracle' },
  ] },
  { title: 'Backend Development', skills: [
    { name: 'Spring Boot', color: '6DB33F', logo: 'springboot' }, { name: 'Node.js', color: '339933', logo: 'nodedotjs' }, { name: 'Express.js', color: '303030', logo: 'express' }, { name: 'FastAPI', color: '009688', logo: 'fastapi' }, { name: 'Flask', color: '222222', logo: 'flask' },
  ] },
  { title: 'Frontend Development', skills: [
    { name: 'React', color: '20232A', logo: 'react', logoColor: '61DAFB' }, { name: 'Tailwind CSS', color: '06B6D4', logo: 'tailwindcss' },
  ] },
  { title: 'Databases', skills: [
    { name: 'PostgreSQL', color: '4169E1', logo: 'postgresql' }, { name: 'MySQL', color: '4479A1', logo: 'mysql' }, { name: 'MongoDB', color: '00684A', logo: 'mongodb' }, { name: 'Oracle SQL', color: 'F80000', logo: 'oracle' },
  ] },
  { title: 'AI / Machine Learning', skills: [
    { name: 'PyTorch', color: 'EE4C2C', logo: 'pytorch' }, { name: 'TensorFlow', color: 'FF6F00', logo: 'tensorflow' }, { name: 'OpenCV', color: '5C3EE8', logo: 'opencv' }, { name: 'MediaPipe', color: '4285F4', logo: 'google' },
  ] },
  { title: 'Design & Creative Tools', skills: [
    { name: 'Figma', color: 'F24E1E', logo: 'figma' }, { name: 'Canva', color: '00C4CC', logo: 'canva', iconLabel: 'C', iconStyle: 'canva' }, { name: 'SketchUp', color: '005F9E', logo: 'sketchup' }, { name: 'Autodesk', color: '0696D7', logo: 'autodesk' }, { name: 'Premiere Pro', color: '9999FF', logo: 'adobepremierepro', iconLabel: 'Pr', iconStyle: 'premiere' }, { name: 'DaVinci Resolve', color: '233A51', logo: 'davinciresolve' },
  ] },
  { title: 'Tools & Platforms', skills: [
    { name: 'Git', color: 'F05032', logo: 'git' }, { name: 'GitHub', color: '181717', logo: 'github' }, { name: 'Docker', color: '2496ED', logo: 'docker' }, { name: 'Kubernetes', color: '326CE5', logo: 'kubernetes' }, { name: 'Postman', color: 'FF6C37', logo: 'postman' },
  ] },
]

export default function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [touchDevice, setTouchDevice] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const activeGroup = groups[activeIndex]

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)')
    const update = () => setTouchDevice(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (paused || !isInView || reducedMotion || touchDevice) return undefined
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % groups.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [paused, isInView, reducedMotion, touchDevice])

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + groups.length) % groups.length)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') move(-1)
    if (event.key === 'ArrowRight') move(1)
  }

  return (
    <section ref={sectionRef} className="about-section skills-section" aria-labelledby="skills-title">
      <motion.div className="section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.55 }}><span>02 / CAPABILITIES</span><h2 id="skills-title">SKILLS<span>.</span></h2></motion.div>
      <div
        className="skills-carousel"
        role="region"
        aria-label="Skills by category"
        aria-roledescription="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
        }}
      >
        <button className="skills-carousel-arrow skills-carousel-arrow--prev" type="button" onClick={() => move(-1)} aria-label="Previous skill category">←</button>
        <button className="skills-carousel-arrow skills-carousel-arrow--next" type="button" onClick={() => move(1)} aria-label="Next skill category">→</button>
        <motion.div
          className="skills-carousel-stage"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -45 || info.velocity.x < -350) move(1)
            else if (info.offset.x > 45 || info.velocity.x > 350) move(-1)
          }}
        >
          {groups.map((group, index) => {
            const rawOffset = index - activeIndex
            const offset = ((rawOffset + groups.length / 2) % groups.length + groups.length) % groups.length - groups.length / 2
            const distance = Math.abs(offset)
            return (
              <motion.div
                key={group.title}
                className="skills-carousel-card"
                aria-hidden={distance > 1}
                animate={{
                  x: `${offset * 62}%`,
                  rotateY: offset * -38,
                  scale: distance === 0 ? 1 : distance === 1 ? 0.82 : 0.66,
                  opacity: distance <= 2 ? 1 : 0,
                  zIndex: groups.length - distance,
                }}
                transition={{ type: 'spring', stiffness: 230, damping: 27, mass: 0.8 }}
                onClick={() => distance > 0 && setActiveIndex(index)}
                style={{ pointerEvents: distance <= 2 ? 'auto' : 'none' }}
              >
                <SkillGroup index={String(index + 1).padStart(2, '0')} {...group} />
              </motion.div>
            )
          })}
        </motion.div>
        <div className="skills-carousel-controls">
          <span aria-live={paused ? 'polite' : 'off'}><b>{String(activeIndex + 1).padStart(2, '0')}</b> / {String(groups.length).padStart(2, '0')} · {activeGroup.title}</span>
        </div>
        <div className="skills-carousel-dots" aria-label="Choose a skill category">
          {groups.map((group, index) => <button key={group.title} type="button" aria-label={`Show ${group.title}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => setActiveIndex(index)} />)}
        </div>
      </div>
    </section>
  )
}
