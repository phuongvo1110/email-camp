const express = require("express");
const dotenv = require("dotenv");
const Queue = require("bull");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const emailQueue = require("../queues/emailQueues");
(async () => {
    dotenv.config();

    const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
    const redisOption = {
        redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD },
    };

    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/admin/queues");

    createBullBoard({
        queues: [new BullAdapter(emailQueue)],
        serverAdapter,
    });
    const app = express();
    app.use("/admin/queues", serverAdapter.getRouter());
    app.listen(4000, () => {
        console.info(`Running on ${4000}...`);
        console.info(`For the UI, open http://localhost:${4000}/admin/queues`);
        console.info("Make sure Redis is running on port 6379 by default");
    });
})();
