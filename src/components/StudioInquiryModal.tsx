import React, { useState } from 'react';
import { X, MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, Globe, Instagram, Sparkles } from 'lucide-react';
import { Album, Photographer, BookingInquiry } from '../types';

interface StudioInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: Album;
  photographer: Photographer | null;
  onSubmitInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt'>) => void;
}

export const StudioInquiryModal: React.FC<StudioInquiryModalProps> = ({
  isOpen,
  onClose,
  album,
  photographer,
  onSubmitInquiry,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const studioPhone = photographer?.phone || album.photographerPhone;
  const studioName = photographer?.studioName || album.photographerStudioName;
  const whatsappUrl = `https://wa.me/${studioPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${studioName}! I was admiring the ${album.coupleName} wedding album on a1album and would love to discuss dates and packages for my upcoming event.`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    onSubmitInquiry({
      photographerId: album.photographerId,
      albumId: album.id,
      albumTitle: album.eventName,
      clientName,
      clientPhone,
      clientEmail,
      eventDate,
      message: message || `Booking inquiry for ${eventDate || 'upcoming wedding'}.`,
      status: 'new',
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(74,222,128,0.15)] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-neutral-900/90 p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-lime-400/40 flex items-center justify-center text-lime-400 font-bold text-sm shadow-[0_0_12px_rgba(163,230,53,0.2)]">
              {studioName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{studioName}</h3>
              <p className="text-xs text-lime-400">Wedding & Event Photographer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-lime-950/60 border border-lime-400/50 text-lime-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Inquiry Sent Successfully!</h4>
            <p className="text-xs text-neutral-300">
              {studioName} has received your details and will get in touch with you shortly.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Studio Info Card */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-3">
              <p className="text-xs text-neutral-300 leading-relaxed">
                {photographer?.bio ||
                  'Specializing in cinematic luxury weddings, fine art couple portraits, and timeless digital flipbook presentations.'}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-lime-400" />
                  <span>{studioPhone}</span>
                </div>
                {photographer?.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-lime-400" />
                    <span className="truncate">{photographer.address}</span>
                  </div>
                )}
                {photographer?.instagram && (
                  <div className="flex items-center gap-2">
                    <Instagram className="w-3.5 h-3.5 text-lime-400" />
                    <span>{photographer.instagram}</span>
                  </div>
                )}
                {photographer?.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-lime-400" />
                    <span className="truncate">Website</span>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>

            {/* Quick Booking Inquiry Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                <span>Request Booking Quote / Dates</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile / WhatsApp *"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  placeholder="Event Date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 focus:border-lime-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Message / Wedding City (e.g. Udaipur 3-Day Wedding)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(163,230,53,0.25)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Studio</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
