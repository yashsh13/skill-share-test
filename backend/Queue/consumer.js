// backend/src/queue/consumer.js
import { createChannel } from "./rabbitmq.js";

const QUEUE_NAME = "task_queue";

// Step 1: Establish connection & channel
// Step 2: Declare (create) queue
// Step 4: Consume messages from queue
export async function startConsumer(workHandler) {
  const channel = await createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  // Limit each worker to one unacked message at a time
  channel.prefetch(1);

  console.log(`👂 Waiting for messages in ${QUEUE_NAME}`);

  channel.consume(
    QUEUE_NAME,
    async (msg) => {
      if (!msg) return;

      const task = JSON.parse(msg.content.toString());
      console.log("📥 Received task:", task);

      try {
        await workHandler(task); // custom logic of each worker
        channel.ack(msg); // tell RabbitMQ this message is processed
      } catch (err) {
        console.error("❌ Worker failed:", err);
        channel.nack(msg, false, true); // requeue the task
      }
    },
    { noAck: false }
  );
}
