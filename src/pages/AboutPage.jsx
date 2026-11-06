import AboutIntro from '../components/about/AboutIntro.jsx'
import SkillsSection from '../components/about/SkillsSection.jsx'
import CertificationsSection from '../components/about/CertificationsSection.jsx'

export default function AboutPage() {
  return (
    <>
      <div className="about-page"><AboutIntro /></div>
      <SkillsSection />
      <div className="about-page"><CertificationsSection /></div>
    </>
  )
}
