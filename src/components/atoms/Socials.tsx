import Link from "next/link";

import {
    RiGithubLine,
    RiLinkedinLine,
    RiGamepadLine
} from "react-icons/ri";

export const socialData = [
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/kyawye-naing-099970104/",
        Icon: RiLinkedinLine,
    },
    {
        name: "Github",
        link: "https://github.com/ariesArch",
        Icon: RiGithubLine,
    },
];

const Socials = () => {
    return (
        <div className="flex items-center gap-x-5 text-3xl">
            {socialData.map((social, i) => (
                <Link
                    key={i}
                    title={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bg-accent rounded-full p-[5px] text-white transition-all duration-300 hover:bg-white hover:text-accent"
                >
                    <social.Icon aria-hidden />
                    <span className="sr-only">{social.name}</span>
                </Link>
            ))}
            {/* <strong>kyawyenaing.dev@gmail.com 0617596074</strong> */}
        </div>
    );
};

export default Socials;