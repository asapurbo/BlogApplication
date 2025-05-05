import Root from './layout/root';

export default function HomeLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Root>{children}</Root>
            </body>
        </html>
    );
}
