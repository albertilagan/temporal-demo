"use server";

import { db, users } from "@db";

export async function getUsers() {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      org: users.org,
      project: users.project,
      onboarded: users.onboarded,
    })
    .from(users);
  return data;
}
