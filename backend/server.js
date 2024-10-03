require('dotenv').config({ path: './.env.local' });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Custom Imports
const routes = require("./routes/routes");

const app = express();

// 设置端口号
const PORT = process.env.PORT || 8080; // 优先使用环境变量的端口号，若未定义则使用 8080 作为本地开发时的端口

// 配置 CORS
const allowedOrigins = [
    'http://localhost:3000', // 本地开发环境
    'https://billscan2024.azurewebsites.net' // Azure 部署的前端地址
];

app.use(cors({
    origin: function (origin, callback) {
        // 允许没有 origin 的请求（例如，postman 或 curl）
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // 允许携带 Cookie 或认证头
}));

// 使用中间件
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public")); // 设置静态文件目录为 public

// 路由配置
app.use("/", routes);

// 监听端口
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});
