const express = require("express");
const router = require("../routes/routes");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/collegeinterns", {
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
    console.log("database connected successfully");
}).catch(() => {
    console.log("database connection failed");
});

const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(router);

app.get("/functionUp", router);

app.listen(port, (req, res) => {
    console.log(`server running at port ${port}`);
})
