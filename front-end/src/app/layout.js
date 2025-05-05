'use client'
import './globals.css';
import Navbar from '@/app/layout/Navbar';
import { Poppins } from "next/font/google";
import Flex from "@/app/components/Flex";
import LeftAside from "@/app/layout/LeftAside";
import RightAside from "@/app/layout/RightAside";
import useClick from './hooks/useClick';
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-poppins',
})

export default function RootLayout({ children }) {
    const {bar, content} = useClick()

    return (
        <html lang="en">
            <body
                className={`${poppins.variable} antialiased w-full mx-auto`}
            >
                {/*<Navbar bar={bar}/>*/}
                {/*<Flex className='relative pt-16 pb-16 md:pb-0 md:pt-24 bg-bg h-screen overflow-y-hidden'>*/}
                {/*    <LeftAside ref={content}/>*/}
                    <div className='w-full bg-bg overflow-hidden'>
                        {children}
                    </div>
                {/*    <RightAside />*/}
                {/*</Flex>*/}
            </body>
        </html>
    );
}
