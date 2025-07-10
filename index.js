const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send({
        product: [],
    });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listning on port 3000");
});
