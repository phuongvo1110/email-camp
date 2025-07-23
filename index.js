const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const { mongoURI, cookieKey } = require("./config/key");
const bullBoard = require("./dashboard/bull-board");
const emailQueue = require("./queues/emailQueues");
require("./models/User");
require("./models/PricingPlans");
require("./models/Survey");
require("./services/passport");

mongoose.connect(mongoURI);

const app = express();
app.use(express.json());

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
require("./workers/emailProcessor");
require("./routes/authRoutes")(app);
require("./routes/subscribeRoutes")(app);
require("./routes/pricingPlansRoutes")(app);
require("./routes/surveyRoutes")(app);
app.use("/admin/queues", bullBoard.getRouter());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/dist"));

    const path = require("path");
    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
