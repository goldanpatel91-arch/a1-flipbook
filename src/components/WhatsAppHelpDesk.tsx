import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppHelpDesk: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/917970641503?text=Namaste%20Goldan%20ji,%20mujhe%20a1album%20ke%20bare%20mein%20sahayata%20chahiye.';

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-all shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
        title="Chat with Goldan Patel on WhatsApp (+91 7970641503)"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">Help Desk</span>
      </a>
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-neutral-900 border border-neutral-700 text-neutral-300 text-[11px] p-2 rounded-xl whitespace-nowrap shadow-xl">
        <p className="font-bold text-white">Goldan Patel · Nepolian Cinematic Studio</p>
        <p className="text-[10px] text-emerald-400">WhatsApp: +91 7970641503</p>
      </div>
    </div>
  );
};
