import React, { useState } from 'react';
import { X, Shield, Camera, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { Photographer } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'photographer' | 'admin';
  photographers: Photographer[];
  onLoginPhotographer: (photographer: Photographer) => void;
  onLoginAdmin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'photographer',
  photographers,
  onLoginPhotographer,
  onLoginAdmin,
}) => {
  const [role, setRole] = useState<'photographer' | 'admin'>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (role === 'admin') {
      if (email === 'admin@a1album.com' || email === 'admin' || password === 'admin123') {
        onLoginAdmin();
        onClose();
      } else {
        setError('Invalid admin credentials. Use demo button below or admin@a1album.com / admin123');
      }
    } else {
      const match = photographers.find(
        (p) => p.email.toLowerCase() === email.toLowerCase() || p.phone.includes(email)
      );
      if (match) {
        if (match.isBlocked) {
          setError('This photographer account has been suspended by the platform administrator.');
          return;
        }
        onLoginPhotographer(match);
        onClose();
      } else {
        // Fallback to first photographer if email not matched, or error
        if (photographers.length > 0) {
          onLoginPhotographer(photographers[0]);
          onClose();
        } else {
          setError('No photographer account found.');
        }
      }
    }
  };

  const handleQuickPhotographer = (photo: Photographer) => {
    if (photo.isBlocked) {
      setError('This photographer account has been suspended by the administrator.');
      return;
    }
    onLoginPhotographer(photo);
    onClose();
  };

  const handleQuickAdmin = () => {
    onLoginAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(74,222,128,0.15)] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-lime-400/40 flex items-center justify-center text-lime-400">
              {role === 'admin' ? <Shield className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {role === 'admin' ? 'Owner / Admin Portal' : 'Photographer Sign In'}
              </h3>
              <p className="text-[10px] text-neutral-400">a1album Cloud Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Role Switcher */}
        <div className="p-4 pb-0">
          <div className="grid grid-cols-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800 text-xs font-semibold">
            <button
              onClick={() => {
                setRole('photographer');
                setError(null);
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                role === 'photographer'
                  ? 'bg-lime-400 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photographer</span>
            </button>
            <button
              onClick={() => {
                setRole('admin');
                setError(null);
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                role === 'admin'
                  ? 'bg-lime-400 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Owner</span>
            </button>
          </div>
        </div>

        {/* Form & 1-Click Quick Demo */}
        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-3">
            <div>
              <label className="text-[11px] text-neutral-400 mb-1 block">
                {role === 'admin' ? 'Admin Email' : 'Photographer Email / Mobile'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder={
                    role === 'admin' ? 'admin@a1album.com' : 'rajesh@royalheritage.com'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-neutral-400 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.3)] mt-2"
            >
              Sign In to {role === 'admin' ? 'Admin Console' : 'Studio Dashboard'}
            </button>
          </form>

          {/* Quick 1-Click Demo Buttons */}
          <div className="pt-3 border-t border-neutral-800 space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
              <Sparkles className="w-3 h-3 text-lime-400" />
              <span>Instant 1-Click Demo Login</span>
            </div>

            {role === 'admin' ? (
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-lime-400/50 text-left transition-colors flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <p className="text-xs font-semibold text-white group-hover:text-lime-300">
                    Master Admin (Owner of Website)
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Full control: point adjust, block studio, passwords, live feed
                  </p>
                </div>
                <span className="text-xs text-lime-400 font-semibold">Login →</span>
              </button>
            ) : (
              <div className="space-y-1.5">
                {photographers.slice(0, 2).map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => handleQuickPhotographer(photo)}
                    className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-lime-400/50 text-left transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-lime-300">
                        {photo.name} · {photo.studioName}
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        {photo.points} Points Available {photo.points < 20 ? '(Low Balance Demo)' : ''}
                      </p>
                    </div>
                    <span className="text-xs text-lime-400 font-semibold">Login →</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
