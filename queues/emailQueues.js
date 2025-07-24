const Queue = require("bull");
const dotenv = require("dotenv");
dotenv.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisOption = {
    redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD },
};
const emailQueue = new Queue(
    "email",
    process.env.NODE_ENV === "production" ? process.env.REDIS_URL : redisOption
);
module.exports = emailQueue;
