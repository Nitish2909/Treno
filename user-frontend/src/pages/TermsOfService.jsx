import { useState, useEffect } from 'react'
import { FileText, ChevronRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import SEOHead from '../components/common/SEOHead.jsx'

const SECTIONS = [
  {
    id: 'acceptance-of-terms',
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using Treno\'s website, mobile application, or any of our travel services, you agree to be bound by these Terms of Service and our Privacy Policy, which is incorporated herein by reference.',
      'If you do not agree to these Terms, please do not use our services. These Terms constitute a legally binding agreement between you and Treno Travel Pvt. Ltd.',
      { heading: 'Eligibility', body: 'You must be at least 18 years of age to create an account and make bookings. Users between 15 and 17 years may participate in trips with the written consent of a parent or legal guardian.' },
      { heading: 'Updates to Terms', body: 'We reserve the right to update these Terms at any time. Material changes will be communicated via email or a prominent notice on our platform. Your continued use of our services after the effective date of any changes constitutes your acceptance of the revised Terms.' },
    ],
  },
  {
    id: 'booking-and-payment',
    title: 'Booking & Payment',
    content: [
      { heading: 'Booking Process', body: 'A booking is confirmed only upon receipt of payment (full or partial deposit as specified) and issuance of a confirmation email from Treno. Availability is subject to change until payment is received.' },
      { heading: 'Pricing', body: 'All prices are listed in Indian Rupees (INR) unless otherwise stated. Prices are subject to change without notice until a booking is confirmed. Treno reserves the right to correct pricing errors.' },
      { heading: 'Payment Methods', body: 'We accept UPI, credit/debit cards, net banking, and EMI options through our payment partner Razorpay. International payments may be subject to additional charges by your bank.' },
      { heading: 'Deposit & Balance', body: 'For trips with a partial deposit option, the balance must be paid by the due date specified in your booking confirmation. Failure to pay the balance by the due date may result in automatic cancellation without refund of the deposit.' },
      { heading: 'Taxes & Fees', body: 'GST and applicable taxes are included in the listed price. Service fees, if any, will be clearly displayed before checkout.' },
      { heading: 'Price Inclusions', body: 'Each trip\'s listing clearly states what is included and excluded. Treno is not responsible for expenses not listed as inclusions (e.g., personal expenses, tips, visa fees).' },
    ],
  },
  {
    id: 'cancellation-policy',
    title: 'Cancellation Policy',
    content: [
      { heading: 'User-Initiated Cancellations', body: 'Our refund policy is tiered based on the number of days before the trip departure date at the time of cancellation.' },
      '__refund_table__',
      'Processing fees and payment gateway charges (typically 2–3%) are non-refundable in all cases.',
      { heading: 'How to Cancel', body: 'Cancellations must be submitted in writing via your Treno account dashboard or by emailing cancellations@Treno.in. The cancellation date is the date we receive your written request.' },
      { heading: 'Treno-Initiated Cancellations', body: 'If Treno cancels a trip due to insufficient bookings, natural disasters, government advisories, or other circumstances beyond our control, you will receive a full refund or the option to transfer to an alternative trip.' },
      { heading: 'Travel Insurance', body: 'We strongly recommend purchasing comprehensive travel insurance that covers trip cancellation, medical emergencies, and baggage loss. Treno can recommend insurance partners upon request.' },
    ],
  },
  {
    id: 'travel-documentation',
    title: 'Travel Documentation',
    content: [
      { heading: 'Responsibility', body: 'It is your sole responsibility to ensure that you hold all required and valid travel documents for your trip, including but not limited to passports, visas, inner line permits, national park permits, and health certificates.' },
      { heading: 'Passport & Visa', body: 'For international trips, your passport must be valid for at least 6 months beyond your return date. Visa requirements vary by nationality and destination. Treno can advise on general requirements but is not responsible for visa denials or incorrect documentation.' },
      { heading: 'Domestic ID', body: 'For domestic India trips, a government-issued photo ID (Aadhaar Card, PAN Card, Voter ID, or Passport) is mandatory for all travellers and must be produced at the time of check-in.' },
      { heading: 'Medical Requirements', body: 'Some destinations require proof of vaccination (e.g., Yellow Fever for certain African countries). It is your responsibility to obtain required vaccinations and carry proof of the same.' },
      { heading: 'Document Copies', body: 'We recommend carrying both physical and digital copies of all important documents. Treno bears no responsibility for losses arising from missing or invalid documentation.' },
    ],
  },
  {
    id: 'health-and-safety',
    title: 'Health & Safety',
    content: [
      { heading: 'Fitness Declaration', body: 'By booking a trek or adventure activity, you confirm that you are in good physical health and fitness for the activity. Some trips have minimum fitness requirements which are stated on the trip listing page.' },
      { heading: 'Medical Conditions', body: 'If you have a pre-existing medical condition, it is your responsibility to consult your physician before booking. You must disclose relevant medical conditions to your guide on the day of departure.' },
      { heading: 'Safety Instructions', body: 'You agree to follow all safety instructions given by Treno guides and staff. Failure to comply may result in removal from the trip without refund.' },
      { heading: 'Risk Acknowledgement', body: 'Outdoor adventure activities inherently carry risks including, but not limited to, altitude sickness, adverse weather, wildlife encounters, and physical injury. By participating, you acknowledge and accept these risks.' },
      { heading: 'Emergency Procedures', body: 'Treno maintains emergency protocols and first-aid trained guides for all trips. In case of a medical emergency, our team will arrange evacuation to the nearest medical facility. Costs of emergency evacuation are the traveller\'s responsibility.' },
      { heading: 'Alcohol & Substances', body: 'Consumption of alcohol is restricted on trekking days. Use of illegal substances is strictly prohibited and will result in immediate removal from the trip without refund.' },
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    content: [
      { heading: 'Scope', body: 'To the maximum extent permitted by applicable law, Treno, its directors, employees, agents, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.' },
      { heading: 'Third Parties', body: 'Treno acts as an organiser and coordinator of travel experiences. We work with independent third-party suppliers (hotels, airlines, activity operators). While we vet our partners, Treno is not responsible for the acts, omissions, or defaults of these third parties.' },
      { heading: 'Force Majeure', body: 'Treno shall not be liable for any failure or delay in performance arising from circumstances beyond our reasonable control, including natural disasters, acts of God, war, terrorism, government actions, pandemics, or strikes.' },
      { heading: 'Cap on Liability', body: 'Where liability cannot be excluded by law, Treno\'s total liability to you for any claim shall not exceed the amount you paid to Treno for the specific trip giving rise to the claim.' },
      { heading: 'Indemnification', body: 'You agree to indemnify and hold Treno harmless from any claims, damages, or expenses (including legal fees) arising from your violation of these Terms, your negligence, or your wilful misconduct during a trip.' },
    ],
  },
  {
    id: 'changes-to-terms',
    title: 'Changes to Terms',
    content: [
      'Treno reserves the right to modify these Terms of Service at any time. We will provide reasonable notice of significant changes by sending an email to your registered email address and posting a notice on our website with the effective date of changes.',
      { heading: 'Continued Use', body: 'Your continued use of Treno\'s services after the effective date of any modifications constitutes your acceptance of the revised Terms.' },
      { heading: 'Governing Law', body: 'These Terms are governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.' },
      { heading: 'Entire Agreement', body: 'These Terms, together with our Privacy Policy and any booking-specific terms, constitute the entire agreement between you and Treno regarding your use of our services.' },
      { heading: 'Contact Us', body: 'For any questions about these Terms, please contact us at legal@Treno.in or write to us at 123 Travel Hub, Connaught Place, New Delhi — 110001.' },
    ],
  },
]

const REFUND_TABLE = [
  { period: '7+ days before departure', refund: '100% — Full Refund', icon: 'green' },
  { period: '3–6 days before departure', refund: '50% Refund', icon: 'amber' },
  { period: 'Less than 3 days / No-show', refund: 'No Refund', icon: 'red' },
]

function SectionContent({ content }) {
  return (
    <div className="space-y-3">
      {content.map((item, idx) => {
        if (item === '__refund_table__') {
          return (
            <div key={idx} className="overflow-x-auto my-4">
              <table className="w-full border-collapse text-sm rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="px-4 py-3 text-left text-amber-800 font-bold border border-amber-200">Notice Period</th>
                    <th className="px-4 py-3 text-left text-amber-800 font-bold border border-amber-200">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {REFUND_TABLE.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 border border-slate-200 text-slate-700 font-medium">{row.period}</td>
                      <td className={`px-4 py-3 border border-slate-200 font-semibold ${
                        row.icon === 'green' ? 'text-green-700' : row.icon === 'amber' ? 'text-amber-700' : 'text-red-600'
                      }`}>{row.refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        if (typeof item === 'string') {
          return <p key={idx} className="text-slate-700 leading-relaxed">{item}</p>
        }
        return (
          <p key={idx} className="text-slate-700 leading-relaxed">
            <strong className="text-slate-900">{item.heading}: </strong>{item.body}
          </p>
        )
      })}
    </div>
  )
}

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    SECTIONS.forEach(section => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="Read Treno's Terms of Service including booking policies, cancellation terms, and user responsibilities."
        noIndex
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Last updated: January 2024</p>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed">
            Please read these terms carefully before booking with Treno. By using our services, you agree to be bound by these terms.
          </p>
        </div>
      </section>

      {/* Cancellation summary banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-4">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-4 items-center justify-center text-sm">
          <span className="font-semibold text-amber-800">Cancellation at a glance:</span>
          <span className="flex items-center gap-1.5 text-green-700">
            <CheckCircle className="w-4 h-4" /> 7+ days: Full refund
          </span>
          <span className="flex items-center gap-1.5 text-amber-700">
            <AlertCircle className="w-4 h-4" /> 3–6 days: 50% refund
          </span>
          <span className="flex items-center gap-1.5 text-red-600">
            <XCircle className="w-4 h-4" /> &lt;3 days: No refund
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-12 lg:flex lg:gap-10">

        {/* Sticky TOC sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Contents</h3>
            <nav className="space-y-1">
              {SECTIONS.map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-amber-50 text-amber-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${activeSection === section.id ? 'text-amber-500' : 'text-slate-300'}`} />
                  <span className="leading-tight">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Article */}
        <article className="flex-1 min-w-0 max-w-3xl">
          <div className="space-y-12">
            {SECTIONS.map(section => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                  {section.title}
                </h2>
                <SectionContent content={section.content} />
              </section>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Questions about these terms?</strong> Contact our legal team at{' '}
              <a href="mailto:legal@Treno.in" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
                legal@Treno.in
              </a>. These terms were last updated in January 2024 and supersede all prior versions.
            </p>
          </div>
        </article>
      </div>
    </>
  )
}
