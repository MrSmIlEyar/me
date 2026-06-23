"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
    className?: string
}

const LANGS = ["ru", "en"] as const

const LanguageSwitcher: React.FC<Props> = ({ className }) => {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language?.startsWith("en") ? "en" : "ru"
    // уникальный id, чтобы несколько переключателей на странице не делили один layoutId
    const pillId = React.useId()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (
        <div
            className={cn(
                className,
                "relative flex justify-center items-center gap-1 backdrop-blur-lg rounded-xl p-1 border-white border text-[12px]",
            )}
        >
            {LANGS.map((lng) => {
                const active = currentLanguage === lng
                return (
                    <button
                        key={lng}
                        onClick={() => changeLanguage(lng)}
                        className={cn(
                            "relative px-2 py-0.5 rounded-lg transition-colors duration-300",
                            active ? "text-black" : "text-white/80 hover:text-white",
                        )}
                    >
                        {active && (
                            <motion.span
                                layoutId={`lang-pill-${pillId}`}
                                className="absolute inset-0 rounded-lg bg-white"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{lng}</span>
                    </button>
                )
            })}
        </div>
    )
}

export default LanguageSwitcher
