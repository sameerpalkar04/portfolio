import AboutIntro from '../components/about/AboutIntro.jsx'
import SkillsSection from '../components/about/SkillsSection.jsx'
import CertificationsSection from '../components/about/CertificationsSection.jsx'

export default function AboutPage({ theme }) {
  return (
    <div className="about-page">
      <AboutIntro />
      <SkillsSection theme={theme} />
      <CertificationsSection />
    </div>
  )
}
