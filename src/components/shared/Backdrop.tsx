"use client"

import type React from "react"

/**
 * Subtle, non-distracting background treatment:
 *  - a fine dot-grid that adapts to light/dark sections via mix-blend-difference
 *  - a soft vignette that adds depth and gently focuses the center
 *
 * Both layers are fixed, pointer-events-none and kept at very low opacity so
 * the page still reads as clean black & white at a glance.
 */
const Backdrop: React.FC = () => {
    return (
        <>
            {/* Vignette: barely-there edge darkening for depth (sits above opaque sections) */}
            <div aria-hidden="true" className="vignette pointer-events-none fixed inset-0 z-[11]" />
            {/* Dot-grid: white dots + difference blend => dark dots on light, light dots on dark */}
            <div
                aria-hidden="true"
                className="dot-grid pointer-events-none fixed inset-0 z-[12] text-white opacity-[0.05] mix-blend-difference"
            />
        </>
    )
}

export default Backdrop
