import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlite = new Database("../../sqlite.db");

export * from "./schema";

export const db = drizzle(sqlite);
