import { Shield, Menu, Terminal, User } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  author?: string;
}

export default function Navbar({ author = "Provided by" }: NavbarProps) {
  const [showDocs, setShowDocs] = useState(false);
  const [showApi, setShowApi] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  return (
    <header className="w-full border-b-2 border-text-main bg-surface sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-300 mx-auto">
        {/* LOGO */}
        <div
          onClick={() => window.location.reload()}
          className="font-sans text-xl md:text-2xl font-bold text-primary tracking-tighter cursor-pointer active:translate-y-0.5 select-none flex items-center gap-2"
        >
          <Terminal className="w-6 h-6 stroke-[2.5]" />
          <span>SHORT.MONO</span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => { setShowDocs(true); setShowApi(false); setShowPricing(false); }}
            className="font-mono text-sm text-on-surface-variant hover:bg-primary hover:text-white transition-colors duration-150 px-2 py-1 select-none"
          >
            Docs
          </button>
          <button
            onClick={() => { setShowApi(true); setShowDocs(false); setShowPricing(false); }}
            className="font-mono text-sm text-on-surface-variant hover:bg-primary hover:text-white transition-colors duration-150 px-2 py-1 select-none"
          >
            API
          </button>
          <button
            onClick={() => { setShowPricing(true); setShowDocs(false); setShowApi(false); }}
            className="font-mono text-sm text-on-surface-variant hover:bg-primary hover:text-white transition-colors duration-150 px-2 py-1 select-none"
          >
            Pricing
          </button>

          <div className="flex items-center gap-3 border border-text-main p-1.5 bg-surface-container/60 rounded-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="font-mono text-xs text-text-main font-semibold max-w-45 truncate" title={author}>
              {author}
            </span>
            <a href="https://github.com/chjcfcaloc2020/short-mono" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="../../public/github.png" />
            </a>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          {author && (
            <div className="flex items-center gap-1 border border-text-main px-2 py-1 bg-surface-container rounded-sm">
              <User className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-[10px] text-text-main max-w-25 truncate">{author}</span>
              <a href="https://github.com/chjcfcaloc2020/short-mono" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                <img src="../../public/github.png" />
              </a>
            </div>
          )}
          <button
            onClick={() => setShowDocs(true)}
            className="text-primary hover:bg-surface-container p-1 rounded-sm border border-transparent hover:border-text-main active:scale-95"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Docs dialog */}
      {showDocs && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border-2 border-text-main max-w-lg w-full p-6 hard-shadow rounded-sm font-sans relative">
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> DOCUMENTATION_PROTOCOL
            </h3>
            <div className="font-mono text-xs text-text-main space-y-3 max-h-75 overflow-y-auto pr-2">
              <p className="border-b border-text-main/20 pb-2">
                <strong className="text-primary">SHORT.MONO</strong> is a ultra-safe, high-density URL compression engine designed to shrink massive system protocols, analytics routes, and nested URLs into tiny hexadecimal chips.
              </p>
              <div>
                <span className="text-primary font-bold">1. ENCODE URL:</span>
                <p>Paste any web target into the main input slot. Choose an auto-destruction protocol timeline (15 minutes, 30 minutes, or 1 hour).</p>
              </div>
              <div>
                <span className="text-primary font-bold">2. FORWARD RESOLVER:</span>
                <p>All links generated run on the native cloud terminal routing line under <code className="bg-surface-container px-1 font-bold">/r/[id]</code>. Redirection includes secure SSL handshaking and decryption indicators.</p>
              </div>
              <div>
                <span className="text-primary font-bold">3. AUTO-DELETION PROTOCOL:</span>
                <p>To preserve disk health, links are deleted automatically matching their selected telemetry lifecycle. Custom identifier parameters are allowed.</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDocs(false)}
                className="font-mono text-sm bg-primary text-white border-2 border-text-main px-4 py-1.5 hover:bg-white hover:text-primary transition-all active:translate-y-0.5"
              >
                [ CLOSE_PROTOCOL ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API dialog */}
      {showApi && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border-2 border-text-main max-w-xl w-full p-6 hard-shadow rounded-sm font-sans relative">
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> API_CONFIGURATION
            </h3>
            <div className="font-mono text-xs text-text-main space-y-4">
              <p>Execute automated shortening requests directly of the local container network:</p>

              <div className="bg-on-surface text-white p-3 rounded-sm space-y-1 select-all overflow-x-auto text-[11px] leading-relaxed font-mono">
                <div><span className="text-primary-container">POST</span> /api/shorten</div>
                <div>Headers: Content-Type: application/json</div>
                <div>Body: &#123;</div>
                <div className="pl-4">"url": "https://example.com/very-long-path",</div>
                <div className="pl-4">"expiryMinutes": 15, <span className="text-gray-400">// optional (0 for never)</span></div>
                <div className="pl-4">"customCode": "custom-alias" <span className="text-gray-400">// optional</span></div>
                <div>&#125;</div>
              </div>

              <p>RESPONSE FORMAT (201 CREATED):</p>
              <div className="bg-on-surface text-white p-3 rounded-sm text-[11px] font-mono whitespace-pre overflow-x-auto">
                &#123;
                "id": "link_8x9a2jd",
                "originalUrl": "https://example.com/very-long-path",
                "shortCode": "custom-alias",
                "createdAt": "2026-06-10T04:55:00Z",
                "expiresAt": "2026-06-10T05:10:00Z",
                "clicks": 0
                &#125;</div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowApi(false)}
                className="font-mono text-sm bg-primary text-white border-2 border-text-main px-4 py-1.5 hover:bg-white hover:text-primary transition-all active:translate-y-0.5"
              >
                [ TERMINATE_SHELL ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Dialog */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border-2 border-text-main max-w-md w-full p-6 hard-shadow rounded-sm font-sans relative">
            <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> LICENSE_LIMITS
            </h3>
            <div className="font-mono text-xs text-text-main space-y-4">
              <p>All CORE features of SHORT.MONO are and will remain open-source and free under the developer terms.</p>

              <div className="border border-text-main p-3 bg-surface-container rounded-sm">
                <div className="font-bold text-on-surface flex justify-between">
                  <span>STANDARD DEVELOPER</span>
                  <span className="text-primary">FREE</span>
                </div>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-text-main">
                  <li>Unlimited regular shortened codes</li>
                  <li>Custom URL codes/tags</li>
                  <li>15m, 30m, 1h, 1d, Never expirations</li>
                  <li>Instant live statistics telemetry</li>
                </ul>
              </div>

              <div className="border-2 border-primary p-3 bg-primary/5 rounded-sm">
                <div className="font-bold text-primary flex justify-between">
                  <span>ENTERPRISE CODES</span>
                  <span>$0.00 <span className="text-[9px] line-through text-text-main/50 font-normal">$49</span></span>
                </div>
                <p className="mt-1 text-[10px] text-primary/80 uppercase font-semibold">Active for {author}</p>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-text-main">
                  <li>99.99% Guaranteed uptime SLA</li>
                  <li>Deep analytical event streaming</li>
                  <li>Priority multi-region container replication</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPricing(false)}
                className="font-mono text-sm bg-primary text-white border-2 border-text-main px-4 py-1.5 hover:bg-white hover:text-primary transition-all active:translate-y-0.5"
              >
                [ COMPLETED ]
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
