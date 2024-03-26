import { allBlogs } from "contentlayer/generated";
import { FC } from "react";
import { getMDXComponent } from "next-contentlayer/hooks"
import Markup from "@/components/organisms/Markup/Markup";
import Blog from "@/components/templates/Blog/Blog";
import { getSidebarItems } from "@/lib/docs";
import BlogLayout from "@/app/BlogLayout";
type PropsBlogDetailPage = {
    params: {
        category: string;
        slug: string;
    };
};

const getBlogFromParam = async (slug: string) => {
    const blogDetail = allBlogs.find(
        (blog) => blog.slugAsParams === slug
    );
    return blogDetail;
};

const blogDetailPage: FC<PropsBlogDetailPage> = async ({
    params: { category, slug },
}) => {
    const params = `${category}/${slug}`
    const blog = await getBlogFromParam(params);
    if (!blog) {
        return <>
            <h3>Not Found {category} {slug}</h3>
        </>
    }

    // const MdxContent = getMDXComponent(note.body.code)
    // return (
    //     <Markup>
    //         <Markup>
    //             {/* <MdxContent components={components} /> */}
    //             <MdxContent />
    //         </Markup>
    //     </Markup>
    // )
    const sidebarItems = getSidebarItems()
    return (
        <BlogLayout>
            <Blog blog={blog} sidebarItems={sidebarItems} />
        </BlogLayout>
    )
}
export default blogDetailPage;