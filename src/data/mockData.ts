import {
  Photographer,
  Album,
  BookingInquiry,
  PointTransaction,
  PointSettings,
  RateChangeLog,
} from '../types';

export const DEFAULT_POINT_SETTINGS: PointSettings = {
  pricePerPointInr: 89,
  pointsPerAlbum: 10,
  renewalPointsPerAlbum: 1,
  updatedAt: '2026-10-01 10:00',
  updatedBy: 'Goldan Patel (Superadmin)',
};

export const LOW_BALANCE_THRESHOLD = 20;

// Generate unguessable 14+ character album ID
export const generateUnguessableId = (): string => {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = 'a1-';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Calculate Days Remaining
export const getDaysRemaining = (expiresAt: string): number => {
  const diffTime = new Date(expiresAt).getTime() - Date.now();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Format Date as "24 Nov 2026"
export const formatDisplayDate = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

// Sample Curated High-Resolution Wedding Photography Spreads
const WEDDING_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85',
];

export const INITIAL_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'photo_1',
    name: 'Rajesh Sharma',
    studioName: 'Royal Heritage Wedding Films',
    email: 'rajesh@royalheritage.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    points: 45,
    isBlocked: false,
    createdAt: '2026-08-15',
    totalAlbumsCreated: 8,
    studioLogo: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=200&q=80',
    address: 'Udaipur & Mumbai, India',
    bio: 'Destination wedding photographers specializing in cinematic royal weddings, palace ceremonies and timeless fine-art albums.',
    instagram: '@royalheritageweddings',
    website: 'https://royalheritageweddings.in',
  },
  {
    id: 'photo_2',
    name: 'Ananya & Vikram',
    studioName: 'Lumina Stories Photography',
    email: 'ananya@luminastories.com',
    phone: '+91 98234 56789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    points: 8, // triggers low balance warning (<20)
    isBlocked: false,
    createdAt: '2026-09-01',
    totalAlbumsCreated: 4,
    address: 'Bengaluru, India',
    bio: 'Contemporary candid wedding photography capturing raw moments, emotions and laughter.',
    instagram: '@luminastories',
  },
  {
    id: 'photo_3',
    name: 'Karan Mehra',
    studioName: 'ShutterCraft Weddings',
    email: 'karan@shuttercraft.com',
    phone: '+91 97111 22334',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    points: 0,
    isBlocked: true, // sample blocked studio to test administrative hold
    createdAt: '2026-07-10',
    totalAlbumsCreated: 2,
    address: 'Delhi NCR, India',
    bio: 'Editorial style weddings and luxury pre-wedding shoots across North India.',
  },
];

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'alb_royal_udaipur',
    shareCode: 'a1-k9X2mQ8vL4wZ', // unguessable 14-char code
    photographerId: 'photo_1',
    photographerStudioName: 'Royal Heritage Wedding Films',
    photographerPhone: '+91 98765 43210',
    eventName: 'The Grand Royal Wedding',
    coupleName: 'Aarav & Meera',
    clientPhone: '+91 98111 88990',
    clientEmail: 'meera.aarav@gmail.com',
    eventDate: '2026-11-24',
    coverImage: WEDDING_IMAGES[0],
    musicTrack: 'velvet-piano',
    allowBulkDownload: true,
    isPasswordProtected: false,
    isWatermarked: true,
    watermarkText: 'Royal Heritage Films',
    viewsCount: 342,
    lastViewedAt: '12 mins ago',
    createdAt: '2026-10-02',
    expiresAt: '2027-10-02T00:00:00Z', // 365 days
    gracePeriodEndsAt: '2027-11-01T00:00:00Z', // +30 days grace
    description: 'A magnificent three-day royal celebration at Jagmandir Island Palace, Udaipur.',
    pages: [
      {
        id: 'pg_1',
        pageNumber: 1,
        imageUrl: WEDDING_IMAGES[0],
        title: 'The Royal Union',
        caption: 'Aarav & Meera · Jagmandir Island Palace',
        spreadType: 'single',
      },
      {
        id: 'pg_2',
        pageNumber: 2,
        imageUrl: WEDDING_IMAGES[1],
        title: 'The Haldi Ritual',
        caption: 'Golden turmeric ceremonies filled with laughter and blessings',
        spreadType: 'left',
      },
      {
        id: 'pg_3',
        pageNumber: 3,
        imageUrl: WEDDING_IMAGES[2],
        title: 'Mehendi & Sangeet',
        caption: 'Intricate henna motifs and vibrant dance performances under starlight',
        spreadType: 'right',
      },
      {
        id: 'pg_4',
        pageNumber: 4,
        imageUrl: WEDDING_IMAGES[3],
        title: 'The Royal Baraat',
        caption: 'The groom arriving along Lake Pichola with traditional royal band',
        spreadType: 'left',
      },
      {
        id: 'pg_5',
        pageNumber: 5,
        imageUrl: WEDDING_IMAGES[4],
        title: 'The Sacred Vows (Saat Phere)',
        caption: 'Seven sacred steps around the holy agni solemnizing eternal devotion',
        spreadType: 'right',
      },
      {
        id: 'pg_6',
        pageNumber: 6,
        imageUrl: WEDDING_IMAGES[5],
        title: 'Jaimala Garland Exchange',
        caption: 'Shower of fragrant rose petals celebrating their garland exchange',
        spreadType: 'left',
      },
      {
        id: 'pg_7',
        pageNumber: 7,
        imageUrl: WEDDING_IMAGES[6],
        title: 'Starlight Reception',
        caption: 'Evening gala banquet with family toasts, cakes and royal fireworks',
        spreadType: 'right',
      },
      {
        id: 'pg_8',
        pageNumber: 8,
        imageUrl: WEDDING_IMAGES[7],
        title: 'Forever & Always',
        caption: 'Hand in hand into their new dawn · Captured by Royal Heritage Films',
        spreadType: 'single',
      },
    ],
  },
  {
    id: 'alb_candid_goa',
    shareCode: 'a1-m4N7pT2xY8wQ', // unguessable
    photographerId: 'photo_2',
    photographerStudioName: 'Lumina Stories Photography',
    photographerPhone: '+91 98234 56789',
    eventName: 'Sun-Kissed Sunset Nuptials',
    coupleName: 'Rohan & Sanjana',
    clientPhone: '+91 98990 11223',
    eventDate: '2026-10-18',
    coverImage: WEDDING_IMAGES[4],
    musicTrack: 'acoustic-sunset',
    allowBulkDownload: false, // default OFF
    isPasswordProtected: true,
    password: '2026',
    isWatermarked: false,
    viewsCount: 128,
    lastViewedAt: '2 hours ago',
    createdAt: '2026-10-08',
    expiresAt: '2026-11-05T00:00:00Z', // Expiring in 23 days (triggers 30-day warning!)
    gracePeriodEndsAt: '2026-12-05T00:00:00Z',
    description: 'An intimate coastal wedding on the sands of South Goa surrounded by gentle ocean breeze.',
    pages: [
      {
        id: 'pg_201',
        pageNumber: 1,
        imageUrl: WEDDING_IMAGES[4],
        title: 'Sunset by the Sea',
        caption: 'Rohan & Sanjana · South Goa Coast',
        spreadType: 'single',
      },
      {
        id: 'pg_202',
        pageNumber: 2,
        imageUrl: WEDDING_IMAGES[5],
        title: 'Vows at Golden Hour',
        caption: 'Promise of endless adventures together',
        spreadType: 'left',
      },
      {
        id: 'pg_203',
        pageNumber: 3,
        imageUrl: WEDDING_IMAGES[6],
        title: 'Barefoot Dance Floor',
        caption: 'Warm fairy lights, acoustic guitar and ocean tides',
        spreadType: 'right',
      },
      {
        id: 'pg_204',
        pageNumber: 4,
        imageUrl: WEDDING_IMAGES[7],
        title: 'To a Lifetime of Joy',
        caption: 'Lumina Stories Photography',
        spreadType: 'single',
      },
    ],
  },
  {
    id: 'alb_expired_sample',
    shareCode: 'a1-x2Z9wK5vB3mP',
    photographerId: 'photo_1',
    photographerStudioName: 'Royal Heritage Wedding Films',
    photographerPhone: '+91 98765 43210',
    eventName: 'Heritage Haveli Nuptials (Expired)',
    coupleName: 'Kabir & Rhea',
    clientPhone: '+91 99887 66554',
    eventDate: '2025-09-12',
    coverImage: WEDDING_IMAGES[3],
    musicTrack: 'ethereal-strings',
    allowBulkDownload: false,
    isPasswordProtected: false,
    isWatermarked: true,
    watermarkText: 'Royal Heritage Films',
    viewsCount: 88,
    lastViewedAt: '1 month ago',
    createdAt: '2025-10-01',
    expiresAt: '2026-10-01T00:00:00Z', // Expired 12 days ago, in 30-day grace period
    gracePeriodEndsAt: '2026-11-01T00:00:00Z',
    pages: [
      {
        id: 'pg_301',
        pageNumber: 1,
        imageUrl: WEDDING_IMAGES[3],
        title: 'Haveli Celebration',
        caption: 'Old Delhi Heritage Ceremony',
        spreadType: 'single',
      },
    ],
  },
];

export const INITIAL_INQUIRIES: BookingInquiry[] = [
  {
    id: 'inq_1',
    photographerId: 'photo_1',
    albumId: 'alb_royal_udaipur',
    albumTitle: 'The Grand Royal Wedding (Aarav & Meera)',
    clientName: 'Pooja Singhania',
    clientPhone: '+91 98333 44556',
    clientEmail: 'pooja.s@gmail.com',
    eventDate: '2027-02-14',
    message: 'We loved Meera & Aarav\'s album so much! We are planning a Jaipur palace wedding next February and would love to check your team\'s availability and packages.',
    status: 'new',
    createdAt: '2026-10-10 14:30',
  },
  {
    id: 'inq_2',
    photographerId: 'photo_1',
    albumId: 'alb_royal_udaipur',
    albumTitle: 'The Grand Royal Wedding (Aarav & Meera)',
    clientName: 'Dev Patel',
    clientPhone: '+91 99222 11009',
    message: 'Can you please share your pre-wedding shoot pricing details? Saw your 3D flipbook work and the quality is unmatched.',
    status: 'contacted',
    createdAt: '2026-10-08 19:15',
  },
];

export const INITIAL_TRANSACTIONS: PointTransaction[] = [
  {
    id: 'tx_1',
    photographerId: 'photo_1',
    photographerName: 'Royal Heritage Wedding Films',
    amount: 30,
    type: 'purchase',
    pricePaidInr: 2670,
    rateAppliedInr: 89,
    referenceId: 'pay_rzp_8829104',
    description: 'Purchased 30 Points via Razorpay',
    date: '2026-10-01 11:20',
  },
  {
    id: 'tx_2',
    photographerId: 'photo_1',
    photographerName: 'Royal Heritage Wedding Films',
    amount: -10,
    type: 'deduct_album',
    description: 'Published 3D Album: The Grand Royal Wedding (Aarav & Meera)',
    date: '2026-10-02 16:45',
  },
  {
    id: 'tx_3',
    photographerId: 'photo_2',
    photographerName: 'Lumina Stories Photography',
    amount: 10,
    type: 'admin_adjust',
    description: 'Admin Bonus Credit: Welcome Promotion',
    date: '2026-09-01 10:00',
  },
];

export const INITIAL_RATE_LOGS: RateChangeLog[] = [
  {
    id: 'log_1',
    date: '2026-10-01 10:00',
    oldRate: 79,
    newRate: 89,
    oldPointsPerAlbum: 10,
    newPointsPerAlbum: 10,
    changedBy: 'Goldan Patel (Superadmin)',
    reason: 'Annual tier adjustment & HD infrastructure upgrade',
  },
];

// Storage Keys
const STORAGE_KEY_PHOTOGRAPHERS = 'a1album_photographers_v2';
const STORAGE_KEY_ALBUMS = 'a1album_albums_v2';
const STORAGE_KEY_INQUIRIES = 'a1album_inquiries_v2';
const STORAGE_KEY_TRANSACTIONS = 'a1album_transactions_v2';
const STORAGE_KEY_SETTINGS = 'a1album_point_settings_v2';
const STORAGE_KEY_RATE_LOGS = 'a1album_rate_logs_v2';

export const loadStoredPhotographers = (): Photographer[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PHOTOGRAPHERS);
    return raw ? JSON.parse(raw) : INITIAL_PHOTOGRAPHERS;
  } catch {
    return INITIAL_PHOTOGRAPHERS;
  }
};

export const saveStoredPhotographers = (data: Photographer[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_PHOTOGRAPHERS, JSON.stringify(data));
  } catch {}
};

export const loadStoredAlbums = (): Album[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ALBUMS);
    return raw ? JSON.parse(raw) : INITIAL_ALBUMS;
  } catch {
    return INITIAL_ALBUMS;
  }
};

export const saveStoredAlbums = (data: Album[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_ALBUMS, JSON.stringify(data));
  } catch {}
};

export const loadStoredInquiries = (): BookingInquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    return raw ? JSON.parse(raw) : INITIAL_INQUIRIES;
  } catch {
    return INITIAL_INQUIRIES;
  }
};

export const saveStoredInquiries = (data: BookingInquiry[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(data));
  } catch {}
};

export const loadStoredTransactions = (): PointTransaction[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    return raw ? JSON.parse(raw) : INITIAL_TRANSACTIONS;
  } catch {
    return INITIAL_TRANSACTIONS;
  }
};

export const saveStoredTransactions = (data: PointTransaction[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(data));
  } catch {}
};

export const loadStoredSettings = (): PointSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    return raw ? JSON.parse(raw) : DEFAULT_POINT_SETTINGS;
  } catch {
    return DEFAULT_POINT_SETTINGS;
  }
};

export const saveStoredSettings = (data: PointSettings) => {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(data));
  } catch {}
};

export const loadStoredRateLogs = (): RateChangeLog[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RATE_LOGS);
    return raw ? JSON.parse(raw) : INITIAL_RATE_LOGS;
  } catch {
    return INITIAL_RATE_LOGS;
  }
};

export const saveStoredRateLogs = (data: RateChangeLog[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_RATE_LOGS, JSON.stringify(data));
  } catch {}
};
