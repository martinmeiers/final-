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

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-10">
      <div className="max-w-xl w-full bg-neutral-900/40 border border-white/5 p-10 rounded-3xl text-center">
        <h1 className="text-4xl font-black italic uppercase mb-6">
          WORKSHOP <span className="text-orange-600">2026</span>
        </h1>
        <p className="text-neutral-400">
          Version propre compilable ✅
        </p>
      </div>
    </div>
  );
}
