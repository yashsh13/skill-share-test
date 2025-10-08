import { createChannel } from "./rabbitmq.js";

const QUEUE_NAME = "task_queue";

// Step 1: Establish connection & channel
// Step 2: Declare (create) queue
// Step 3: Send message to queue
export async function publishTask(taskData) {
  const channel = await createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  const message = Buffer.from(JSON.stringify(taskData));

  channel.sendToQueue(QUEUE_NAME, message, { persistent: true });
  console.log("📤 Sent task:", taskData);
}