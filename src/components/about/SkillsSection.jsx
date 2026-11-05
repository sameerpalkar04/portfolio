import { motion } from 'framer-motion'
import SkillGroup from './SkillGroup.jsx'
import DeferredThreeAccent from '../visuals/DeferredThreeAccent.jsx'

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

export default function SkillsSection({ theme }) {
  return (
    <section className="about-section skills-section" aria-labelledby="skills-title">
      <motion.div className="section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.55 }}><span>02 / CAPABILITIES</span><h2 id="skills-title">SKILLS<span>.</span></h2></motion.div>
      <DeferredThreeAccent className="skills-network-slot" variant="network" theme={theme} />
      <motion.div className="skills-grid" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        {groups.map((group, index) => <SkillGroup key={group.title} index={String(index + 1).padStart(2, '0')} {...group} />)}
      </motion.div>
    </section>
  )
}
