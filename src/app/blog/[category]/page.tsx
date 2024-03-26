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
    };
};

const getBlogFromParam = async (category: string) => {
    const blogDetail = allBlogs.find(
        (blog) => blog.slugAsParams === category
    );
    return blogDetail;
};

const BlogDetailPage: FC<PropsBlogDetailPage> = async ({
    params: { category },
}) => {
    const blog = await getBlogFromParam(category);
    if (!blog) {
        return <>
            <h3>Category Page {category}</h3>
        </>
    }
    const sidebarItems = getSidebarItems()
    return (
        <BlogLayout>
            <h3>Category Page {category}</h3>
            <Blog blog={blog} sidebarItems={sidebarItems} />
        </BlogLayout>
    )
}
export default BlogDetailPage;