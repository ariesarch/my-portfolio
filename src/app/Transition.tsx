"use client";

import { motion } from "framer-motion";

export default function Transition({
    children,
}: {
    children: React.ReactNode;
}) {
    const transitionVariants = {
        initial: {
            x: "100%",
            width: "100%",
        },
        animate: {
            x: "0%",
            width: "0%",
        },
        exit: {
            x: ["0%", "100%"],
            width: ["0%", "100%"],
        },
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.005 }}
        >
            {children}
        </motion.div>
    );
}