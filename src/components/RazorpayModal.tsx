import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Building2, CheckCircle, Sparkles } from 'lucide-react';
import { RECHARGE_PACKS, POINT_PRICE_INR } from '../data/mockData';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (points: number, amountPaid: number, referenceId: string) => void;
  currentPoints: number;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentPoints,
}) => {
  const [selectedPackId, setSelectedPackId] = useState<string>('pack_pro');
  const [customPoints, setCustomPoints] = useState<number>(10);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedPack = RECHARGE_PACKS.find((p) => p.id === selectedPackId);
  const pointsToCredit = isCustom ? customPoints : selectedPack ? selectedPack.points : 10;
  const amountToPay = isCustom
    ? customPoints * POINT_PRICE_INR
    : selectedPack
    ? selectedPack.priceInr
    : 890;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      const refId = 'pay_rzp_' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setTimeout(() => {
        onSuccess(pointsToCredit, amountToPay, refId);
        setIsPaid(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(74,222,128,0.15)] animate-in fade-in zoom-in-95 duration-200">
        {/* Razorpay Top Banner */}
        <div className="bg-gradient-to-r from-blue-900/60 via-neutral-900 to-lime-950/60 p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-wide">Razorpay Secured</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[10px] text-neutral-400">a1album Official Billing Gateway · 1 Point = ₹{POINT_PRICE_INR}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isPaid ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-lime-950/60 border border-lime-400/40 text-lime-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Payment Successful!</h3>
            <p className="text-sm text-neutral-300">
              ₹{amountToPay.toLocaleString('en-IN')} received. Added{' '}
              <span className="text-lime-400 font-bold">+{pointsToCredit} Points</span> to your studio wallet.
            </p>
            <p className="text-xs text-neutral-500 font-mono">Updating your wallet balance in real-time...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Wallet Summary */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Current Balance</p>
                <p className="text-lg font-bold text-white">
                  {currentPoints} <span className="text-xs text-neutral-400 font-normal">Points</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-400">New Balance after top-up</p>
                <p className="text-lg font-bold text-lime-400">
                  {currentPoints + pointsToCredit} <span className="text-xs text-neutral-400 font-normal">Points</span>
                </p>
              </div>
            </div>

            {/* Select Point Packages */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                <span>Select Recharge Pack</span>
                <span className="text-lime-400">1 Album = 10 Points = ₹890</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {RECHARGE_PACKS.map((pack) => {
                  const isSelected = !isCustom && selectedPackId === pack.id;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => {
                        setIsCustom(false);
                        setSelectedPackId(pack.id);
                      }}
                      className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-neutral-900 border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.25)]'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2 right-2 bg-gradient-lime text-black font-extrabold text-[9px] px-1.5 py-0.2 rounded-full">
                          POPULAR
                        </span>
                      )}
                      <div>
                        <p className="text-xs font-bold text-white">{pack.points} Pts</p>
                        <p className="text-[10px] text-neutral-400">
                          {pack.albumsCount} {pack.albumsCount === 1 ? 'Album' : 'Albums'}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-neutral-800/80">
                        <p className="text-xs font-bold text-lime-400">₹{pack.priceInr}</p>
                        <p className="text-[9px] text-neutral-400 truncate">{pack.savingsText}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-neutral-300">Payment Mode</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
                    paymentMethod === 'upi'
                      ? 'bg-neutral-900 border-lime-400 text-lime-300'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-neutral-900 border-lime-400 text-lime-300'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
                    paymentMethod === 'netbanking'
                      ? 'bg-neutral-900 border-lime-400 text-lime-300'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* UPI QR Simulation Box */}
            {paymentMethod === 'upi' && (
              <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3 flex items-center gap-4">
                <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                  <div className="w-full h-full border-2 border-black border-dashed flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-black" />
                  </div>
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Scan with any UPI App</p>
                  <p className="text-[11px] text-neutral-400">GPay, PhonePe, Paytm or BHIM UPI</p>
                  <p className="text-[10px] text-lime-400 font-mono mt-0.5">UPI ID: a1album@razorpay</p>
                </div>
              </div>
            )}

            {/* Checkout CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(163,230,53,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing via Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Pay ₹{amountToPay.toLocaleString('en-IN')} & Add {pointsToCredit} Points</span>
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-neutral-500 mt-2">
                Guaranteed instant point delivery · 256-bit SSL encrypted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
