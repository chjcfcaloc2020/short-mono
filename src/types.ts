export interface ShortLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  expiresAt: string | null;
  clicks: number;
}

export interface SystemStats {
  activeLinks: number;
  totalClicks: number;
  status: string;
  uptime: number;
}

export interface ExpiryOption {
  label: string;
  value: number; // in minutes. 0 means never.
}
