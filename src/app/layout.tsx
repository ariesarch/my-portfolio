// 'use client'
import "./styles/globals.css";
import Nav from "@/components/atoms/Nav";
import Header from "@/components/atoms/Header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const key = usePathname();
  return (
    <html>
      <body>
        <main
          // className={`page bg-site text-white bg-cover bg-no-repeat relative`}
          className={`page bg-cover bg-no-repeat relative`}
        >
          <div>
            <title>Kyaw Ye Naing | Portfolio</title>
            <meta
              name="description"
              content="Kyaw Ye Naing is a Full-stack web developer with 9+ years of experience."
            />
            <meta
              name="keywords"
              content="react, next, nextjs, html, css, javascript, js, modern-ui, portfolio, framer-motion, 3d-website,php,laravel,livewire,inertia,"
            />
            <meta name="author" content="Sanidhya Kumar Verma" />
            <meta name="theme-color" content="#f13024" />
            </div>
          <Nav />
          <Header />
            {children}
        </main>
      </body>
    </html>
  );
}
