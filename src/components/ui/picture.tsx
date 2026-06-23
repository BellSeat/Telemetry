import Image from "next/image";
import { TrackMap } from "@/components/ui/track";

type CardBackgroundProps = {
  /** Rally car image path (place under /public, e.g. "/rally-car.jpg"). Empty falls back to a placeholder gradient. */
  carSrc?: string;
  carAlt?: string;
  /** Track map index (matches TRACKS) */
  track?: number;
};

/**
 * Card-face background: rally car photo + darkening gradient + track map.
 * Absolutely fills its parent (parent needs relative + overflow-hidden).
 */
export function CardBackground({
  carSrc,
  carAlt = "Rally car",
  track = 0,
}: CardBackgroundProps) {
  return (
    <div className="absolute inset-0">
      {/* 1. Rally car background image (falls back to a gradient when no image) */}
      {carSrc ? (
        <Image
          src={carSrc}
          alt={carAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/30 via-zinc-800 to-black" />
      )}

      {/* 2. Darkening gradient so the telemetry text stays readable */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20" />

      {/* 3. Track map (accel/brake coloring), top-right, clear of the bottom-right telemetry */}
      <TrackMap track={track} className="absolute -right-8 top-5 h-40 w-auto opacity-80" />
    </div>
  );
}
