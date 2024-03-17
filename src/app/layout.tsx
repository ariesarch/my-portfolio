'use client'
import "./styles/globals.css";
import Nav from "@/components/atoms/Nav";
import Header from "@/components/atoms/Header";
import Layout from "@/components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import TransitionComponent from "@/components/TransitionComponent";
import { usePathname } from "next/navigation";
import { useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Head from "next/head";
import Transition from "./Transition";
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const key = usePathname();
  return (
    <html>
      <body>
        <main
          className={`page bg-site text-white bg-cover bg-no-repeat relative`}
        >
          <Head>
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
            </Head>
          <Nav />
          <Header />
          {/* <TopLeftImg/> */}
          <div className=" bg-primary/30 py-32 text-center xl:text-left">
            <div className="w-full container mx-auto">
            {/* <AnimatePresence>
              <motion.div key={key}> */}
                <Transition>{children}</Transition>
                {/* <Transition/>
              <FrozenRouter>
                {children}
              </FrozenRouter> */}
              {/* </motion.div>
            </AnimatePresence> */}
          </div>
          </div>
        </main>
      </body>
    </html>
  );
}
