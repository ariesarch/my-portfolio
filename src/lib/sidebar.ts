/** @type {import('./types').DocsSidebarConfig} */
const sidebar = {
  items: [
    {
      slug: "sample",
    },
    {
      slug: "blog",
      label: "My Notes",
      items: [
        {
          slug: "first",
        },
        {
          slug: "vue",
        },
      ],
    },
  ],
};

export default sidebar;