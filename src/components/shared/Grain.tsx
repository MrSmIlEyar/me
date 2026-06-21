"use client"

import type React from "react"

/**
 * Subtle animated film-grain texture overlay.
 * Pure black/white, very low opacity — adds a premium, tactile feel
 * without breaking the minimalist aesthetic.
 */
const Grain: React.FC = () => {
    return (
        <div
            aria-hidden="true"
            className="grain-overlay pointer-events-none fixed inset-0 z-[6] opacity-[0.05] mix-blend-multiply"
        />
    )
}

export default Grain
