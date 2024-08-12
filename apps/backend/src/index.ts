import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { db, users } from "@db";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/onboard", async (c) => {
  const { name } = await c.req.json();
  const [result] = await db
    .insert(users)
    .values({ name })
    .returning({ id: users.id });
  return c.json({ status: "ok", id: result.id });
});

app.post("/add-to-org", async (c) => {
  const { userId, org } = await c.req.json();
  const [result] = await db
    .update(users)
    .set({ org })
    .where(eq(users.id, userId))
    .returning({ name: users.name });
  result.name;
  return c.json({ status: "ok", message: `Added ${result.name} to ${org}` });
});

app.post("/add-to-project", async (c) => {
  const { userId, project } = await c.req.json();
  const [result] = await db
    .update(users)
    .set({ project })
    .where(eq(users.id, userId))
    .returning({ name: users.name });
  return c.json({
    status: "ok",
    message: `Added ${result.name} to ${project}`,
  });
});

app.patch("/confirm-onboarding", async (c) => {
  const { userId } = await c.req.json();
  const [result] = await db
    .update(users)
    .set({ onboarded: true })
    .where(eq(users.id, userId))
    .returning({ name: users.name });
  return c.json({ status: "ok", message: `${result.name} is now onboarded` });
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
