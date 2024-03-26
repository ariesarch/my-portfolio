import { useMDXComponent } from "next-contentlayer/hooks";
import { type Blog } from "contentlayer/generated";
import { NavItem } from "@/utils/constants";
import Sidebar from "@/components/atoms/Sidebar";
import Toc from "@/components/atoms/Toc"
import Markup from "@/components/organisms/Markup/Markup";
type Props = {
    blog: Blog;
    sidebarItems: NavItem[]
};
export default function Blog({ blog: { title, body, headings }, sidebarItems }: Props) {
    const MDXContent = useMDXComponent(body.code);
    return (
        <div className="note-container lg:grid-cols-4">
            {/* {headings.map(heading => {
                return (
                    <div key={`#${heading.slug}`}>
                        <a href={`#${heading.slug}`}>
                            {heading.text}
                        </a>
                    </div>
                )
            })} */}

            {/* <Sidebar items={sidebarItems} /> */}
            {/* <Toc headings={headings} /> */}
            <article className="markdown col-span-3">
                <header>
                    <h1>{title}</h1>
                </header>
                <Markup>
                    <MDXContent />
                </Markup>
            </article>
            <Toc headings={headings} />
        </div>
    );
}