const emailQueue = require("../queues/emailQueues");
const Mailer = require("../services/Mailer");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
emailQueue.process(async (job) => {
    const { survey, surveyTemplate } = job.data;
    try {
        const mailer = new Mailer(survey, surveyTemplate);
        job.progress(50);
        await mailer.send();
        job.progress(100);

        return {
            status: "success",
            message: "Email sent successfully",
            surveyId: survey._id,
        };
    } catch (error) {
        throw new Error(`Failed to process email job: ${error.message}`);
    }
});
emailQueue.on("completed", async (job, result) => {
    const { surveyId, status, message } = result || {};
    try {
        await Survey.findByIdAndUpdate(surveyId, {
            $set: {
                status: status || "success",
            },
        });
    } catch (error) {
        console.error(`Failed to update survey status: ${error.message}`);
    }
});
emailQueue.on("failed", async (job, err) => {
    const { survey } = job.data;
    if (survey?._id) {
        await Survey.findByIdAndUpdate(survey._id, {
            $set: {
                status: "failed",
            },
        });
    }
    console.error(`❌ Email job failed. ID: ${job.id}`);
    console.error("Error:", err.message);
});
