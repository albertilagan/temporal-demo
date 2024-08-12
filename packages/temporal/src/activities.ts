import { activityInfo, sleep } from "@temporalio/activity";

export async function createUser(name: string) {
  const result = await fetch("http://localhost:3001/onboard", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return { result, activityId: activityInfo().activityId };
}

export async function addToOrg(userId: number, org: string) {
  await sleep(10000);
  const result = await fetch("http://localhost:3001/add-to-org", {
    method: "POST",
    body: JSON.stringify({ userId, org }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return { result, activityId: activityInfo().activityId };
}

export async function addToProject(userId: number, project: string) {
  await sleep(10000);
  const result = await fetch("http://localhost:3001/add-to-project", {
    method: "POST",
    body: JSON.stringify({ userId, project }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return { result, activityId: activityInfo().activityId };
}

export async function confirmOnboarding(userId: number) {
  const result = await fetch("http://localhost:3001/confirm-onboarding", {
    method: "PATCH",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return { result, activityId: activityInfo().activityId };
}
