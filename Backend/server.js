const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/dbConfig');

const locationRoutes = require('./routes/LocationRoute');
const reportLocationRoutes = require('./routes/ReportLocationRoute');
const reportRoutes = require('./routes/ReportRoute');
const userRoutes = require('./routes/UserRoute');
const adminRoutes = require('./routes/AdminRoute');
const adminUserSearchRoute = require('./routes/AdminUserSearchRoute');
const userUpdateRoute = require('./routes/UserUpdateRoute');
const loginUser = require('./routes/LoginRoute');
const OverViewOneRoute = require('./routes/OverViewOneRoute');
const changeThePassword = require('./routes/ChangePasswordRoute');
const searchEmployee = require('./routes/EmployeeSearchRoute');
const departmentCreateRoute = require('./routes/DepartmentCreateRoute');
const loadDepartments = require('./routes/LoadDepartmentRoute');
const departmentupdate = require('./routes/DepartmentUpdateRoute');
const loadDesignation = require('./routes/LoadDesignationRoute');



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
app.use('/api', adminRoutes);
app.use('/api', adminUserSearchRoute);
app.use('/api', userUpdateRoute);
app.use('/api', loginUser);
app.use('/api', reportLocationRoutes);
app.use('/api', OverViewOneRoute);
app.use('/api', changeThePassword);
app.use('/api', searchEmployee);
app.use('/api', departmentCreateRoute);
app.use('/api', loadDepartments);
app.use('/api', departmentupdate);
app.use('/api', loadDesignation);









app.listen(port, () => {
    console.log(`The server has started on port ${port}`);
});
