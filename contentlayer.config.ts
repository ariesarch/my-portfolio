import GithubSlugger from "github-slugger"
import {
  defineDocumentType,
  makeSource,
  ComputedFields,
  FieldDefs,
} from "contentlayer/source-files";

import rehypePrismPlus from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const computedFields: ComputedFields = {
  id: {
    type: "string",
    resolve: (doc) => doc.id || doc._raw.flattenedPath.replace("blog/", ""),
  },
  slug: {
    type: "string",
    resolve: (doc) => `${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  headings: {
  type: "json",
  resolve: async (doc) => {
    const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
    const slugger = new GithubSlugger()
    const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
        ({ groups }:any) => {
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            level: flag.length,
            text: content,
            slug: content ? slugger.slug(content) : undefined
          };
        }
      );
      return headings;
  },
}
};

const blogFields: FieldDefs = {
  id: {
      type: "string",
    },
  title: { type: "string", required: true },
  description: { type: "string" },
  date: { type: "date", required: true },
  published: { type: "boolean", default: true },
  category: {type: "string", default: "laravel"}
};

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `./blog/**/**/*.mdx`,
  fields: blogFields,
  contentType: "mdx",
  computedFields: computedFields,
}));

const profileFields: FieldDefs = {
  name: { type: "string", required: true },
  description: { type: "string" },
  tags: {
    type: "list",
    of: { type: "string" },
  },
  image: { type: "string", required: false },
};

export const Profile = defineDocumentType(() => ({
  name: "Profile",
  filePathPattern: `./profile/**/*.mdx`,
  fields: profileFields,
  contentType: "mdx",
  computedFields: computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Blog, Profile],
   mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug,[rehypePrismPlus, { ignoreMissing: true }]],
  },
});