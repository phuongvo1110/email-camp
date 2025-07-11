const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const { mongoURI, cookieKey } = require("./config/key");

require("./models/User");
require("./services/passport");

mongoose.connect(mongoURI);

const app = express();

app.use(
    session({
        secret: cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
            collectionName: "sessions",
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
