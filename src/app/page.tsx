'use client'

import React, {useState, useEffect} from 'react';
import {Download, Github, Mail} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Icon} from '@iconify/react';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {ParallaxProvider, Parallax} from 'react-scroll-parallax';
import {useInView} from 'react-intersection-observer';
import {Progress} from "@/components/ui/progress"
import {MetrikaCounter} from "react-metrika";
import {TypeAnimation} from "react-type-animation";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import '@/i18n';
import {useTranslation} from 'react-i18next';
import Quote from "@/components/shared/Quote";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isSticky, setIsSticky] = useState(false);

    const {t} = useTranslation();

    // хук под прогресс бар
    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 200)
        return () => clearTimeout(timer);
    }, []);

    // хук под загрузку
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // хук под перемещение LanguageSwitcher
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset;
            setIsSticky(scrollPosition > window.innerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [ref, inView] = useInView({
        threshold: 1,
        delay: 1,
    });

    return (
        <ParallaxProvider>
            <div className='grid place-items-center min-h-screen'>
                <div className='grid place-items-center gap-7'>
                    {loading ? (
                        <Skeleton circle width={200} height={200}/>
                    ) : (
                        <Parallax>
                            <Avatar className='w-[200px] h-[200px] border-2 border-gray-200 fade-in'>
                                <AvatarImage src='https://i.postimg.cc/90yLsQ2y/Picsart-24-11-02-23-55-46-822.png'
                                             width={250} height={1500}/>
                                <AvatarFallback>ЕЯ</AvatarFallback>
                            </Avatar>
                        </Parallax>
                    )}
                    {loading ? (
                        <Skeleton width={200}/>
                    ) : (
                        <div className='text-xl font-bold flex justify-center w-[5]'>
                            <TypeAnimation
                                sequence={[
                                    'Efremov Yaroslav',
                                    1000,
                                    'Grach',
                                    1000,
                                    'Fullstack Developer',
                                    1000,
                                    'Dyva (G-Group)',
                                    1000,
                                ]}
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    )}
                    <div className='grid grid-cols-3 gap-x-10 gap-y-5'>
                        {loading ? (
                            <>
                                <Skeleton circle width={32} height={32}/>
                                <Skeleton circle width={32} height={32}/>
                                <Skeleton circle width={32} height={32}/>
                                <Skeleton circle width={32} height={32}/>
                                <Skeleton circle width={32} height={32}/>
                                <Skeleton circle width={32} height={32}/>
                            </>
                        ) : (
                            <>
                                <Icon icon='mdi:react' width={32} height={32} className='fade-in'/>
                                <Icon icon='lineicons:typescript' width={32} height={32} className='fade-in'/>
                                <Icon icon="ri:nextjs-fill" width={32} height={32} className='fade-in'/>
                                <Icon icon='tabler:brand-django' width={32} height={32} className='fade-in'/>
                                <Icon icon="devicon-plain:fastapi" width={32} height={32} className='fade-in'/>
                                <Icon icon="logos:flask" width={32} height={32} className='fade-in'/>
                                <Icon icon='tabler:sql' width={32} height={32} className='fade-in'/>
                                <Icon icon='mdi:docker' width={32} height={32} className='fade-in'/>
                                <Icon icon='cib:nginx' width={32} height={32} className='fade-in'/>
                            </>
                        )}
                    </div>
                    <Progress value={progress} className="h-1.5 rounded-2xl max-w-24"></Progress>
                    <div className='grid grid-cols-3 gap-10'>
                        {loading ? (
                            <>
                                <Skeleton circle width={32} height={32}/>
                                <Skeleton circle width={32} height={32}/>
                                <Skeleton circle width={32} height={32}/>
                            </>
                        ) : (
                            <>
                                <a href='mailto:yaroslav.efrem@yandex.ru' target='_blank'>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Mail width={32} height={32} className='fade-in'/>
                                        </HoverCardTrigger>
                                        <HoverCardContent className='w-auto'>
                                            <div className='flex gap-1 items-center'>
                                                <Avatar>
                                                    <AvatarImage
                                                        src='https://avatars.mds.yandex.net/i?id=4a3590a6c66625c5d0b93582b3079517_l-4576159-images-thumbs&n=13'
                                                    />
                                                </Avatar>
                                                yaroslav.efrem@yandex.ru
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </a>
                                <a href='https://github.com/MrSmIlEyar' target='_blank'>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Github width={32} height={32} className='fade-in'/>
                                        </HoverCardTrigger>
                                        <HoverCardContent className='w-auto'>
                                            <div className='flex gap-2 items-center'>
                                                <Avatar>
                                                    <AvatarImage
                                                        src='https://avatars.githubusercontent.com/u/94910911?v=4'
                                                    />
                                                </Avatar>
                                                MrSmIlEyar
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </a>
                                <a href='https://t.me/ggrraachh' target='_blank'>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Icon icon='line-md:telegram' width={32} height={32} className='fade-in'/>
                                        </HoverCardTrigger>
                                        <HoverCardContent className='w-auto'>
                                            <div className='flex gap-2 items-center'>
                                                <Avatar>
                                                    <AvatarImage
                                                        src='https://i.postimg.cc/NF9HP5XM/image.png'
                                                    />
                                                </Avatar>
                                                @ggrraachh
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </a>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-1 place-items-center gap-5">
                        {loading ? (
                            <Skeleton width={150}/>
                        ) : (
                            <a
                                href='/CV_Fullstack_Developer.pdf'
                                download='CV_Fullstack_Developer.pdf'
                                target='_blank'
                                className='flex gap-2 bg-black text-white p-2 rounded-xl hover:bg-gray-800 fade-in'
                            >
                                <Download/> Download CV
                            </a>
                        )}
                        {loading ? (
                            <Skeleton circle width={25} height={25}/>
                        ) : (
                            <Icon icon="simple-line-icons:arrow-down" className="font-bold animate-bounce"/>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-2 bg-black min-h-screen">
                <Parallax>
                    <div ref={ref} className={`grid gap-3 bg-black text-white p-5 ${inView ? 'fade-in' : ''}`}>
                        <div className={`langDiv sticky flex top-2 z-10 transition duration-1000 ease-in-out ${isSticky ? `justify-end` : 'justify-center'}`}>
                            <LanguageSwitcher />
                        </div>
                        <div className="flex items-center">
                            <div className="flex-grow h-px bg-white"></div>
                            <div className="flex-shrink text-2xl text-white px-4 font-light">
                                <h2 className='text-2xl font-bold'>{t('AboutMeTitle')}</h2>
                            </div>
                            <div className="flex-grow h-px bg-white"></div>
                        </div>
                        <div className='flex gap-2 items-center justify-start text-sm'>
                            <Icon icon="mdi:location" className='fade-in'/>
                            <p>{t('City')}</p>
                        </div>
                        <div className='flex gap-2 items-center justify-start text-sm'>
                            <Icon icon="tdesign:education"/>
                            <p>{t('University')}</p>
                        </div>
                        <div className='flex gap-2 items-center justify-start text-sm'>
                            <Icon icon="material-symbols:work"/>
                            <p>{t('Work')}</p>
                        </div>
                        <p>
                            {t('AboutMe')}
                        </p>
                        <div className="flex items-center">
                            <div className="flex-grow h-px bg-white"></div>
                            <div className="flex-shrink text-2xl text-white px-4 font-light">
                                <h2 className='text-2xl font-bold'>{t('Career')}</h2>
                            </div>
                            <div className="flex-grow h-px bg-white"></div>
                        </div>
                        <ul className='space-y-4'>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>SLON
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icomoon-free:info" className="flex-shrink-0"/> {t('SlonAbout')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime"/> {t('SlonTime')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-baseline text-sm'>
                                            <Icon icon="icon-park-outline:instruction" className="flex-shrink-0" />
                                            <div className='grid gap-1'>
                                                <div className='flex gap-2'>
                                                    <p>Backend: </p>
                                                    <p>Bash, aiogram</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p>DB-system: </p>
                                                    <p>MariaDB, Prisma</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="line-md:telegram"/> <a href='https://t.me/slonrobot'
                                                                               className='underline'>@slonrobot</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>THX Bot Group
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icomoon-free:info" className="flex-shrink-0"/> {t('THXAbout')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime" className="flex-shrink-0"/> {t('THXTime')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icon-park-outline:instruction" className="flex-shrink-0"/>
                                            {t('THXStack')}
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>Megamailer
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex gap-2 items-baseline text-sm'>
                                            <Icon icon="icomoon-free:info" className="flex-shrink-0"/> {t('MegamailerAbout')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime" className="flex-shrink-0"/> {t('MegamailerTime')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-baseline text-sm'>
                                            <Icon icon="icon-park-outline:instruction" className="flex-shrink-0"/>
                                            <div className='grid gap-1'>
                                                <div className='flex gap-2'>
                                                    <p>Backend: </p>
                                                    <p>Django, Flask</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p>Frontend:</p>
                                                    <p>React</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p>DB-system: </p>
                                                    <p>PostgreSQL, MySQL</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p>Deployment:</p>
                                                    <p>Docker</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>{t('Internetika')}
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex items-baseline gap-2 text-sm'>
                                            <Icon icon="icomoon-free:info"/> {t('InternetikaAbout')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime"/> {t('InternetikaTime')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                        <Icon icon="icon-park-outline:instruction"/> {t('InternetikaStack')}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="material-symbols:link"/> <a href='https://internetika.dev/'
                                                                                    className='underline'>{t('InternetikaLink')}</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-fill-16"/>{t('Dyva')}
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex md:items-center gap-2 items-baseline text-sm'>
                                            <Icon icon="icomoon-free:info" className="flex-shrink-0"/>
                                            <div className="flex-1 leading-tight">
                                                <p>{t('DyvaAbout')}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime"/>
                                            <p>{t('DyvaTime')}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-start text-sm'>
                                            <Icon icon="icon-park-outline:instruction" className="flex-shrink-0"/>
                                            <div className='grid gap-1'>
                                                <div className='flex gap-2'>
                                                    <p>Backend: </p>
                                                    <p>Django, Redis, Memcached, Celery, OpenAPI</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p>Frontend:</p>
                                                    <p>TypeScript, React, NextJS</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p>DB-system: </p>
                                                    <p>PostgreSQL, S3</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p>Deployment:</p>
                                                    <p>Kubernetes, Helm, Docker, Gitlab CI/CD</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="material-symbols:link"/> <a href='https://dyva.site/'
                                                                                    className='underline'>{t('DyvaLink')}</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Parallax>
            </div>
            <div className="bg-white">
                <Parallax>
                    <div className="grid gap-3 p-5">
                        <div className="flex items-center">
                            <div className="flex-grow h-px bg-black"></div>
                            <div className="flex-shrink text-2xl text-black px-4 font-light">
                                <h2 className='text-2xl font-bold'>{t('Hobby')}</h2>
                            </div>
                            <div className="flex-grow h-px bg-black"></div>
                        </div>
                        <ul className='space-y-4'>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>{t('Chess')}
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="simple-icons:lichess"/> <a
                                            href='https://lichess.org/@/Mr_Smile_XD'
                                            className='underline'>{t('ChessAbout')}</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>{t('RubiksCube')}
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icomoon-free:info"/> {t('RubiksCubeTime')}
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="flex items-center">
                            <div className="flex-grow h-px bg-black"></div>
                            <div className="flex-shrink text-2xl text-black px-4 font-light">
                                <h2 className='text-2xl font-bold'>{t('Quotes')}</h2>
                            </div>
                            <div className="flex-grow h-px bg-black"></div>
                        </div>
                        <div className="min-w-full">
                            <Quote/>
                        </div>
                        <div className="flex items-center h-1.5">
                            <div className='flex-grow h-px bg-black'></div>
                        </div>
                        <div className="flex items-center justify-center gap-10">
                            <MetrikaCounter
                                id={98695129}
                                options={{
                                    trackHash: true,
                                    webvisor: true
                                }}
                            />
                            <a href='https://github.com/MrSmIlEyar/me' target='_blank'
                               className="underline text-[12px] flex gap-1 justify-center items-center">
                                source code
                            </a>
                            <a onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                })
                            }}
                               className="underline text-[12px] hover:cursor-pointer flex gap-1 justify-center items-center">back
                                to top
                            </a>
                        </div>
                    </div>
                </Parallax>
            </div>
        </ParallaxProvider>
    );
}
