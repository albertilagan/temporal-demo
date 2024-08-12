import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "./activities";

const { createUser, addToOrg, addToProject, confirmOnboarding } =
  proxyActivities<typeof activities>({
    startToCloseTimeout: "1 minute",
  });

export async function onboardUserWorkflow(
  name: string,
  org: string,
  project: string,
) {
  const { result, activityId: createUserActivityId } = await createUser(name);
  const { id } = result;
  console.log(`activity ${createUserActivityId} executed!`);

  const { activityId: addToOrgActivityId } = await addToOrg(id, org);
  console.log(`activity ${addToOrgActivityId} executed!`);

  const { activityId: addToProjectActivityId } = await addToProject(
    id,
    project,
  );
  console.log(`activity ${addToProjectActivityId} executed!`);

  const { activityId: confirmOnboardingActivityId } =
    await confirmOnboarding(id);
  console.log(`activity ${confirmOnboardingActivityId} executed!`);

  return `User ${name} (${id}) is now onboarded and added to ${org} and ${project}`;
}
