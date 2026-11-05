import { motion } from 'framer-motion'
export default function SkillGroup({ title, index, skills }) {
  return (
    <motion.article className="skill-group" variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }} whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }}>
      <div className="skill-group-heading"><span>{index}</span><h3>{title}</h3></div>
      <div className="skill-badges">
        {skills.map(({ name, color, logo, logoColor = 'white', iconLabel, iconStyle }) => {
          const badgeName = encodeURIComponent(name.replaceAll(' ', '_'))
          const badgeLogo = encodeURIComponent(logo)
          const badgeLogoColor = encodeURIComponent(logoColor)
          const src = `https://img.shields.io/badge/${badgeName}-${color}?style=for-the-badge&logo=${badgeLogo}&logoColor=${badgeLogoColor}`
          if (iconLabel) {
            return (
              <span className="skill-badge-custom" key={name} style={{ '--badge-color': `#${color}` }}>
                <span className={`skill-badge-mark skill-badge-mark--${iconStyle}`} aria-hidden="true">{iconLabel}</span>
                <span>{name}</span>
              </span>
            )
          }
          return <motion.img key={name} src={src} alt={name} loading="lazy" whileHover={{ y: -2, scale: 1.035 }} />
        })}
      </div>
    </motion.article>
  )
}
