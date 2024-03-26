import Link from "next/link";
type PropsBlogCardItem = {
    _id: string,
    title: string,
    slugAsParams: string
}
const BlogCardItem = ({ _id, title, slugAsParams }: PropsBlogCardItem) => {
    return (
        <div>
            <Link href={`/blog/${slugAsParams}`}>{title}</Link>
        </div>
    )
}
export default BlogCardItem;