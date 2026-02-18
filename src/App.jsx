/**
 * ARCHIVE ZIP DU PROJET
 * * Ce fichier simule l'archive complète. Pour l'utiliser sur Netlify :
 * 1. Créez les fichiers listés ci-dessous avec leur contenu respectif.
 * 2. Respectez la structure des dossiers.
 * 3. Lancez 'npm install' puis 'npm run build'.
 */

// --- FICHIER : ./package.json ---
{
  "name": "workshop-calisthenie-2026",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.284.0",
    "firebase": "^10.4.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}

// --- FICHIER : ./vite.config.js ---
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    __firebase_config: JSON.stringify(process.env.VITE_FIREBASE_CONFIG || '{}'),
    __app_id: JSON.stringify(process.env.VITE_APP_ID || 'workshop-2026'),
    __initial_auth_token: JSON.stringify(process.env.VITE_AUTH_TOKEN || null)
  }
})

// --- FICHIER : ./index.html ---
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Workshop Calisthénie 2026</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

// --- FICHIER : ./src/main.jsx ---
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// --- FICHIER : ./src/App.jsx ---
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  Users, 
  Star, 
  CheckCircle2, 
  Menu, 
  X,
  Instagram,
  Mail,
  ArrowRight,
  Trophy,
  Target,
  Quote, 
  ShieldCheck,
  Clock,
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

const firebaseConfig = JSON.parse(__firebase_config);
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

const WORKSHOPS = [
  {
    id: 'paris-2026',
    city: 'Paris',
    date: '11-12 Avril 2026',
    location: 'Le Lab, Paris 15e',
    program: [
      { label: "samedi", am: "Handstand", pm: "Pull (Traction, Muscle-up, Front Lever)" },
      { label: "dimanche", am: "Handstand", pm: "Push (Dips, HSPU, Planche)" }
    ],
    price: 300,
    spots: 15,
    initialRemaining: 12, 
    imageDesc: "Architecture de Paris",
    imageSrc: "https://drive.google.com/thumbnail?id=1kqk2ClnU22pkkRbPKPLswO8s8Ar0E2Y7&sz=w1000",
    stripeUrl: "https://buy.stripe.com/bJe00ibxWa5b2Ky0PC9EI0r"
  },
  {
    id: 'toulouse-2026',
    city: 'Toulouse',
    date: '14 Juin 2026',
    location: 'Espace Force, Toulouse',
    program: [
      { label: null, am: "Handstand", pm: "Muscle-up & HSPU" }
    ],
    price: 150,
    spots: 12,
    initialRemaining: 9, 
    imageDesc: "Salle d'entraînement à Toulouse",
    imageSrc: "https://drive.google.com/thumbnail?id=1MZqQo56Dt_BaOF5-Hn0psBZWNgzdjILg&sz=w1000",
    stripeUrl: "https://buy.stripe.com/eVqcN4atS6SZ5WK41O9EI0s"
  },
  {
    id: 'charleroi-2026',
    city: 'Charleroi (BE)',
    date: '16 Août 2026',
    location: 'Gymnase Central, Charleroi',
    program: [
      { label: null, am: "Handstand", pm: "Muscle-up & HSPU" }
    ],
    price: 150,
    spots: 12,
    initialRemaining: 10, 
    imageDesc: "Session Street Workout à Charleroi",
    imageSrc: "https://drive.google.com/thumbnail?id=1MbfBZGHGgCjgQPOFtsLpIDIrLBJ0Iixh&sz=w1000",
    stripeUrl: "https://buy.stripe.com/dRm6oGdG44KR2KygOA9EI0t"
  }
];

const TESTIMONIALS = [
  {
    name: "Christophe",
    content: "Merci pour votre disponibilité, vos conseils et vos retours personnalisés. On repart avec les bons ajustements et une vision plus claire. 2 coachs passionnés et une super ambiance entre les pratiquants, ça rebooste.",
    stars: 5
  },
  {
    name: "Kévin",
    content: "Débutant en calisthénie, ce workshop m'a donné exactement ce dont j'avais besoin : apprendre les fondamentaux des mouvements et avoir un retour précis sur ma technique. La disponibilité des coachs a fait toute la différence.",
    stars: 5
  },
  {
    name: "Lucie",
    content: "Journée exceptionnelle : un contenu clair et progressif, des exercices variés et adaptés à tous les niveaux, et surtout une ambiance super motivante. Je repars inspirée et déterminée.",
    stars: 5
  },
  {
    name: "Jérémy",
    content: "Un workshop réussi. Le suivi en temps réel fait vraiment la différence pour progresser sur les figures que l'on souhaite acquérir ou sublimer. Heureux d'avoir pu partager des moments en réel avec la communauté.",
    stars: 5
  },
  {
    name: "Nicolas",
    content: "Une journée très enrichissante aux côtés de Martin et Alexandre, merci à eux pour toutes leurs explications, leur disponibilité et leur implication pour développer la calisthénie.",
    stars: 5
  },
  {
    name: "Benjamin",
    content: "Ce workshop était juste génial. Entouré de 2 coachs de qualité, ça m'a permis de comprendre beaucoup de choses et me faire corriger les erreurs sur mon handstand. Vivement le prochain.",
    stars: 5
  },
  {
    name: "Colline",
    content: "L'équilibre entre la théorie, les exemples donnés et le temps pour pratiquer était parfait. C'est très agréable de pouvoir être corrigé en direct. Ce que je retiendrais : convivialité, qualité, authenticité.",
    stars: 5
  }
];

const GALLERY_PHOTOS = [
  "https://drive.google.com/thumbnail?id=18bAZzWFAt8ms6rTdJPmGfkAziwAe2Gba&sz=w1000",
  "https://drive.google.com/thumbnail?id=1izMsOHPQwv--MEPEBiXNIKluiBDHesh4&sz=w1000",
  "https://drive.google.com/thumbnail?id=1mFHH-B833m0wuuJibtn0y8CfZ8IJlVvS&sz=w1000",
  "https://drive.google.com/thumbnail?id=15eIQCtSRcnkO66tKtjVC_jZxaKNckpp2&sz=w1000",
  "https://drive.google.com/thumbnail?id=1oU86E0t-f3g5kZihVCNXgAcg7_UOfzKt&sz=w1000",
  "https://drive.google.com/thumbnail?id=1ZhllggvlEG746wOLifQ0CrLemM4AT8MD&sz=w1000",
  "https://drive.google.com/thumbnail?id=1QdO2vq21g829vSycAnY3x9BcuXHosYiW&sz=w1000",
  "https://drive.google.com/thumbnail?id=1anD6CtRj6V0SeE2xiNrr10jGbt14-0eJ&sz=w1000",
  "https://drive.google.com/thumbnail?id=1Yoqnwn8XhTh6lbkY30ZF98hyIyD43Ym0&sz=w1000",
  "https://drive.google.com/thumbnail?id=1gC0UG0tpA4Enp6Ak1SPGzqPQ7ij47ZVT&sz=w1000",
  "https://drive.google.com/thumbnail?id=1WnKOhyu9JlR3RVtbs8I1pdCD--31lp64&sz=w1000"
];

export default function App() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactData, setContactData] = useState({ email: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const galleryScrollRef = useRef(null);
  const testimonialScrollRef = useRef(null);
  
  const [alexImgError, setAlexImgError] = useState(false);
  const [martinImgError, setMartinImgError] = useState(false);
  const [workshopImgErrors, setWorkshopImgErrors] = useState({});
  const [galleryImgErrors, setGalleryImgErrors] = useState({});

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { console.error("Erreur d'authentification :", err); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'bookings'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRegistrations(snapshot.docs.map(doc => doc.data()));
    }, (err) => console.error("Erreur Firestore :", err));
    return () => unsubscribe();
  }, [user]);

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
    } catch (err) { setContactStatus('error'); }
  };

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getRemainingSpots = (workshop) => {
    const realBookings = registrations.filter(r => r.workshopId === workshop.id).length;
    return Math.max(0, workshop.initialRemaining - realBookings);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-orange-600">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-orange-600 p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(234,88,12,0.3)]">
              <CalisthenicsIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase italic">WORKSHOP <span className="text-orange-600">2026</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
            {['équipe', 'workshops', 'galerie', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-orange-500 transition-colors">{item}</a>
            ))}
            <a href="#workshops" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all">
              Réserver
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-600/10 text-orange-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 border border-orange-600/20">
            Tournée 2026 : France et Belgique
          </span>
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-none tracking-tighter uppercase italic">
            WORKSHOP <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">CALLISTHÉNIE.</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Martin et Alexandre vous transmettent les secrets du Handstand et des figures de Callisthénie pour dépasser vos limites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#workshops" className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3">
              Voir le calendrier <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#équipe" className="bg-white/5 hover:bg-white/10 border border-white/10 px-12 py-5 rounded-xl font-bold text-lg transition-all">
              Les Coachs
            </a>
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section id="équipe" className="py-24 bg-neutral-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">VOS <span className="text-orange-600">COACHS</span></h2>
            <p className="text-neutral-500 uppercase tracking-[0.2em] text-[10px] font-bold">Un binôme complémentaire pour un workshop d'exception</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/5 mb-8 bg-neutral-800 flex items-center justify-center shadow-2xl">
                {!martinImgError ? (
                  <img 
                    src="https://drive.google.com/thumbnail?id=1-8i2Td-wbOsV7p0ly3rS-PJq0Zcifuco&sz=w1000" 
                    alt="Martin - Coach Handstand"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => setMartinImgError(true)}
                  />
                ) : (
                  <div className="text-neutral-600 font-bold uppercase tracking-widest text-center px-10 italic leading-relaxed">
                    [Image de Martin]
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
              </div>
              <h3 className="text-4xl font-black uppercase italic text-orange-600 mb-8 tracking-tighter">MARTIN</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Master en kinésithérapie</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">
                    <History className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">11 ans d'expérience en Callisthénie</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">5 ans de coaching en ligne</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Handstand et mobilité</span>
                </div>
                <a href="https://instagram.com/exilibre90" target="_blank" className="flex items-center gap-4 text-orange-500 group/link hover:translate-x-1 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-600/40 flex items-center justify-center group-hover/link:bg-orange-600 group-hover/link:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] italic flex items-center gap-2">@exilibre90 <ExternalLink className="w-3 h-3 opacity-50" /></span>
                </a>
              </div>
            </div>

            <div className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/5 mb-8 bg-neutral-800 flex items-center justify-center shadow-2xl">
                {!alexImgError ? (
                  <img 
                    src="https://drive.google.com/thumbnail?id=1xK12y9fPkT5VJ_GDA7TO54ZnmfkQyEOU&sz=w1000" 
                    alt="Alexandre - Coach Street Lifting"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => setAlexImgError(true)}
                  />
                ) : (
                  <div className="text-neutral-600 font-bold uppercase tracking-widest text-center px-10 italic leading-relaxed">
                    [Image d'Alexandre]
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
              </div>
              <h3 className="text-4xl font-black uppercase italic text-blue-500 mb-8 tracking-tighter">ALEXANDRE</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Master en Sciences du sport</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                    <History className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">14 ans d'expérience en Callisthénie</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">7 ans de coaching en ligne</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Street lifting et figures statiques</span>
                </div>
                <a href="https://instagram.com/alexandre_012workout" target="_blank" className="flex items-center gap-4 text-blue-500 group/link hover:translate-x-1 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-600/40 flex items-center justify-center group-hover/link:bg-blue-600 group-hover/link:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] italic flex items-center gap-2">@alexandre_012workout <ExternalLink className="w-3 h-3 opacity-50" /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendrier Workshops */}
      <section id="workshops" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">CALENDRIER <span className="text-orange-600">2026</span></h2>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full animate-pulse group">
                <AlertCircle className="w-4 h-4 text-red-500 group-hover:rotate-12 transition-transform" />
                <p className="text-red-500 uppercase tracking-[0.2em] text-[10px] font-black italic">Attention : places limitées</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKSHOPS.map((ws) => (
              <div key={ws.id} className="bg-neutral-900/50 border border-white/5 rounded-[40px] overflow-hidden hover:border-orange-500/50 transition-all duration-500 flex flex-col group">
                <div className="h-56 bg-neutral-800 relative flex items-center justify-center overflow-hidden">
                  {ws.imageSrc && !workshopImgErrors[ws.id] ? (
                    <img src={ws.imageSrc} alt={ws.imageDesc} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={() => setWorkshopImgErrors(prev => ({...prev, [ws.id]: true}))} />
                  ) : (
                    <span className="text-neutral-600 text-[10px] uppercase font-black tracking-widest opacity-40 group-hover:opacity-100 transition-opacity italic text-center leading-relaxed px-4">[Image de {ws.imageDesc}]</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 to-transparent"></div>
                  <div className="absolute bottom-6 left-8">
                    <h3 className="text-5xl font-black uppercase italic tracking-tighter text-orange-500">{ws.city}</h3>
                  </div>
                </div>
                
                <div className="p-10 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs">
                      <Calendar className="w-4 h-4" />
                      <span>{ws.date}</span>
                    </div>
                    <span className="text-3xl font-black italic">{ws.price}€</span>
                  </div>

                  <div className="mb-10 space-y-5 flex-grow">
                    {ws.program.map((p, idx) => (
                      <div key={idx} className="border-l-2 border-orange-600/30 pl-4 py-1">
                        {p.label && <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-orange-500 italic">{p.label}</div>}
                        <div className="grid grid-cols-1 gap-1.5">
                          <div className="text-[10px] text-neutral-300 flex items-baseline gap-2">
                            <span className="font-bold text-neutral-500 uppercase tracking-tighter shrink-0">9:00 - 12:00 :</span> 
                            <span className="font-medium">{p.am}</span>
                          </div>
                          <div className="text-[10px] text-neutral-300 flex items-baseline gap-2">
                            <span className="font-bold text-neutral-500 uppercase tracking-tighter shrink-0">14:00 - 17:00 :</span> 
                            <span className="font-medium">{p.pm}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full animate-pulse">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      <span className="font-black text-red-500 text-[10px] uppercase tracking-widest italic">{getRemainingSpots(ws)} places restantes sur {ws.spots}</span>
                    </div>
                  </div>

                  <a 
                    href={ws.stripeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-orange-600 hover:text-white transition-all shadow-xl group/btn text-center block"
                  >
                    Réserver ma place <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie Immersion */}
      <section id="galerie" className="py-24 bg-neutral-900/20 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">DERNIERS <span className="text-orange-600">WORKSHOPS</span></h2>
            <div className="flex gap-4">
              <button onClick={() => scrollContainer(galleryScrollRef, 'left')} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-orange-500 transition-all group"><ChevronLeft className="w-6 h-6 group-hover:text-orange-500" /></button>
              <button onClick={() => scrollContainer(galleryScrollRef, 'right')} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-orange-500 transition-all group"><ChevronRight className="w-6 h-6 group-hover:text-orange-500" /></button>
            </div>
          </div>

          <div className="relative group/gallery mb-32">
            <div ref={galleryScrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10 px-4" style={{ scrollbarWidth: 'none' }}>
              {GALLERY_PHOTOS.map((src, i) => (
                <div key={i} className="min-w-[85%] sm:min-w-[65%] md:min-w-[45%] lg:min-w-[35%] aspect-[3/4] rounded-[50px] bg-neutral-800 border border-white/5 flex items-center justify-center snap-start relative overflow-hidden group cursor-crosshair transition-all hover:border-orange-500/40 shadow-2xl">
                  {src && !galleryImgErrors[i] ? (
                    <img src={src} alt={`Photo galerie ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-center" onError={() => setGalleryImgErrors(prev => ({...prev, [i]: true}))} />
                  ) : (
                    <span className="text-neutral-600 text-[10px] uppercase font-black tracking-widest opacity-40 group-hover:opacity-100 transition-opacity italic leading-relaxed text-center px-8">[Photo Portrait {i + 1}]</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">TÉMOIGNAGES <span className="text-orange-600">2025</span></h2>
            <div className="flex gap-4">
              <button onClick={() => scrollContainer(testimonialScrollRef, 'left')} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-orange-500 transition-all group"><ChevronLeft className="w-6 h-6 group-hover:text-orange-500" /></button>
              <button onClick={() => scrollContainer(testimonialScrollRef, 'right')} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-orange-500 transition-all group"><ChevronRight className="w-6 h-6 group-hover:text-orange-500" /></button>
            </div>
          </div>

          <div className="relative group/testimonials mb-24">
            <div ref={testimonialScrollRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10 px-4" style={{ scrollbarWidth: 'none' }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="min-w-[75%] sm:min-w-[50%] md:min-w-[35%] lg:min-w-[25%] aspect-[3/4] bg-neutral-900/40 border border-white/5 p-8 rounded-[40px] relative overflow-hidden group hover:border-orange-500/20 transition-all flex flex-col justify-between snap-start shadow-2xl">
                  <div>
                    <Quote className="absolute -top-4 -left-4 w-16 h-16 text-white/5 group-hover:text-orange-600/10 transition-colors" />
                    <div className="flex gap-1 mb-6">{[...Array(t.stars)].map((_, i) => <Star key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />)}</div>
                    <p className="text-neutral-400 italic font-light leading-relaxed relative z-10 text-xs md:text-sm">"{t.content}"</p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="font-black text-[12px] uppercase italic text-orange-600 tracking-[0.2em] py-1">{t.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION QUESTIONS */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="bg-neutral-900/40 border border-white/5 p-12 md:p-20 rounded-[60px] backdrop-blur-sm shadow-3xl text-center">
            <div className="w-20 h-20 bg-orange-600/10 border border-orange-600/20 rounded-3xl flex items-center justify-center mx-auto mb-10 rotate-3 hover:rotate-6 transition-transform">
              <MessageSquare className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">UNE <span className="text-orange-600">QUESTION ?</span></h2>
            <p className="text-neutral-500 text-lg mb-12 font-light max-w-xl mx-auto">
              Niveau requis, matériel, organisation... Martin & Alexandre vous répondent personnellement sous 24h.
            </p>

            {contactStatus === 'success' ? (
              <div className="py-10 animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 font-black uppercase italic tracking-widest text-xs">
                  <CheckCircle2 className="w-4 h-4" /> Message bien reçu !
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 max-w-md mx-auto">
                <input 
                  required 
                  type="email" 
                  placeholder="VOTRE EMAIL"
                  value={contactData.email}
                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all text-[11px] font-black tracking-[0.2em] text-white"
                />
                <textarea 
                  required 
                  placeholder="VOTRE QUESTION..."
                  rows="4"
                  value={contactData.message}
                  onChange={(e) => setContactData({...contactData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all text-[11px] font-black tracking-[0.2em] text-white resize-none"
                ></textarea>
                <button 
                  disabled={contactStatus === 'loading'}
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-orange-600 hover:text-white font-black py-6 rounded-2xl text-[12px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group shadow-xl"
                >
                  {contactStatus === 'loading' ? 'ENVOI...' : 'ENVOYER MA QUESTION'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <div className="flex items-center gap-2 mb-10 uppercase italic font-black">
              <CalisthenicsIcon className="w-8 h-8 text-orange-600" />
              <span className="text-2xl">WORKSHOP <span className="text-orange-600">2026</span></span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-600">Réseaux Sociaux</h4>
            <div className="flex gap-6">
              <a href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all text-white shadow-lg"><Instagram className="w-7 h-7" /></a>
              <a href="#contact" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all text-white shadow-lg"><Mail className="w-7 h-7" /></a>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-3 text-neutral-700 text-[10px] uppercase font-black tracking-[0.5em] mt-12 md:mt-0">
             <span>© 2026 WORKSHOPS</span>
             <span>DESIGNED FOR ATHLETES</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
