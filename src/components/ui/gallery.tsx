"use client";

import { useState } from "react";
import { Card, CardBack } from "@/components/ui/card";
import { FlipCard } from "@/components/ui/flip-card";
import type { TelemetryData } from "@/components/ui/telemetry";

export type CarCard = {
  title: string;
  subtitle: string;
  carSrc: string;
  telemetry: TelemetryData;
};

/**
 * Client gallery: holds the global track-coloring state and renders all cards.
 * The header icon toggles every track between the accel/brake heat map and a
 * white silhouette at once. State must live here (not in the Server page) because
 * server-rendered card props can't read client state.
 */
export function Gallery({ cars }: { cars: CarCard[] }) {
  const [colored, setColored] = useState(true);

  return (
    <main className="min-h-screen bg-linear-to-b from-zinc-900 to-black px-6 py-12">
      <header className="mx-auto mb-10 flex max-w-7xl items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-bold uppercase tracking-[0.25em] text-white">
            Telemetry Cards
          </h1>
          <p className="mt-1 font-mono text-sm text-white/50">
            {cars.length} cars · demo collection
          </p>
        </div>

        {/* Global toggle: heat map <-> white silhouette for every track */}
        <button
          type="button"
          onClick={() => setColored((c) => !c)}
          aria-label={
            colored
              ? "Switch all tracks to white silhouette"
              : "Switch all tracks to heat map"
          }
          title="Toggle track coloring"
          className={`flex h-10 shrink-0 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 font-mono text-xs uppercase tracking-wider backdrop-blur-sm transition-colors hover:bg-white/10 ${
            colored ? "text-orange-400" : "text-white"
          }`}
        >
          {/* Contrast icon: outlined circle with one half filled */}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
            <path d="M12 3.5 a8.5 8.5 0 0 1 0 17 Z" fill="currentColor" />
          </svg>
          {colored ? "Heat map" : "White"}
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car, i) => (
          <FlipCard
            key={i}
            front={
              <Card
                title={car.title}
                subtitle={car.subtitle}
                carSrc={car.carSrc}
                telemetry={car.telemetry}
                track={i}
                colored={colored}
              />
            }
            back={<CardBack label={car.title} track={i} colored={colored} />}
          />
        ))}
      </div>
    </main>
  );
}
