import { defineTable, column, defineDb } from "astro:db";

// https://astro.build/db/config
const PageCount = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    slug: column.text({ unique: true }),
    views: column.number({ default: 0 }),
  },
});

export default defineDb({
  tables: { PageCount },
});
