const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/dbConfig');

const locationRoutes = require('./routes/LocationRoute');
const reportRoutes = require('./routes/ReportRoute');
const userRoutes = require('./routes/UserRoute');

const app = express();
app.use(express.json());
const port = 3000;

app.use(cors());

// Connect to the database
connectDB()
    .then(() => {
        console.log("Database connection established.");
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    });

// Routes
app.use('/api', locationRoutes);
app.use('/api', reportRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`The server has started on port ${port}`);
});
