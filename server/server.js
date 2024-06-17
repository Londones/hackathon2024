const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const http = require("http");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

const AuthRoutes = require("./routes/AuthRoutes");
const RefreshRoutes = require("./routes/RefreshRoutes");

app.use("/auth", AuthRoutes);
app.use("/refresh", RefreshRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
