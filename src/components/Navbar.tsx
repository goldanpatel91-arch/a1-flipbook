import React from 'react';
import { Camera, Shield, User, Sparkles, LogOut, Coins, ChevronDown } from 'lucide-react';
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
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-xl border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-lime-400/40 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.25)] group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-lime-300 transition-colors">
                a1<span className="text-gradient-lime font-extrabold">album</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-semibold tracking-wider text-lime-400/90 border border-lime-500/30 bg-lime-950/40 px-2 py-0.5 rounded-full">
                Wedding 3D Pro
              </span>
            </div>
          </button>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onNavigate('landing')}
            className={`hover:text-white transition-colors cursor-pointer ${
              currentView === 'landing' ? 'text-lime-400' : ''
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
            className="hover:text-white transition-colors cursor-pointer"
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
            className="hover:text-white transition-colors cursor-pointer"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
              }
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Pricing (₹89/pt)
          </a>
        </nav>

        {/* Right Action & Quick Switcher Zone */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Role Tester Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-lime-400/40 transition-colors cursor-pointer"
              title="Switch demo mode"
            >
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span className="hidden sm:inline">Role:</span>
              <span className="text-lime-400 font-semibold capitalize">
                {isAdminLoggedIn
                  ? 'Admin'
                  : currentPhotographer
                  ? 'Photographer'
                  : currentView === 'flipbook'
                  ? 'Client View'
                  : 'Public Guest'}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] uppercase font-semibold text-neutral-500">
                  Switch Demo Mode
                </div>
                <button
                  onClick={() => {
                    onNavigate('landing');
                    setRoleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-900 text-neutral-200 flex items-center justify-between"
                >
                  <span>Public Landing Page</span>
                  {currentView === 'landing' && <span className="text-lime-400">✓</span>}
                </button>
                <button
                  onClick={() => {
                    onNavigate('photographer');
                    setRoleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-900 text-neutral-200 flex items-center justify-between"
                >
                  <span>Photographer Dashboard</span>
                  {currentView === 'photographer' && <span className="text-lime-400">✓</span>}
                </button>
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setRoleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-900 text-neutral-200 flex items-center justify-between"
                >
                  <span>Admin Owner Console</span>
                  {currentView === 'admin' && <span className="text-lime-400">✓</span>}
                </button>
                <button
                  onClick={() => {
                    onNavigate('flipbook');
                    setRoleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-900 text-neutral-200 flex items-center justify-between"
                >
                  <span>Client 3D Flipbook Demo</span>
                  {currentView === 'flipbook' && <span className="text-lime-400">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* If Photographer Logged In: Show points pill */}
          {currentPhotographer && (
            <button
              onClick={onOpenRecharge}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                currentPhotographer.points < 20
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:border-amber-400'
                  : 'bg-lime-950/40 border-lime-500/40 text-lime-400 hover:border-lime-400'
              }`}
              title="Click to recharge points"
            >
              <Coins className="w-3.5 h-3.5" />
              <span>{currentPhotographer.points} Pts</span>
              <span className="text-[10px] opacity-75 font-normal">(+ Recharge)</span>
            </button>
          )}

          {/* Primary View / Auth Button */}
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('admin')}
                className="px-4 py-2 text-xs font-semibold text-black bg-lime-400 rounded-full hover:bg-lime-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.35)]"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Panel
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
              <button
                onClick={() => onNavigate('photographer')}
                className="px-4 py-2 text-xs font-semibold text-black bg-lime-400 rounded-full hover:bg-lime-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.35)]"
              >
                <User className="w-3.5 h-3.5" />
                My Studio
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
            <button
              onClick={() => onOpenAuth('photographer')}
              className="px-5 py-2 text-xs font-semibold text-white bg-transparent border border-neutral-700 rounded-full hover:border-lime-400 hover:text-lime-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
