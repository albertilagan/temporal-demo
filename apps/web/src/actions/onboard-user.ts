"use server";

import { getTemporalClient } from "@temporal/core/client";
import { ONBOARDING_TASK_QUEUE } from "@temporal/core/shared";
import { onboardUserWorkflow } from "@temporal/core/workflows";

export async function onboardUser(name: string, org: string, project: string) {
  const rand = Math.floor(Math.random() * 1000);
  await getTemporalClient().workflow.start(onboardUserWorkflow, {
    taskQueue: ONBOARDING_TASK_QUEUE,
    workflowId: `wf-onboarding-${rand}`,
    args: [name, org, project],
  });
}
