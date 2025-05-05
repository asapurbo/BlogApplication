import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-poppins',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <main
                    className={`${poppins.variable} antialiased w-full mx-auto`}
                >{children}</main>
            </body>
        </html>
    );
}
