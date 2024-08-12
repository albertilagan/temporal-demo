import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "../../sqlite.db",
  },
  verbose: true,
  strict: true,
});
