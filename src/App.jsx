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
const appId = "workshop-2026";


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
