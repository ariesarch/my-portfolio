export interface SelectedProject {
    title ?: string;
    description ?: string[];
};
export type SetSelectedProject = React.Dispatch<React.SetStateAction<SelectedProject>>;
