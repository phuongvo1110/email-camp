const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 },
    profile: {
        sub: String,
        name: String,
        given_name: String,
        family_name: String,
        picture: String,
        email: String,
        email_verified: Boolean,
    },
});
mongoose.model("users", userSchema);
