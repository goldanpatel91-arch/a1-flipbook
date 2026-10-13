import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Music,
  Share2,
  Smartphone,
  Lock,
  Download,
  ArrowRight,
  CheckCircle,
  Camera,
  Play,
  Layers,
  Shield,
  MessageCircle,
  Send,
  Mail,
  Phone,
  Globe,
  Award,
} from 'lucide-react';
import { Album } from '../types';

interface LandingPageProps {
  onOpenAuth: (role?: 'photographer' | 'admin') => void;
  onExploreDemo: () => void;
  sampleAlbum: Album;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onExploreDemo,
  sampleAlbum,
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const helpDeskWhatsAppUrl =
    'https://wa.me/917970641503?text=Namaste%20Goldan%20ji,%20mujhe%20a1album%20ke%20bare%20mein%20sahayata%20chahiye.';

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Ambient Lime-to-Mint Glow Halo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-lime-500/10 via-emerald-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Action Buttons */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Top Pill Badge: "3D FLIPBOOK PLATFORM" */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400 text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(163,230,53,0.35)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Flipbook Platform</span>
              </div>

              {/* 3-Line Headline with Gradient Last Line */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Your Memories.
                <br />
                Our Canvas.
                <br />
                <span className="text-gradient-lime">Stunning Wedding Flipbooks.</span>
              </h1>

              {/* Subtitle Prose */}
              <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
                Transform high-resolution wedding galleries into smooth, luxury 3D page-flipping digital coffee-table books. Shareable instant links for clients, calming background music, and built-in studio booking engine.
              </p>

              {/* CTA Buttons: White Filled Pill & Outline Pill */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onExploreDemo}
                  className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Explore Live 3D Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenAuth('photographer')}
                  className="px-8 py-3.5 rounded-full bg-transparent border border-neutral-700 hover:border-lime-400 text-white hover:text-lime-300 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer hover:shadow-[0_0_20px_rgba(163,230,53,0.2)]"
                >
                  <Camera className="w-4 h-4 text-lime-400" />
                  <span>Photographer Sign In</span>
                </button>
              </div>
            </div>

            {/* Right Column: Tilted 3D Flipbook Mockup with Floating Chips */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md perspective-1500 group">
                {/* Floating Chip 1: 3D Page Flip */}
                <div className="absolute -top-4 -right-4 z-20 bg-neutral-900/90 backdrop-blur-md border border-lime-400/50 rounded-2xl p-2.5 px-4 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(74,222,128,0.2)] flex items-center gap-2.5 animate-bounce">
                  <div className="w-3 h-3 rounded-full bg-lime-400" />
                  <span className="text-xs font-bold text-white">3D Page Flip</span>
                </div>

                {/* Floating Chip 2: Calm Music */}
                <div className="absolute top-28 -right-8 z-20 bg-neutral-900/90 backdrop-blur-md border border-lime-400/40 rounded-2xl p-2 px-3.5 shadow-xl flex items-center gap-2">
                  <Music className="w-3.5 h-3.5 text-lime-400" />
                  <span className="text-xs font-semibold text-white">Calm Music</span>
                </div>

                {/* Floating Chip 3: WhatsApp Share */}
                <div className="absolute -bottom-4 -right-2 z-20 bg-neutral-900/90 backdrop-blur-md border border-lime-400/40 rounded-2xl p-2 px-3.5 shadow-xl flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-lime-400" />
                  <span className="text-xs font-semibold text-white">WhatsApp Share</span>
                </div>

                {/* Main Tilted Book Window */}
                <div
                  onClick={onExploreDemo}
                  className="w-full bg-[#0d1117] border border-lime-400/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(74,222,128,0.15)] transform rotate-[-4deg] group-hover:rotate-0 transition-transform duration-500 cursor-pointer p-4 pb-6"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-[11px] text-neutral-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="ml-2 font-mono text-lime-400 font-bold">a1album.in/demo</span>
                    </div>
                    <span className="text-neutral-500">Real StPageFlip</span>
                  </div>

                  {/* Album Cover inside Mockup */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900">
                    <img
                      src={sampleAlbum.coverImage}
                      alt="Wedding Album Mockup"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5">
                      <span className="text-[10px] text-lime-400 font-bold uppercase tracking-wider">
                        {sampleAlbum.eventName}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-1">{sampleAlbum.coupleName}</h3>
                      <p className="text-[10px] text-neutral-400 mb-2">Royal Heritage Wedding Films</p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-lime-300 font-bold">
                        <span>Click to Flip Real Spreads</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
                      <span className="w-5 h-5 rounded-full bg-emerald-400" />
                      <span className="w-5 h-5 rounded-full bg-teal-400" />
                      <span className="w-5 h-5 rounded-full bg-white" />
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">1-Year Live Validity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS & PROOF BAR */}
      <section className="border-y border-neutral-900 bg-neutral-950/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">3D Flip</p>
              <p className="text-xs text-neutral-400 mt-0.5">Real paper fold & curl</p>
            </div>
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">Calm Music</p>
              <p className="text-xs text-neutral-400 mt-0.5">Velvety wedding audio</p>
            </div>
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Landscape</p>
              <p className="text-xs text-neutral-400 mt-0.5">Smart mobile dual spread</p>
            </div>
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">WhatsApp</p>
              <p className="text-xs text-neutral-400 mt-0.5">Instant couple lead generation</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-block px-3.5 py-1 rounded-full bg-lime-400 text-black text-xs font-bold uppercase tracking-wider">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              From photos to a <span className="text-gradient-lime">live wedding book.</span>
            </h2>
            <p className="text-sm text-neutral-400">
              Deliver unforgettable digital albums to couples in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card 1 */}
            <div className="bg-neutral-950 border border-neutral-800 hover:border-lime-400/50 rounded-2xl p-8 space-y-5 transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-lime-400">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">01. Upload & Auto-Compress</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Upload raw wedding photos. Our multi-worker canvas engine compresses files in parallel, preserving 2560px luxury print resolution while saving 75% file storage.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-lime-400">
                Parallel canvas compression · Spread splitter
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-950 border border-neutral-800 hover:border-lime-400/50 rounded-2xl p-8 space-y-5 transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-lime-400">
                <Music className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">02. Customize & Protect</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Select soothing piano or acoustic wedding melodies, set optional PIN codes for private access, apply subtle studio watermark protection, and configure bulk download permissions.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-lime-400">
                Calm music loops · Password PIN barrier
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-950 border border-neutral-800 hover:border-lime-400/50 rounded-2xl p-8 space-y-5 transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-lime-400">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">03. Share & Get Leads</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Send unguessable 1-year valid client links. Guests view the album like a real book, share photos on WhatsApp, and book your studio directly through the built-in lead engine.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-lime-400">
                1-Year Validity · Direct WhatsApp bookings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="py-24 bg-neutral-950/60 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-block px-3.5 py-1 rounded-full bg-lime-400 text-black text-xs font-bold uppercase tracking-wider">
              FEATURES
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Everything your studio needs.
            </h2>
            <p className="text-sm text-neutral-400">
              Built specifically for professional wedding photographers and their clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">StPageFlip Real Paper Engine</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Realistic corner dragging, physics-based shadow curvature, authentic paper leaf sound effects, and zero vertical letterbox bars.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">Calm Wedding Music</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                4 curated instrumental wedding soundscapes plus custom MP3 uploads with smooth first-tap playback.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">Smart Mobile Landscape</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Automated rotation guidance so mobile viewers experience the luxury coffee-table double-page spread.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">1-Year Live Validity & Renewal</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every album stays live for 365 days. 30-day renewal warnings ensure uninterrupted access with 1-point extensions.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">Studio Lead Generator</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Floating studio branding and direct WhatsApp inquiry chat so wedding guests can book you for upcoming ceremonies.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">Controlled Bulk Download</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Full-album ZIP download defaults to OFF. Enable it only when you wish to permit client offline saving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & HELP DESK SECTION */}
      <section id="contact" className="py-20 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Help Desk & Customer Support</h2>
            <p className="text-xs text-neutral-400">
              Koi bhi problem, points recharge query ya custom studio features ke liye turant sampark karein.
            </p>
          </div>

          {/* Quick WhatsApp & Email Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <a
              href={helpDeskWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">WhatsApp Help Desk</p>
                <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  +91 7970641503
                </p>
                <p className="text-[10px] text-emerald-400 font-medium">Goldan Patel · Instant Reply</p>
              </div>
            </a>

            <a
              href="mailto:nepoliancinematicstudio@gmail.com"
              className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-lime-400/50 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 text-lime-400 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Direct Support Email</p>
                <p className="text-xs font-bold text-white truncate max-w-[180px] group-hover:text-lime-300 transition-colors">
                  nepoliancinematicstudio@gmail.com
                </p>
                <p className="text-[10px] text-neutral-500">Official Help Desk</p>
              </div>
            </a>
          </div>

          {inquirySent ? (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-medium">
              Thank you! Your inquiry has been sent directly to Nepolian Cinematic Studio.
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-left pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Studio Name"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile / WhatsApp Number"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
                />
              </div>

              <textarea
                rows={3}
                required
                placeholder="Message / Studio Query"
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message to Support</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* COMPREHENSIVE FOOTER & ABOUT SECTION (Exact Prompt Requirements) */}
      <footer className="border-t border-neutral-900 bg-neutral-950/90 py-16 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Brand & Leadership Lockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-neutral-800/80">
            {/* Column 1: About Platform */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-lime-400/40 flex items-center justify-center text-lime-400">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-base font-bold text-white tracking-tight">a1album</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                India's fastest wedding album flipbook platform for professional photographers.
              </p>
              <div className="pt-2 text-[11px] text-neutral-400">
                <p className="font-semibold text-white">Associated by: NEPOLIAN CINEMATIC STUDIO</p>
                <p className="text-lime-400">Since 2018</p>
              </div>
            </div>

            {/* Column 2: Leadership & Vision */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-lime-400" />
                <span>Leadership & Vision</span>
              </h4>
              <p className="font-bold text-white text-sm">Goldan Patel</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Founder & Creative Director at Nepolian Cinematic Studio. Serving wedding photographers across India since 2018.
              </p>
            </div>

            {/* Column 3: Customer Support & Help Desk */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Customer Support & Help Desk
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Koi bhi problem, points recharge query ya custom features ke liye turant sampark karein.
              </p>
              <div className="space-y-1 text-xs">
                <a
                  href={helpDeskWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: +91 7970641503</span>
                </a>
                <a
                  href="mailto:nepoliancinematicstudio@gmail.com"
                  className="text-neutral-300 hover:text-white flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-lime-400" />
                  <span>nepoliancinematicstudio@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Group of Creative Ventures Brands */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Our Other Brands (Nepolian Cinematic Studio Group of Creative Ventures)
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <p className="font-bold text-white">NCS Studio</p>
                <p className="text-[10px] text-neutral-400">Cinematography</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <p className="font-bold text-white">A1 Flip Book</p>
                <p className="text-[10px] text-neutral-400">Album Design</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <p className="font-bold text-white">A1 Designing Agency</p>
                <p className="text-[10px] text-neutral-400">Creative Media</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <p className="font-bold text-white">A1 Smart Selection</p>
                <p className="text-[10px] text-neutral-400">Photo Selection</p>
              </div>
            </div>
          </div>

          {/* Bottom Links & Copyright */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-6 font-medium">
              <button
                onClick={() => onOpenAuth('photographer')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Photographer Login
              </button>
              <button
                onClick={() => onOpenAuth('photographer')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                New Studio Signup
              </button>
              <button
                onClick={() => onOpenAuth('admin')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Admin Portal
              </button>
            </div>
            <p className="text-center sm:text-right">
              © 2018-2026 NEPOLIAN CINEMATIC STUDIO. All rights reserved. Founded by Goldan Patel.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
