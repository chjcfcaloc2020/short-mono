import { Activity, Shield, Cpu } from "lucide-react";

interface StatsGridProps {
  activeCount: number;
  clickCount: number;
}

export default function StatsGrid({ activeCount, clickCount }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left mt-10 relative z-10">
      {/* Box 1 */}
      <div className="border border-text-main p-4 md:p-5 bg-surface-container/40 hover:bg-surface-container/70 transition-colors rounded-sm select-none">
        <div className="flex justify-between items-center mb-1">
          <p className="font-mono text-xs font-semibold text-primary uppercase tracking-wide">STATUS // ACTIVE_CODES</p>
          <Activity className="w-4 h-4 text-primary" />
        </div>
        <p className="font-sans text-3xl font-bold tracking-tight text-on-surface">
          {activeCount} <span className="text-sm font-normal text-text-main">({clickCount} clks)</span>
        </p>
        <p className="font-mono text-xs text-text-main mt-1">Uptime SLA verified at 99.9%</p>
      </div>

      {/* Box 2 */}
      <div className="border border-text-main p-4 md:p-5 bg-surface-container/40 hover:bg-surface-container/70 transition-colors rounded-sm select-none">
        <div className="flex justify-between items-center mb-1">
          <p className="font-mono text-xs font-semibold text-primary uppercase tracking-wide">SECURITY // PROTOCOLS</p>
          <Shield className="w-4 h-4 text-primary" />
        </div>
        <p className="font-sans text-3xl font-bold tracking-tight text-on-surface">ENCRYPT</p>
        <p className="font-mono text-xs text-text-main mt-1">Secure redirection termination active</p>
      </div>

      {/* Box 3 */}
      <div className="border border-text-main p-4 md:p-5 bg-surface-container/40 hover:bg-surface-container/70 transition-colors rounded-sm select-none">
        <div className="flex justify-between items-center mb-1">
          <p className="font-mono text-xs font-semibold text-primary uppercase tracking-wide">LATENCY // DISPATCH</p>
          <Cpu className="w-4 h-4 text-primary" />
        </div>
        <p className="font-sans text-3xl font-bold tracking-tight text-on-surface">11ms</p>
        <p className="font-mono text-xs text-text-main mt-1">Local container routing average</p>
      </div>
    </div>
  );
}
