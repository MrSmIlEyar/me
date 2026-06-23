"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Download, Github, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icon } from "@iconify/react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import { useInView } from "react-intersection-observer"
import { Progress } from "@/components/ui/progress"
import { MetrikaCounter } from "react-metrika"
import { TypeAnimation } from "react-type-animation"
import LanguageSwitcher from "@/components/shared/LanguageSwitcher"
import "@/i18n"
import { useTranslation } from "react-i18next"
import Quote from "@/components/shared/Quote"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Spotlight from "@/components/shared/Spotlight"
import Grain from "@/components/shared/Grain"
import Magnetic from "@/components/shared/Magnetic"
import SectionDivider from "@/components/shared/SectionDivider"

export default function Home() {
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [isSticky, setIsSticky] = useState(false)

    const { t, i18n } = useTranslation()

    // хук под прогресс бар
    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 200)
        return () => clearTimeout(timer)
    }, [])

    // хук под загрузку
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 250)
        return () => clearTimeout(timer)
    }, [])

    // хук под перемещение LanguageSwitcher
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset
            setIsSticky(scrollPosition > window.innerHeight)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const [ref, inView] = useInView({
        threshold: 0,
        delay: 0,
    })

    const { scrollYProgress } = useScroll()
    const careerOpacity = useTransform(scrollYProgress, [0.02, 0.08], [0, 1])
    const careerY = useTransform(scrollYProgress, [0.02, 0.08], [40, 0])

    // smooth top scroll-progress indicator
    const progressScaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <ParallaxProvider>
            <div className="relative min-h-screen">
                <motion.div
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 h-[3px] bg-black origin-left z-50"
                    style={{ scaleX: progressScaleX }}
                />
                <Spotlight />
                <Grain />
                <div className="grid place-items-center min-h-screen relative z-10">
                    <div className="grid place-items-center gap-7">
                        {loading ? (
                            <Skeleton width={160} height={155} borderRadius="1rem" />
                        ) : (
                            <Parallax>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.92, y: 12 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="group relative flex justify-center"
                                >
                                    <Image
                                        src="/me.png"
                                        alt="Yaroslav Efremov"
                                        width={600}
                                        height={580}
                                        priority
                                        sizes="(max-width: 640px) 160px, 180px"
                                        className="h-auto w-[160px] sm:w-[180px] object-contain"
                                    />
                                </motion.div>
                            </Parallax>
                        )}
                        {loading ? (
                            <Skeleton width={200} />
                        ) : (
                            <div className="text-xl font-bold flex justify-center w-[5] shimmer-text">
                                <TypeAnimation
                                    sequence={[
                                        "Yaroslav Efremov",
                                        1000,
                                        "Grach",
                                        1000,
                                        "Fullstack Developer",
                                        1000,
                                        "DyVa (G-Group)",
                                        1000,
                                    ]}
                                    speed={50}
                                    repeat={Number.POSITIVE_INFINITY}
                                />
                            </div>
                        )}
                        <motion.div
                            className="grid grid-cols-3 gap-x-10 gap-y-5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {loading ? (
                                <>
                                    <Skeleton circle width={32} height={32} />
                                    <Skeleton circle width={32} height={32} />
                                    <Skeleton circle width={32} height={32} />
                                    <Skeleton circle width={32} height={32} />
                                    <Skeleton circle width={32} height={32} />
                                    <Skeleton circle width={32} height={32} />
                                </>
                            ) : (
                                <>
                                    <Icon icon="mdi:react" width={32} height={32} className="fade-in animate-spin-slow" />
                                    <Icon icon="lineicons:typescript" width={32} height={32} className="fade-in grayscale transition-all duration-300 hover:grayscale-0 hover:scale-125" />
                                    <Icon icon="ri:nextjs-fill" width={32} height={32} className="fade-in grayscale transition-all duration-300 hover:grayscale-0 hover:scale-125" />
                                    <Icon icon="tabler:brand-django" width={32} height={32} className="fade-in grayscale transition-all duration-300 hover:grayscale-0 hover:scale-125" />
                                    <Icon icon="devicon-plain:fastapi" width={32} height={32} className="fade-in grayscale transition-all duration-300 hover:grayscale-0 hover:scale-125" />
                                    <Icon icon="logos:flask" width={32} height={32} className="fade-in grayscale transition-all duration-300 hover:grayscale-0 hover:scale-125" />
                                    <Icon icon="tabler:sql" width={32} height={32} className="fade-in grayscale transition-all duration-300 hover:grayscale-0 hover:scale-125" />
                                    <Icon icon="mdi:docker" width={32} height={32} className="fade-in grayscale transition-all duration-300 hover:grayscale-0 hover:scale-125" />
                                    <Icon icon="cib:nginx" width={32} height={32} className="fade-in grayscale transition-all duration-300 hover:grayscale-0 hover:scale-125" />
                                </>
                            )}
                        </motion.div>
                        <Progress value={progress} className="h-1.5 rounded-2xl max-w-24"></Progress>
                        <motion.div
                            className="grid grid-cols-3 gap-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {loading ? (
                                <>
                                    <Skeleton circle width={32} height={32} />
                                    <Skeleton circle width={32} height={32} />
                                    <Skeleton circle width={32} height={32} />
                                </>
                            ) : (
                                <>
                                    <a href="mailto:yaroslav.efrem@yandex.ru" target="_blank" rel="noreferrer">
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Mail width={32} height={32} className="fade-in" />
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-auto">
                                                <div className="flex gap-1 items-center">
                                                    <Avatar>
                                                        <AvatarImage src="https://avatars.mds.yandex.net/i?id=4a3590a6c66625c5d0b93582b3079517_l-4576159-images-thumbs&n=13" />
                                                    </Avatar>
                                                    yaroslav.efrem@yandex.ru
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </a>
                                    <a href="https://github.com/MrSmIlEyar" target="_blank" rel="noreferrer">
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Github width={32} height={32} className="fade-in" />
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-auto">
                                                <div className="flex gap-2 items-center">
                                                    <Avatar>
                                                        <AvatarImage src="https://avatars.githubusercontent.com/u/94910911?v=4" />
                                                    </Avatar>
                                                    MrSmIlEyar
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </a>
                                    <a href="https://t.me/ggrraachh" target="_blank" rel="noreferrer">
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Icon icon="line-md:telegram" width={32} height={32} className="fade-in" />
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-auto">
                                                <div className="flex gap-2 items-center">
                                                    <Avatar>
                                                        <AvatarImage src="https://i.postimg.cc/NF9HP5XM/image.png" />
                                                    </Avatar>
                                                    @ggrraachh
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </a>
                                </>
                            )}
                        </motion.div>
                        <div className="grid grid-cols-1 place-items-center gap-5">
                            {loading ? (
                                <Skeleton width={150} />
                            ) : (
                                <Magnetic strength={0.5}>
                                    <motion.a
                                        href="/CV_Fullstack_Developer.pdf"
                                        download="CV_Fullstack_Developer.pdf"
                                        target="_blank"
                                        className="group relative flex gap-2 overflow-hidden bg-black text-white p-2 px-4 rounded-xl"
                                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.95 }}
                                        rel="noreferrer"
                                    >
                                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                        <Download className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                                        <span className="relative">Download CV</span>
                                    </motion.a>
                                </Magnetic>
                            )}
                            {loading ? (
                                <Skeleton circle width={25} height={25} />
                            ) : (
                                <Icon icon="simple-line-icons:arrow-down" className="font-bold animate-bounce" />
                            )}
                        </div>
                    </div>
                </div>
                <motion.div
                    className="mt-2 backdrop-blur-sm"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.05 }}
                >
                    <Parallax>
                        <div ref={ref} className={`grid gap-3 bg-black bg-opacity-85 text-white p-5 backdrop-blur-xl ${inView ? "fade-in" : ""}`}>
                            <div className="langDiv sticky flex top-2 z-10 w-full">
                                <motion.div
                                    layout
                                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                                    className={isSticky ? "ml-auto" : "mx-auto"}
                                >
                                    <LanguageSwitcher />
                                </motion.div>
                            </div>
                            <motion.div style={{ opacity: careerOpacity, y: careerY }} className="space-y-4">
                                <motion.div
                                    key={i18n.language}
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 0.45, ease: "easeOut" }}
                                    className="space-y-4"
                                >
                                    <SectionDivider title={t("AboutMeTitle")} light />
                                    <motion.div
                                        className="flex gap-2 items-center justify-start"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.8 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Icon icon="mdi:location" className="shrink-0" />
                                        <p>{t("City")}</p>
                                    </motion.div>
                                    <motion.div
                                        className="flex gap-2 items-center justify-start"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.8 }}
                                        transition={{ duration: 0.4, delay: 0.08 }}
                                    >
                                        <Icon icon="material-symbols:work" className="shrink-0" />
                                        <p>{t("Work")}</p>
                                    </motion.div>
                                    <p className="leading-relaxed text-white/90">{t("AboutMe")}</p>
                                    <SectionDivider title={t("Career")} light />
                                    <motion.ul className="relative ml-1 space-y-2 border-l border-white/20 pl-5">
                                        {["SLON", "Megamailer", t("Dyva")].map((item, index) => (
                                            <motion.li
                                                key={item}
                                                className="relative space-y-3 py-3 pr-3 origin-left"
                                                initial={{ opacity: 0, x: -28 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.3 }}
                                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                                whileHover={{ scale: 1.03 }}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute -left-[25px] top-[18px] h-2.5 w-2.5 rounded-full bg-white ring-4 ring-black"
                                                />
                                                <div className="flex gap-2 items-center font-bold text-lg">
                                                    {item}
                                                </div>
                                                {item === "SLON" && (
                                                    <ul className="ml-2 space-y-1 space-x-3">
                                                        <li>
                                                            <div className="flex gap-2 items-center text-sm ml-3">
                                                                <Icon icon="icomoon-free:info"
                                                                    className="flex-shrink-0" /> {t("SlonAbout")}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex gap-2 items-center text-sm">
                                                                <Icon icon="formkit:datetime" /> {t("SlonTime")}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex gap-2 items-start text-sm">
                                                                <Icon icon="icon-park-outline:instruction"
                                                                    className="flex-shrink-0 mt-0.5" />
                                                                <div className="grid gap-1">
                                                                    <p><span className="font-medium">Backend:</span> Bash, aiogram</p>
                                                                    <p><span className="font-medium">DB-system:</span> MariaDB, Prisma</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex gap-2 items-center text-sm">
                                                                <Icon icon="line-md:telegram" />{" "}
                                                                <a href="https://t.me/slonrobot" className="underline">
                                                                    @slonrobot
                                                                </a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                )}
                                                {item === "Megamailer" && (
                                                    <ul className="ml-2 space-y-1 space-x-3">
                                                        <li>
                                                            <div className="flex gap-2 items-baseline text-sm ml-3">
                                                                <Icon icon="icomoon-free:info" className="flex-shrink-0" /> {t("MegamailerAbout")}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex gap-2 items-center text-sm">
                                                                <Icon icon="formkit:datetime" className="flex-shrink-0" /> {t("MegamailerTime")}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex gap-2 items-start text-sm">
                                                                <Icon icon="icon-park-outline:instruction" className="flex-shrink-0 mt-0.5" />
                                                                <div className="grid gap-1">
                                                                    <p><span className="font-medium">Backend:</span> Django, Flask</p>
                                                                    <p><span className="font-medium">Frontend:</span> React</p>
                                                                    <p><span className="font-medium">DB-system:</span> PostgreSQL, MySQL</p>
                                                                    <p><span className="font-medium">Deployment:</span> Docker</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                )}
                                                {item === t("Dyva") && (
                                                    <ul className="ml-2 space-y-1 space-x-3">
                                                        <li>
                                                            <div className="flex md:items-center gap-2 items-baseline text-sm ml-3">
                                                                <Icon icon="icomoon-free:info" className="flex-shrink-0" />
                                                                <div className="flex-1 leading-tight">
                                                                    <p>{t("DyvaAbout")}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex gap-2 items-center text-sm">
                                                                <Icon icon="formkit:datetime" />
                                                                <p>{t("DyvaTime")}</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex gap-2 items-start text-sm">
                                                                <Icon icon="icon-park-outline:instruction" className="flex-shrink-0 mt-0.5" />
                                                                <div className="grid gap-1">
                                                                    <p><span className="font-medium">Backend:</span> Django, Redis, Memcached, Celery, OpenAPI</p>
                                                                    <p><span className="font-medium">Frontend:</span> TypeScript, React, NextJS</p>
                                                                    <p><span className="font-medium">DB-system:</span> PostgreSQL, S3</p>
                                                                    <p><span className="font-medium">Deployment:</span> Kubernetes, Helm, Docker, Gitlab CI/CD</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex gap-2 items-center text-sm">
                                                                <Icon icon="material-symbols:link" />{" "}
                                                                <a href="https://dyva.site/" className="underline">
                                                                    {t("DyvaLink")}
                                                                </a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                )}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            </motion.div>
                        </div>
                    </Parallax>
                </motion.div>
                <motion.div
                    className="bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <Parallax>
                        <motion.div
                            key={i18n.language}
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                            <div className="grid gap-3 p-5">
                                <SectionDivider title={t("Hobby")} />
                                <ul className="grid gap-3 sm:grid-cols-2">

                                    <motion.li
                                        className="group relative overflow-hidden rounded-xl border border-black/15 p-4 transition-all duration-300 hover:border-black hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 sm:col-span-2"
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <Icon
                                            icon="mdi:usb-flash-drive"
                                            aria-hidden="true"
                                            className="pointer-events-none absolute -right-3 -bottom-3 text-black/5 transition-all duration-500 group-hover:text-black/10 group-hover:scale-110"
                                            width={88}
                                            height={88}
                                        />
                                        <div className="relative space-y-3">
                                            <div className="flex gap-2 items-center font-bold">
                                                <Icon icon="octicon:dot-16" />
                                                {t("YrStore")}
                                            </div>
                                            <div className="flex gap-2 items-center text-sm text-black/70 transition-transform duration-300 group-hover:translate-x-1">
                                                <Icon icon="mdi:usb-flash-drive" className="shrink-0" />{" "}
                                                <a href="https://yr-store.ru" target="_blank" rel="noreferrer" className="link-underline">
                                                    {t("YrStoreLink")}
                                                </a>
                                            </div>
                                        </div>
                                    </motion.li>
                                </ul>
                                <SectionDivider title={t("Quotes")} />
                                <div className="min-w-full">
                                    <Quote />
                                </div>
                                <div className="flex items-center h-1.5">
                                    <div className="flex-grow h-px bg-black"></div>
                                </div>
                                <div className="flex items-center justify-center gap-10">
                                    <MetrikaCounter
                                        id={98695129}
                                        options={{
                                            trackHash: true,
                                            webvisor: true,
                                        }}
                                    />
                                    <a
                                        href="https://github.com/MrSmIlEyar/me"
                                        target="_blank"
                                        className="group text-[12px] flex gap-1 justify-center items-center"
                                        rel="noreferrer"
                                    >
                                        <Github width={13} height={13} className="transition-transform duration-300 group-hover:rotate-12" />
                                        <span className="link-underline">source code</span>
                                    </a>
                                    <a
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                            })
                                        }}
                                        className="group text-[12px] hover:cursor-pointer flex gap-1 justify-center items-center"
                                    >
                                        <Icon icon="simple-line-icons:arrow-up" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                                        <span className="link-underline">back to top</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </Parallax>
                </motion.div>
            </div>
        </ParallaxProvider>
    )
}

