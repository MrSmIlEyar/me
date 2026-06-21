'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import {Icon} from "@iconify/react";
import '@/i18n';
import {useTranslation} from 'react-i18next';
import {motion, AnimatePresence} from 'framer-motion';
import Magnetic from '@/components/shared/Magnetic';

const Quote = () => {
    const [quote, setQuote] = useState({text: '', author: ''});
    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);

    const { i18n , t} = useTranslation();
    let response = '';
    let language = i18n.language;
    const fetchQuotes = async () => {
        setLoading(true);
        try {
            if (language === 'en') {
                response = await axios.get('quotesEn.csv');

            } else {
                response = await axios.get('quotesRu.csv');
            }
            Papa.parse(response.data, {
                header: false,
                complete: (results) => {
                    setQuotes(results.data.map(row => ({author: row[0], text: row[1]})));
                    setLoading(false);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                    setLoading(false);
                }
            });
        } catch (error) {
            console.error('Error fetching quotes:', error);
            setLoading(false);
        }
    };

    const getRandomQuote = () => {
        if (quotes.length === 0) return;
        let randomIndex = Math.floor(Math.random() * quotes.length);
        if (randomIndex === 0) {
            randomIndex = 1;
        }
        setQuote(quotes[randomIndex]);
    };

    useEffect(() => {
        fetchQuotes();
    }, [t]);

    useEffect(() => {
        if (quotes.length > 0) {
            getRandomQuote();
        }
    }, [quotes]);

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
                    whileTap={{scale: 0.95}}
                    className="group relative overflow-hidden flex justify-self-center gap-2 items-center justify-center bg-black text-white p-2 px-4 rounded-xl h-[4vh]"
                    onClick={getRandomQuote}>
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"/>
                    <Icon icon="mdi:format-quote-open"/> {t('NewQuote')} <Icon icon="mdi:format-quote-close"/>
                </motion.button>
            </Magnetic>
        </div>
    )
        ;
};

export default Quote;
