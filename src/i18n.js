import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            AboutMeTitle: 'About me',
            City: 'Kazan',
            University: 'KFU ITIS (2\'nd year)',
            Work: 'Internetika (Middle React)',
            AboutMe: 'I am a Fullstack developer with experience in various projects. I specialize in developing web applications using modern technologies such as React, TypeScript, Django, SQL, Docker and Nginx.',
            Career: 'Career',
            SlonAbout: 'Telegram bot for ads in channels',
            SlonTime: 'August 2023 - April 2024',
            THXAbout: 'Studio for developing Web Apps Telegram',
            THXTime: 'December 2023 - March 2024',
            MegamailerAbout: 'Setting sender by email for companies',
            MegamailerTime: 'April 2024 - August 2024',
            Internetika: 'Internetika',
            InternetikaAbout: 'Studio of developing apps for business',
            InternetikaTime: 'October 2024 - now',
            InternetikaLink: 'Company site',
            Hobby: 'Hobby',
            Chess: 'Chess',
            ChessAbout: 'Profile on Lichess',
            RubiksCube: 'Rubik\'s Cube',
            RubiksCubeTime: 'Record time: 28 seconds',
        },
    },
    ru: {
        translation: {
            AboutMeTitle: 'О себе',
            City: 'Казань',
            University: 'КФУ ИТИС (2 курс)',
            Work: 'Интернетика (Middle React)',
            AboutMe: 'Я - Fullstack разработчик с опытом работы в различных проектах. Специализируюсь на разработке веб-приложений с использованием современных технологий, таких как React, TypeScript, Django, SQL, Docker и Nginx.',
            Career: 'Карьера',
            SlonAbout: 'Телеграмм бот для рекламы в каналах',
            SlonTime: 'Август 2023 - Апрель 2024',
            THXAbout: 'Студия разработки Web App Telegram',
            THXTime: 'Декабрь 2023 - Март 2024',
            MegamailerAbout: 'Настройка рассылок по email для компаний',
            MegamailerTime: 'Апрель 2024 - Август 2024',
            Internetika: 'Интернетика',
            InternetikaAbout: 'Студия разработки приложений для бизнеса',
            InternetikaTime: 'Октябрь 2024 - натсоящее время',
            InternetikaLink: 'Сайт компании',
            Hobby: 'Хобби',
            Chess: 'Шахматы',
            ChessAbout: 'Профиль на Lichess',
            RubiksCube: 'Сборка Кубика Рубика',
            RubiksCubeTime: 'Рекордное время: 28 секунд',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ru', // Язык по умолчанию
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
