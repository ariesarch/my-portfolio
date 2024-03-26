'use client'
// import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from "react";

import { Heading } from "@/utils/constants";
import styles from "./Sidebar.module.css";

type Props = {
    headings: Heading[];
};

export default function Sidebar({ headings }: Props) {
    return (
        <nav className={styles.container}>
            <ul className={styles.list}>
                {headings.map((heading: any) => (
                    <Item key={`#${heading.slug}`} heading={heading} />
                ))}
            </ul>
        </nav>
    );
}


type PropsHeading = {
    heading: Heading;
};

function Item({ heading }: PropsHeading) {
    const path = usePathname();
    // console.log(path)
    const isActive = React.useCallback(
        (href: string) => href === path,
        [path]
    );
    // Document link
    return (
        <li>
            <Link
                href={`#${heading.slug}`}
                className={clsx(
                    styles.button,
                    isActive(heading.slug) && styles.isActive
                )}
                aria-current={isActive(heading.slug) ? "page" : undefined}
            >
                {heading.text}
            </Link>
        </li>
    );
}