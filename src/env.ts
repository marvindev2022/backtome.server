const _QUEUE_URL = new URL(process.env.QUEUE_URL as string);

const REDIS = {
  HOST: _QUEUE_URL.hostname,
  PORT: _QUEUE_URL.port,
  USER: _QUEUE_URL.username,
  PASSWORD: _QUEUE_URL.password,
  PROTOCOL: _QUEUE_URL.protocol,
};

export default {
  QUEUE_URL: process.env.QUEUE_URL as string,
  QUEUE_HOST: REDIS.HOST,
  QUEUE_PORT: REDIS.PORT,
  QUEUE_USER: REDIS.USER,
  QUEUE_PASSWORD: REDIS.PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET as string,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET as string,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY as string,
  AWS_S3_KEY_SECRET: process.env.AWS_S3_KEY_SECRET as string,
  AWS_S3_ENDPOINT: process.env.AWS_S3_ENDPOINT as string,
  MAILER_HOST: process.env.MAILER_HOST as string,
  MAILER_PORT: process.env.MAILER_PORT as string,
  MAILER_USER: process.env.MAILER_USER as string,
  MAILER_PASS: process.env.MAILER_PASS as string,
  MAILER_SENDER: process.env.MAILER_SENDER as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
};
