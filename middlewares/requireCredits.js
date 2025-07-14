module.exports = (req, res, next) => {
    if (req.user.credits <= 0)
        return res.status(400).send({ error: "User's credit is exceeded" });
    next();
};
