'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import {Icon} from "@iconify/react";
import '@/i18n';
import {useTranslation} from 'react-i18next';

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
            <div className="grid gap-2 justify-center items-center min-w-full justify-self-center min-h-[32vh]">
                <blockquote className="grid gap-3 italic p-2">
                    <p className='font-medium justify-self-start'>{quote.text}</p>
                    <cite className="flex gap-2 items-center justify-self-end text-gray-800"><Icon
                        icon="bi:c-circle"/> {quote.author.length !== 0 ? quote.author : "Unknown"}</cite>
                </blockquote>
            </div>
            <button
                className="flex justify-self-center gap-2 items-center justify-center bg-black text-white p-2 rounded-xl hover:bg-gray-800 h-[4vh]"
                onClick={getRandomQuote}>
                <Icon icon="mdi:format-quote-open"/> {t('NewQuote')} <Icon icon="mdi:format-quote-close"/>
            </button>
        </div>
    )
        ;
};

export default Quote;
