export interface ShortLink {
  shortCode: string;
  clicks: number;
  originalUrl: string;
  createdAt: string;
  expiresAt: string | null;
}

export interface ExpiryOption {
  label: string;
  value: string;
}
