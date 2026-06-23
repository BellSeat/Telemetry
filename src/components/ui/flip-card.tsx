"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Click-to-zoom card:
 *  1. Click a card in the grid -> it spins 360deg, flies to screen center and scales up;
 *  2. The backdrop dims (only the card stays lit, everything else gets a shadow/overlay);
 *  3. Click the card face or empty space / press Esc -> it spins back, shrinks and closes.
 *
 * front / back are passed in by the parent (Server Component); this component only
 * handles the interaction and 3D animation.
 */
export function FlipCard({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const [open, setOpen] = useState(false); // whether the modal is mounted
  const [shown, setShown] = useState(false); // whether in the animated state (drives spin/scale/backdrop)

  // Switch to the animated state on the next frame after mount so the transition runs
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Lock scroll while open + support Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    // Play the exit animation first (spin back + shrink), then unmount
    setShown(false);
    window.setTimeout(() => setOpen(false), 700);
  }

  return (
    <>
      {/* Regular card in the grid: click to open the zoomed view */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Zoom in on card"
        className="w-full max-w-90 cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
      >
        <div className="aspect-5/7 w-full">{front}</div>
      </button>

      {/* Full-screen modal layer for the zoomed view */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={close}
            className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-500 ${
              shown ? "bg-black/80 backdrop-blur-sm" : "bg-black/0 backdrop-blur-0"
            }`}
          >
            {/* Perspective container */}
            <div className="perspective-[2000px] h-[85vh] max-w-[92vw] aspect-5/7">
              {/* Spinning + scaling card (clicking it also closes, via event bubbling to the backdrop) */}
              <div
                className={`relative h-full w-full transform-3d transition-all duration-700 ease-out ${
                  shown
                    ? "transform-[rotateY(360deg)_scale(1)] opacity-100 drop-shadow-2xl"
                    : "transform-[rotateY(0deg)_scale(0.3)] opacity-0"
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden">{front}</div>
                {/* Back (visible during the spin) */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  {back}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
