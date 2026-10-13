/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { FlipbookViewer } from './components/FlipbookViewer';
import { PhotographerDashboard } from './components/PhotographerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { RazorpayModal } from './components/RazorpayModal';
import { StudioInquiryModal } from './components/StudioInquiryModal';
import { PhotoShareModal } from './components/PhotoShareModal';
import { AuthModal } from './components/AuthModal';
import { WhatsAppHelpDesk } from './components/WhatsAppHelpDesk';
import {
  Photographer,
  Album,
  BookingInquiry,
  PointTransaction,
  PointSettings,
  RateChangeLog,
} from './types';
import {
  loadStoredPhotographers,
  saveStoredPhotographers,
  loadStoredAlbums,
  saveStoredAlbums,
  loadStoredInquiries,
  saveStoredInquiries,
  loadStoredTransactions,
  saveStoredTransactions,
  loadStoredSettings,
  saveStoredSettings,
  loadStoredRateLogs,
  saveStoredRateLogs,
} from './data/mockData';

export default function App() {
  // Global State with LocalStorage Persistence
  const [photographers, setPhotographers] = useState<Photographer[]>(loadStoredPhotographers);
  const [albums, setAlbums] = useState<Album[]>(loadStoredAlbums);
  const [inquiries, setInquiries] = useState<BookingInquiry[]>(loadStoredInquiries);
  const [transactions, setTransactions] = useState<PointTransaction[]>(loadStoredTransactions);
  const [pointSettings, setPointSettings] = useState<PointSettings>(loadStoredSettings);
  const [rateLogs, setRateLogs] = useState<RateChangeLog[]>(loadStoredRateLogs);

  // Authentication & Session
  const [currentPhotographer, setCurrentPhotographer] = useState<Photographer | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Navigation View
  const [currentView, setCurrentView] = useState<'landing' | 'photographer' | 'admin' | 'flipbook'>(
    'landing'
  );
  const [activeAlbum, setActiveAlbum] = useState<Album>(albums[0]);

  // Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRoleTarget, setAuthRoleTarget] = useState<'photographer' | 'admin'>('photographer');
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
  const [inquiryModalAlbum, setInquiryModalAlbum] = useState<Album | null>(null);
  const [photoShareModalData, setPhotoShareModalData] = useState<{ url: string; title?: string } | null>(
    null
  );

  // Sync to localStorage
  useEffect(() => {
    saveStoredPhotographers(photographers);
  }, [photographers]);

  useEffect(() => {
    saveStoredAlbums(albums);
  }, [albums]);

  useEffect(() => {
    saveStoredInquiries(inquiries);
  }, [inquiries]);

  useEffect(() => {
    saveStoredTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    saveStoredSettings(pointSettings);
  }, [pointSettings]);

  useEffect(() => {
    saveStoredRateLogs(rateLogs);
  }, [rateLogs]);

  // Handle URL hash changes (for client shareable link #album-a1-xxxx)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#album-')) {
        const code = hash.replace('#album-', '');
        const found = albums.find((a) => a.shareCode === code || a.id === code);
        if (found) {
          setActiveAlbum(found);
          setCurrentView('flipbook');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [albums]);

  // Keep active photographer up to date with points modifications
  useEffect(() => {
    if (currentPhotographer) {
      const updated = photographers.find((p) => p.id === currentPhotographer.id);
      if (updated) {
        setCurrentPhotographer(updated);
      }
    }
  }, [photographers]);

  // Create Album Handler
  const handleCreateAlbum = (newAlbumData: Omit<Album, 'id' | 'viewsCount' | 'createdAt'>): boolean => {
    if (!currentPhotographer) return false;
    if (currentPhotographer.points < pointSettings.pointsPerAlbum) return false;

    // Deduct points based on current settings
    const cost = pointSettings.pointsPerAlbum;
    const updatedPhotographers = photographers.map((p) =>
      p.id === currentPhotographer.id
        ? {
            ...p,
            points: p.points - cost,
            totalAlbumsCreated: p.totalAlbumsCreated + 1,
          }
        : p
    );
    setPhotographers(updatedPhotographers);

    const newAlbum: Album = {
      ...newAlbumData,
      id: 'alb_' + Math.random().toString(36).substring(2, 9),
      viewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAlbums((prev) => [newAlbum, ...prev]);

    // Record point transaction
    const newTx: PointTransaction = {
      id: 'tx_' + Math.random().toString(36).substring(2, 9),
      photographerId: currentPhotographer.id,
      photographerName: currentPhotographer.studioName,
      amount: -cost,
      type: 'deduct_album',
      description: `Published 3D Wedding Album: ${newAlbum.eventName} (${newAlbum.coupleName})`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      rateAppliedInr: pointSettings.pricePerPointInr,
    };
    setTransactions((prev) => [newTx, ...prev]);

    return true;
  };

  // Renew Album Handler (+1 Year)
  const handleRenewAlbum = (albumId: string): boolean => {
    if (!currentPhotographer) return false;
    const renewalCost = pointSettings.renewalPointsPerAlbum;
    if (currentPhotographer.points < renewalCost) {
      setRechargeModalOpen(true);
      return false;
    }

    // Deduct renewal point
    setPhotographers((prev) =>
      prev.map((p) =>
        p.id === currentPhotographer.id ? { ...p, points: p.points - renewalCost } : p
      )
    );

    // Extend expiry date by 365 days
    setAlbums((prev) =>
      prev.map((a) => {
        if (a.id === albumId) {
          const currentExpiry = new Date(a.expiresAt).getTime();
          const baseTime = currentExpiry > Date.now() ? currentExpiry : Date.now();
          const newExpiry = new Date(baseTime + 365 * 24 * 60 * 60 * 1000);
          const newGrace = new Date(newExpiry.getTime() + 30 * 24 * 60 * 60 * 1000);
          return {
            ...a,
            expiresAt: newExpiry.toISOString(),
            gracePeriodEndsAt: newGrace.toISOString(),
          };
        }
        return a;
      })
    );

    const targetAlbum = albums.find((a) => a.id === albumId);
    const newTx: PointTransaction = {
      id: 'tx_' + Math.random().toString(36).substring(2, 9),
      photographerId: currentPhotographer.id,
      photographerName: currentPhotographer.studioName,
      amount: -renewalCost,
      type: 'renew_album',
      description: `Extended +1 Year Validity for Album: ${targetAlbum?.coupleName || albumId}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      rateAppliedInr: pointSettings.pricePerPointInr,
    };
    setTransactions((prev) => [newTx, ...prev]);

    return true;
  };

  // Admin Manual Validity Extension
  const handleAdminExtendValidity = (albumId: string, additionalDays: number = 365) => {
    setAlbums((prev) =>
      prev.map((a) => {
        if (a.id === albumId) {
          const currentExpiry = new Date(a.expiresAt).getTime();
          const baseTime = currentExpiry > Date.now() ? currentExpiry : Date.now();
          const newExpiry = new Date(baseTime + additionalDays * 24 * 60 * 60 * 1000);
          const newGrace = new Date(newExpiry.getTime() + 30 * 24 * 60 * 60 * 1000);
          return {
            ...a,
            expiresAt: newExpiry.toISOString(),
            gracePeriodEndsAt: newGrace.toISOString(),
          };
        }
        return a;
      })
    );
  };

  const handleDeleteAlbum = (albumId: string) => {
    setAlbums((prev) => prev.filter((a) => a.id !== albumId));
  };

  const handleViewAlbum = (album: Album) => {
    setAlbums((prev) =>
      prev.map((a) => (a.id === album.id ? { ...a, viewsCount: a.viewsCount + 1 } : a))
    );
    setActiveAlbum(album);
    setCurrentView('flipbook');
    window.location.hash = `#album-${album.shareCode}`;
  };

  // Razorpay Top-up Success
  const handleRechargeSuccess = (
    pointsAdded: number,
    amountPaidInr: number,
    referenceId: string,
    rateApplied: number
  ) => {
    if (!currentPhotographer) return;

    setPhotographers((prev) =>
      prev.map((p) =>
        p.id === currentPhotographer.id ? { ...p, points: p.points + pointsAdded } : p
      )
    );

    const newTx: PointTransaction = {
      id: 'tx_' + Math.random().toString(36).substring(2, 9),
      photographerId: currentPhotographer.id,
      photographerName: currentPhotographer.studioName,
      amount: pointsAdded,
      type: 'purchase',
      pricePaidInr: amountPaidInr,
      rateAppliedInr: rateApplied,
      referenceId,
      description: `Recharged ${pointsAdded} Points via Razorpay (${referenceId})`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Admin Adjust Points
  const handleAdminAdjustPoints = (photographerId: string, amount: number, reason: string) => {
    const target = photographers.find((p) => p.id === photographerId);
    if (!target) return;

    setPhotographers((prev) =>
      prev.map((p) =>
        p.id === photographerId ? { ...p, points: Math.max(0, p.points + amount) } : p
      )
    );

    const newTx: PointTransaction = {
      id: 'tx_' + Math.random().toString(36).substring(2, 9),
      photographerId,
      photographerName: target.studioName,
      amount,
      type: 'admin_adjust',
      description: `Admin Point Adjustment: ${reason}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      rateAppliedInr: pointSettings.pricePerPointInr,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleAdminToggleBlock = (photographerId: string) => {
    setPhotographers((prev) =>
      prev.map((p) => (p.id === photographerId ? { ...p, isBlocked: !p.isBlocked } : p))
    );
  };

  const handleAdminResetPassword = (photographerId: string, newPass: string) => {
    const target = photographers.find((p) => p.id === photographerId);
    if (!target) return;

    const newTx: PointTransaction = {
      id: 'tx_' + Math.random().toString(36).substring(2, 9),
      photographerId,
      photographerName: target.studioName,
      amount: 0,
      type: 'admin_adjust',
      description: `Admin Password Reset for ${target.name}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Admin Update Point Rate Settings
  const handleUpdatePointSettings = (newSettings: PointSettings, reason: string) => {
    const oldRate = pointSettings.pricePerPointInr;
    const oldPpa = pointSettings.pointsPerAlbum;

    setPointSettings(newSettings);

    const newLog: RateChangeLog = {
      id: 'log_' + Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      oldRate,
      newRate: newSettings.pricePerPointInr,
      oldPointsPerAlbum: oldPpa,
      newPointsPerAlbum: newSettings.pointsPerAlbum,
      changedBy: 'Goldan Patel (Superadmin)',
      reason,
    };
    setRateLogs((prev) => [newLog, ...prev]);
  };

  // Inquiry Submission Handler
  const handleSubmitInquiry = (inquiryData: Omit<BookingInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: BookingInquiry = {
      ...inquiryData,
      id: 'inq_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPhotographer(null);
    setCurrentView('landing');
  };

  const activePhotographerForViewer =
    photographers.find((p) => p.id === activeAlbum.photographerId) || currentPhotographer;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lime-400 selection:text-black">
      {/* Top Navbar (Hidden in Client Flipbook Viewer) */}
      {currentView !== 'flipbook' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            if (view !== 'flipbook') {
              window.location.hash = '';
            }
          }}
          currentPhotographer={currentPhotographer}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenAuth={(role) => {
            setAuthRoleTarget(role || 'photographer');
            setAuthModalOpen(true);
          }}
          onLogout={handleLogout}
          onOpenRecharge={() => setRechargeModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main>
        {currentView === 'landing' && (
          <LandingPage
            sampleAlbum={albums[0] || activeAlbum}
            onOpenAuth={(role) => {
              setAuthRoleTarget(role || 'photographer');
              setAuthModalOpen(true);
            }}
            onExploreDemo={() => {
              handleViewAlbum(albums[0]);
            }}
          />
        )}

        {currentView === 'photographer' && currentPhotographer && (
          <PhotographerDashboard
            photographer={currentPhotographer}
            albums={albums}
            inquiries={inquiries}
            pointSettings={pointSettings}
            onOpenRecharge={() => setRechargeModalOpen(true)}
            onCreateAlbum={handleCreateAlbum}
            onRenewAlbum={handleRenewAlbum}
            onDeleteAlbum={handleDeleteAlbum}
            onViewAlbum={handleViewAlbum}
            onOpenInquiryReply={(phone) => {
              window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            photographers={photographers}
            albums={albums}
            transactions={transactions}
            pointSettings={pointSettings}
            rateLogs={rateLogs}
            onAdjustPoints={handleAdminAdjustPoints}
            onToggleBlock={handleAdminToggleBlock}
            onResetPassword={handleAdminResetPassword}
            onUpdatePointSettings={handleUpdatePointSettings}
            onExtendAlbumValidity={handleAdminExtendValidity}
            onDeleteAlbum={handleDeleteAlbum}
            onViewAlbum={handleViewAlbum}
          />
        )}

        {currentView === 'flipbook' && (
          <FlipbookViewer
            album={activeAlbum}
            photographer={activePhotographerForViewer}
            onOpenInquiry={(alb) => setInquiryModalAlbum(alb)}
            onOpenPhotoShare={(url, title) => setPhotoShareModalData({ url, title })}
            onBackToApp={() => {
              setCurrentView('landing');
              window.location.hash = '';
            }}
          />
        )}
      </main>

      {/* Floating WhatsApp Help Desk Button (Only on Landing, Dashboard, and Admin; NOT on client viewer) */}
      {currentView !== 'flipbook' && <WhatsAppHelpDesk />}

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultRole={authRoleTarget}
        photographers={photographers}
        onLoginPhotographer={(photo) => {
          setCurrentPhotographer(photo);
          setIsAdminLoggedIn(false);
          setCurrentView('photographer');
        }}
        onLoginAdmin={() => {
          setIsAdminLoggedIn(true);
          setCurrentPhotographer(null);
          setCurrentView('admin');
        }}
      />

      {/* RAZORPAY RECHARGE MODAL */}
      {currentPhotographer && (
        <RazorpayModal
          isOpen={rechargeModalOpen}
          onClose={() => setRechargeModalOpen(false)}
          currentPoints={currentPhotographer.points}
          pricePerPointInr={pointSettings.pricePerPointInr}
          onSuccess={handleRechargeSuccess}
        />
      )}

      {/* STUDIO INQUIRY & WHATSAPP MODAL */}
      {inquiryModalAlbum && (
        <StudioInquiryModal
          isOpen={!!inquiryModalAlbum}
          onClose={() => setInquiryModalAlbum(null)}
          album={inquiryModalAlbum}
          photographer={
            photographers.find((p) => p.id === inquiryModalAlbum.photographerId) || null
          }
          onSubmitInquiry={handleSubmitInquiry}
        />
      )}

      {/* SINGLE PHOTO SHARE MODAL */}
      {photoShareModalData && (
        <PhotoShareModal
          isOpen={!!photoShareModalData}
          onClose={() => setPhotoShareModalData(null)}
          photoUrl={photoShareModalData.url}
          title={photoShareModalData.title}
        />
      )}
    </div>
  );
}
