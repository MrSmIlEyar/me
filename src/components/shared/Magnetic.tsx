"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Props
    extends Omit<
        React.HTMLAttributes<HTMLDivElement>,
        "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
    > {
    children: React.ReactNode
    className?: string
    strength?: number
}

// forwardRef so Radix `asChild` triggers (HoverCard etc.) can attach their ref
const Magnetic = React.forwardRef<HTMLDivElement, Props>(
    ({ children, className, strength = 0.4, ...rest }, forwardedRef) => {
        const ref = useRef<HTMLDivElement | null>(null)
        const x = useMotionValue(0)
        const y = useMotionValue(0)
        const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
        const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

        // keep both our local ref and the forwarded ref in sync
        const setRefs = (node: HTMLDivElement | null) => {
            ref.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
        }

        const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const el = ref.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const mx = e.clientX - (rect.left + rect.width / 2)
            const my = e.clientY - (rect.top + rect.height / 2)
            x.set(mx * strength)
            y.set(my * strength)
        }

        const reset = () => {
            x.set(0)
            y.set(0)
        }

        return (
            <motion.div
                ref={setRefs}
                onMouseMove={handleMove}
                onMouseLeave={reset}
                style={{ x: sx, y: sy }}
                className={className}
                {...rest}
            >
                {children}
            </motion.div>
        )
    },
)

Magnetic.displayName = "Magnetic"

export default Magnetic
