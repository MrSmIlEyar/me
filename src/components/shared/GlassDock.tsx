"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Home, Briefcase, Sparkles } from "lucide-react"
import type { TFunction } from "i18next"

interface Props {
    t: TFunction
}

const SECTIONS = [
    { id: "home", labelKey: "Home", Icon: Home },
    { id: "career", labelKey: "Career", Icon: Briefcase },
    { id: "hobby", labelKey: "Hobby", Icon: Sparkles },
] as const

/**
 * iOS-style floating liquid-glass dock.
 * - frosted glass capsule with a light top edge
 * - a "lens" that springs between items as sections change
 * - specular highlight that follows the cursor across the glass
 * - adapts tint to the section beneath it (light hero / dark career / light hobby)
 */
const GlassDock: React.FC<Props> = ({ t }) => {
    const [active, setActive] = useState(0)
    const dockRef = useRef<HTMLElement | null>(null)

    // track which snap-section is in view
    useEffect(() => {
        const update = () => {
            const vh = window.innerHeight || 1
            setActive(Math.min(2, Math.max(0, Math.round(window.scrollY / vh))))
        }
        update()
        window.addEventListener("scroll", update, { passive: true })
        window.addEventListener("resize", update)
        return () => {
            window.removeEventListener("scroll", update)
            window.removeEventListener("resize", update)
        }
    }, [])

    // specular highlight follows the cursor across the glass surface
    const handleMove = (e: React.MouseEvent<HTMLElement>) => {
        const el = dockRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty("--sx", `${e.clientX - r.left}px`)
        el.style.setProperty("--sy", `${e.clientY - r.top}px`)
        el.style.setProperty("--so", "1")
    }
    const handleLeave = () => {
        dockRef.current?.style.setProperty("--so", "0")
    }

    const goTo = (index: number) => {
        window.scrollTo({ top: index * window.innerHeight, behavior: "smooth" })
    }

    // career section (index 1) is black — use light glass; elsewhere dark glass
    const onDark = active === 1

    return (
        <motion.nav
            ref={dockRef}
            aria-label="Sections"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, y: 24, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className={`fixed bottom-4 left-1/2 z-[70] sm:bottom-6 ${
                onDark
                    ? "border-white/20 bg-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
                    : "border-black/10 bg-white/40 text-black shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
            } flex items-center gap-1 overflow-hidden rounded-full border p-1.5 backdrop-blur-2xl transition-colors duration-500`}
        >
            {/* light top edge — the signature glass rim */}
            <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                    onDark ? "via-white/60" : "via-white/90"
                }`}
            />
            {/* specular highlight following the cursor */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[var(--so,0)] transition-opacity duration-300"
                style={{
                    background: `radial-gradient(90px circle at var(--sx, 50%) var(--sy, 50%), ${
                        onDark ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.55)"
                    }, transparent 70%)`,
                }}
            />

            {SECTIONS.map(({ id, labelKey, Icon }, i) => {
                const isActive = active === i
                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={t(labelKey)}
                        aria-current={isActive ? "true" : undefined}
                        className="relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm outline-none transition-transform duration-200 hover:scale-105 active:scale-95 sm:px-3.5"
                    >
                        {/* liquid lens springs between items */}
                        {isActive && (
                            <motion.span
                                layoutId="dock-lens"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                className={`absolute inset-0 rounded-full ${
                                    onDark
                                        ? "bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                                        : "bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_4px_rgba(0,0,0,0.08)]"
                                }`}
                            />
                        )}
                        <Icon
                            size={17}
                            strokeWidth={2}
                            className={`relative transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-55"}`}
                        />
                        {/* label only for the active item, iOS style */}
                        <motion.span
                            initial={false}
                            animate={{ width: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative overflow-hidden whitespace-nowrap font-medium"
                        >
                            {t(labelKey)}
                        </motion.span>
                    </button>
                )
            })}
        </motion.nav>
    )
}

export default GlassDock
