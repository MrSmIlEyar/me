import React from 'react';
import { useTranslation } from 'react-i18next';
import {cn} from "@/lib/utils";

interface Props {
    className?: string;
}

const LanguageSwitcher:React.FC<Props> = (className) => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setCurrentLanguage(lng);
    };

    return (
        <div className={cn(className, 'flex justify-center items-center gap-1 backdrop-blur-lg rounded-xl p-1 border-white border text-[12px]')}>
            <button
                onClick={() => changeLanguage('ru')}
                style={{
                    backgroundColor: currentLanguage === 'ru' ? 'white' : '',
                    color: currentLanguage === 'ru' ? 'black' : '',
                    border: currentLanguage === 'ru' ? '1px solid black' : '',
                }}
                className='px-1 rounded-lg'
            >
                ru
            </button>
            <button
                onClick={() => changeLanguage('en')}
                style={{
                    backgroundColor: currentLanguage === 'en' ? 'white' : '',
                    color: currentLanguage === 'en' ? 'black' : '',
                    border: currentLanguage === 'en' ? '1px solid black' : '',
                }}
                className='px-1 rounded-lg'
            >
                en
            </button>
        </div>
    );
};

export default LanguageSwitcher;
