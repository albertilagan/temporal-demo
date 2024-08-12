import { NativeConnection, Worker } from "@temporalio/worker";
import * as activities from "@temporal/core/activities";
import { ONBOARDING_TASK_QUEUE } from "@temporal/core/shared";

run().catch((err) => console.log(err));

async function run() {
  const connection = await NativeConnection.connect({
    address: "localhost:7233",
    // In production, pass options to configure TLS and other settings.
  });
  try {
    const worker = await Worker.create({
      connection,
      workflowsPath: require.resolve(
        "../../../packages/temporal/src/workflows.ts",
      ),
      activities,
      taskQueue: ONBOARDING_TASK_QUEUE,
    });
    await worker.run();
  } finally {
    connection.close();
  }
}
