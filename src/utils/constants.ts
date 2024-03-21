import { IconType } from 'react-icons';
import { Url } from 'url';

export interface SelectedProject {
    title ?: string;
    description ?: string[];
};
// export interface AboutData{
//     title: string;
//     stage?: string;
//     icons?:
//     description?:string
// }
export interface AboutData {
    title: string;
    info: AboutDataItem[];
}
export interface AboutDataItem {
    title: string;
    stage?: string;
    icons?: IconType[];
    description?: string;
    stacks?:string[],
    href?:string
}
export type SetSelectedProject = React.Dispatch<React.SetStateAction<SelectedProject>>;
