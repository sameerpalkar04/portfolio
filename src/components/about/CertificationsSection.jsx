import { motion } from 'framer-motion'
const topics = ['Machine Learning', 'Transformers', 'RAG', 'Large Language Models']
export default function CertificationsSection() {
  return (
    <section className="about-section certifications-section" aria-labelledby="certifications-title">
      <motion.div className="section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.55 }}><span>03 / LEARNING</span><h2 id="certifications-title">CERTIFICATIONS<span>.</span></h2></motion.div>
      <motion.article className="certification-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.58 }}>
        <div className="certification-topline"><div><span className="certification-kicker">ORACLE CLOUD INFRASTRUCTURE</span><h3>Oracle Cloud Infrastructure 2023 AI Foundations Associate</h3></div><span className="issued-pill">ISSUED: JULY 2024</span></div>
        <div className="certification-bottom"><ul className="coursework-list">{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul><a className="credential-label" href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=7824262FBF3F3E095BB71DF852E083CA468D553B477E117F84ECCD06AE90EE76" target="_blank" rel="noreferrer">VIEW CREDENTIAL ↗</a></div>
      </motion.article>
    </section>
  )
}
