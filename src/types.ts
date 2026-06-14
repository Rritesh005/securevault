export interface GuestbookEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface StickyNote {
  id: string;
  content: string;
  updatedAt: string;
}

export interface CryptoRate {
  id: string;
  name: string;
  symbol: string;
  priceUSD: number;
  priceINR: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  uploadedAt: string;
}

export interface UserCard {
  id: string;
  name: string;
  email: string;
  picture: string;
  username: string;
}
