const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const _ = require("lodash");
/**
 * Parse recipients string into array of email objects
 * @param {string} recipientsString - Comma-separated email addresses
 * @returns {Array} Array of recipient objects with email property
 */
const parseRecipients = (recipientsString) => {
    if (!recipientsString || typeof recipientsString !== "string") {
        throw new Error("Recipients must be a valid string");
    }

    return recipientsString
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email.length > 0)
        .map((email) => ({ email }));
};

/**
 * Validate survey data
 * @param {Object} surveyData - Survey data from request body
 */
const validateSurveyData = (surveyData) => {
    const { title, subject, body, recipients } = surveyData;

    if (!title || !subject || !body || !recipients) {
        throw new Error("Title, subject, body, and recipients are required");
    }

    if (typeof title !== "string" || title.trim().length === 0) {
        throw new Error("Title must be a non-empty string");
    }

    if (typeof subject !== "string" || subject.trim().length === 0) {
        throw new Error("Subject must be a non-empty string");
    }

    if (typeof body !== "string" || body.trim().length === 0) {
        throw new Error("Body must be a non-empty string");
    }
};

module.exports = (app) => {
    app.get("/api/surveys/thanks", (req, res) => {
        res.redirect(
            process.env.NODE_ENV === "production"
                ? "https://email-camp.onrender.com/thanks"
                : "http://localhost:5173/thanks"
        );
    });
    app.get("/api/surveys/:surveyId/:choice", (req, res) => {
        const { surveyId, choice } = req.params;
        res.redirect(
            process.env.NODE_ENV === "production"
                ? "https://email-camp.onrender.com/thanks"
                : "http://localhost:5173/thanks"
        );
    });
    app.post("/api/survey/webhooks", (req, res) => {
        const domain =
            process.env.NODE_ENV === "production"
                ? "https://email-camp.onrender.com"
                : "http://localhost:5173";
        _.chain(req.body)
            .map((item) => item.url.slice(domain.length))
            .map((item, index) => {
                const splittedParam = item.split("/");
                return {
                    email: req.body[index].email,
                    surveyId: splittedParam[3],
                    choice: splittedParam[4],
                };
            })
            .uniqBy((param) => param.email + param.surveyId)
            .each((param) => {
                Survey.updateOne(
                    {
                        _id: param.surveyId,
                        recipients: {
                            $elemMatch: {
                                email: param.email,
                                responded: false,
                            },
                        },
                    },
                    {
                        $inc: { [param.choice]: 1 },
                        $set: {
                            "recipients.$.responded": true,
                            lastResponded: new Date(),
                        },
                    }
                ).exec();
            })
            .value();
        res.send({});
    });
    app.get("/api/surveys", requireLogin, async (req, res) => {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const sortField = req.query.sort || "dateSent";
        const sortOrder = req.query.order === "desc" ? -1 : 1;
        let sortOption = {};
        if (sortField.startsWith("-")) {
            sortOption[sortField.substring(1)] = -1;
        } else {
            sortOption[sortField] = 1;
        }
        const total = await Survey.countDocuments({ userId: req.user.id });
        const startIndex = (page - 1) * limit;
        const surveys = await Survey.find({ userId: req.user.id })
            .sort(sortOption)
            .skip(startIndex)
            .limit(limit);
        res.json({
            surveys,
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        });
    });
    app.get("/api/surveys/all", requireLogin, async (req, res) => {
        const surveys = await Survey.find({ userId: req.user.id });
        res.json({
            surveys,
        });
    });
    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
        try {
            // Check user credits
            if (req.user.credits <= 0) {
                return res.status(403).json({
                    error: "Insufficient credits",
                    message: "You need at least 1 credit to send a survey",
                });
            }

            // Validate survey data
            validateSurveyData(req.body);

            const { recipients: recipientsString, ...surveyData } = req.body;

            // Parse recipients
            const recipients = parseRecipients(recipientsString);

            if (recipients.length === 0) {
                return res.status(400).json({
                    error: "No valid recipients",
                    message: "At least one valid email address is required",
                });
            }

            // Create and save survey
            const survey = new Survey({
                ...surveyData,
                recipients,
                userId: req.user.id,
                dateSent: Date.now(),
            });

            await survey.save();

            // Send emails
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();

            // Deduct credit from user
            req.user.credits -= 1;
            await req.user.save();

            // Return success response
            res.status(201).json({
                message: "Survey created and emails sent successfully",
                survey: {
                    id: survey._id,
                    title: survey.title,
                    subject: survey.subject,
                    recipientCount: recipients.length,
                    dateSent: survey.dateSent,
                },
                remainingCredits: req.user.credits,
            });
        } catch (error) {
            console.error("Error creating survey:", error);

            // Handle specific error types
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    error: "Validation error",
                    message: error.message,
                });
            }

            if (
                error.message.includes("Recipients") ||
                error.message.includes("required")
            ) {
                return res.status(400).json({
                    error: "Invalid input",
                    message: error.message,
                });
            }

            // Generic server error
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to create survey. Please try again later.",
            });
        }
    });
};
