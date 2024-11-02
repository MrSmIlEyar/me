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

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 200)
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const [ref, inView] = useInView({
        threshold: 1,
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
                                <AvatarImage src='https://i.postimg.cc/90yLsQ2y/Picsart-24-11-02-23-55-46-822.png' width={250} height={1500}/>
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
                            <Icon icon="simple-line-icons:arrow-down" className="font-bold"/>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-2 bg-black min-h-screen">
                <Parallax>
                    <div ref={ref} className={`grid gap-3 bg-black text-white p-5 ${inView ? 'fade-in' : ''}`}>
                        <div className="flex items-center">
                            <div className="flex-grow h-px bg-white"></div>
                            <div className="flex-shrink text-2xl text-white px-4 font-light">
                                <h2 className='text-2xl font-bold'>О себе</h2>
                            </div>
                            <div className="flex-grow h-px bg-white"></div>
                        </div>
                        <div className='flex gap-2 items-center justify-start text-sm'>
                            <Icon icon="mdi:location" className='fade-in'/>
                            <p>Казань</p>
                        </div>
                        <div className='flex gap-2 items-center justify-start text-sm'>
                            <Icon icon="tdesign:education"/>
                            <p>КФУ ИТИС (2 курс)</p>
                        </div>
                        <div className='flex gap-2 items-center justify-start text-sm'>
                            <Icon icon="material-symbols:work"/>
                            <p>Интернетика (Middle React)</p>
                        </div>
                        <p>
                            Я - Fullstack разработчик с опытом работы в различных проектах.
                            Специализируюсь на разработке веб-приложений с использованием
                            современных технологий, таких как React, TypeScript, Django, SQL, Docker и Nginx.
                        </p>
                        <div className="flex items-center">
                            <div className="flex-grow h-px bg-white"></div>
                            <div className="flex-shrink text-2xl text-white px-4 font-light">
                                <h2 className='text-2xl font-bold'>Карьера</h2>
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
                                            <Icon icon="icomoon-free:info"/> Телеграмм бот арбитража рекламы
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime"/> Август 2023 - Апрель 2024
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icon-park-outline:instruction"/> aiogram, Bash, SQL
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
                                            <Icon icon="icomoon-free:info"/> Студия разработки Web App Telegram
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime"/> Август 2023 - Апрель 2024
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icon-park-outline:instruction"/> FastAPI, aiogram
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
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icomoon-free:info"/> Настройка рассылок по email
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime"/> Апрель 2024 - Август 2024
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icon-park-outline:instruction"/> Django, Flask, React, SQL,
                                            Docker
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>Интернетика
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex items-baseline gap-2 text-sm'>
                                            <Icon icon="icomoon-free:info"/> Студия разработки приложений для бизнеса
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="formkit:datetime"/> Октябрь 2024 - настоящее время
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icon-park-outline:instruction"/> React
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="material-symbols:link"/> <a href='https://internetika.dev/'
                                                                                    className='underline'>Сайт
                                            компании</a>
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
                                <h2 className='text-2xl font-bold'>Хобби</h2>
                            </div>
                            <div className="flex-grow h-px bg-black"></div>
                        </div>
                        <ul className='space-y-4'>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>Шахматы
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="simple-icons:lichess"/> <a
                                            href='https://lichess.org/@/Mr_Smile_XD' className='underline'>Профиль на
                                            Lichess</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-3'>
                                <div className='flex gap-2 items-center font-bold'>
                                    <Icon icon="octicon:dot-16"/>Сборка Кубика Рубика
                                </div>
                                <ul className='ml-6 space-y-1'>
                                    <li>
                                        <div className='flex gap-2 items-center text-sm'>
                                            <Icon icon="icomoon-free:info"/> Рекордное время: 28 секунд
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="flex items-center h-1.5">
                            <div className='flex-grow h-px bg-black'></div>
                        </div>
                        <div className="flex items-center justify-center">
                            <MetrikaCounter
                                id={98695129}
                                options={{
                                    trackHash: true,
                                    webvisor: true
                                }}
                            />
                            <a href='https://github.com/MrSmIlEyar/me' target='_blank'
                               className="underline text-[10px]">
                                source code
                            </a>
                        </div>
                    </div>
                </Parallax>
            </div>
        </ParallaxProvider>
    );
}
