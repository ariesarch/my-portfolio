'use client'
// import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from "react";

import { NavItem } from "@/utils/constants";
import styles from "./Sidebar.module.css";

type Props = {
    items: NavItem[];
};

export default function Sidebar({ items }: Props) {
    return (
        <nav className={styles.container}>
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <Item key={index} item={item} />
                ))}
            </ul>
        </nav>
    );
}


type ItemProps = {
    item: NavItem;
};

function Item({ item }: ItemProps) {
    const path = usePathname();
    const isActive = React.useCallback(
        (href: string) => href === path,
        [path]
    );

    if ("items" in item) {
        // Category
        return (
            <li className={styles.category}>
                <details>
                    <summary className={styles.button}>
                        {item.label}
                        {/* <ChevronRightIcon /> */}
                    </summary>
                    {/* {item.items[0]?.id} */}
                    <ul className={styles.list}>
                        {item.items.map((item, index) => (
                            <Item key={index} item={item} />
                        ))}
                    </ul>
                </details>
            </li>
        );
    } else {
        // Document link
        return (
            <li>
                <Link
                    href={item.href}
                    className={clsx(
                        styles.button,
                        isActive(item.href) && styles.isActive
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                >
                    {item.label}
                </Link>
            </li>
        );
    }
}