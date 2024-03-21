'use client'
import { motion } from "framer-motion";

// import ParticlesContainer from "../components/ParticlesContainer";
// import ProjectsBtn from "../components/ProjectsBtn";
// import Avatar from "../components/Avatar";
import { fadeIn } from "@/utils/variants"; 
import { Intro } from "../organisms/Intro/Intro";
import { Container } from "../Container";
import { Neurons } from "../atoms/Neurons";
export const Home = ()=> {
    return (
        <Container className="flex flex-col xl:flex-row gap-x-1">
            <div className="w-full h-screen">
                <motion.div
                    variants={fadeIn("up", 0.5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <h2 className="text-2xl">Igniting <span className="h2 text-accent">Creativity</span> and <span className="h2 text-accent/55">Innovation</span>!</h2>
                </motion.div>
                <motion.div
                    variants={fadeIn("up", 0.5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="h-full xs:h-[70%]"
                >
                    <Intro />
                    
                </motion.div>
            </div>
            <div className="flex flex-col xl:flex-row w-full h-full z-0">
                    {/* title */}
                    <motion.h2
                        variants={fadeIn("down", 0.2)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="h2"
                    >
                    {/* Discover the Artistry of {" "}
                    <span className="text-accent">Software Development and Innovation!</span> */}
                        {/* Your Gateway <br/>to{" "}
                        <span className="text-accent">Creativity</span> */}
                    Commanding the frontiers of <span className="text-accent/90">backend</span>, <span className="text-accent/70">frontend</span>, and <span className="text-accent/40">mobile</span> with precision, while igniting sparks of innovation through leadership, mentorship, and problem-solving acumen.
                    </motion.h2>
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
            {/* <div className="z-3 absolute bottom-2 right-2 h-full w-max">
                <Neurons />
            </div> */}
        </Container>
    );
}