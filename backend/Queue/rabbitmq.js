import amqp from "amqplib";

let connection;

export async function getConnection() {
  if (connection) return connection;

  const RABBIT_URL = process.env.RABBITMQ_URL ;
  connection = await amqp.connect(RABBIT_URL);
  console.log("✅ Connected to RabbitMQ");
  return connection;
}

export async function createChannel() {
  const conn = await getConnection();
  const channel = await conn.createChannel();
  return channel;
}