"use server";

import { getTemporalClient } from "@temporal/core/client";
import { ONBOARDING_TASK_QUEUE } from "@temporal/core/shared";
import { onboardUserWorkflow } from "@temporal/core/workflows";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function onboardUser(formData: FormData) {
  const args = [
    formData.get("name")?.toString(),
    formData.get("org")?.toString(),
    formData.get("project")?.toString(),
  ];
  if (args.some((arg) => !arg)) {
    throw new Error("Missing required fields");
  }
  const rand = Math.floor(Math.random() * 1000);
  await getTemporalClient().workflow.start(onboardUserWorkflow, {
    taskQueue: ONBOARDING_TASK_QUEUE,
    workflowId: `wf-onboarding-${rand}`,
    args: args as [string, string, string],
  });

  revalidatePath("/");
  redirect("/");
}
