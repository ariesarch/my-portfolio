import { allBlogs } from "contentlayer/generated";
import sidebar from "./sidebar";
import { NavItem, DocsSidebarItemConfig } from "@/utils/constants";
export function getSidebarItems(
  items: DocsSidebarItemConfig[] = sidebar.items
) {
  const result: NavItem[] = [];
  for (const item of items) {
    if ("items" in item) {
      // console.log("main items", item)
      // Category
      result.push({
        ...item,
        items: getSidebarItems(item.items),
      });
    } else {
      // Document link
      const doc = allBlogs.find((d: { slug: string; }) => d.slug.replace('/note/','') === item.slug);
      if (!doc) continue;
      result.push({
        ...item,
        href:  doc.slug.replace('/note/',''),
        label: item.label ?? doc.title,
      });
    }
  }
  // console.log("Result: ", result)
  return result;
}