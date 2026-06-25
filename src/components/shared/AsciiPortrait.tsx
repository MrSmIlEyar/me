"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
    src: string
    alt: string
    /** number of character columns for the ASCII render (more = finer) */
    cols?: number
    className?: string
    imageClassName?: string
    priority?: boolean
    sizes?: string
}

// Dark -> light ramp. White / transparent pixels map to a space.
const RAMP = "@#MW%8&Bao+=~-:. "

// Monospace glyph advance width relative to its line-height (≈0.6em wide per 1em tall).
// Used for BOTH the row count and the font sizing so the ASCII block fills the
// exact same box as the photo (otherwise the text appears shorter on hover).
const CHAR_RATIO = 0.6

/**
 * Portrait that "scatters" into ASCII art on hover and re-assembles on leave.
 * The ASCII is computed once from the image pixels (via an offscreen canvas)
 * and rendered as monospace text overlaying the original photo.
 */
const AsciiPortrait: React.FC<Props> = ({
    src,
    alt,
    cols = 72,
    className,
    imageClassName,
    priority,
    sizes,
}) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [ascii, setAscii] = useState<string>("")
    const [aspect, setAspect] = useState(1)
    const [fontSize, setFontSize] = useState(4)
    const [hovered, setHovered] = useState(false)

    // Build the ASCII string from the image once it can be read.
    useEffect(() => {
        let cancelled = false
        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.src = src
        img.onload = () => {
            if (cancelled) return
            const rows = Math.max(1, Math.round(cols * (img.height / img.width) * CHAR_RATIO))
            const canvas = document.createElement("canvas")
            canvas.width = cols
            canvas.height = rows
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            ctx.drawImage(img, 0, 0, cols, rows)
            const { data } = ctx.getImageData(0, 0, cols, rows)
            let out = ""
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const i = (r * cols + c) * 4
                    const alpha = data[i + 3]
                    if (alpha < 110) {
                        out += " "
                        continue
                    }
                    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255
                    const idx = Math.min(RAMP.length - 1, Math.floor(lum * (RAMP.length - 1)))
                    out += RAMP[idx]
                }
                out += "\n"
            }
            setAspect(img.width / img.height)
            setAscii(out)
        }
        return () => {
            cancelled = true
        }
    }, [src, cols])

    // Keep the ASCII text sized to the container so the overlay matches the photo.
    const measure = useCallback(() => {
        const el = wrapperRef.current
        if (!el) return
        // monospace char advance width ≈ CHAR_RATIO * font-size
        setFontSize(el.clientWidth / (cols * CHAR_RATIO))
    }, [cols])

    useEffect(() => {
        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [measure, ascii])

    return (
        <div
            ref={wrapperRef}
            className={className}
            style={{ aspectRatio: aspect }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative h-full w-full">
                <motion.div animate={{ opacity: hovered && ascii ? 0 : 1 }} transition={{ duration: 0.25 }}>
                    <Image
                        src={src}
                        alt={alt}
                        width={600}
                        height={580}
                        priority={priority}
                        sizes={sizes}
                        className={imageClassName}
                    />
                </motion.div>

                <AnimatePresence>
                    {hovered && ascii && (
                        <motion.pre
                            key="ascii"
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="pointer-events-none absolute inset-0 m-0 flex items-center justify-center overflow-hidden font-mono text-current"
                            style={{
                                fontSize: `${fontSize}px`,
                                lineHeight: `${fontSize}px`,
                                letterSpacing: 0,
                                whiteSpace: "pre",
                            }}
                        >
                            {ascii}
                        </motion.pre>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AsciiPortrait
