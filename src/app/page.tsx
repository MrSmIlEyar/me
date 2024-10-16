'use client'

import React, { useState, useEffect } from 'react';
import { Download, Github, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Title } from '@/components/ui/title';
import { Icon } from '@iconify/react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='grid place-items-center min-h-screen'>
            <div className='grid place-items-center gap-10'>
                {loading ? (
                    <Skeleton circle width={200} height={200} />
                ) : (
                    <Avatar className='w-[200px] h-[200px] border-2 border-gray'>
                        <AvatarImage src='https://i.postimg.cc/KvKS1yXx/img.png' width={250} height={1500} />
                        <AvatarFallback>ЕЯ</AvatarFallback>
                    </Avatar>
                )}
                {loading ? (
                    <Skeleton width={200} />
                ) : (
                    <Title text='Fullstack Developer' />
                )}
                <div className='grid grid-cols-3 gap-10'>
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
                            <Icon icon='mdi:react' width={32} height={32} />
                            <Icon icon='lineicons:typescript' width={32} height={32} />
                            <Icon icon='tabler:brand-django' width={32} height={32} />
                            <Icon icon='tabler:sql' width={32} height={32} />
                            <Icon icon='mdi:docker' width={32} height={32} />
                            <Icon icon='cib:nginx' width={32} height={32} />
                        </>
                    )}
                </div>
                <hr className='stroke-black stroke-2 w-full' />
                <div className='grid grid-cols-3 gap-10'>
                    {loading ? (
                        <>
                            <Skeleton circle width={32} height={32} />
                            <Skeleton circle width={32} height={32} />
                            <Skeleton circle width={32} height={32} />
                        </>
                    ) : (
                        <>
                            <a href='mailto:yaroslav.efrem@yandex.ru' target='_blank'>
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Mail width={32} height={32} />
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
                                        <Github width={32} height={32} />
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
                                        <Icon icon='line-md:telegram' width={32} height={32} />
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
                {loading ? (
                    <Skeleton width={150} />
                ) : (
                    <a
                        href='/resume.pdf'
                        download='resume.pdf'
                        target='_blank'
                        className='flex gap-2 bg-black text-white p-2 rounded-xl hover:bg-gray-800'
                    >
                        <Download /> Download CV
                    </a>
                )}
            </div>
        </div>
    );
}
