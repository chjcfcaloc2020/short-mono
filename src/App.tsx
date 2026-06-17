import React, { useState, useEffect } from "react";
import {
  Terminal,
  Copy,
  Check,
  Trash2,
  Globe,
  Eye,
  RefreshCw,
  Clock,
  AlertTriangle,
  Info,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StatsGrid from "./components/StatsGrid";
import type { ShortLink, ExpiryOption } from "./types";

const EXPIRY_OPTIONS: ExpiryOption[] = [
  { label: "15M", value: "15m" },
  { label: "30M", value: "30m" },
  { label: "1H", value: "60m" },
  { label: "1D", value: "1d" },
  { label: "NEVER", value: "never" },
];

export default function App() {
  const [url, setUrl] = useState("");
  const [selectedExpiry, setSelectedExpiry] = useState<ExpiryOption>(EXPIRY_OPTIONS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [recentLink, setRecentLink] = useState<ShortLink | null>(null);
  const [copiedLinkCode, setCopiedLinkCode] = useState<string | null>(null);

  // Advanced link list & analytics
  const [linksList, setLinksList] = useState<ShortLink[]>([]);

  // Load client stats & any cached links
  useEffect(() => {
    handleRefreshClicks();
    // Pre-populate some dummy local links in the table for a lively layout
    const cached = localStorage.getItem("short_mono_links");
    if (cached) {
      try {
        setLinksList(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse cached links", e);
      }
    }
  }, []);

  // Truncate helper
  const truncateText = (text: string, len: number = 40) => {
    if (text.length <= len) return text;
    return text.substring(0, len) + "...";
  };

  // Submit Shorten form
  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setErrorMsg("ERR: CHOOSE A SUITABLE TARGET LONG URL PROTOCOL");
      return;
    }
    setIsLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        url: url.trim(),
        expireIn: selectedExpiry.value,
      };

      const response = await fetch("http://localhost:8080/api/urls/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "System rejected URL format alignment");
      }

      const newLink: ShortLink = await response.json();
      // Update local state
      setRecentLink(newLink);

      const newLinksArray = [newLink, ...linksList.filter(l => l.shortCode !== newLink.shortCode)];
      setLinksList(newLinksArray);
      localStorage.setItem("short_mono_links", JSON.stringify(newLinksArray));

      // Reset inputs
      setUrl("");
    } catch (e: any) {
      setErrorMsg(e.message || "COULD NOT CONNECT TO TRANSIT ROUTER. PLEASE TRY AGAIN.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (code: string) => {
    if (!confirm(`Are you sure you want to stop telemetry for link ${code}?`)) {
      return;
    }

    try {
      await fetch(`http://localhost:8080/api/urls/${code}`, { method: "DELETE" });
    } catch (e) {
      console.log("Core was unable to synchronize deletion with server.");
    }

    const updated = linksList.filter((link) => link.shortCode !== code);
    setLinksList(updated);
    localStorage.setItem("short_mono_links", JSON.stringify(updated));
  };

  const handleRefreshClicks = async () => {
    if (linksList.length === 0) return;

    try {
      setIsLoading(true);

      // Gửi batch request để cập nhật clicks cho tất cả links
      const response = await fetch("http://localhost:8080/api/urls/batch/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortCodes: linksList.map(link => link.shortCode)
        })
      });

      if (response.ok) {
        const updatedData = await response.json();

        // Merge dữ liệu mới với state hiện tại
        const updatedLinks = linksList.map(link => {
          const updated = updatedData.find((item: any) => item.shortCode === link.shortCode);
          return updated ? { ...link, clicks: updated.clicks } : link;
        });

        setLinksList(updatedLinks);
        localStorage.setItem("short_mono_links", JSON.stringify(updatedLinks));
      }
    } catch (e) {
      console.error("Failed to refresh clicks", e);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLinkCode(code);
    setTimeout(() => setCopiedLinkCode(null), 1800);
  };

  return (
    <div className="bg-surface text-on-surface font-sans min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Navbar layer */}
      <Navbar />

      {/* Main Terminal Frame */}
      <main className="grow relative overflow-hidden flex flex-col items-center justify-start px-4 md:px-8 py-8 md:py-16 max-w-300 w-full mx-auto">

        {/* Atmospheric Scanline and grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="scanline"></div>
          <div className="grid grid-cols-12 h-full w-full border-x border-text-main">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="border-r border-text-main h-full"></div>
            ))}
          </div>
        </div>

        {/* Hero Title Area */}
        <div className="w-full text-center space-y-6 z-10">
          <div className="space-y-3">
            <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-on-surface uppercase leading-tight">
              ENCODE_LONG_URLS<br />
              <span className="text-primary">&gt;_</span> SYSTEM_READY
            </h1>
            <p className="font-sans text-sm md:text-base text-text-main max-w-xl mx-auto">
              A high-density URL compression utility for technical protocols and human interfaces. Zero tracking, maximum precision.
            </p>
          </div>

          {/* MAIN ENCODER TOOL */}
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <form onSubmit={handleShorten} className="border-2 border-text-main hard-shadow bg-surface p-1 relative">

              {/* Decorative corner indicators to convey industrial blueprint aesthetic */}
              <div className="absolute -top-1.25 -left-1.25 w-2 h-2 bg-text-main"></div>
              <div className="absolute -top-1.25 -right-1.25 w-2 h-2 bg-text-main"></div>
              <div className="absolute -bottom-1.25 -left-1.25 w-2 h-2 bg-text-main"></div>
              <div className="absolute -bottom-1.25 -right-1.25 w-2 h-2 bg-text-main"></div>

              <div className="flex flex-col md:flex-row gap-0">
                {/* URL paste field */}
                <div className="grow flex items-center bg-surface-container px-3 py-3 border-b-2 md:border-b-0 md:border-r border-text-main">
                  <span className="text-primary font-mono text-sm font-bold mr-2 select-none">LINK:</span>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://enter-your-long-url.com/some/long-sub-address"
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 font-mono text-xs md:text-sm placeholder:text-text-main/50 text-on-surface"
                    id="urlInput"
                  />
                </div>

                {/* Execute Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-container text-on-primary-container font-sans font-bold hover:bg-primary hover:text-white transition-all duration-150 cursor-pointer px-6 py-3 border-t-2 md:border-t-0 border-text-main min-w-32.5 flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    "SHORTEN"
                  )}
                </button>
              </div>
            </form>

            {/* Error messaging state */}
            {errorMsg && (
              <div className="bg-error/10 border-2 border-error p-3 text-left font-mono text-xs flex items-center gap-2 text-error">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Expiry Selector segment */}
            <div className="flex flex-col items-center gap-2 mt-4 select-none">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-semibold text-primary uppercase tracking-wide">EXPIRY:</span>
                <div className="flex border-2 border-text-main bg-surface p-0.5 gap-0.5">
                  {EXPIRY_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedExpiry(opt)}
                      className={`px-3 py-1 font-mono text-xs transition-all ${selectedExpiry.label === opt.label
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-surface-container text-text-main"
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="font-mono text-[9px] text-text-main/70 uppercase tracking-widest">Auto-deletion protocol active</p>
            </div>
          </div>

          {/* SUCCESS RESULTS AREA (Displaying newly created link) */}
          {recentLink && (
            <div className="w-full max-w-2xl mx-auto mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="border-2 border-primary bg-primary/5 p-4 md:p-6 relative overflow-hidden rounded-sm text-left">
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="font-mono text-[10px] bg-primary text-white px-2 py-0.5 font-bold uppercase tracking-wide">SUCCESS</span>
                  {recentLink.expiresAt && (
                    <span className="font-mono text-[10px] bg-amber-600 text-white px-2 py-0.5 font-bold uppercase tracking-wide flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      TEMP
                    </span>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-[70%]">
                    <p className="font-mono text-[10px] text-text-main font-semibold uppercase tracking-widest">ENCODED_OUTPUT_PATH:</p>
                    <p className="font-sans text-xl md:text-2xl font-bold text-primary select-all break-all">
                      {import.meta.env.VITE_URL_LOCAL + "/" + recentLink.shortCode}
                    </p>
                    <p className="font-mono text-[11px] text-text-main select-none truncate" title={recentLink.originalUrl}>
                      Original: <span className="underline">{recentLink.originalUrl}</span>
                    </p>
                    {recentLink.expiresAt && (
                      <p className="font-mono text-[10px] text-amber-700 font-medium">
                        Expires at: {new Date(recentLink.expiresAt).toLocaleTimeString()} ({new Date(recentLink.expiresAt).toLocaleDateString()})
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:w-auto">
                    <button
                      onClick={() => copyToClipboard(
                        import.meta.env.VITE_BASE_URL + "/" + recentLink.shortCode,
                        recentLink.shortCode
                      )}
                      className="grow md:flex-none flex items-center justify-center gap-2 bg-surface text-on-surface border-2 border-text-main px-4 py-2 font-mono text-xs hover:bg-surface-container transition-all active:scale-95"
                    >
                      {copiedLinkCode === recentLink.shortCode ? (
                        <>
                          <Check className="w-4 h-4 text-primary" />
                          <span className="text-primary font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-text-main" />
                          <span>COPY LINK</span>
                        </>
                      )}
                    </button>

                    <a
                      href={import.meta.env.VITE_URL_LOCAL + "/" + recentLink.shortCode}
                      target="_blank"
                      rel="noreferrer"
                      className="grow md:flex-none flex items-center justify-center gap-2 bg-primary text-white border-2 border-text-main px-4 py-2 font-mono text-xs hover:bg-white hover:text-primary transition-all active:scale-95"
                    >
                      <Globe className="w-4 h-4" />
                      <span>VISIT</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TELEMETRY ENGINE & CURRENT REDIRECTION MATRIX SECTION */}
          <div className="w-full max-w-4xl mx-auto pt-8 border-t border-text-main/10 mt-8 text-left z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="font-sans text-lg md:text-xl font-bold text-on-surface uppercase flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" /> LIVE_REDIRECTION_TELEMETRY
                </h3>
                <p className="font-mono text-xs text-text-main">
                  Inspect resolve logs, track cumulative click analytics, or manually dispatch/revoke encryption codes.
                </p>
              </div>

              <button
                onClick={handleRefreshClicks}
                className="p-1 px-3 border border-text-main hover:bg-surface-container font-mono text-[10px] text-text-main flex items-center gap-1.5 transition-all active:scale-95 bg-white"
                title="Sync metrics"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>SYS_REFRESH</span>
              </button>
            </div>

            {/* List Table Grid */}
            <div className="border border-text-main bg-surface-container/20 rounded-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left font-mono text-xs">
                  <thead>
                    <tr className="bg-surface-container border-b border-text-main text-text-main text-[10px] uppercase font-bold select-none">
                      <th className="p-3">IDENTIFIER</th>
                      <th className="p-3">TARGET LONG PROTOCOL</th>
                      <th className="p-3 hidden md:table-cell">CREATED</th>
                      <th className="p-3 hidden md:table-cell">EXPIRES</th>
                      <th className="p-3">LIFETIME</th>
                      <th className="p-3 text-center">CLICKS</th>
                      <th className="p-3 text-right">DISPATCH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-text-main/10">
                    {linksList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-text-main">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <Info className="w-8 h-8 text-text-main/40" />
                            <p className="font-bold">&gt;_ DECK_EMPTY</p>
                            <p className="text-[11px] font-normal">Input your first long url address to start short code encryption.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      linksList.map((link) => {
                        return (
                          <tr key={link.shortCode} className="hover:bg-surface-container/40 transition-colors">
                            {/* Shortened target code */}
                            <td className="p-3 font-bold text-primary max-w-30 truncate">
                              <span className="text-text-main font-normal mr-0.5">/</span>{link.shortCode}
                            </td>

                            {/* Original destination */}
                            <td className="p-3 font-normal text-text-main max-w-50 md:max-w-[320px] truncate" title={link.originalUrl}>
                              {truncateText(link.originalUrl, 45)}
                            </td>

                            {/* Creation time */}
                            <td className="p-3 text-text-main/70 hidden md:table-cell text-[11px]">
                              {new Date(link.createdAt).toLocaleTimeString()}
                            </td>

                            {/* Expiration time */}
                            <td className="p-3 text-text-main/70 hidden md:table-cell text-[11px]">
                              {link.expiresAt ? new Date(link.expiresAt).toLocaleTimeString() : "NEVER"}
                            </td>

                            {/* Remaining lifespan */}
                            <td className="p-3">
                              {link.expiresAt ? (
                                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 text-[10px] font-bold rounded-sm flex items-center w-fit gap-1">
                                  <Clock className="w-3 h-3" />
                                  TEMP
                                </span>
                              ) : (
                                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 text-[10px] font-bold rounded-sm w-fit block">
                                  PERMANENT
                                </span>
                              )}
                            </td>

                            {/* Clicks count indicator */}
                            <td className="p-3 text-center">
                              <span className="font-bold text-on-surface bg-surface-container border border-text-main/30 px-2 py-0.5 rounded-sm">
                                {link.clicks}
                              </span>
                            </td>

                            {/* Quick copy, delete operations */}
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {/* Copy */}
                                <button
                                  onClick={() => copyToClipboard(
                                    import.meta.env.VITE_BASE_URL + "/" + link.shortCode,
                                    link.shortCode
                                  )}
                                  className="p-1.5 border border-text-main/30 hover:border-primary hover:bg-primary/5 rounded-sm text-text-main hover:text-primary transition-all active:scale-90"
                                  title="Copy short link"
                                >
                                  {copiedLinkCode === link.shortCode ? (
                                    <Check className="w-3.5 h-3.5 text-primary" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>

                                {/* Direct launch */}
                                <a
                                  href={import.meta.env.VITE_URL_LOCAL + "/" + link.shortCode}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 border border-text-main/30 hover:border-primary hover:bg-primary/5 rounded-sm text-text-main hover:text-primary transition-all active:scale-95"
                                  title="Visit target redirection"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </a>

                                {/* Delete button */}
                                <button
                                  onClick={() => handleDelete(link.shortCode)}
                                  className="p-1.5 border border-text-main/30 hover:border-error hover:bg-error/5 rounded-sm text-text-main hover:text-error transition-all active:scale-90"
                                  title="Revoke code"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instruction footnote for the developer */}
            <div className="mt-4 flex items-start gap-2 bg-surface-container/60 p-3 rounded-xs border border-text-main/25">
              <Info className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
              <div className="font-mono text-[10px] text-text-main space-y-1">
                <span className="font-semibold text-on-surface uppercase">Live testing recommendation:</span>
                <p>Clicking the <span className="font-bold">VISIT</span> eye icon triggers the local Express interceptor. It increments the click counter natively, passes through the decrypting screen loader, and dispatches to the final location instantly.</p>
              </div>
            </div>

          </div>

          {/* Stats Bento Grid at the bottom */}
          <StatsGrid activeCount={linksList.length} clickCount={linksList.reduce((sum, l) => sum + l.clicks, 0)} />

        </div>
      </main>

      {/* Footer layer */}
      <Footer />
    </div>
  );
}
