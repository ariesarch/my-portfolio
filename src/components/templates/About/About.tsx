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
import { Container } from '@/components/Container';
import ExperienceItem from '@/components/atoms/ExperienceItem';
import { AboutData } from '@/utils/constants';
import { Neurons } from '@/components/atoms/Neurons';
import Link from 'next/link';
//  data
export const aboutData: AboutData[] = [
    {
        title: "Experiences",
        info: [
            {
                title: "Software Development Manager -BinaryLab",
                stage: "2022-Now",
                description: "Led and harmonized diverse development teams across Mobile, Front-end, and Back-end projects. Actively engaged in all development stages, from Mobile to Back-end, blending managerial finesse with technical prowess. Orchestrated client interactions, guided the SDLC, and fostered seamless communication. Managed rigorous code reviews, intricate refactoring, and QA processes, ensuring top-notch standards. Demonstrated adeptness in both leadership and technical depth, ensuring project success at every juncture.",
                stacks: ['HTML&CSS', 'Tailwind', 'Bootstrap', 'Emotion', 'JavaScript', 'JQuery', 'Vue', 'Nuxt.js', 'React', 'Next.js', 'Alpine.js', 'ReactNative', 'React Query', 'PHP', 'Laravel', 'Filament', 'Livewire', 'MySQL', 'PostgreSQL', 'Redis', 'Ubuntu', 'Docker', 'AWS', 'Github Actions', 'Jenkins', 'Kubernetes'],
                href:"https://www.binarylab.io"
            },
            {
                title: "Senior Full Stack Engineer -MarathonMyanmar",
                stage: "2019-2022",
                description: "Revamp the digital transformation strategy for the logistics sector, orchestrating system design and identifying software requirements for digital products. Spearhead the development of top-tier web applications, websites, and administrative dashboards.",
                stacks: ['HTML&CSS', 'Tailwind', 'Bootstrap', 'JavaScript', 'JQuery', 'Vue', 'Nuxt.js', 'React', 'Next.js', 'ReactNative', 'Vuetify', 'Cordova', 'PHP', 'Laravel', 'Inertia', 'MySQL', 'PostgreSQL', 'Redis', 'Firestore', 'Firebase RDB', 'MongoDB', 'Ubuntu', 'Docker', 'AWS', 'Github Actions'],
                href:"https://www.marathonmyanmar.com"
            },
            {
                title: "Web Development Team Lead - CCD",
                stage: "2017-2019",
                description: "Facilitated client communication and spearheaded the transition of government procedural manuals into digital formats, streamlining processes through digital transformation initiatives. Orchestrated the software development life cycle (SDLC) for a web development team, overseeing the creation of user-friendly and interactive web applications.",
                stacks: ['HTML&CSS', 'Bootstrap', 'JavaScript', 'JQuery', 'PHP', 'Laravel', 'Inertia', 'Node.js', 'MySQL', 'PostgreSQL', 'Redis', 'Ubuntu'],
                href:"https://www.jobnet.com.mm/companies/ccd-system/e-1534"
            },
            {
                title: "Software Engineer (Remote) - TechMyanmar",
                stage: "2017-2017",
                description: "Revitalized and expanded a Ruby on Rails application, concentrating on fine-tuning database operations and refining backend processes for heightened performance and efficiency.",
                stacks: ['HTML&CSS', 'Ruby', 'Ruby on Rails', 'MySQL', 'PostgreSQL'],
                href:"https://www.linkedin.com/company/tech-myanmar-co-ltd-/about/"
            },
            {
                title: "Software Enginee - BaganHub",
                stage: "2016-2016",
                description: "Played a pivotal role in migrating a B2B E-commerce website from pure PHP to a dynamic and feature-rich framework-based platform. Spearheaded research efforts to identify robust solutions and implemented architectural changes using the MVC framework Laravel.",
                stacks: ['HTML&CSS', 'Bootstrap', 'JavaScript', 'JQuery', 'PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'Ubuntu'],
                href:"https://www.linkedin.com/company/baganmart/about/"
            },
            {
                title: "Junior Software Enginee - Infoava",
                stage: "2014-2015",
                description: "Collaborated with web development team to create new brands, design systems and websites for clients.",
                stacks: ['HTML&CSS', 'Bootstrap', 'JavaScript', 'JQuery', 'PHP', 'Wordpress', 'Node.js', 'MySQL'],
                href:"https://www.linkedin.com/company/infoava/about/"
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
                title: "B.C.Sc - University of Coputer Studies, Monywa, Myanmar",
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
        <Container className="flex flex-col xl:flex-row gap-2 ">
                
                {/* text */}
                <div className="flex flex-col w-full relative">
                    <motion.h3
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="text-2xl"
                    >
                        Captivating <span className="text-accent text-7xl">stories</span> birth
                        magnificent designs.
                    </motion.h3>
                    <motion.p
                        variants={fadeIn("right", 0.4)}
                        initial="hidden"
                        animate="show"
                        className="mx-auto px-2 md:px-3 mb-1"
                    >
                    With a rich background spanning over 9 years in the software engineering realm, I excel in pivotal roles such as Software Development Manager, Tech Lead, Lead Software Engineer, and Senior Full Stack Engineer. My expertise traverses a wide spectrum of domains, including backend, frontend, and mobile development, enabling me to drive transformative initiatives and spearhead impactful projects.
                    </motion.p>
                <motion.p
                    variants={fadeIn("left", 0.4)}
                    initial="hidden"
                    animate="show"
                    className="mx-auto px-2 md:px-3 mb-1"
                >
                    I orchestrate projects from inception to execution, blending technical acumen and strategic insight. My leadership fosters innovation, cultivates excellence, and empowers teams to exceed expectations. With a collaborative approach and a knack for creative problem-solving, I navigate challenges and capitalize on opportunities.
                </motion.p>
                <motion.p 
                    variants={fadeIn("left", 0.4)}
                    initial="hidden"
                    animate="show" 
                    className="mx-auto px-2 md:px-3 mb-1">
                    In summary, I offer a potent mix of technical expertise, strategic vision, and leadership finesse, making me a valuable asset for driving organizational success in dynamic environments.
                </motion.p>
                <div className="z-3 absolute bottom-1 left-4 h-1/2 w-full">
                    <Neurons />
                </div>                 
                </div>
            
            {/* info */}
            <motion.div
                variants={fadeIn("left", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="flex flex-col w-full h-full bg-primary/30 grow-0"
            >
                <div className="flex gap-x-4 mx-auto xl:mx-0">
                    {aboutData.map((item, itemI) => (
                        <div
                            key={itemI}
                            className={`${index === itemI &&
                                "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                                } py-1 cursor-pointer uppercase relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                            onClick={() => setIndex(itemI)}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>

                <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start overflow-y-auto max-h-max">
                    {aboutData[index].info.map((item, itemI) => (
                        <Link
                            key={itemI}
                            className='w-full'
                            href={item?.href ? new URL(item.href) : ''}
                            target="_blank"
                        >
                            {/* title */}
                            {/* <div className="font-light mb-2 md:mb-0 cursor-pointer hover:text-orange-200">{item.title}</div>
                                <div className="hidden md:flex">-</div>
                                <div>{item.stage}</div> */}
                            {aboutData[index].title === 'Experiences' ? (
                                <ExperienceItem experience={item} />
                            ) : (
                                <>
                                    <div className="font-light mb-2 md:mb-0 cursor-pointer hover:text-orange-200">{item.title} - {item.stage}</div>
                                    {/* <div className="xl:inline hidden md:flex">-</div>
                                    <div>{item.stage}</div>  */}
                                </>
                            )}

                            <div className="flex gap-x-4">
                                {/* icons */}
                                {item.icons?.map((Icon, iconI) => (
                                    <div key={iconI} className="text-2xl text-accent">
                                        <Icon />
                                    </div>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </Container>
    );
}