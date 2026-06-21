import type {Metadata} from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-mono",
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
    title: "Grach",
    description: "Ефремов Ярослав \n Визитка Fullstack разработчика",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://i.postimg.cc" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://i.postimg.cc" />
        </head>
        <body className={robotoMono.className}>
        <main className='min-h-screen'>
            {children}
        </main>
        </body>
        </html>
    );
}
