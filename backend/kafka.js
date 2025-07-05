const { Kafka } = require('kafkajs');
const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER] });
const producer = kafka.producer();

async function sendAnalytics(event) {
  await producer.connect();
  await producer.send({
    topic: 'game-analytics',
    messages: [{ value: JSON.stringify(event) }],
  });
}

module.exports = sendAnalytics;