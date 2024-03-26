"use client";
import { Blog } from 'contentlayer/generated'
import BlogCardItem from '@/components/atoms/BlogCardItem'
type PropsBlogCardList = {
    blogs: Blog[]
}

const BlogCardList = ({ blogs }: PropsBlogCardList) => {
    return (
        <>
            <div className='d-flex'>
                {blogs.length && blogs.map((blog, index) =>
                    <BlogCardItem key={index} _id={blog._id} title={blog.title} slugAsParams={blog.slugAsParams} />
                )}
            </div>
        </>
    )
}
export default BlogCardList;