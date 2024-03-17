'use client'
import { motion } from "framer-motion";

// import ParticlesContainer from "../components/ParticlesContainer";
// import ProjectsBtn from "../components/ProjectsBtn";
// import Avatar from "../components/Avatar";
import { fadeIn } from "@/utils/variants"; 
import { Intro } from "../organisms/Intro/Intro";
export const Home = ()=> {
    return (
        <div className="flex flex-col lg:flex-row gap-x-1 min-h-[100vh]">
            <div className="w-2/3">
                <motion.div
                    variants={fadeIn("up", 0.5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="h-full"
                >
                    <Intro />
                </motion.div>
            </div>
            <div className="flex flex-col lg:flex-row w-1/3">
                <div className="flex-col">
                    {/* title */}
                    <motion.h1
                        variants={fadeIn("down", 0.2)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="h1"
                    >
                        Your Gateway <br /> to{" "}
                        <span className="text-accent">Creativity</span>
                    </motion.h1>

                    {/* subtitle */}
                    {/* <motion.p
                        variants={fadeIn("down", 0.3)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate,
                        exercitationem harum, quia nulla temporibus deleniti libero veniam
                        vero beatae numquam ducimus illum ab similique ipsam tempore fugit
                        quod laudantium debitis.
                    </motion.p> */}
                    
                </div>
            </div>
            
        </div>
    );
}