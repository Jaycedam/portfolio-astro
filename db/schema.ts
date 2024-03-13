import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const page = sqliteTable("page", {
  id: integer("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  views: integer("views").default(0),
});
