/**
 * A set of purely presentational telemetry UI widgets (dark frosted, compact,
 * pinned to the bottom-right of the card face).
 * All Server Components (no interactivity). To make a value tick live, split that
 * single widget into a "use client" component.
 */

/** A horizontal progress bar (throttle / brake / any 0-100 value) */
function Bar({
  label,
  value,
  color = "bg-emerald-400",
}: {
  label: string;
  value: number; // 0 - 100
  color?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-7 shrink-0 font-mono text-[9px] font-medium uppercase tracking-wider text-white/60">
        {label}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 shrink-0 text-right font-mono text-[9px] text-white/70">
        {Math.round(pct)}
      </span>
    </div>
  );
}

/** Segmented RPM bar (race-style shift light strip) */
function RpmStrip({ rpm, max = 9000 }: { rpm: number; max?: number }) {
  const segments = 14;
  const active = Math.round((Math.min(rpm, max) / max) * segments);
  return (
    <div className="flex items-end gap-0.75">
      {Array.from({ length: segments }).map((_, i) => {
        const on = i < active;
        const tone =
          i < 8 ? "bg-emerald-400" : i < 11 ? "bg-amber-400" : "bg-red-500";
        return (
          <div
            key={i}
            className={`w-full flex-1 rounded-[1px] ${on ? tone : "bg-white/10"}`}
            style={{ height: `${6 + i * 1}px` }}
          />
        );
      })}
    </div>
  );
}

/** A single numeric stat block (lap time, top speed, etc.) */
function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">
        {label}
      </span>
      <span className="font-mono text-xs font-semibold text-white">
        {value}
        {unit && <span className="ml-0.5 text-[9px] text-white/60">{unit}</span>}
      </span>
    </div>
  );
}

export type TelemetryData = {
  speed: number; // km/h
  gear: number;
  rpm: number;
  throttle: number; // 0-100
  brake: number; // 0-100
  lapTime: string;
  topSpeed: number;
};

const DEFAULT_DATA: TelemetryData = {
  speed: 174,
  gear: 4,
  rpm: 7200,
  throttle: 82,
  brake: 0,
  lapTime: "1:42.318",
  topSpeed: 196,
};

/** Telemetry HUD cluster: dark frosted mini panel (more transparent), compact layout. */
export function TelemetryPanel({
  data = DEFAULT_DATA,
}: {
  data?: TelemetryData;
}) {
  return (
    <div className="flex w-44 flex-col gap-2 rounded-lg border border-white/10 bg-black/30 p-2.5 shadow-lg backdrop-blur-md">
      {/* Speed + gear */}
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold leading-none text-white">
            {data.speed}
          </span>
          <span className="font-mono text-[10px] text-white/60">km/h</span>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded border border-white/15 bg-white/5">
          <span className="font-mono text-base font-bold text-amber-400">
            {data.gear}
          </span>
        </div>
      </div>

      {/* RPM strip */}
      <RpmStrip rpm={data.rpm} />

      {/* Throttle / brake */}
      <div className="flex flex-col gap-1">
        <Bar label="THR" value={data.throttle} color="bg-emerald-400" />
        <Bar label="BRK" value={data.brake} color="bg-red-500" />
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
        <Stat label="Lap" value={data.lapTime} />
        <Stat label="Top" value={String(data.topSpeed)} unit="km/h" />
      </div>
    </div>
  );
}
