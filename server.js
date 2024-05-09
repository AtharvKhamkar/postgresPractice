const express = require("express");
const studentRoutes = require('./src/student/routes');
const app = express();
const PORT = 1414;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/students", studentRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})