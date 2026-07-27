'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import {Icon} from "@iconify/react";
import '@/i18n';
import {useTranslation} from 'react-i18next';
import {motion, AnimatePresence} from 'framer-motion';
import Magnetic from '@/components/shared/Magnetic';
import {sheenHandlers} from '@/lib/use-sheen';

const pickRandom = (list) => {
    if (list.length === 0) return null;
    let randomIndex = Math.floor(Math.random() * list.length);
    if (randomIndex === 0) {
        randomIndex = Math.min(1, list.length - 1);
    }
    return list[randomIndex];
};

const Quote = () => {
    const [quote, setQuote] = useState({text: '', author: ''});
    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);

    const { i18n, t } = useTranslation();
    const language = i18n.language;

    useEffect(() => {
        let cancelled = false;
        const fetchQuotes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(language === 'en' ? 'quotesEn.csv' : 'quotesRu.csv');
                Papa.parse(response.data, {
                    header: false,
                    complete: (results) => {
                        if (cancelled) return;
                        const parsed = results.data.map(row => ({author: row[0], text: row[1]}));
                        setQuotes(parsed);
                        const first = pickRandom(parsed);
                        if (first) setQuote(first);
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                        if (!cancelled) setLoading(false);
                    }
                });
            } catch (error) {
                console.error('Error fetching quotes:', error);
                if (!cancelled) setLoading(false);
            }
        };
        fetchQuotes();
        return () => {
            cancelled = true;
        };
    }, [language]);

    const getRandomQuote = () => {
        const next = pickRandom(quotes);
        if (next) setQuote(next);
    };

    if (loading) {
        return <div><Icon icon="line-md:loading-loop"/></div>;
    }

    return (
        <div className='min-h-[36vh] grid'>
            <div className="relative grid gap-2 justify-center items-center min-w-full justify-self-center min-h-[32vh] overflow-hidden">
                <Icon
                    icon="mdi:format-quote-open"
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-4 -left-2 text-black/[0.06] select-none"
                    width={120}
                    height={120}
                />
                <AnimatePresence mode="wait">
                    <motion.blockquote
                        key={quote.text + quote.author}
                        className="relative grid gap-3 italic p-2"
                        initial={{opacity: 0, y: 16, filter: 'blur(6px)'}}
                        animate={{opacity: 1, y: 0, filter: 'blur(0px)'}}
                        exit={{opacity: 0, y: -16, filter: 'blur(6px)'}}
                        transition={{duration: 0.4, ease: 'easeOut'}}
                    >
                        <p className='font-medium justify-self-start'>{quote.text}</p>
                        <cite className="flex gap-2 items-center justify-self-end text-gray-800"><Icon
                            icon="bi:c-circle"/> {quote.author.length !== 0 ? quote.author : "Unknown"}</cite>
                    </motion.blockquote>
                </AnimatePresence>
            </div>
            <Magnetic strength={0.4}>
                <motion.button
                    whileHover={{scale: 1.04}}
                    whileTap={{scale: 0.96}}
                    {...sheenHandlers}
                    className="glass glass-sheen glass-press group flex justify-self-center gap-2 items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium text-black"
                    onClick={getRandomQuote}>
                    <Icon icon="mdi:format-quote-open" className="relative shrink-0"/>
                    <span className="relative whitespace-nowrap">{t('NewQuote')}</span>
                    <Icon icon="mdi:format-quote-close" className="relative shrink-0"/>
                </motion.button>
            </Magnetic>
        </div>
    )
        ;
};

export default Quote;
