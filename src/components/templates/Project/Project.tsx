'use client'
import { motion } from "framer-motion";

// import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "@/utils/variants";
import Circles from "@/components/atoms/Circles";
import Bulb from "@/components/atoms/Bulb";
import WorkSlider from "@/components/atoms/WorkSlider";
import { useState } from "react";
import { SelectedProject } from "@/utils/constants";
import { Container } from "@/components/Container";
import { Brain } from "@/components/atoms/Brain";
import { Neurons } from "@/components/atoms/Neurons";

const projectOverview: SelectedProject = {
    title:"Projects undertaken",
    description: [
        "Each project showcases a unique blend of technical expertise, client collaboration, and innovation to deliver exceptional digital experiences.",
        "Led end-to-end project management, including overseeing backend, frontend, and mobile development teams. Managed client interactions, requirement gathering, and task assignment, while actively contributing to technical problem-solving and productivity enhancements. Emphasized code review, refactoring, and QA processes to ensure high-quality deliverables."
    ]
}
const Project = () => {
    const [selectedPrj,setSelectedProject] = useState(projectOverview);
    const resetProjectOverview= ()=>{
        setSelectedProject(projectOverview);
    }
    return (
        <Container className="flex flex-col xl:flex-row gap-2">
            <motion.div
                variants={fadeIn("down", 0.6)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="w-full xl:w-1/2"
            >
            <WorkSlider setSelectedProject={setSelectedProject} />
            </motion.div>
            {/* text */}
            <div className="xl:w-1/2 text-center flex flex-col xl:text-left xl:mb-0 z-5">
                <motion.p
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="text-3xl font-bold text-accent/40"
                >
                    {selectedPrj?.title}
                </motion.p>
                <motion.div
                    variants={fadeIn("up", 0.4)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="mb-4 mx-auto lg:mx-0 z-1"
                >
                    {
                        selectedPrj && selectedPrj.description && selectedPrj.description.map((item, id) => (
                            <p key={id} className={`text-white font-medium leading-6 mb-2 ${id==0&&'italic'}`}>{item}</p>
                        ))
                    }
                </motion.div>
            </div>
            <Bulb handleClick={resetProjectOverview} className="hidden md:block right-2 bottom-1 -rotate-45"/>
            <Bulb handleClick={resetProjectOverview} className="hidden lg:hidden md:block left-2 bottom-1 rotate-45"/>
        </Container>
    );
};

export default Project;