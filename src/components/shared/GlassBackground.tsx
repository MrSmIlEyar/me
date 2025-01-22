"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"

const iconNames = [
    "devicon:react",
    "logos:typescript-icon",
    "logos:postgresql",
    "logos:docker-icon",
    "logos:kubernetes",
    "logos:python",
    "vscode-icons:file-type-django",
    "logos:flask",
    "logos:fastapi-icon",
    "logos:javascript",
    "logos:html-5",
    "logos:css-3",
    "vscode-icons:file-type-tailwind",
    "logos:git-icon",
    "logos:github-icon",
    "logos:gitlab",
    "logos:redux",
    "devicon:nextjs",
    "simple-icons:shadcnui",
    "devicon:redis",
    "logos:nginx",
]

const GlassBackground: React.FC = () => {
    const [isClient, setIsClient] = useState(false)

    const generateInitialState = useCallback(() => {
        const gridSize = Math.ceil(Math.sqrt(iconNames.length))
        return iconNames.map((_, index) => {
            const row = Math.floor(index / gridSize)
            const col = index % gridSize
            return {
                top: `${(row / gridSize) * 100}%`,
                left: `${(col / gridSize) * 100}%`,
                size: 48,
                animationType: Math.floor(Math.random() * 4), // 0: rotate, 1: pulse, 2: bounce, 3: wave
            }
        })
    }, [])

    const [iconStates, setIconStates] = useState(generateInitialState)

    useEffect(() => {
        setIsClient(true)
        const handleResize = () => {
            const screenWidth = window.innerWidth
            const baseSize = screenWidth < 640 ? 24 : screenWidth < 1024 ? 32 : 48
            const newStates = []
            const occupiedSpaces = []

            for (let i = 0; i < iconNames.length; i++) {
                let top: number, left: number, overlapping
                do {
                    top = Math.random() * 90
                    left = Math.random() * 90
                    overlapping = occupiedSpaces.some(
                        (space) => Math.abs(space.top - top) < 10 && Math.abs(space.left - left) < 10,
                    )
                } while (overlapping)

                occupiedSpaces.push({ top, left })
                newStates.push({
                    top: `${top}%`,
                    left: `${left}%`,
                    size: baseSize + Math.random() * baseSize,
                    animationType: Math.floor(Math.random() * 4),
                })
            }
            setIconStates(newStates)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const getAnimation = (type: number) => {
        switch (type) {
            case 0: // rotate
                return { rotate: [0, 360] }
            case 1: // pulse
                return { scale: [1, 1.1, 1] }
            case 2: // bounce
                return { y: [0, -10, 0] }
            case 3: // wave
                return { x: [-5, 5, -5] }
            default:
                return {}
        }
    }

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
            {iconStates.map((state, index) => (
                <motion.div
                    key={index}
                    className="absolute text-gray-200 opacity-30"
                    style={{
                        top: state.top,
                        left: state.left,
                        width: state.size,
                        height: state.size,
                    }}
                    animate={
                        isClient
                            ? {
                                ...getAnimation(state.animationType),
                            }
                            : {}
                    }
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                >
                    <Icon icon={iconNames[index]} width="100%" height="100%" />
                </motion.div>
            ))}
        </div>
    )
}

export default GlassBackground

