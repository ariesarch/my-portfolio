import { FC } from "react";
import { allBlogs } from 'contentlayer/generated'
import BlogCardList from '@/components/molecules/BlogCardList'
import { groupBy } from "@/lib/group";
import styles from '@/components/atoms/Sidebar.module.css'
const getAllBlogs = async () => {
    return allBlogs;
};
const GroupSidebar = async () => {
    const blogs = await getAllBlogs();
    const groupedArticles = groupBy(blogs, 'category');

    return (
        <div className={styles.container}>
            {groupedArticles.map((group, index) => (
                <div key={group.key}>
                    <h2 className='capitalize'>{group.key}</h2>
                    <BlogCardList blogs={group.items} />
                </div>
            ))}
        </div>
    );
}
export default GroupSidebar;