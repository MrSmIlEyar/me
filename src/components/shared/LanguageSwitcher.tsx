"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { sheenHandlers } from "@/lib/use-sheen"

interface Props {
    className?: string
    theme?: "dark" | "light"
}

const LANGS = ["ru", "en"] as const

const LanguageSwitcher: React.FC<Props> = ({ className, theme = "dark" }) => {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language?.startsWith("en") ? "en" : "ru"
    // уникальный id, чтобы несколько переключателей на странице не делили один layoutId
    const pillId = React.useId()
    const isLight = theme === "light"

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (
        <div
            {...sheenHandlers}
            className={cn(
                className,
                "glass-sheen relative flex justify-center items-center gap-0.5 rounded-full p-1 text-[12px]",
                isLight ? "glass" : "glass-dark",
            )}
        >
            {LANGS.map((lng) => {
                const active = currentLanguage === lng
                return (
                    <button
                        key={lng}
                        onClick={() => changeLanguage(lng)}
                        aria-pressed={active}
                        className={cn(
                            "glass-press relative z-10 rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors duration-300",
                            active
                                ? isLight
                                    ? "text-black"
                                    : "text-white"
                                : isLight
                                  ? "text-black/50 hover:text-black/80"
                                  : "text-white/55 hover:text-white/85",
                        )}
                    >
                        {active && (
                            <motion.span
                                aria-hidden="true"
                                layoutId={`lang-pill-${pillId}`}
                                className={cn(
                                    "absolute inset-0 -z-10 rounded-full",
                                    // the moving pill is itself a lens of brighter glass
                                    isLight
                                        ? "bg-white/85 shadow-[0_2px_8px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
                                        : "bg-white/22 shadow-[0_2px_8px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.4)]",
                                )}
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className="relative">{lng}</span>
                    </button>
                )
            })}
        </div>
    )
}

export default LanguageSwitcher
