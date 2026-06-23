/**
 * Track map (standalone component).
 *
 * A track is described as an array of points (a closed loop). The component
 * estimates curvature from the turning angle at each vertex:
 *   - straight (low curvature)  -> green (accelerating)
 *   - corner   (high curvature) -> red   (braking)
 *   - blended through yellow in between
 * This simulates the accel / brake coloring around a lap.
 */

type Pt = [number, number];

/** A set of differently shaped tracks (viewBox 0 0 400 300, closed loop, first point not repeated). */
export const TRACKS: Pt[][] = [
  // 0 - GP-style mixed corners
  [
    [60, 185], [80, 95], [140, 72], [205, 92], [235, 70], [305, 82],
    [342, 132], [300, 172], [332, 222], [262, 252], [160, 242], [118, 262], [70, 232],
  ],
  // 1 - oval with a slow corner
  [
    [80, 122], [150, 80], [250, 80], [322, 122], [330, 182],
    [262, 212], [228, 190], [190, 212], [120, 210], [70, 170],
  ],
  // 2 - winding technical section
  [
    [70, 232], [92, 160], [60, 110], [112, 78], [172, 110], [150, 172],
    [212, 192], [262, 150], [240, 90], [302, 70], [342, 122], [320, 202], [250, 242], [160, 252], [100, 262],
  ],
  // 3 - tight hairpins
  [
    [120, 88], [202, 78], [252, 120], [230, 160], [272, 192],
    [242, 252], [170, 250], [150, 210], [108, 220], [88, 158],
  ],
  // 4 - high-speed long straight
  [
    [58, 182], [122, 100], [222, 88], [322, 110], [352, 162],
    [300, 202], [230, 202], [160, 232], [100, 230],
  ],
];

/** Turning angle at a vertex (0 = straight, 1 ~ U-turn), used to infer accel/brake. */
function curvatureAt(pts: Pt[], i: number): number {
  const n = pts.length;
  const prev = pts[(i - 1 + n) % n];
  const cur = pts[i];
  const next = pts[(i + 1) % n];
  const a1 = Math.atan2(cur[1] - prev[1], cur[0] - prev[0]);
  const a2 = Math.atan2(next[1] - cur[1], next[0] - cur[0]);
  let d = Math.abs(a2 - a1);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return d / Math.PI; // 0..1
}

/** Curvature -> color: green (straight/accel) -> yellow -> red (corner/brake). Muted for a frosted look. */
function speedColor(t: number): string {
  // Amplify the turning angle a bit so medium corners still lean red
  const k = Math.min(1, t / 0.55);
  const hue = 140 * (1 - k); // 140 = green, 60 = yellow, 0 = red
  return `hsl(${hue} 65% 55%)`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type TrackMapProps = {
  /** Index into TRACKS (wraps around, out-of-range safe) */
  track?: number;
  className?: string;
  /** false = single-color silhouette (uses currentColor); default true = accel/brake heat map */
  colored?: boolean;
  strokeWidth?: number;
};

/** Track map: renders accel/brake coloring by default, or a single-color silhouette when colored=false. */
export function TrackMap({
  track = 0,
  className,
  colored = true,
  strokeWidth = 8,
}: TrackMapProps) {
  const pts = TRACKS[((track % TRACKS.length) + TRACKS.length) % TRACKS.length];
  const n = pts.length;
  const curv = pts.map((_, i) => curvatureAt(pts, i));
  const SUB = 8; // sub-segments per edge, for smooth color transitions

  if (!colored) {
    const d =
      pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";
    return (
      <svg viewBox="0 0 400 300" fill="none" aria-hidden className={className}>
        <path
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  const segments: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % n];
    const c0 = curv[i];
    const c1 = curv[(i + 1) % n];
    for (let s = 0; s < SUB; s++) {
      const t0 = s / SUB;
      const t1 = (s + 1) / SUB;
      segments.push({
        x1: lerp(p0[0], p1[0], t0),
        y1: lerp(p0[1], p1[1], t0),
        x2: lerp(p0[0], p1[0], t1),
        y2: lerp(p0[1], p1[1], t1),
        color: speedColor(lerp(c0, c1, (t0 + t1) / 2)),
      });
    }
  }

  return (
    <svg viewBox="0 0 400 300" fill="none" aria-hidden className={className}>
      <defs>
        {/* Frosted glow: gaussian blur */}
        <filter id="trackFrost" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      {/* 1. Blurred glow underlay for the frosted feel */}
      <g filter="url(#trackFrost)" opacity={0.45}>
        {segments.map((seg, i) => (
          <line
            key={`glow-${i}`}
            x1={seg.x1}
            y1={seg.y1}
            x2={seg.x2}
            y2={seg.y2}
            stroke={seg.color}
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* 2. Main strokes (semi-transparent, soft) */}
      <g opacity={0.9}>
        {segments.map((seg, i) => (
          <line
            key={i}
            x1={seg.x1}
            y1={seg.y1}
            x2={seg.x2}
            y2={seg.y2}
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}
