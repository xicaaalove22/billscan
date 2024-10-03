require('dotenv').config({ path: './.env.local' });

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


app.use(express.static(path.join(__dirname, '../build')));



app.use("/", routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
