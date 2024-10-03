require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Custom Imports
const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("./public"));

app.use("/", routes);

const ENPORT = process.env.PORT || 8080;

app.listen(ENPORT, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT}`);
});

const path = require("path");

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

console.log(`Environment PORT: ${process.env.PORT}`);
console.log(`Fallback ENPORT: ${ENPORT}`);
