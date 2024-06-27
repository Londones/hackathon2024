const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const http = require("http");
const schedule = require("node-schedule");
const { sendMessage } = require("./api/smsfactor");
const SMSController = require("./controllers/SMSController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

const AuthRoutes = require("./routes/AuthRoutes");
const RefreshRoutes = require("./routes/RefreshRoutes");
const DiseaseRoutes = require("./routes/DiseaseRoutes");

const userToNotifyFunction = require("./controllers/DiseaseController");

/*schedule.scheduleJob("0 * * * *", async () => {
    console.log("Checking for users to notify...");
    const usersToNotify = await userToNotifyFunction.findUsersToNotify();
    console.log("Users to notify:", usersToNotify);
    // Send notifications to users here
    for (const user of usersToNotify) {
        console.log("Sending SMS to:", user.phone);
        sendMessage(user.phone, user.message);
    }
});*/

// Schedule the SMS processing job to run every minutes
// schedule.scheduleJob("* * * * *", async () => {
//     console.log("Processing SMS messages...");
//     await SMSController.processSMSMessages();
// });

//Schedule the Last SMS processing 
schedule.scheduleJob('*/10 * * * * *', async () => {
    console.log("Processing SMS messages...");
    await SMSController.processLastSMS();
});

app.use("/auth", AuthRoutes);
app.use("/refresh", RefreshRoutes);
app.use("/disease", DiseaseRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
