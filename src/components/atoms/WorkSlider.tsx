import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { SelectedProject,SetSelectedProject } from "@/utils/constants";
const workSlides = {
    slides: [
        {
            images: [
                {
                    title: "BinaryLab",
                    header: "Company Portfolio",
                    path: "/blw.jpg",
                    description:[
                        "Led the revitalization of the company website, infusing it with a contemporary aesthetic and cutting-edge features.",
                        "Determined the optimal technology stacks to enhance website performance and user experience.",
                        "Initiated and spearheaded the development team, guiding them through the creation process from inception to completion.",
                        "Enforced meticulous code review and conducted systematic refactoring throughout the development and QA phases, ensuring optimal code quality and enhancing overall project robustness."
                    ],
                    link: "https://binarylab.io/",
                },
                {
                    title: "SAYA",
                    header:"English Learning Platform",
                    path: "/saya-web.jpeg",
                    description:[
                        "Crafted an innovative online platform tailored to facilitate English language acquisition, boasting dynamic features such as Live Classes, Practice Sessions, and Level Tests.",
                        "Ensured the seamless operation and user experience of the front-end application through regular maintenance and updates.",
                        "Collaborated closely with backend and mobile development teams to optimize platform performance and bolster security measures, ensuring a robust and reliable learning environment.",
                        "Took charge of improving the GitHub workflow, implementing enhancements to streamline development and deployment processes, thereby fostering greater efficiency and productivity."
                    ],
                    link: "https://saya.education/",
                },
                {
                    title: "Newsmast",
                    header: "Celebrate Decentralization with Newsmast",
                    path: "/newsmast-pwa.jpeg",
                    description: [
                        "Harnessing Mastodon's open-source framework, we've constructed a decentralized social media hub that fosters a resilient global network enriched with bespoke community features.Through seamless integration, users leverage their Mastodon credentials to unlock access to their instance's content within Newsmast's dynamic community network.",
                        "As the overseer of all backend, frontend, and mobile teams, I orchestrate our project's intricate facets. From client meetings and clarifying requirements to task assignment and troubleshooting technical hurdles, my involvement ensures smooth operations and heightened productivity.",
                        "Implemented rigorous code evaluation processes and executed comprehensive code refactoring initiatives during both development and quality assurance stages, fostering superior code integrity and fortifying project resilience."
                    ],
                    link: "https://newsmast.org/",
                },
                {
                    title: "PSS",
                    header: "Jewellry E-commerce",
                    path: "/pss-web.jpeg",
                    description:[
                        "Crafted an innovative e-commerce solution tailored for a jewelry boutique, elevating customer interaction and sales through dynamic website and mobile applications.",
                        "Engaged directly with clients to ascertain project requirements and conducted in-depth research to devise optimal e-commerce strategies.",
                        "Directed end-to-end development across backend, frontend, and mobile platforms, ensuring seamless integration and exceptional user experience."
                    ],
                    link: "https://www.pyaesoneshin.com/",
                }
            ],
        },
        {
            images: [
                {
                    title: "Artscape",
                    header: "Online Art Gallery and Shop",
                    path: "/artscape-web.jpg",
                    link: "https://www.pyaesoneshin.com/",
                },
                {
                    title: "MG&J",
                    header:"Jewellry E-commerce",
                    path: "/mgj-web.jpeg",
                    link: "https://www.mgjmyanmar.com/",
                },
                {
                    title: "Stylo",
                    header:"Suit and Customized Clothings",
                    path: "/stylo.jpg",
                    link: "https://www.stylocollection.com",
                },
                {
                    title: "SBN",
                    header: "English Learning Platform",
                    path: "/sbn-web.jpeg",
                    link: "https://sunbusinessmyanmar.org/",
                },
            ],
        },
    ],
};

interface WorkSliderProps {
    setSelectedProject: SetSelectedProject
}
const WorkSlider: React.FC<WorkSliderProps> = ({ setSelectedProject }) => {
    const handleImageHover = (image: SelectedProject) => {
        setSelectedProject(image);
    };
    return (
        <Swiper
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
        >
            {workSlides.slides.map((slide, i) => (
                <SwiperSlide key={i}>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 ">
                        {slide.images.map((image, imageI) => (
                            <div
                                className=" relative rounded-lg overflow-hidden flex items-center justify-center group"
                                key={imageI}
                                onClick={() => handleImageHover(image)}
                            >
                                <div className="flex items-center justify-center relative overflow-hidden group h-full">
                                    {/* image */}
                                    <div className="object-cover h-full">
                                        <Image
                                            src={image.path}
                                            alt={image.title}
                                            width={500}
                                            height={300}
                                            className="block w-full"
                                        />
                                    </div>
                                    {/* overlay gradient */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700"
                                        aria-hidden
                                    />
                                    {/* title */}
                                    <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300">
                                        <Link
                                            href={image.link}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="flex items-center gap-x-2 text-[13px] tracking-[0.2em]"
                                        >
                                            {/* title part 1 */}
                                            <div className="delay-100">LIVE</div>
                                            {/* title part 2 */}
                                            <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                                                PROJECT
                                            </div>
                                            {/* icon */}
                                            <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                                                <BsArrowRight aria-hidden />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default WorkSlider;