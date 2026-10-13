import React, { useState } from 'react';
import {
  Shield,
  Users,
  Coins,
  Layers,
  TrendingUp,
  Search,
  Plus,
  Minus,
  Ban,
  CheckCircle,
  KeyRound,
  ExternalLink,
  Clock,
  DollarSign,
  AlertOctagon,
  Sparkles,
} from 'lucide-react';
import { Photographer, Album, PointTransaction } from '../types';
import { POINT_PRICE_INR } from '../data/mockData';

interface AdminDashboardProps {
  photographers: Photographer[];
  albums: Album[];
  transactions: PointTransaction[];
  onAdjustPoints: (photographerId: string, amount: number, reason: string) => void;
  onToggleBlock: (photographerId: string) => void;
  onResetPassword: (photographerId: string, newPass: string) => void;
  onViewAlbum: (album: Album) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  photographers,
  albums,
  transactions,
  onAdjustPoints,
  onToggleBlock,
  onResetPassword,
  onViewAlbum,
}) => {
  const [activeTab, setActiveTab] = useState<'studios' | 'albums' | 'transactions'>('studios');
  const [searchQuery, setSearchQuery] = useState('');

  // Point Adjustment Modal State
  const [pointModalPhotographer, setPointModalPhotographer] = useState<Photographer | null>(null);
  const [pointAdjustmentAmount, setPointAdjustmentAmount] = useState<number>(10);
  const [isDeductMode, setIsDeductMode] = useState<boolean>(false);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('Admin Manual Credit');

  // Password Reset Modal State
  const [passwordModalPhotographer, setPasswordModalPhotographer] = useState<Photographer | null>(null);
  const [newPassword, setNewPassword] = useState<string>('Pass2026!');
  const [passwordNotice, setPasswordNotice] = useState<string | null>(null);

  // Filtered lists
  const filteredPhotographers = photographers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studioName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
  );

  // Platform KPIs
  const totalPointsInCirculation = photographers.reduce((sum, p) => sum + p.points, 0);
  const totalAlbumsCount = albums.length;
  const totalViewsCount = albums.reduce((sum, a) => sum + a.viewsCount, 0);
  const estimatedRevenueInr = transactions
    .filter((t) => t.type === 'purchase' && t.pricePaidInr)
    .reduce((sum, t) => sum + (t.pricePaidInr || 0), 0);

  const handleApplyPointAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pointModalPhotographer) return;
    const finalAmount = isDeductMode ? -Math.abs(pointAdjustmentAmount) : Math.abs(pointAdjustmentAmount);
    onAdjustPoints(pointModalPhotographer.id, finalAmount, adjustmentReason);
    setPointModalPhotographer(null);
  };

  const handleApplyPasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordModalPhotographer) return;
    onResetPassword(passwordModalPhotographer.id, newPassword);
    setPasswordNotice(`Password for ${passwordModalPhotographer.name} successfully updated!`);
    setTimeout(() => {
      setPasswordNotice(null);
      setPasswordModalPhotographer(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header Banner */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-lime-950/60 border border-lime-400/40 text-lime-400 flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.25)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Owner & Admin Master Console</h1>
                <span className="text-[10px] bg-lime-400 text-black font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Superadmin
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Full authority: point economy (₹{POINT_PRICE_INR}/pt), photographer suspension, audit trails & live metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time Metrics & Performance KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Total Studios</span>
              <Users className="w-4 h-4 text-lime-400" />
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">{photographers.length}</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              {photographers.filter((p) => !p.isBlocked).length} Active ·{' '}
              {photographers.filter((p) => p.isBlocked).length} Suspended
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Active Wedding Albums</span>
              <Layers className="w-4 h-4 text-lime-400" />
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">{totalAlbumsCount}</p>
            <p className="text-[11px] text-lime-400 mt-1">{totalViewsCount} Total Client Book Views</p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Points in Circulation</span>
              <Coins className="w-4 h-4 text-lime-400" />
            </div>
            <p className="text-3xl font-extrabold text-lime-400 font-mono">{totalPointsInCirculation}</p>
            <p className="text-[11px] text-neutral-500 mt-1">
              ₹{(totalPointsInCirculation * POINT_PRICE_INR).toLocaleString('en-IN')} Current Liability
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Gateway Revenue (Razorpay)</span>
              <DollarSign className="w-4 h-4 text-lime-400" />
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">
              ₹{estimatedRevenueInr.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-neutral-500 mt-1">Direct Top-up Volume</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('studios')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'studios'
                  ? 'bg-lime-400 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Photographer Studios ({photographers.length})
            </button>
            <button
              onClick={() => setActiveTab('albums')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'albums'
                  ? 'bg-lime-400 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              All Published Albums ({albums.length})
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'transactions'
                  ? 'bg-lime-400 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Audit Ledger & Activity Logs ({transactions.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search studio, photographer, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:border-lime-400 focus:outline-none w-64"
            />
          </div>
        </div>

        {/* TAB 1: PHOTOGRAPHER STUDIOS MANAGEMENT */}
        {activeTab === 'studios' && (
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/80 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="px-6 py-3.5">Photographer & Studio</th>
                    <th className="px-4 py-3.5">Contact</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Albums Created</th>
                    <th className="px-4 py-3.5">Point Balance</th>
                    <th className="px-6 py-3.5 text-right">Admin Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-200">
                  {filteredPhotographers.map((photo) => (
                    <tr key={photo.id} className="hover:bg-neutral-900/50 transition-colors">
                      {/* Name & Studio */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center font-bold text-lime-400">
                            {photo.studioName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{photo.studioName}</p>
                            <p className="text-[11px] text-neutral-400">{photo.name}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-4 font-mono text-neutral-400">
                        <p>{photo.phone}</p>
                        <p className="text-[10px] text-neutral-500">{photo.email}</p>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        {photo.isBlocked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-950/60 text-red-400 border border-red-500/40">
                            <Ban className="w-3 h-3" />
                            Blocked / Suspended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
                            <CheckCircle className="w-3 h-3" />
                            Active Studio
                          </span>
                        )}
                      </td>

                      {/* Albums */}
                      <td className="px-4 py-4 font-mono">
                        <span className="text-white font-semibold">{photo.totalAlbumsCreated}</span> Albums
                      </td>

                      {/* Point Balance */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 font-mono">
                          <Coins className="w-3.5 h-3.5 text-lime-400" />
                          <span
                            className={`font-bold text-sm ${
                              photo.points < 20 ? 'text-amber-400' : 'text-white'
                            }`}
                          >
                            {photo.points}
                          </span>
                          <span className="text-[10px] text-neutral-500">Pts</span>
                        </div>
                      </td>

                      {/* Admin Controls */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Modify Points Button */}
                          <button
                            onClick={() => {
                              setPointModalPhotographer(photo);
                              setIsDeductMode(false);
                              setPointAdjustmentAmount(10);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-lime-400/60 text-lime-400 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Add or Deduct Points"
                          >
                            <Coins className="w-3 h-3" />
                            <span>Adjust Pts</span>
                          </button>

                          {/* Reset Password Button */}
                          <button
                            onClick={() => setPasswordModalPhotographer(photo)}
                            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                            title="Reset Password"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          {/* Block / Unblock Toggle */}
                          <button
                            onClick={() => onToggleBlock(photo.id)}
                            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                              photo.isBlocked
                                ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900'
                                : 'bg-red-950/50 border-red-500/50 text-red-300 hover:bg-red-900'
                            }`}
                            title={photo.isBlocked ? 'Unblock Photographer' : 'Block Photographer'}
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ALL PUBLISHED ALBUMS INSPECTION */}
        {activeTab === 'albums' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 relative bg-neutral-900">
                    <img src={album.coverImage} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-4 flex flex-col justify-end">
                      <p className="text-[10px] text-lime-400 uppercase font-semibold">{album.eventName}</p>
                      <h4 className="text-base font-bold text-white">{album.coupleName}</h4>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 text-xs text-neutral-400">
                    <p className="text-white font-medium">Studio: {album.photographerStudioName}</p>
                    <p>Client Mobile: {album.clientPhone}</p>
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-neutral-900 font-mono">
                      <span>{album.pages.length} Pages</span>
                      <span className="text-lime-400">{album.viewsCount} Views</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => onViewAlbum(album)}
                    className="w-full py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Audit / Preview 3D Flipbook</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: AUDIT LEDGER */}
        {activeTab === 'transactions' && (
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Platform Transaction & Activity Log</h3>
            <div className="divide-y divide-neutral-900 text-xs">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">{tx.description}</p>
                    <p className="text-[10px] text-neutral-500 font-mono">
                      Ref: {tx.referenceId || tx.id} · {tx.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-mono font-bold text-sm ${
                        tx.amount > 0 ? 'text-lime-400' : 'text-red-400'
                      }`}
                    >
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount} Points
                    </span>
                    {tx.pricePaidInr && (
                      <p className="text-[10px] text-neutral-400">₹{tx.pricePaidInr.toLocaleString('en-IN')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* POINT ADJUSTMENT MODAL */}
        {pointModalPhotographer && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Adjust Studio Points</h3>
                  <p className="text-xs text-neutral-400">{pointModalPhotographer.studioName}</p>
                </div>
                <button
                  onClick={() => setPointModalPhotographer(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleApplyPointAdjustment} className="space-y-4">
                <div className="grid grid-cols-2 p-1 bg-neutral-900 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setIsDeductMode(false)}
                    className={`py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      !isDeductMode ? 'bg-lime-400 text-black' : 'text-neutral-400'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Credit Points</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeductMode(true)}
                    className={`py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      isDeductMode ? 'bg-red-500 text-white' : 'text-neutral-400'
                    }`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                    <span>Deduct Points</span>
                  </button>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 mb-1 block">Number of Points</label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    required
                    value={pointAdjustmentAmount}
                    onChange={(e) => setPointAdjustmentAmount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono text-sm focus:border-lime-400 focus:outline-none"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">
                    Current Wallet: {pointModalPhotographer.points} Pts → New:{' '}
                    {isDeductMode
                      ? pointModalPhotographer.points - pointAdjustmentAmount
                      : pointModalPhotographer.points + pointAdjustmentAmount}{' '}
                    Pts
                  </p>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 mb-1 block">Reason for Audit Log</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bank transfer credit / Promotional bonus / Correction"
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs transition-colors shadow-lg cursor-pointer"
                >
                  Confirm & Update Points Ledger
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PASSWORD RESET MODAL */}
        {passwordModalPhotographer && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Reset Photographer Password</h3>
                  <p className="text-xs text-neutral-400">{passwordModalPhotographer.name}</p>
                </div>
                <button
                  onClick={() => setPasswordModalPhotographer(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {passwordNotice ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl text-center">
                  {passwordNotice}
                </div>
              ) : (
                <form onSubmit={handleApplyPasswordReset} className="space-y-4">
                  <div>
                    <label className="text-[11px] text-neutral-400 mb-1 block">New Temporary Password</label>
                    <input
                      type="text"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white font-mono focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs transition-colors cursor-pointer"
                  >
                    Set New Password
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
