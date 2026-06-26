"use client"

import React, { useRef } from "react"
import { Icon } from "@iconify/react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import type { TFunction } from "i18next"

type StackGroup = { label: string; items: string[] }

type Job = {
    id: string
    title: string
    aboutKey: string
    timeKey: string
    stacks: StackGroup[]
    link?: { icon: string; href: string; labelKey: string }
}

interface Props {
    t: TFunction
}

const CareerTimeline: React.FC<Props> = ({ t }) => {
    const lineRef = useRef<HTMLDivElement | null>(null)
    // The timeline line draws itself as this block scrolls through the viewport.
    const { scrollYProgress } = useScroll({
        target: lineRef,
        offset: ["start 85%", "end 60%"],
    })
    const lineScaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
    const lineGlow = useTransform(scrollYProgress, [0, 1], [0.25, 0.7])

    const jobs: Job[] = [
        {
            id: "SLON",
            title: "SLON",
            aboutKey: "SlonAbout",
            timeKey: "SlonTime",
            stacks: [
                { label: "Backend", items: ["Bash", "aiogram"] },
                { label: "DB-system", items: ["MariaDB", "Prisma"] },
            ],
            link: { icon: "line-md:telegram", href: "https://t.me/slonrobot", labelKey: "@slonrobot" },
        },
        {
            id: "Megamailer",
            title: "Megamailer",
            aboutKey: "MegamailerAbout",
            timeKey: "MegamailerTime",
            stacks: [
                { label: "Backend", items: ["Django", "Flask"] },
                { label: "Frontend", items: ["React"] },
                { label: "DB-system", items: ["PostgreSQL", "MySQL"] },
                { label: "Deployment", items: ["Docker"] },
            ],
        },
        {
            id: "Dyva",
            title: t("Dyva"),
            aboutKey: "DyvaAbout",
            timeKey: "DyvaTime",
            stacks: [
                { label: "Backend", items: ["Django", "Redis", "Memcached", "Celery", "OpenAPI"] },
                { label: "Frontend", items: ["TypeScript", "React", "NextJS"] },
                { label: "DB-system", items: ["PostgreSQL", "S3"] },
                { label: "Deployment", items: ["Kubernetes", "Helm", "Docker", "Gitlab CI/CD"] },
            ],
            link: { icon: "material-symbols:link", href: "https://dyva.site/", labelKey: "DyvaLink" },
        },
    ]

    return (
        <div ref={lineRef} className="relative ml-1 pl-7">
            {/* faint static rail */}
            <div aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-px bg-white/15" />
            {/* animated rail that draws on scroll */}
            <motion.div
                aria-hidden="true"
                className="absolute left-0 top-2 bottom-2 w-px origin-top bg-white"
                style={{ scaleY: lineScaleY, opacity: lineGlow, boxShadow: "0 0 8px rgba(255,255,255,0.8)" }}
            />

            <ul className="space-y-4">
                {jobs.map((job, index) => (
                    <motion.li
                        key={job.id}
                        className="relative"
                        initial={{ opacity: 0, x: -28 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    >
                        {/* pulsing node */}
                        <span aria-hidden="true" className="absolute -left-[31px] top-5 flex h-3 w-3 items-center justify-center">
                            <motion.span
                                className="absolute inline-flex h-full w-full rounded-full bg-white/60"
                                animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: index * 0.4 }}
                            />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-white ring-4 ring-black" />
                        </span>

                        {/* elevated glass card */}
                        <motion.div
                            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/40"
                            whileHover={{ y: -4, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        >
                            {/* sheen sweep on hover */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                            />

                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="text-lg font-bold tracking-tight">{job.title}</h3>
                                <span className="flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-0.5 text-xs text-white/80">
                                    <Icon icon="formkit:datetime" className="shrink-0" />
                                    {t(job.timeKey)}
                                </span>
                            </div>

                            <div className="mt-2 flex items-start gap-2 text-sm leading-snug text-white/85">
                                <Icon icon="icomoon-free:info" className="mt-0.5 shrink-0" />
                                <p>{t(job.aboutKey)}</p>
                            </div>

                            <div className="mt-3 space-y-2">
                                {job.stacks.map((group) => (
                                    <div key={group.label} className="flex flex-wrap items-center gap-1.5">
                                        <span className="mr-1 text-xs font-medium uppercase tracking-wide text-white/50">
                                            {group.label}
                                        </span>
                                        {group.items.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-white/90 transition-colors duration-200 hover:border-white/50 hover:bg-white hover:text-black"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {job.link && (
                                <div className="mt-3 flex items-center gap-2 text-sm">
                                    <Icon icon={job.link.icon} className="shrink-0" />
                                    <a
                                        href={job.link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white"
                                    >
                                        {t(job.link.labelKey)}
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </motion.li>
                ))}
            </ul>
        </div>
    )
}

export default CareerTimeline
