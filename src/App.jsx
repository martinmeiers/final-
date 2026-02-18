import React, { useState, useEffect, useRef } from "react";
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
  Send,
} from "lucide-react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

/* ================= FIREBASE CONFIG ================= */

const firebaseConfig = {
  apiKey: "AIzaSyBE6DCqf_90-FiMTmsiQkC7ZQLNq-ZXEa4",
  authDomain: "workshop-calisthenie-2026.firebaseapp.com",
  projectId: "workshop-calisthenie-2026",
  storageBucket: "workshop-calisthenie-2026.firebasestorage.app",
  messagingSenderId: "741126037954",
  appId: "1:741126037954:web:adfcc2f14b74b2af17b65b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "workshop-2026";

/* ================= DONNÉES ================= */

const WORKSHOPS = [
  {
    id: "paris-2026",
    city: "Paris",
    date: "11-12 Avril 2026",
    price: 300,
    spots: 15,
    initialRemaining: 12,
    stripeUrl: "https://buy.stripe.com/bJe00ibxWa5b2Ky0PC9EI0r",
  },
  {
    id: "toulouse-2026",
    city: "Toulouse",
    date: "14 Juin 2026",
    price: 150,
    spots: 12,
    initialRemaining: 9,
    stripeUrl: "https://buy.stripe.com/eVqcN4atS6SZ5WK41O9EI0s",
  },
  {
    id: "charleroi-2026",
    city: "Charleroi (BE)",
    date: "16 Août 2026",
    price: 150,
    spots: 12,
    initialRemaining: 10,
    stripeUrl: "https://buy.stripe.com/dRm6oGdG44KR2KygOA9EI0t",
  },
];

const TESTIMONIALS = [
  {
    name: "Christophe",
    content:
      "Super ambiance, corrections précises et progression claire. Merci aux coachs !",
    stars: 5,
  },
  {
    name: "Lucie",
    content:
      "Workshop ultra qualitatif, adapté à tous les niveaux. Je recommande à 100%.",
    stars: 5,
  },
];

/* ================= COMPONENT ================= */

export default function App() {
  const [user, setUser] = useState(null);
  const [contactData, setContactData] = useState({
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  const testimonialScrollRef = useRef(null);

  /* ================= AUTH ================= */

  useEffect(() => {
    signInAnonymously(auth).catch(console.error);
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  /* ================= FIRESTORE BOOKINGS ================= */

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "artifacts", appId, "public", "data", "bookings")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRegistrations(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [user]);

  const getRemainingSpots = (workshop) => {
    const realBookings = registrations.filter(
      (r) => r.workshopId === workshop.id
    ).length;

    return Math.max(0, workshop.initialRemaining - realBookings);
  };

  /* ================= CONTACT ================= */

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setContactStatus("loading");

    try {
      await addDoc(
        collection(db, "artifacts", appId, "public", "data", "questions"),
        {
          ...contactData,
          timestamp: Date.now(),
          userId: user.uid,
        }
      );

      setContactStatus("success");
      setContactData({ email: "", message: "" });

      setTimeout(() => setContactStatus(null), 4000);
    } catch (err) {
      setContactStatus("error");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">

      {/* HERO */}
      <section className="pt-40 pb-20 text-center">
        <h1 className="text-7xl font-black italic uppercase tracking-tighter">
          WORKSHOP <span className="text-orange-600">2026</span>
        </h1>
      </section>

      {/* WORKSHOPS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-3">
          {WORKSHOPS.map((ws) => (
            <div
              key={ws.id}
              className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 text-center"
            >
              <h3 className="text-3xl font-black italic text-orange-500 mb-3">
                {ws.city}
              </h3>
              <p className="text-neutral-400 mb-4">{ws.date}</p>
              <p className="mb-4 font-bold">
                {getRemainingSpots(ws)} places restantes
              </p>
              <a
                href={ws.stripeUrl}
                target="_blank"
                className="inline-block bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl font-bold"
              >
                Réserver
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto bg-neutral-900/40 p-10 rounded-3xl">
          <h2 className="text-3xl font-black italic uppercase mb-8">
            Une question ?
          </h2>

          {contactStatus === "success" ? (
            <div className="text-green-500 font-bold">
              Message bien reçu ✅
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                required
                type="email"
                placeholder="Votre email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />
              <textarea
                required
                placeholder="Votre message"
                rows="4"
                value={contactData.message}
                onChange={(e) =>
                  setContactData({ ...contactData, message: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-xl font-bold"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
