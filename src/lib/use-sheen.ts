"use client"

import type React from "react"

/**
 * Cursor-tracked specular highlight for glass surfaces.
 * Spread onto any element that also has `.glass-sheen`:
 *
 *   <button className="glass-on-light glass-sheen" {...sheenHandlers}>
 *
 * Writes --sx / --sy (cursor position) and --so (opacity) as inline
 * custom properties, so the CSS in globals.css does the painting.
 * Pointer-type aware: fine pointers only, so taps never leave a stuck glow.
 */
export const sheenHandlers = {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        el.style.setProperty("--sx", `${e.clientX - rect.left}px`)
        el.style.setProperty("--sy", `${e.clientY - rect.top}px`)
        el.style.setProperty("--so", "1")
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.setProperty("--so", "0")
    },
}
