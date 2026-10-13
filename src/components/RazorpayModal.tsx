import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Building2, CheckCircle, Sparkles } from 'lucide-react';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (points: number, amountPaid: number, referenceId: string, rateApplied: number) => void;
  currentPoints: number;
  pricePerPointInr: number;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentPoints,
  pricePerPointInr,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(10);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);

  if (!isOpen) return null;

  const pointsToBuy = isCustom ? Math.max(1, customInput) : selectedQuantity;
  const totalAmountInr = pointsToBuy * pricePerPointInr;

  const quickPacks = [1, 5, 10, 25, 50];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      const refId = 'pay_rzp_' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setTimeout(() => {
        onSuccess(pointsToBuy, totalAmountInr, refId, pricePerPointInr);
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
              <p className="text-[10px] text-neutral-400">
                Official Studio Wallet Recharge · ₹{pricePerPointInr} per point
              </p>
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
            <h3 className="text-xl font-bold text-white">Payment Received!</h3>
            <p className="text-sm text-neutral-300">
              ₹{totalAmountInr.toLocaleString('en-IN')} paid successfully. Added{' '}
              <span className="text-lime-400 font-bold">+{pointsToBuy} Points</span> to your studio account.
            </p>
            <p className="text-xs text-neutral-500 font-mono">Receipt logged to transaction history.</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Wallet Status */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-neutral-400">Current Balance</p>
                <p className="text-lg font-bold text-white">
                  {currentPoints} <span className="text-xs text-neutral-400 font-normal">Points</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-neutral-400">New Balance after recharge</p>
                <p className="text-lg font-bold text-lime-400">
                  {currentPoints + pointsToBuy} <span className="text-xs text-neutral-400 font-normal">Points</span>
                </p>
              </div>
            </div>

            {/* Quick Points Quantity Selector (Min 1 point!) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                <span>Select Points Quantity (Minimum 1 Point)</span>
                <span className="text-lime-400">Rate: ₹{pricePerPointInr} / pt</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {quickPacks.map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => {
                      setIsCustom(false);
                      setSelectedQuantity(qty);
                    }}
                    className={`py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      !isCustom && selectedQuantity === qty
                        ? 'bg-neutral-900 border-lime-400 text-lime-300 font-bold shadow-[0_0_12px_rgba(163,230,53,0.25)]'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <p className="text-sm">{qty}</p>
                    <p className="text-[9px] opacity-75">Pts</p>
                  </button>
                ))}
              </div>

              {/* Custom Quantity Input */}
              <div className="pt-2 flex items-center gap-3">
                <label className="text-xs text-neutral-400 whitespace-nowrap">Or Custom Points:</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={isCustom ? customInput : ''}
                  placeholder="e.g. 15"
                  onFocus={() => setIsCustom(true)}
                  onChange={(e) => {
                    setIsCustom(true);
                    setCustomInput(Math.max(1, parseInt(e.target.value) || 1));
                  }}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-lime-400 text-white text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Price Summary Calculation */}
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400">Total Payable Amount</p>
                <p className="text-[10px] text-neutral-500">
                  {pointsToBuy} Points × ₹{pricePerPointInr}
                </p>
              </div>
              <p className="text-2xl font-extrabold text-white font-mono">
                ₹{totalAmountInr.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-neutral-300">Payment Method</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
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
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
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
                  className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
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

            {paymentMethod === 'upi' && (
              <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3 flex items-center gap-4">
                <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                  <QrCode className="w-12 h-12 text-black" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Scan with GPay, PhonePe, Paytm</p>
                  <p className="text-[10px] text-lime-400 font-mono mt-0.5">UPI ID: a1album@razorpay</p>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <div>
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(163,230,53,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing via Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Pay ₹{totalAmountInr.toLocaleString('en-IN')} & Recharge {pointsToBuy} Points</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
