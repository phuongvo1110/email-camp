const mongoose = require("mongoose");
const recipientSchema = require("./Recipient");
const { Schema } = mongoose;

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    dateSent: Date,
    lastResponded: Date,
    // isSent: { type: Boolean, default: false },
});
mongoose.model("surveys", surveySchema);
