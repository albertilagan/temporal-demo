import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  org: text("org"),
  project: text("project"),
  onboarded: integer("onboarded", { mode: "boolean" }).default(false),
});
