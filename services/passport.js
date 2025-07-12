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
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            const user = await new User({
                googleId: profile.id,
                profile: profile._json,
            }).save();
            done(null, user);
        }
    )
);
