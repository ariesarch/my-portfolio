'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/atoms/Nav";
import Header from "@/components/atoms/Header";
// import "./styles/globals.css";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main
            className={`page bg-site text-white bg-cover bg-no-repeat relative`}
        >
            {/* metadata */}
            <div>
                <title>Ethan Smith | Portfolio</title>
                <meta
                    name="description"
                    content="Ethan Smith is a Full-stack web developer with 10+ years of experience."
                />
                <meta
                    name="keywords"
                    content="react, next, nextjs, html, css, javascript, js, modern-ui, modern-ux, portfolio, framer-motion, 3d-website, particle-effect"
                />
                <meta name="author" content="Sanidhya Kumar Verma" />
                <meta name="theme-color" content="#f13024" />
            </div>
            <Nav />

            {/* <TopLeftImg />
                            <Nav /> */}
            <Header />

            {/* main content */}
            {children}
        </main>
    );
}
