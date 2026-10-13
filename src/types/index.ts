export type UserRole = 'admin' | 'photographer' | 'client';

export interface Photographer {
  id: string;
  name: string;
  studioName: string;
  email: string;
  phone: string;
  avatar: string;
  points: number;
  isBlocked: boolean;
  createdAt: string;
  totalAlbumsCreated: number;
  studioLogo?: string;
  address?: string;
  bio?: string;
  instagram?: string;
  website?: string;
}

export interface AlbumPage {
  id: string;
  pageNumber: number;
  imageUrl: string;
  thumbnailUrl?: string;
  title?: string;
  caption?: string;
  spreadType?: 'single' | 'left' | 'right';
  originalSizeKb?: number;
  compressedSizeKb?: number;
}

export interface Album {
  id: string;
  shareCode: string;
  photographerId: string;
  photographerStudioName: string;
  photographerPhone: string;
  eventName: string;
  coupleName: string;
  clientPhone: string;
  clientEmail?: string;
  eventDate: string;
  coverImage: string;
  pages: AlbumPage[];
  musicTrack: string;
  customMusicUrl?: string;
  allowBulkDownload: boolean;
  isPasswordProtected: boolean;
  password?: string;
  expiryDate?: string;
  isWatermarked: boolean;
  watermarkText?: string;
  viewsCount: number;
  lastViewedAt?: string;
  createdAt: string;
  description?: string;
}

export interface BookingInquiry {
  id: string;
  photographerId: string;
  albumId?: string;
  albumTitle?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  eventDate?: string;
  message: string;
  status: 'new' | 'contacted' | 'booked';
  createdAt: string;
}

export interface PointTransaction {
  id: string;
  photographerId: string;
  photographerName?: string;
  amount: number;
  type: 'deduct_album' | 'purchase' | 'admin_adjust';
  description: string;
  date: string;
  referenceId?: string;
  pricePaidInr?: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  genre: string;
  artist: string;
  duration: string;
  description: string;
  notes: number[];
}
