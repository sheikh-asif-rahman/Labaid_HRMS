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
const designationcreate = require('./routes/DesignationCreateRoute');
const designationupdate = require('./routes/DesignationUpdateRoute');
const employeeCreate = require('./routes/EmployeeCreateRoute');
const employeeUpdate = require('./routes/EmployeeUpdateRoute');
const rulesPermissionEmployeeSearch = require('./routes/RulesPermissionEmployeeSearchRoute');
const rulesPermissionEmployeeUpdate = require('./routes/RulesPermissionUpdateRoute');
const getPendingEmployee = require('./routes/PendingEmployeeRoute');
const updatePendingEmployee = require('./routes/PendingEmployeeUpdateRoute');
const getNotification = require('./routes/NotificationRoute');
const leaveusersearch = require('./routes/LeaveUserSearchRoute');
const leavesave = require('./routes/LeaveSaveRoute');
const holidaycalanderload = require('./routes/HolidayCalanderLoadRoute');
const holidaycalanderupdate = require('./routes/HolidayCalanderUpdateRoute');
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
app.use('/api', designationcreate);
app.use('/api', designationupdate);
app.use('/api', employeeCreate);
app.use('/api', employeeUpdate);
app.use('/api', rulesPermissionEmployeeSearch);
app.use('/api', rulesPermissionEmployeeUpdate);
app.use('/api', getPendingEmployee);
app.use('/api', updatePendingEmployee);
app.use('/api', getNotification);
app.use('/api', leaveusersearch);
app.use('/api', leavesave);
app.use('/api', holidaycalanderload);
app.use('/api', holidaycalanderupdate);



















app.listen(port, () => {
    console.log(`The server has started on port ${port}`);
});
