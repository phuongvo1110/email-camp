const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { googleClientID, googleClientSecret } = require("../config/key");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
});
const isProd = process.env.NODE_ENV === "production";
passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: isProd
                ? "https://email-camp.onrender.com/auth/google/callback"
                : "http://localhost:3000/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then((existingUser) => {
                if (!existingUser) {
                    new User({ googleId: profile.id })
                        .save()
                        .then((user) => done(null, user));
                } else {
                    done(null, existingUser);
                }
            });
        }
    )
);
