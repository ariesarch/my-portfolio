'use client'
import {motion} from 'framer-motion'
import { fadeIn } from '@/utils/variants'
import { useState } from 'react';
import {
    FaCss3,
    FaHtml5,
    FaBootstrap,
    FaJs,
    FaReact,
    FaVuejs,
    FaPhp,
    FaNodeJs,
    FaLaravel,
} from "react-icons/fa";
import {
    SiTailwindcss,
    SiNextdotjs,
    SiNuxtdotjs,
    SiVuetify,
    SiExpress,
    SiLivewire,
    SiInertia,
    SiAlpinedotjs,
    SiLumen,
    SiCakephp,
    SiReact,
    SiFlutter,
    SiMysql,
    SiPostgresql,
    SiFirebase,
    SiMongodb
} from "react-icons/si";
import CountUp from 'react-countup';
import { IconType } from 'react-icons';
interface ExperienceItem {
    title?: string;
    stage?: string;
    icons?: IconType[];
}

// Define the types for the about data
interface AboutDataItem {
    title: string;
    info: ExperienceItem[];
}

//  data
export const aboutData:AboutDataItem[] = [
    {
        title: "Experiences",
        info: [
            {
                title: "Software Development Manager -BinaryLab",
                stage: "2022-Now",
            },
            {
                title: "Senior Full Stack Engineer -MarathonMyanmar",
                stage: "2019-2022",
            },
            {
                title: "Web Development Team Lead - CCD",
                stage: "2017-2019",
            },
            {
                title: "Software Engineer (Remote) - TechMyanmar",
                stage: "2017-2017",
            },
            {
                title: "Software Enginee - BaganHub",
                stage: "2016-2016",
            },
            {
                title: "Junior Software Enginee - Infoava",
                stage: "2014-2015",
            },

        ],
    },
    {
        title: "Skills",
        info: [
            {
                title: "Front-end",
                icons: [
                    FaHtml5,
                    FaCss3,
                    FaBootstrap,
                    SiTailwindcss,
                    FaJs,
                    FaReact,
                    FaVuejs,
                    SiNextdotjs,
                    SiNuxtdotjs,
                    SiVuetify,
                    SiAlpinedotjs
                ],
            },
            {
                title: "Back-end",
                icons: [FaPhp, FaNodeJs, FaLaravel, SiLumen,SiCakephp,SiLivewire,SiInertia,SiExpress],
            },
            {
                title: "Mobile",
                icons: [SiReact,SiFlutter]
            },
            {
                title: "Database",
                icons: [SiMysql,SiPostgresql,SiFirebase,SiMongodb]
            }
        ],
    },

    {
        title: "Courses",
        info: [
            {
                title: "B.C.Sc - University of Coputer Studies, LA, CA",
                stage: "2014",
            },
            {
                title: "12 Factor App - KodeKloud",
                stage: "2023",
            },
            {
                title: "Amazon Elastic Container Service-ECS -KodeKloud",
                stage: "2023",
            },
            {
                title: "Docker Training Course for the Abso- lute Beginner -KodeKloud",
                stage: "2023",
            },
            {
                title: "Docker - SWARM | SERVICES | STACKS - Hands-on -KodeKloud",
                stage: "2023",
            },
            {
                title: "Kubernetes for the Absolute Beginners -KodeKloud",
                stage: "2023",
            },
            {
                title: "Kubernetes and Cloud-Native Associ- ate-KCNA -KodeKloud",
                stage: "2023",
            },
            {
                title: "Jenkins -KodeKloud",
                stage: "2023",
            }
        ],
    },
];
export const About = ()=>{
    
    const [index,setIndex] = useState(0)
    return (
            <div className="mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
            {/* info */}
            <motion.div
                variants={fadeIn("left", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="flex flex-col w-full xl:max-w-[48%] h-[480px] bg-primary/30"
            >
                <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
                    {aboutData.map((item, itemI) => (
                        <div
                            key={itemI}
                            className={`${index === itemI &&
                                "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                            onClick={() => setIndex(itemI)}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>

                <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
                    {aboutData[index].info.map((item, itemI) => (
                        <div
                            key={itemI}
                            className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-center text-white/60"
                        >
                            {/* title */}
                            <div className="font-light mb-2 md:mb-0">{item.title}</div>
                            <div className="hidden md:flex">-</div>
                            <div>{item.stage}</div>

                            <div className="flex gap-x-4">
                                {/* icons */}
                                {item.icons?.map((Icon, iconI) => (
                                    <div key={iconI} className="text-2xl text-accent">
                                        <Icon />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
                {/* text */}
                <div className="flex flex-col justify-center">
                    <motion.h2
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="h2"
                    >
                        Captivating <span className="text-accent">stories</span> birth
                        magnificent designs.
                    </motion.h2>
                    <motion.p
                        variants={fadeIn("right", 0.4)}
                        initial="hidden"
                        animate="show"
                        className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
                    >
                        10 years ago, I begin freelancing as a developer. Since then, I have
                        done remote work for agencies, consulted for startups, and
                        collabrated on digital products for business and consumer use.
                    </motion.p>

                    {/* counters */}
                    <motion.div
                        variants={fadeIn("right", 0.6)}
                        initial="hidden"
                        animate="show"
                        className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
                    >
                        <div className="flex flex-1 xl:gap-x-6">
                            {/* experience */}
                            <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                                    <CountUp start={0} end={10} duration={5} />
                                </div>
                                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                                    Years of experience.
                                </div>
                            </div>

                            {/* clients */}
                            <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                                    <CountUp start={0} end={250} duration={5} />
                                </div>
                                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                                    Satisfied clients.
                                </div>
                            </div>

                            {/* projects */}
                            <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                                    <CountUp start={0} end={650} duration={5} />
                                </div>
                                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                                    Finished projects.
                                </div>
                            </div>

                            {/* awards */}
                            <div className="relative flex-1">
                                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                                    <CountUp start={0} end={8} duration={5} />
                                </div>
                                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                                    Winning awards.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
    );
}