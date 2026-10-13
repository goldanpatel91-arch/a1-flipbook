import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, Share2, Download, ExternalLink } from 'lucide-react';

interface PhotoShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  title?: string;
}

export const PhotoShareModal: React.FC<PhotoShareModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  title = 'Wedding Memory',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `Check out this gorgeous photo from the wedding album: ${title}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n${photoUrl}`
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(photoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: photoUrl,
        });
      } catch {
        // Dismissed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(74,222,128,0.15)] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-lime-400" />
            <span className="text-sm font-semibold text-white">Share Wedding Photo</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Photo Preview Thumbnail */}
          <div className="w-full h-44 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 relative group">
            <img src={photoUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-3">
              <span className="text-xs font-medium text-white truncate">{title}</span>
            </div>
          </div>

          {/* WhatsApp Direct Share Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share directly on WhatsApp</span>
          </a>

          {/* Native Web Share (if supported) */}
          {'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-lime-400" />
              <span>More Sharing Apps</span>
            </button>
          )}

          {/* Copy Direct Link */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={photoUrl}
              className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 font-mono truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-lg bg-lime-400 hover:bg-lime-300 text-black text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
