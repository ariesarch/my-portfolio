import { AboutDataItem } from "@/utils/constants"
import {FC} from "react"
import { Arrow } from "./Arrow"
type ExpProps = {
    experience: AboutDataItem
}
const ExperienceItem: FC<ExpProps> = (props) => {
    const {experience} = props
    return(
        <div className="p-2 flex-1 flex flex-col md:flex-row w-full gap-x-2 text-white/60 ransition duration-150 hover:bg-accent/20 hover:scale-95">
                <div className="w-full md:w-[20%] xl:w-[13%]">
                    {experience?.stage}
                </div>
            <div className="w-full md:w-[80%] xl:w-[87%] font-light mb-2 md:mb-0 cursor-pointer hover:text-orange-200">
                <h3 className="text-white text-xl">{experience?.title} <Arrow /></h3>
                <div>
                    {experience?.description}
                </div>
                <ul className="flex flex-wrap gap-2 mt-1">
                    {experience.stacks?.map((stack, index) => (
                        <li key={index}>
                            <div className="flex items-center rounded-full bg-accent/30 px-3 py-1 font-medium text-white text-sm">
                                {stack}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default ExperienceItem;