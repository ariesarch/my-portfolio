import Image from "next/image";
interface BulbProps {
    handleClick:()=>void,
    className?: string
}

const Bulb = ({ handleClick,className }:BulbProps) => {
    return (
        // <div className="absolute -right-2 bottom-4 -rotate-12 mix-blend-color-dodge animate-pulse duration-75 z-10 w-[200px] xl:w-[260px] select-none">
        <div className={`absolute animate-pulse duration-75 z-10 w-fit select-none ${className}`}>
            <Image
                src="/bulb.png"
                alt="bulb"
                width={120}
                height={120}
                className="w-full h-full cursor-pointer"
                onClick={handleClick} 
            />
        </div>
    );
};

export default Bulb;