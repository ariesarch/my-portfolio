'use client'
import { motion } from "framer-motion";

// import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "@/utils/variants";
import Circles from "@/components/atoms/Circles";
import Bulb from "@/components/atoms/Bulb";
import WorkSlider from "@/components/atoms/WorkSlider";
import { useState } from "react";
import { SelectedProject, SetSelectedProject } from "@/utils/constants";

const defaultProject: SelectedProject = {
    title:"Projects undertaken",
    description: ["lorem","Hello"]
}
const Project = () => {
    const [selectedPrj,setSelectedProject] = useState(defaultProject);
    return (
        <>
            <div className="mx-auto">
                <div className="flex flex-col xl:flex-row gap-x-2">
                    {/* slider */}
                    <motion.div
                        variants={fadeIn("down", 0.6)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="w-full xl:max-w-[65%]"
                    >
                    <WorkSlider selectedPrj={selectedPrj} setSelectedProject={setSelectedProject} />
                    </motion.div>
                    {/* text */}
                    <div className="bg-primary/30 text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
                        <motion.h2
                            variants={fadeIn("up", 0.2)}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="h2"
                        >
                            {selectedPrj?.title}
                            <span className="text-accent">.</span>
                        </motion.h2>
                        <motion.div
                            variants={fadeIn("up", 0.4)}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="mb-4 max-w-[400px] mx-auto lg:mx-0"
                        >
                            {
                                selectedPrj && selectedPrj.description && selectedPrj.description.map((item, id) => (
                                    <p key={id}>{item}</p>
                                ))
                            }
                        </motion.div>
                    </div>
                </div>
            </div>
            <Bulb />
        </>
    );
};

export default Project;