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
                    title: "Newsmast",
                    path: "/newsmast-pwa.jpeg",
                    description: [
                        "A decentralized social media platrorm."
                    ],
                    link: "http://example.com",
                },
                {
                    title: "SAYA",
                    path: "/saya-web.jpeg",
                    link: "http://example.com",
                },
                {
                    title: "SBN",
                    path: "/sbn-web.jpeg",
                    link: "http://example.com",
                },
                {
                    title: "PSS",
                    path: "/pss-web.jpeg",
                    link: "http://example.com",
                },
            ],
        },
        {
            images: [
                {
                    title: "title",
                    path: "/thumb4.jpg",
                    link: "http://example.com",
                },
                {
                    title: "title",
                    path: "/thumb1.jpg",
                    link: "http://example.com",
                },
                {
                    title: "title",
                    path: "/thumb2.jpg",
                    link: "http://example.com",
                },
                {
                    title: "title",
                    path: "/thumb3.jpg",
                    link: "http://example.com",
                },
            ],
        },
    ],
};

interface WorkSliderProps {
    selectedPrj: SelectedProject;
    setSelectedProject: SetSelectedProject
}
const WorkSlider: React.FC<WorkSliderProps> = ({ selectedPrj, setSelectedProject }) => {
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
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 max-h-[540px]">
                        {slide.images.map((image, imageI) => (
                            <div
                                className=" relative rounded-lg overflow-hidden flex items-center justify-center group"
                                key={imageI}
                                onMouseEnter={() => handleImageHover(image)}
                            >
                                <div className="flex items-center justify-center relative overflow-hidden group">
                                    {/* image */}
                                    <div className="object-cover ">
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