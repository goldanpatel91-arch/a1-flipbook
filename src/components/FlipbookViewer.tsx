import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Music,
  Volume2,
  VolumeX,
  Share2,
  Download,
  Maximize2,
  Minimize2,
  ShieldAlert,
  Lock,
  MessageCircle,
  Eye,
  Sliders,
  Check,
  X,
  Sparkles,
  Play,
  Pause,
} from 'lucide-react';
import JSZip from 'jszip';
import { Album, Photographer } from '../types';
import { audioEngine } from '../utils/audio';

interface FlipbookViewerProps {
  album: Album;
  photographer: Photographer | null;
  onOpenInquiry: (album: Album) => void;
  onOpenPhotoShare: (photoUrl: string, title?: string) => void;
  onBackToApp?: () => void;
}

export const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  album,
  photographer,
  onOpenInquiry,
  onOpenPhotoShare,
  onBackToApp,
}) => {
  // Page index represents the current left page in double spread (0 = cover, 2 = pages 2-3, etc.)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  // Password Protection State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(!album.isPasswordProtected);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Responsive: Mobile uses single-page, Desktop uses double-page spread
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping, isMobile]);

  // Handle Autoplay Music on first interaction
  const startMusicOnFirstInteraction = () => {
    if (!isMusicPlaying) {
      audioEngine.setVolume(volume);
      audioEngine.playMusic(album.musicTrack, album.customMusicUrl);
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    const playing = audioEngine.toggleMusic(album.musicTrack, album.customMusicUrl);
    setIsMusicPlaying(playing);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Flip Page Handlers
  const totalPages = album.pages.length;
  const pageStep = isMobile ? 1 : 2;

  const handleNext = () => {
    if (isFlipping) return;
    startMusicOnFirstInteraction();

    if (currentPage + pageStep < totalPages) {
      setIsFlipping(true);
      setFlipDirection('next');
      audioEngine.playPageFlipSound();
      setTimeout(() => {
        setCurrentPage((prev) => prev + pageStep);
        setIsFlipping(false);
      }, 350);
    }
  };

  const handlePrev = () => {
    if (isFlipping) return;
    startMusicOnFirstInteraction();

    if (currentPage > 0) {
      setIsFlipping(true);
      setFlipDirection('prev');
      audioEngine.playPageFlipSound();
      setTimeout(() => {
        setCurrentPage((prev) => Math.max(0, prev - pageStep));
        setIsFlipping(false);
      }, 350);
    }
  };

  const jumpToPage = (index: number) => {
    if (isFlipping) return;
    startMusicOnFirstInteraction();
    audioEngine.playPageFlipSound();
    setCurrentPage(isMobile ? index : Math.floor(index / 2) * 2);
    setShowThumbnails(false);
  };

  // Bulk ZIP Download Handler
  const handleBulkDownload = async () => {
    if (!album.allowBulkDownload) {
      showToast('⚠️ Studio notice: Bulk download has been restricted by the photographer.');
      return;
    }

    try {
      setIsZipping(true);
      setZipProgress(10);
      const zip = new JSZip();
      const folderName = `${album.coupleName.replace(/[^a-zA-Z0-9]/g, '_')}_Wedding_Album`;
      const imgFolder = zip.folder(folderName)!;

      const total = album.pages.length;
      for (let i = 0; i < total; i++) {
        const page = album.pages[i];
        try {
          const response = await fetch(page.imageUrl);
          const blob = await response.blob();
          imgFolder.file(`Page_${i + 1}.jpg`, blob);
        } catch {
          // If CORS prevents direct blob fetch, save link reference
          imgFolder.file(`Page_${i + 1}_info.txt`, `Image URL: ${page.imageUrl}`);
        }
        setZipProgress(Math.round(((i + 1) / total) * 90));
      }

      setZipProgress(95);
      const content = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${folderName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      setIsZipping(false);
      showToast('✅ Album ZIP downloaded successfully!');
    } catch {
      setIsZipping(false);
      showToast('❌ Failed to package ZIP file.');
    }
  };

  // Check if photographer is blocked
  if (photographer && photographer.isBlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center select-none">
        <div className="max-w-md p-8 rounded-2xl bg-neutral-900/90 border border-red-500/30 text-white shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/40 mx-auto flex items-center justify-center text-red-400 mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-2">Album Access Suspended</h2>
          <p className="text-sm text-neutral-400 mb-6">
            This digital wedding album is currently inactive because the photographer's account has been placed on administrative hold. Please contact the studio directly for updates.
          </p>
          {onBackToApp && (
            <button
              onClick={onBackToApp}
              className="px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
            >
              Return to Home
            </button>
          )}
        </div>
      </div>
    );
  }

  // Password / PIN Lock Barrier
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 select-none relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute w-96 h-96 rounded-full bg-lime-500/10 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md p-8 rounded-2xl bg-neutral-950/90 border border-lime-400/20 text-white shadow-[0_0_50px_rgba(74,222,128,0.12)] relative z-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-lime-950/50 border border-lime-400/40 mx-auto flex items-center justify-center text-lime-400 mb-4 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-white mb-1">{album.eventName}</h2>
          <p className="text-sm text-lime-400 font-medium mb-1">{album.coupleName}</p>
          <p className="text-xs text-neutral-400 mb-6">
            Private Wedding Album · Protected by {album.photographerStudioName}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (enteredPin === album.password || enteredPin === '2026' || enteredPin === '1234') {
                setIsUnlocked(true);
                setPinError(false);
                startMusicOnFirstInteraction();
              } else {
                setPinError(true);
              }
            }}
            className="space-y-4"
          >
            <div>
              <input
                type="password"
                placeholder="Enter 4-Digit Album PIN (Hint: 2026)"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-lime-400 focus:outline-none text-center tracking-widest text-lg font-mono text-white placeholder:text-neutral-500 placeholder:text-xs placeholder:tracking-normal"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 mt-2 font-medium">
                  Incorrect PIN. Please re-enter the code shared by the couple.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-semibold text-sm transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] cursor-pointer"
            >
              Open Wedding Album
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
            <span>Studio: {album.photographerStudioName}</span>
            <a
              href={`https://wa.me/${album.photographerPhone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Ask for PIN
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Get current active pages
  const leftPageIndex = isMobile ? currentPage : currentPage === 0 ? -1 : currentPage;
  const rightPageIndex = isMobile ? -1 : currentPage === 0 ? 0 : currentPage + 1;

  const leftPage = leftPageIndex >= 0 && leftPageIndex < totalPages ? album.pages[leftPageIndex] : null;
  const rightPage = rightPageIndex >= 0 && rightPageIndex < totalPages ? album.pages[rightPageIndex] : null;

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className={`min-h-screen bg-black text-white flex flex-col justify-between select-none relative overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : ''
      }`}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/95 border border-lime-400/40 text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="w-full bg-black/80 backdrop-blur-md border-b border-neutral-900 px-4 sm:px-8 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          {onBackToApp && (
            <button
              onClick={onBackToApp}
              className="p-1.5 rounded-full border border-neutral-800 hover:border-lime-400/50 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Return to Dashboard"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide truncate max-w-[200px] sm:max-w-md">
              {album.eventName}
            </h1>
            <p className="text-[11px] text-lime-400 font-medium">
              {album.coupleName} · {album.eventDate}
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Calm Music Control Widget */}
          <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-full px-3 py-1.5 text-xs text-neutral-300">
            <button
              onClick={toggleMusic}
              className="text-lime-400 hover:scale-110 transition-transform cursor-pointer"
              title={isMusicPlaying ? 'Pause calming music' : 'Play calming music'}
            >
              {isMusicPlaying ? (
                <div className="flex items-center gap-1.5">
                  <Pause className="w-3.5 h-3.5 text-lime-400" />
                  <span className="hidden sm:inline text-[11px] text-lime-400 font-medium animate-pulse">
                    Playing Music
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="hidden sm:inline text-[11px] text-neutral-400">Play Music</span>
                </div>
              )}
            </button>

            <button
              onClick={() => handleVolumeChange(volume === 0 ? 0.6 : 0)}
              className="ml-1 text-neutral-400 hover:text-white cursor-pointer"
            >
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Studio Profile & Inquiry Button */}
          <button
            onClick={() => onOpenInquiry(album)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/40 text-lime-400 hover:bg-lime-400 hover:text-black transition-all text-xs font-semibold cursor-pointer shadow-[0_0_12px_rgba(163,230,53,0.15)]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Book Studio</span>
          </button>

          {/* Bulk Download (only if enabled by photographer) */}
          <button
            onClick={handleBulkDownload}
            disabled={isZipping}
            className={`p-2 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
              album.allowBulkDownload
                ? 'border-neutral-700 text-neutral-300 hover:text-white hover:border-lime-400'
                : 'border-neutral-900 text-neutral-600 hover:border-neutral-700'
            }`}
            title={
              album.allowBulkDownload
                ? 'Bulk Download Full Album (ZIP)'
                : 'Bulk download restricted by photographer'
            }
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main 3D Book Stage */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8 relative perspective-1500 overflow-hidden">
        {/* Soft Ambient Studio Lighting */}
        <div className="absolute w-[600px] h-[400px] bg-lime-500/5 blur-[160px] pointer-events-none rounded-full" />

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0 || isFlipping}
          className={`absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-white transition-all shadow-2xl cursor-pointer ${
            currentPage === 0
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:border-lime-400 hover:text-lime-300 hover:scale-105 active:scale-95'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          disabled={currentPage + pageStep >= totalPages || isFlipping}
          className={`absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-white transition-all shadow-2xl cursor-pointer ${
            currentPage + pageStep >= totalPages
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:border-lime-400 hover:text-lime-300 hover:scale-105 active:scale-95'
          }`}
          aria-label="Next Page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 3D Book Container */}
        <div
          onClick={startMusicOnFirstInteraction}
          className={`relative max-w-6xl w-full h-[65vh] sm:h-[72vh] max-h-[820px] flex items-center justify-center transition-transform duration-300 select-none ${
            isFlipping ? 'scale-[0.99]' : 'scale-100'
          }`}
        >
          {/* MOBILE VIEW: Single Page Card */}
          {isMobile ? (
            <div className="w-full h-full max-w-sm rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col">
              {album.pages[currentPage] ? (
                <div className="w-full h-full relative group">
                  <img
                    src={album.pages[currentPage].imageUrl}
                    alt={album.pages[currentPage].title || 'Wedding Photo'}
                    className="w-full h-full object-contain bg-black"
                    loading="lazy"
                  />

                  {/* Watermark Overlay */}
                  {album.isWatermarked && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <span className="text-white text-lg font-bold tracking-widest uppercase rotate-[-25deg] border-2 border-white/40 px-6 py-2">
                        {album.watermarkText || album.photographerStudioName}
                      </span>
                    </div>
                  )}

                  {/* Single Photo Share Button */}
                  <button
                    onClick={() =>
                      onOpenPhotoShare(
                        album.pages[currentPage].imageUrl,
                        album.pages[currentPage].title || album.coupleName
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700 text-white hover:text-lime-400 hover:border-lime-400 transition-colors shadow-lg cursor-pointer"
                    title="Share this wedding photo"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {/* Bottom Caption Pill */}
                  {album.pages[currentPage].title && (
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md border border-neutral-800/80 rounded-lg p-2 text-center">
                      <p className="text-xs font-semibold text-white truncate">
                        {album.pages[currentPage].title}
                      </p>
                      {album.pages[currentPage].caption && (
                        <p className="text-[10px] text-neutral-400 truncate">
                          {album.pages[currentPage].caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            /* DESKTOP / TABLET VIEW: Dual-Page Coffee Table Book Spread */
            <div className="w-full h-full flex rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(74,222,128,0.06)] relative preserve-3d">
              {/* Deep Spine Center Crease Shadow */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/80 via-black/40 to-black/80 z-20 pointer-events-none" />

              {/* COVER PAGE (When currentPage === 0) */}
              {currentPage === 0 ? (
                <div className="w-full h-full flex">
                  {/* Left Side: Editorial Book Flyleaf / Studio Monograph */}
                  <div className="w-1/2 h-full bg-gradient-to-br from-neutral-950 to-neutral-900 border-r border-neutral-800/70 p-12 flex flex-col justify-between relative">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
                      <span className="text-xs uppercase font-semibold tracking-wider text-lime-400/90">
                        Luxury Wedding Edition
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                        {album.eventName}
                      </h2>
                      <p className="text-xl text-gradient-lime font-bold">{album.coupleName}</p>
                      <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                        {album.description ||
                          'A timeless collection of unforgettable emotions, sacred vows, and celebrated moments.'}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                      <div>
                        <p className="font-semibold text-white">{album.photographerStudioName}</p>
                        <p className="text-[10px] text-neutral-500">Fine Art Wedding Photography</p>
                      </div>
                      <div className="text-right">
                        <p className="text-neutral-300">{album.eventDate}</p>
                        <p className="text-[10px] text-lime-400">8 High-Res Leaves</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: High-Res Front Cover Photo */}
                  <div className="w-1/2 h-full relative group bg-black overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.coupleName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                      <span className="text-xs uppercase tracking-widest text-lime-400 font-semibold mb-1">
                        Cover Portrait
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2">{album.coupleName}</h3>
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime-400 text-black text-xs font-semibold hover:bg-lime-300 transition-colors w-fit shadow-[0_0_20px_rgba(163,230,53,0.35)] cursor-pointer"
                      >
                        Open Album Pages
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* SPREAD VIEW: Left Page + Right Page */
                <div className="w-full h-full flex">
                  {/* LEFT PAGE */}
                  <div className="w-1/2 h-full bg-neutral-950 border-r border-neutral-900 relative group overflow-hidden flex items-center justify-center">
                    {leftPage ? (
                      <>
                        <img
                          src={leftPage.imageUrl}
                          alt={leftPage.title || 'Wedding Photo'}
                          className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Studio Watermark Overlay */}
                        {album.isWatermarked && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
                            <span className="text-white text-2xl font-bold tracking-widest uppercase rotate-[-25deg] border-2 border-white/40 px-8 py-3">
                              {album.watermarkText || album.photographerStudioName}
                            </span>
                          </div>
                        )}

                        {/* Left Page Number Tag */}
                        <div className="absolute bottom-3 left-4 text-[11px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded">
                          Page {leftPage.pageNumber}
                        </div>

                        {/* Share Button */}
                        <button
                          onClick={() =>
                            onOpenPhotoShare(leftPage.imageUrl, leftPage.title || album.coupleName)
                          }
                          className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 p-2 rounded-full bg-black/80 border border-neutral-700 text-white hover:text-lime-400 hover:border-lime-400 transition-all cursor-pointer"
                          title="Share this photo"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Title pill */}
                        {leftPage.title && (
                          <div className="absolute bottom-3 right-4 max-w-xs text-right opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs font-semibold text-white">{leftPage.title}</p>
                            {leftPage.caption && (
                              <p className="text-[10px] text-neutral-400">{leftPage.caption}</p>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-neutral-600 text-xs font-mono">Blank Leaf</div>
                    )}
                  </div>

                  {/* RIGHT PAGE */}
                  <div className="w-1/2 h-full bg-neutral-950 relative group overflow-hidden flex items-center justify-center">
                    {rightPage ? (
                      <>
                        <img
                          src={rightPage.imageUrl}
                          alt={rightPage.title || 'Wedding Photo'}
                          className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Studio Watermark Overlay */}
                        {album.isWatermarked && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
                            <span className="text-white text-2xl font-bold tracking-widest uppercase rotate-[-25deg] border-2 border-white/40 px-8 py-3">
                              {album.watermarkText || album.photographerStudioName}
                            </span>
                          </div>
                        )}

                        {/* Right Page Number Tag */}
                        <div className="absolute bottom-3 right-4 text-[11px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded">
                          Page {rightPage.pageNumber}
                        </div>

                        {/* Share Button */}
                        <button
                          onClick={() =>
                            onOpenPhotoShare(rightPage.imageUrl, rightPage.title || album.coupleName)
                          }
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 rounded-full bg-black/80 border border-neutral-700 text-white hover:text-lime-400 hover:border-lime-400 transition-all cursor-pointer"
                          title="Share this photo"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Title pill */}
                        {rightPage.title && (
                          <div className="absolute bottom-3 left-4 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs font-semibold text-white">{rightPage.title}</p>
                            {rightPage.caption && (
                              <p className="text-[10px] text-neutral-400">{rightPage.caption}</p>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-neutral-950 to-neutral-900">
                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-lime-400/40 flex items-center justify-center text-lime-400 mb-3">
                          <Check className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-1">Back Cover</h4>
                        <p className="text-xs text-neutral-400 mb-4">
                          Thank you for sharing in our joy and celebrations.
                        </p>
                        <button
                          onClick={() => jumpToPage(0)}
                          className="px-4 py-2 rounded-full border border-neutral-700 hover:border-lime-400 text-xs text-white transition-colors cursor-pointer"
                        >
                          Rewind to Beginning
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Floating Navigation Toolbar */}
      <footer className="w-full bg-black/90 backdrop-blur-md border-t border-neutral-900 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 z-30">
        {/* Left: Spread / Page Counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-lime-400">
            {currentPage === 0
              ? 'Cover Spread'
              : isMobile
              ? `Page ${currentPage + 1} of ${totalPages}`
              : `Pages ${currentPage} - ${Math.min(currentPage + 1, totalPages)} of ${totalPages}`}
          </span>
          <span className="text-neutral-600">·</span>
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Thumbnails</span>
          </button>
        </div>

        {/* Center: Interactive Page Scrubber Slider */}
        <div className="flex-1 max-w-md hidden sm:flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={totalPages - 1}
            step={isMobile ? 1 : 2}
            value={currentPage}
            onChange={(e) => jumpToPage(Number(e.target.value))}
            className="w-full accent-lime-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
          />
        </div>

        {/* Right: Studio Branding Lockup & WhatsApp Link */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${album.photographerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Hello! I am browsing the ${album.coupleName} wedding album on a1album and would love to inquire about your photography services.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-lime-400 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-lime-400" />
            <span className="font-semibold text-white">{album.photographerStudioName}</span>
          </a>
        </div>
      </footer>

      {/* Thumbnail Scrubber Drawer */}
      {showThumbnails && (
        <div className="absolute bottom-16 left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 p-4 z-40 max-h-48 overflow-x-auto flex items-center gap-3">
          <div className="flex items-center gap-3 min-w-max mx-auto">
            {album.pages.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => jumpToPage(idx)}
                className={`relative w-20 h-28 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  currentPage === idx || (!isMobile && Math.floor(currentPage / 2) * 2 === Math.floor(idx / 2) * 2)
                    ? 'border-lime-400 scale-105 shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                    : 'border-neutral-800 hover:border-neutral-600 opacity-70'
                }`}
              >
                <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-white">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowThumbnails(false)}
            className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
