import { useState, useEffect } from "react";

export default function Footer() {
  const [activeSeconds, setActiveSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full border-t-2 border-text-main bg-surface relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-8 py-6 max-w-300 mx-auto gap-4">
        {/* Left trademark */}
        <div className="font-mono text-xs text-text-main text-center md:text-left select-none">
          © 2026 SHORT.MONO // SYSTEM_READY (UP_TIME: {activeSeconds}s)
        </div>

        {/* Middle quicklinks */}
        <div className="flex items-center gap-6 justify-center">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Privacy Protocol: Standard local-storage architecture is used. No tracking cookies are injected."); }}
            className="font-mono text-xs text-text-main hover:text-primary transition-opacity duration-200 cursor-pointer"
          >
            Privacy
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("License of services is MIT Open-Source. Redistribute freely."); }}
            className="font-mono text-xs text-text-main hover:text-primary transition-opacity duration-200 cursor-pointer"
          >
            Terms
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-text-main hover:text-primary transition-opacity duration-200"
          >
            GitHub
          </a>
        </div>

        {/* Right active indicator */}
        <div className="flex items-center gap-2 select-none">
          <div className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary"></span>
          </div>
          <span className="font-mono text-xs font-semibold text-primary">CORE_ACTIVE</span>
        </div>
      </div>
    </footer>
  );
}
