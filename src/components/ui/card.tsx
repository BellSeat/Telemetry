import { CardBackground } from "@/components/ui/picture";
import { TrackMap } from "@/components/ui/track";
import { TelemetryPanel, type TelemetryData } from "@/components/ui/telemetry";

type CardProps = {
  /** Top title, e.g. driver/team */
  title?: string;
  /** Subtitle, e.g. stage/location */
  subtitle?: string;
  /** Rally car image path (place under /public) */
  carSrc?: string;
  /** Telemetry data; falls back to sample defaults when omitted */
  telemetry?: TelemetryData;
  /** Track map index (matches TRACKS in picture.tsx) */
  track?: number;
  /** true = accel/brake heat map, false = white silhouette */
  colored?: boolean;
};

/**
 * Collectible card: rally car card-face background + track map + telemetry HUD.
 * Standard trading-card ratio (5:7), rounded + border + glow.
 */
export function Card({
  title = "RALLY",
  subtitle,
  carSrc,
  telemetry,
  track = 0,
  colored = true,
}: CardProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl shadow-orange-500/10 ring-1 ring-inset ring-white/5">
      {/* Card-face background layer */}
      <CardBackground carSrc={carSrc} carAlt={title} track={track} colored={colored} />

      {/* Content layer */}
      <div className="relative flex h-full flex-col justify-between p-4">
        {/* Card header */}
        <header>
          <h2 className="font-mono text-lg font-bold uppercase tracking-[0.2em] text-white drop-shadow">
            {title}
          </h2>
          {subtitle && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/60">
              {subtitle}
            </p>
          )}
        </header>

        {/* Card footer: telemetry cluster, bottom-right, clear of the subject */}
        <div className="flex justify-end">
          <TelemetryPanel data={telemetry} />
        </div>
      </div>
    </div>
  );
}

/**
 * Card back: dark base + grid texture + centered emblem (track map) + tagline.
 * Fills its parent (same size as Card), shown after the flip.
 */
export function CardBack({
  label = "TELEMETRY",
  track = 0,
  colored = true,
}: {
  label?: string;
  track?: number;
  colored?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-linear-to-br from-zinc-900 via-black to-zinc-900 shadow-2xl shadow-orange-500/10 ring-1 ring-inset ring-white/5">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Top / bottom accent lines */}
      <div className="absolute inset-x-6 top-6 h-px bg-white/15" />
      <div className="absolute inset-x-6 bottom-6 h-px bg-white/15" />

      {/* Centered emblem */}
      <div className="relative flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-orange-500/40">
          <TrackMap track={track} colored={colored} className="h-24 w-24 text-white" />
        </div>
        <div>
          <p className="font-mono text-xl font-bold uppercase tracking-[0.3em] text-white">
            {label}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
            WRC Collection
          </p>
        </div>
      </div>
    </div>
  );
}
