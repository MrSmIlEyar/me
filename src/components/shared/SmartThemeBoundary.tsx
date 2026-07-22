"use client"

import React, { useEffect, useRef } from "react"
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion"

interface Props {
    tone: "dark" | "light"
    className?: string
}

/**
 * A solid-colour curtain edge that bends briefly with page-scroll velocity.
 * It is decorative only and never participates in layout or pointer handling.
 */
const SmartThemeBoundary: React.FC<Props> = ({ tone, className = "" }) => {
    const reduceMotion = useReducedMotion()
    const velocity = useMotionValue(0)
    const settledVelocity = useSpring(velocity, {
        stiffness: 150,
        damping: 24,
        mass: 0.45,
    })
    const previous = useRef({ y: 0, time: 0 })
    const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const frame = useRef<number | null>(null)

    useEffect(() => {
        if (reduceMotion) {
            velocity.set(0)
            return
        }

        previous.current = { y: window.scrollY, time: performance.now() }

        const updateVelocity = () => {
            frame.current = null
            const now = performance.now()
            const y = window.scrollY
            const elapsed = Math.max(now - previous.current.time, 16)
            const next = Math.max(-1, Math.min(1, ((y - previous.current.y) / elapsed) * 0.55))

            velocity.set(next)
            previous.current = { y, time: now }

            if (settleTimer.current) clearTimeout(settleTimer.current)
            settleTimer.current = setTimeout(() => velocity.set(0), 90)
        }

        const onScroll = () => {
            if (frame.current === null) frame.current = requestAnimationFrame(updateVelocity)
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (frame.current !== null) cancelAnimationFrame(frame.current)
            if (settleTimer.current) clearTimeout(settleTimer.current)
        }
    }, [reduceMotion, velocity])

    const path = useTransform(settledVelocity, (value) => {
        const bend = value * 7
        const tilt = value * 2.5
        const left = 11 - tilt
        const right = 11 + tilt
        const control = 11 + bend

        return `M 0 ${left} C 25 ${control} 75 ${control} 100 ${right} L 100 28 L 0 28 Z`
    })

    return (
        <div
            aria-hidden="true"
            className={`smart-theme-boundary pointer-events-none absolute inset-x-0 top-0 z-0 -translate-y-[calc(100%-1px)] overflow-hidden ${className}`}
        >
            <motion.svg
                viewBox="0 0 100 28"
                preserveAspectRatio="none"
                className="block h-full w-full"
                focusable="false"
            >
                <motion.path
                    d={path}
                    fill={tone === "dark" ? "hsl(var(--theme-dark))" : "hsl(var(--theme-light))"}
                />
            </motion.svg>
        </div>
    )
}

export default SmartThemeBoundary
