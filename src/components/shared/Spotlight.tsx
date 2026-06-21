"use client"

import type React from "react"
import { useEffect } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"

const Spotlight: React.FC = () => {
    const mouseX = useMotionValue(-400)
    const mouseY = useMotionValue(-400)

    // smooth, slightly lagging follow for an elegant feel
    const x = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.4 })
    const y = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.4 })

    const background = useMotionTemplate`radial-gradient(circle 22rem at ${x}px ${y}px, rgba(0,0,0,0.10), transparent 70%)`

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener("mousemove", handleMove)
        return () => window.removeEventListener("mousemove", handleMove)
    }, [mouseX, mouseY])

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[5] hidden md:block mix-blend-multiply"
            style={{
                background: "radial-gradient(circle 22rem at var(--x) var(--y), rgba(0,0,0,0.10), transparent 70%)",
                ["--x" as string]: x,
                ["--y" as string]: y,
            }}
        />
    )
}

export default Spotlight
