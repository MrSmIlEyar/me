"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Props {
    children: React.ReactNode
    className?: string
    /** maximum tilt in degrees */
    max?: number
    /** lift the element towards the viewer on hover (px) */
    lift?: number
    /** show a pointer-following glare (best for rectangular/card content) */
    glare?: boolean
}

const Tilt3D: React.FC<Props> = ({ children, className, max = 14, lift = 0, glare = false }) => {
    const ref = useRef<HTMLDivElement>(null)

    // normalized pointer position (-0.5 .. 0.5)
    const px = useMotionValue(0)
    const py = useMotionValue(0)

    const sx = useSpring(px, { stiffness: 150, damping: 15, mass: 0.4 })
    const sy = useSpring(py, { stiffness: 150, damping: 15, mass: 0.4 })

    const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
    const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])
    // subtle glare position follows the pointer
    const glareX = useTransform(sx, [-0.5, 0.5], [0, 100])
    const glareY = useTransform(sy, [-0.5, 0.5], [0, 100])
    const glareBackground = useTransform(
        [glareX, glareY],
        ([gx, gy]: number[]) =>
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), transparent 55%)`,
    )

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        px.set((e.clientX - rect.left) / rect.width - 0.5)
        py.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    const reset = () => {
        px.set(0)
        py.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ rotateX, rotateY, transformPerspective: 800, z: lift }}
            whileHover={lift ? { z: lift } : undefined}
            className={className}
        >
            <div style={{ transform: "translateZ(40px)" }} className="relative">
                {children}
                {glare && (
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 mix-blend-overlay"
                        style={{
                            background: glareBackground,
                        }}
                    />
                )}
            </div>
        </motion.div>
    )
}

export default Tilt3D
