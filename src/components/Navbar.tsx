import React from 'react';
import { Camera, Shield, User, LogOut, Coins } from 'lucide-react';
import { Photographer } from '../types';

interface NavbarProps {
  currentView: 'landing' | 'photographer' | 'admin' | 'flipbook';
  onNavigate: (view: 'landing' | 'photographer' | 'admin' | 'flipbook') => void;
  currentPhotographer: Photographer | null;
  isAdminLoggedIn: boolean;
  onOpenAuth: (role?: 'photographer' | 'admin') => void;
  onLogout: () => void;
  onOpenRecharge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentPhotographer,
  isAdminLoggedIn,
  onOpenAuth,
  onLogout,
  onOpenRecharge,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-xl border-b border-neutral-900 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-lime-400/40 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.25)] group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-lime-300 transition-colors whitespace-nowrap">
              a1<span className="text-gradient-lime font-extrabold">album</span>
            </span>
          </button>
        </div>

        {/* Center Navigation Links (Clean, NoWrap) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300 whitespace-nowrap">
          <button
            onClick={() => onNavigate('landing')}
            className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap ${
              currentView === 'landing' ? 'text-lime-400 font-semibold' : ''
            }`}
          >
            Showcase
          </button>
          <a
            href="#features"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
              }
            }}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
              }
            }}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            How It Works
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
              }
            }}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Contact
          </a>
        </nav>

        {/* Right Zone: Only authenticated users see points / studio / admin */}
        <div className="flex items-center gap-3 shrink-0">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('admin')}
                className="px-4 py-2 text-xs font-semibold text-black bg-lime-400 rounded-full hover:bg-lime-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.35)] whitespace-nowrap"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : currentPhotographer ? (
            <div className="flex items-center gap-2">
              {/* Wallet Points Counter */}
              <button
                onClick={onOpenRecharge}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  currentPhotographer.points < 20
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:border-amber-400'
                    : 'bg-lime-950/40 border-lime-500/40 text-lime-400 hover:border-lime-400'
                }`}
                title="Click to recharge points"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>{currentPhotographer.points} Pts</span>
              </button>

              <button
                onClick={() => onNavigate('photographer')}
                className="px-4 py-2 text-xs font-semibold text-black bg-lime-400 rounded-full hover:bg-lime-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.35)] whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Studio</span>
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Clean Outline Pill Sign In Button */
            <button
              onClick={() => onOpenAuth('photographer')}
              className="px-5 py-2 text-xs font-semibold text-white bg-transparent border border-neutral-700 rounded-full hover:border-lime-400 hover:text-lime-300 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
