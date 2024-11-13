'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import {Icon} from "@iconify/react";
import '@/i18n';
import {useTranslation} from 'react-i18next';

const Quote = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);

    const {t} = useTranslation();

    const fetchQuotes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('quotesEn.csv');
            Papa.parse(response.data, {
                header: false,
                complete: (results) => {
                    setQuotes(results.data.map(row => ({ author: row[0], text: row[1] })));
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
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    useEffect(() => {
        if (quotes.length > 0) {
            getRandomQuote();
        }
    }, [quotes]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid gap-2 justify-center items-center min-w-full">
            <blockquote className="grid gap-3 italic p-2">
                <p>{quote.text}</p>
                <cite className="flex gap-2 items-center align-text-bottom text-gray-800"><Icon icon="bi:c-circle"/> {quote.author.length !== 0 ? quote.author : "Неизвестен"}</cite>
            </blockquote>
            <button className="flex gap-2 items-start justify-center bg-black text-white p-2 rounded-xl hover:bg-gray-800 min-w-full" onClick={getRandomQuote}>
                <Icon icon="mdi:format-quote-open" /> {t('NewQuote')} <Icon icon="mdi:format-quote-close" />
            </button>
        </div>
    );
};

export default Quote;
