import Head from "next/head";

export default function Layout({ children, title = "Nextjs" }) {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen font-mono">

            {/* Headのタイトルを動的に変化 */}
            <Head>
                <title>{title}</title>
            </Head>

            {/* アプリのヘッダー */}
            <header className="flex justify-center items-center bg-gray-600 w-screen 
                               p-6 md:h-20 h-16 md:text-3xl text-lg text-white">
                2,3桁の掛け算の暗算練習アプリ
            </header>

            {/* アプリのメイン */}
            <main className="flex flex-1 justify-center items-center flex-col w-screen">
                {children}
            </main>

            {/* アプリのフッター */}
            <footer className="w-full h-14 flex justify-center items-center
                               border-t bg-gray-600 text-white">
                Powerd by AWS Amplify
            </footer>
        </div>
    );
};