import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBE6DCqf_90-FiMTmsiQkC7ZQLNq-ZXEa4",
  authDomain: "workshop-calisthenie-2026.firebaseapp.com",
  projectId: "workshop-calisthenie-2026",
  storageBucket: "workshop-calisthenie-2026.firebasestorage.app",
  messagingSenderId: "741126037954",
  appId: "1:741126037954:web:adfcc2f14b74b2af17b65b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'workshop-2026';

const CalisthenicsIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8 2v10" />
    <path d="M16 2v10" />
    <circle cx="8" cy="16" r="4" />
    <circle cx="16" cy="16" r="4" />
    <path d="M7 2h2" />
    <path d="M15 2h2" />
  </svg>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactData, setContactData] = useState({ email: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { 
        console.error("Erreur d'authentification :", err); 
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setContactStatus('loading');
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'questions'), {
        email: contactData.email,
        message: contactData.message,
        timestamp: Date.now(),
        userId: user.uid
      });
      setContactStatus('success');
      setContactData({ email: '', message: '' });
      setTimeout(() => setContactStatus(null), 5000);
    } catch (err) { 
      setContactStatus('error'); 
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-10">
      <div className="max-w-xl w-full bg-neutral-900/40 border border-white/5 p-10 rounded-3xl text-center">
        <h1 className="text-4xl font-black italic uppercase mb-6">
          WORKSHOP <span className="text-orange-600">2026</span>
        </h1>
        <p className="text-neutral-400 mb-8">
          Site prêt pour déploiement 🚀
        </p>

        {contactStatus === 'success' ? (
          <div className="py-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" /> Message bien reçu !
            </div>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input 
              required 
              type="email" 
              placeholder="Votre email"
              value={contactData.email}
              onChange={(e) => setContactData({...contactData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />
            <textarea 
              required 
              placeholder="Votre message..."
              rows="4"
              value={contactData.message}
              onChange={(e) => setContactData({...contactData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500 resize-none"
            ></textarea>
            <button 
              disabled={contactStatus === 'loading'}
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all"
            >
              {contactStatus === 'loading' ? 'Envoi...' : 'Envoyer'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
