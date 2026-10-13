import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Music,
  Share2,
  Smartphone,
  Lock,
  Download,
  Coins,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Camera,
  Play,
  Layers,
  Shield,
  MessageCircle,
  Send,
  Zap,
} from 'lucide-react';
import { Album } from '../types';
import { POINT_PRICE_INR, RECHARGE_PACKS } from '../data/mockData';

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
        {/* Ambient Lime-to-Mint Glow Halos */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-lime-500/10 via-emerald-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: 3-line Headline & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Top Green Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400 text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(163,230,53,0.35)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Wedding Flipbook Builder</span>
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

              {/* Pricing Callout in Hero */}
              <div className="pt-2 text-xs text-neutral-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span>Zero monthly lock-in · Only ₹89 per point (10 points per complete album)</span>
              </div>
            </div>

            {/* Right Column: Tilted 3D Flipbook Mockup with Floating Chips */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Floating Chips (As seen in user screenshot) */}
              <div className="relative w-full max-w-md perspective-1500 group">
                {/* Floating Top Right Tag */}
                <div className="absolute -top-4 -right-4 z-20 bg-neutral-900/90 backdrop-blur-md border border-lime-400/50 rounded-2xl p-2.5 px-4 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(74,222,128,0.2)] flex items-center gap-2.5 animate-bounce">
                  <div className="w-3 h-3 rounded-full bg-lime-400" />
                  <span className="text-xs font-bold text-white">3D Page Flip</span>
                </div>

                {/* Floating Middle Right Tag */}
                <div className="absolute top-28 -right-8 z-20 bg-neutral-900/90 backdrop-blur-md border border-lime-400/40 rounded-2xl p-2 px-3.5 shadow-xl flex items-center gap-2">
                  <Music className="w-3.5 h-3.5 text-lime-400" />
                  <span className="text-xs font-semibold text-white">Calm Music</span>
                </div>

                {/* Floating Bottom Right Tag */}
                <div className="absolute -bottom-4 -right-2 z-20 bg-neutral-900/90 backdrop-blur-md border border-lime-400/40 rounded-2xl p-2 px-3.5 shadow-xl flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-lime-400" />
                  <span className="text-xs font-semibold text-white">WhatsApp Share</span>
                </div>

                {/* Main Tilted Book Window */}
                <div
                  onClick={onExploreDemo}
                  className="w-full bg-[#0d1117] border border-lime-400/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(74,222,128,0.15)] transform rotate-[-4deg] group-hover:rotate-0 transition-transform duration-500 cursor-pointer p-4 pb-6"
                >
                  {/* Mockup Header Bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 text-[11px] text-neutral-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="ml-2 font-mono text-lime-400 font-bold">a1album.in/demo</span>
                    </div>
                    <span className="text-neutral-500">3D Interactive</span>
                  </div>

                  {/* Album Cover Inside Mockup */}
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
                        <span>Click to Flip Spreads</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom Palette Swatches (As in screenshot) */}
                  <div className="mt-4 flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
                      <span className="w-5 h-5 rounded-full bg-emerald-400" />
                      <span className="w-5 h-5 rounded-full bg-teal-400" />
                      <span className="w-5 h-5 rounded-full bg-white" />
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">100% Mobile Ready</span>
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
              <p className="text-xs text-neutral-400 mt-0.5">Smooth page turn physics</p>
            </div>
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">Music</p>
              <p className="text-xs text-neutral-400 mt-0.5">Calm wedding soundtrack</p>
            </div>
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</p>
              <p className="text-xs text-neutral-400 mt-0.5">Mobile touch & pinch zoom</p>
            </div>
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">WhatsApp</p>
              <p className="text-xs text-neutral-400 mt-0.5">Single-tap direct sharing</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (Matching Screenshot 2) */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          {/* Top Pill & Headline */}
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

          {/* 3 Dark Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card 1: Upload */}
            <div className="bg-neutral-950 border border-neutral-800 hover:border-lime-400/50 rounded-2xl p-8 space-y-5 transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-lime-400">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">01. Upload & Compress</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Upload raw wedding spreads. Our fast multi-worker canvas engine optimizes images in parallel, preserving 2560px luxury print resolution while saving 75% file storage.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-lime-400">
                Parallel canvas compression · Zero lag
              </div>
            </div>

            {/* Card 2: Customize */}
            <div className="bg-neutral-950 border border-neutral-800 hover:border-lime-400/50 rounded-2xl p-8 space-y-5 transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-lime-400">
                <Music className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">02. Customize Experience</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Select soothing piano or acoustic wedding melodies, set optional PIN codes for private access, apply subtle studio watermark protection, and configure bulk download rules.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-lime-400">
                Calm music loops · Password PIN barrier
              </div>
            </div>

            {/* Card 3: Share */}
            <div className="bg-neutral-950 border border-neutral-800 hover:border-lime-400/50 rounded-2xl p-8 space-y-5 transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-lime-400">
                <Share2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">03. Share & Get Leads</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Send unguessable client links. Guests view the album like a real book, share individual photos on WhatsApp, and book your studio directly through the built-in lead engine.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-lime-400">
                Unguessable URL · Direct WhatsApp bookings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING & POINTS SECTION (Clear ₹89/point) */}
      <section id="pricing" className="py-24 bg-neutral-950/60 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-block px-3.5 py-1 rounded-full bg-lime-400 text-black text-xs font-bold uppercase tracking-wider">
              PRICING & POINTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Pay per album. <span className="text-gradient-lime">Exact ₹89 per point.</span>
            </h2>
            <p className="text-sm text-neutral-400">
              1 Wedding Album = 10 Points = ₹890. No monthly subscription or hidden fees.
            </p>
          </div>

          {/* Pricing Packs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            {RECHARGE_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                  pack.popular
                    ? 'bg-neutral-900 border-2 border-lime-400 shadow-[0_0_35px_rgba(74,222,128,0.2)]'
                    : 'bg-neutral-950 border border-neutral-800'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-lime text-black font-extrabold text-xs px-3 py-0.5 rounded-full uppercase tracking-wider">
                    Most Popular Choice
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{pack.name}</h3>
                    <p className="text-xs text-neutral-400">{pack.tag}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white font-mono">₹{pack.priceInr}</span>
                    <span className="text-xs text-neutral-400">/ one-time</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/60 border border-neutral-800 text-xs">
                    <span className="text-lime-400 font-bold">{pack.points} Points</span>
                    <span className="text-neutral-400"> ({pack.albumsCount} Full Wedding Albums)</span>
                    <p className="text-[10px] text-neutral-500 mt-0.5">{pack.savingsText}</p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-neutral-300 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                      <span>Smooth 3D page curl engine</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                      <span>Calming ambient wedding audio</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                      <span>Unguessable client links</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                      <span>Studio WhatsApp lead generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                      <span>Optional PIN & watermark protection</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onOpenAuth('photographer')}
                    className={`w-full py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      pack.popular
                        ? 'bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_20px_rgba(163,230,53,0.35)]'
                        : 'bg-white hover:bg-neutral-200 text-black'
                    }`}
                  >
                    Select {pack.points} Pts Pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID (Matching Screenshot 3) */}
      <section id="features" className="py-24">
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
              <h4 className="text-base font-bold text-white">Realistic 3D Page Flip</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Realistic corner dragging, physics-based shadow curvature, and authentic paper leaf sound effects.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">Calm Wedding Music</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                4 curated instrumental wedding soundscapes plus custom MP3 uploads with smooth first-tap playback.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">Fast Parallel Compression</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Processes raw camera files concurrently, shrinking storage by 75% while keeping 2560px print crispness.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-base font-bold text-white">Spread Splitter</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                1-click split tool to turn wide panoramic double-page wedding layouts into separate left and right leaves.
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

      {/* STUDIO CONTACT & INQUIRY SECTION */}
      <section id="contact" className="py-20 bg-neutral-950/80 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Have Questions or Need a Custom Studio Plan?</h2>
            <p className="text-xs text-neutral-400">
              Get in touch with our team for bulk studio onboardings or feature requests.
            </p>
          </div>

          {inquirySent ? (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-medium">
              Thank you! Your inquiry has been received. Our team will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
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

              <input
                type="email"
                required
                placeholder="Email Address"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
              />

              <textarea
                rows={3}
                required
                placeholder="How can we assist your photography studio?"
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Studio Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 py-10 text-center text-xs text-neutral-500 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Camera className="w-4 h-4 text-lime-400" />
          <span className="font-bold text-white text-sm">a1album</span>
          <span>· Luxury Digital Wedding Album & Flipbook Platform</span>
        </div>
        <p>© 2026 a1album Technologies. High-resolution 3D wedding galleries for professional photographers.</p>
      </footer>
    </div>
  );
};
