import type {Metadata} from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-mono",
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
    title: "me",
    description: "page about Efremov Yaroslav ефремов ярослав fullstack developer фуллстэк разработчик страница визитка",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={robotoMono.className}>
        <main className='min-h-screen'>
            {children}
        </main>
        </body>
        </html>
    );
}
