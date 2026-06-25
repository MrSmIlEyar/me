"use client"

import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * Inverting cursor lens.
 * A small circle follows the pointer; `mix-blend-difference` over a white fill
 * inverts whatever is beneath it (black <-> white), creating an "eraser/reveal"
 * effect that fits a strictly monochrome design.
 *
 * It sits on top of the normal system cursor (the cursor stays visible) and is
 * disabled on touch / coarse-pointer devices.
 */
const InvertLens: React.FC = () => {
    const [enabled, setEnabled] = useState(false)
    const [visible, setVisible] = useState(false)
    const [pressed, setPressed] = useState(false)

    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
    const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

    useEffect(() => {
        // only on devices with a fine pointer (mouse / trackpad)
        const fine = window.matchMedia("(pointer: fine)")
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        if (!fine.matches || reduce.matches) return
        setEnabled(true)

        const move = (e: MouseEvent) => {
            x.set(e.clientX)
            y.set(e.clientY)
            setVisible(true)
        }
        const leave = () => setVisible(false)
        const down = () => setPressed(true)
        const up = () => setPressed(false)

        window.addEventListener("mousemove", move)
        window.addEventListener("mouseleave", leave)
        window.addEventListener("mousedown", down)
        window.addEventListener("mouseup", up)
        return () => {
            window.removeEventListener("mousemove", move)
            window.removeEventListener("mouseleave", leave)
            window.removeEventListener("mousedown", down)
            window.removeEventListener("mouseup", up)
        }
    }, [x, y])

    if (!enabled) return null

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-white mix-blend-difference"
            style={{
                x: sx,
                y: sy,
                width: 28,
                height: 28,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                opacity: visible ? 1 : 0,
                scale: pressed ? 0.6 : 1,
            }}
            transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", stiffness: 400, damping: 25 } }}
        />
    )
}

export default InvertLens
