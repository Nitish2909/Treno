import { useState, useEffect } from 'react'
import { Shield, ChevronRight } from 'lucide-react'
import SEOHead from '../components/common/SEOHead.jsx'

const SECTIONS = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: [
      'We collect information you provide directly to us when you create an account, make a booking, contact us, subscribe to our newsletter, or otherwise interact with our services.',
      { heading: 'Personal Information', body: 'This includes your full name, email address, phone number, date of birth, postal address, passport or government-issued ID details (required for certain international bookings), and payment information.' },
      { heading: 'Usage Data', body: 'We automatically collect information about how you interact with our website and app, including your IP address, browser type, pages visited, links clicked, search queries, device identifiers, and referring URLs. This data helps us improve our services and personalise your experience.' },
      { heading: 'Location Data', body: 'With your permission, we may collect precise or approximate location data from your mobile device to provide location-based features such as nearby trip suggestions.' },
      { heading: 'Communications', body: 'When you contact our support team, we retain records of those interactions, including chat logs, emails, and call notes.' },
    ],
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Your Information',
    content: [
      'Treno uses the information we collect for the following purposes:',
      { heading: 'Service Delivery', body: 'To process your bookings, issue confirmations, coordinate with hotels, airlines, and tour operators, and deliver the travel services you have purchased.' },
      { heading: 'Account Management', body: 'To create and manage your Treno account, including authentication, password recovery, and account security.' },
      { heading: 'Communication', body: 'To send transactional emails (booking confirmations, payment receipts, itinerary updates), promotional communications (with your consent), and important service notices.' },
      { heading: 'Personalisation', body: 'To recommend trips, destinations, and content tailored to your travel preferences, booking history, and browsing behaviour.' },
      { heading: 'Analytics & Improvement', body: 'To analyse platform usage, identify trends, debug issues, and improve our website, app, and overall service quality.' },
      { heading: 'Legal Compliance', body: 'To comply with applicable laws, respond to legal process, enforce our terms of service, and protect the rights, property, and safety of Treno and our users.' },
    ],
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing',
    content: [
      'We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:',
      { heading: 'Travel Suppliers', body: 'We share necessary booking details (name, contact, ID) with hotels, airlines, transport providers, trek operators, and other travel suppliers required to fulfil your trip.' },
      { heading: 'Service Providers', body: 'We engage trusted third-party vendors who assist us in operating our platform — including payment processors (Razorpay), cloud hosting providers (AWS, Google Cloud), analytics tools (Google Analytics), and email service providers.' },
      { heading: 'Business Transfers', body: 'In the event of a merger, acquisition, or sale of Treno assets, your information may be transferred as part of that transaction. You will be notified of any such change.' },
      { heading: 'Legal Requirements', body: 'We may disclose your information if required to do so by law, court order, or government authority, or when we believe disclosure is necessary to protect our rights or the safety of others.' },
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: [
      'We take the security of your personal information seriously and implement industry-standard technical and organisational measures to protect it.',
      { heading: 'Encryption', body: 'All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher. Stored sensitive data, including payment information, is encrypted at rest using AES-256.' },
      { heading: 'Access Controls', body: 'Access to personal data is restricted to employees and contractors who need it to perform their job functions. All personnel with data access are bound by confidentiality agreements.' },
      { heading: 'Payment Security', body: 'We do not store full card numbers on our servers. All payment processing is handled by PCI-DSS compliant payment processors.' },
      { heading: 'Incident Response', body: 'We maintain a data breach response plan. In the unlikely event of a data breach affecting your information, we will notify you as required by applicable law.' },
      'Despite these measures, no method of transmission over the internet is 100% secure. We encourage you to use strong, unique passwords and to keep your account credentials confidential.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    content: [
      'Treno uses cookies and similar tracking technologies to enhance your experience on our platform.',
      { heading: 'Essential Cookies', body: 'Required for core functionality such as login sessions, shopping cart, and security features. These cannot be disabled.' },
      { heading: 'Analytics Cookies', body: 'Used to understand how visitors interact with our website (e.g., pages visited, time spent). We use Google Analytics for this purpose. You can opt out via Google\'s opt-out tool.' },
      { heading: 'Marketing Cookies', body: 'Used to deliver relevant advertisements on our platform and third-party sites. These are only set with your consent.' },
      { heading: 'Preference Cookies', body: 'Used to remember your settings and preferences (e.g., language, currency, notification preferences).' },
      'You can control cookies through your browser settings. Our cookie consent banner allows you to accept or decline non-essential cookies on your first visit.',
    ],
  },
  {
    id: 'user-rights',
    title: 'Your Rights',
    content: [
      'Depending on your location, you may have the following rights regarding your personal data:',
      { heading: 'Access', body: 'You have the right to request a copy of the personal information we hold about you.' },
      { heading: 'Correction', body: 'You can update or correct inaccurate personal information at any time through your account settings or by contacting us.' },
      { heading: 'Deletion', body: 'You may request deletion of your personal data. We will honour such requests subject to our legal obligations to retain certain records.' },
      { heading: 'Portability', body: 'You may request your personal data in a structured, machine-readable format.' },
      { heading: 'Withdraw Consent', body: 'Where processing is based on your consent (e.g., marketing emails), you may withdraw that consent at any time by unsubscribing or contacting us.' },
      'To exercise any of these rights, please contact us at Trenotravel@gmail.com. We will respond within 30 days.',
    ],
  },
  {
    id: 'contact-information',
    title: 'Contact Information',
    content: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us:',
      { heading: 'Treno Privacy Team', body: 'Email: Trenotravel@gmail.com | Phone: +91-8816942362 | Address: SCO 98,Sec. 4-5, Urban Estate, Karnal Haryana — 132001' },
      'We take privacy inquiries seriously and are committed to resolving any concerns promptly. If you are not satisfied with our response, you have the right to escalate your complaint to the relevant data protection authority.',
    ],
  },
]

function SectionContent({ content }) {
  return (
    <div className="space-y-3">
      {content.map((item, idx) => {
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

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
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
        title="Privacy Policy"
        description="Read Treno's Privacy Policy to understand how we collect, use, and protect your personal information."
        noIndex
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: July 2026</p>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed">
            At Treno, your privacy matters. This policy explains how we collect, use, and protect your personal information when you use our services.
          </p>
        </div>
      </section>

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
          <div className="mt-12 p-5 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Questions about this policy?</strong> Contact our privacy team at{' '}
              <a href="mailto:privacy@Treno.in" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
                Trenotravel@gmail.com
              </a>. We are committed to transparency and will respond to all privacy inquiries within 30 days.
            </p>
          </div>
        </article>
      </div>
    </>
  )
}
