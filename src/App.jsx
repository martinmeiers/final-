import React, { useState, useEffect, useRef } from 'react'
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
  Menu,
  X,
  Instagram,
  Mail,
  ArrowRight,
  Quote,
  GraduationCap,
  Briefcase,
  History,
  Zap,
  ExternalLink,
  AlertCircle,
  MessageSquare,
  Send
} from 'lucide-react'

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query
} from 'firebase/firestore'

/* =========================
   FIREBASE CONFIG (EN DUR)
========================= */

const firebaseConfig = {
  apiKey: "AIzaSyBE6DCqf_90-FiMTmsiQkC7ZQLNq-ZXEa4",
  authDomain: "workshop-calisthenie-2026.firebaseapp.com",
  projectId: "workshop-calisthenie-2026",
  storageBucket: "workshop-calisthenie-2026.firebasestorage.app",
  messagingSenderId: "741126037954",
  appId: "1:741126037954:web:adfcc2f14b74b2af17b65b"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const appId = "workshop-2026"

/* =========================
   DONNÉES
========================= */

const WORKSHOPS = [
  {
    id: 'paris-2026',
    city: 'Paris',
    date: '11-12 Avril 2026',
    price: 300,
    spots: 15,
    initialRemaining: 12,
    stripeUrl: "https://buy.stripe.com/bJe00ibxWa5b2Ky0PC9EI0r"
  }
]

const TESTIMONIALS = [
  {
    name: "Christophe",
    content:
      "Merci pour votre disponibilité et vos conseils personnalisés.",
    stars: 5
  }
]

/* =========================
   APP COMPONENT
========================= */

export default function App() {
  const [user, setUser] = useState(null)
  const [contactData, setContactData] = useState({
    email: '',
    message: ''
  })
  const [contactStatus, setContactStatus] = useState(null)
  const [registrations, setRegistrations] = useState([])

  /* ===== Auth ===== */

  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth)
      } catch (err) {
        console.error(err)
      }
    }

    initAuth()

    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  /* ===== Firestore ===== */

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'artifacts', appId, 'public', 'data', 'bookings')
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      setRegistrations(snapshot.docs.map(doc => doc.data()))
    })

    return () => unsubscribe()
  }, [user])

  const handleContactSubmit = async e => {
    e.preventDefault()
    if (!user) return

    setContactStatus('loading')

    try {
      await addDoc(
        collection(db, 'artifacts', appId, 'public', 'data', 'questions'),
        {
          email: contactData.email,
          message: contactData.message,
          timestamp: Date.now(),
          userId: user.uid
        }
      )

      setContactStatus('success')
      setContactData({ email: '', message: '' })
    } catch (err) {
      setContactStatus('error')
    }
  }

  const getRemainingSpots = workshop => {
    const realBookings = registrations.filter(
      r => r.workshopId === workshop.id
    ).length

    return Math.max(0, workshop.initialRemaining - realBookings)
  }

  /* ===== RENDER ===== */

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-10">

      <h1 className="text-5xl font-black mb-12 text-center">
        WORKSHOP <span className="text-orange-600">2026</span>
      </h1>

      <div className="max-w-xl mx-auto bg-neutral-900 p-8 rounded-3xl">

        {WORKSHOPS.map(ws => (
          <div key={ws.id} className="mb-8">
            <h2 className="text-2xl font-bold">{ws.city}</h2>
            <p>{ws.date}</p>
            <p className="mt-2 font-bold">
              {getRemainingSpots(ws)} places restantes
            </p>
            <a
              href={ws.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-orange-600 px-6 py-3 rounded-xl"
            >
              Réserver
            </a>
          </div>
        ))}

        <hr className="my-8 border-white/10" />

        {contactStatus === 'success' ? (
          <div className="text-green-500 font-bold text-center">
            Message envoyé !
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              required
              type="email"
              placeholder="Votre email"
              value={contactData.email}
              onChange={e =>
                setContactData({
                  ...contactData,
                  email: e.target.value
                })
              }
              className="w-full p-3 rounded-xl bg-white/5"
            />

            <textarea
              required
              placeholder="Votre message"
              value={contactData.message}
              onChange={e =>
                setContactData({
                  ...contactData,
                  message: e.target.value
                })
              }
              className="w-full p-3 rounded-xl bg-white/5"
            />

            <button
              type="submit"
              className="w-full bg-orange-600 py-3 rounded-xl"
            >
              Envoyer
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
