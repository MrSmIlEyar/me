"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
    title: string
    /** when true, lines/text render white (for use on a dark background) */
    light?: boolean
}

const SectionDivider: React.FC<Props> = ({ title, light }) => {
    const lineClass = cn("flex-grow h-px", light ? "bg-white" : "bg-black")

    return (
        <motion.div
            className="flex items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
        >
            <motion.div
                className={cn(lineClass, "origin-right")}
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
                className="flex-shrink px-4"
                variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            >
                <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">{title}</h2>
            </motion.div>
            <motion.div
                className={cn(lineClass, "origin-left")}
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
        </motion.div>
    )
}

export default SectionDivider
