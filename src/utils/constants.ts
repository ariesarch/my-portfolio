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
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type NavItemCategory = {
  slug: string;
  label: string;
  open?: boolean;
  items: NavItem[]; // Self reference
};

export type NavItemLink = {
  slug: string;
  label: string;
  href: string;
};

export type Heading = {
  slug: string;
  text: string;
  href: string;
};


export type DocsSidebarItemConfig =
  | NavItemCategory
  | Optional<Omit<NavItemLink, "href">, "label">;

export type DocsSidebarConfig = {
  items: DocsSidebarItemConfig[];
};

export type NavItem = NavItemCategory | NavItemLink;
