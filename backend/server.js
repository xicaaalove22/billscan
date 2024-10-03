require('dotenv').config({ path: './.env.local' });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Custom Imports
const routes = require("./routes/routes");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Configuration
const allowedOrigins = ['http://localhost:3000', 'https://billscan.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true  // 如果前端需要发送带有cookie或认证头部
}));

// Serve static files
app.use(express.static("./public"));

// Routes
app.use("/", routes);

// Port configuration
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT || 3000}`);
});

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});

