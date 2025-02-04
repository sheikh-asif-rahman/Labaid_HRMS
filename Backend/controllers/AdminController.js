const { sql } = require('../config/dbConfig');  // Import the sql configuration for connecting to the database
const crypto = require('crypto');  // Import the crypto module for hashing the password
// Create a new user login entry
const doAdmin = async (req, res) => {
    try {
        // Destructure the fields from the request body
        const { UserId, UserName, MobileNo, BranchId, BranchName, Permission, Password, Status, CreatedBy } = req.body;
        // Validate if required fields are provided in the request body
        if (!UserId || !UserName || !MobileNo || !Password || Status === undefined) {
            return res.status(400).send("Required fields are missing.");  // Send a bad request error if any required field is missing
        }
        // Query to check if the UserId already exists in the database
        const checkQuery = `SELECT COUNT(*) AS count FROM dbo.UserLogin WHERE UserId = @UserId`;
        const request = new sql.Request();  // Create a new request object for SQL query
        request.input('UserId', sql.NVarChar, UserId);  // Bind the input parameter 'UserId' to the SQL query
        const checkResult = await request.query(checkQuery);  // Execute the query asynchronously
        // If the UserId already exists, return an error response
        if (checkResult.recordset[0].count > 0) {
            return res.status(400).send("UserId already exists.");  // Return a bad request error with the message
        }
        // Hash the password using the 'sha256' algorithm to store it securely
        const hashedPassword = crypto
            .createHash('sha256')  // Create a hash instance with the 'sha256' algorithm
            .update(Password)  // Update the hash with the plain text password
            .digest('hex');  // Convert the hash to a hexadecimal string
        // Get the current date and time to set the CreatedDate and UpdatedDate
        const createdDate = new Date();  // Current date-time when the record is created
        const updateDate = new Date();   // Current date-time for the update (same as created date initially)
        // Prepare the SQL query to insert a new user login into the database
        const insertQuery = `
            INSERT INTO dbo.UserLogin (UserId, UserName, MobileNo, BranchId, BranchName, Permission, Password, Status, CreatedBy, CreatedDate, UpdatedBy, UpdateDate)
            VALUES (@UserId, @UserName, @MobileNo, @BranchId, @BranchName, @Permission, @Password, @Status, @CreatedBy, @CreatedDate, @UpdatedBy, @UpdateDate)
        `;
        // Bind the input parameters to the SQL query
        request.input('UserName', sql.NVarChar, UserName);  // User's name
        request.input('MobileNo', sql.NVarChar, MobileNo);  // User's mobile number
        request.input('BranchId', sql.NVarChar, BranchId || null);  // Branch ID, set to null if not provided
        request.input('BranchName', sql.NVarChar, BranchName || null);  // Branch name, set to null if not provided
        request.input('Permission', sql.NVarChar, Permission || null);  // Permission level, set to null if not provided
        request.input('Password', sql.NVarChar, hashedPassword);  // The hashed password
        request.input('Status', sql.Bit, Status);  // User's status (active/inactive)
        request.input('CreatedBy', sql.NVarChar, CreatedBy);  // The user who created this entry
        request.input('CreatedDate', sql.DateTime, createdDate);  // Date and time when the entry was created
        request.input('UpdatedBy', sql.NVarChar, null);  // No value for UpdatedBy initially
        request.input('UpdateDate', sql.DateTime, updateDate);  // Date and time for the update, set to created date initially
        // Execute the insert query
        await request.query(insertQuery);  // Perform the database insert asynchronously
        // Send a success response once the user login is created successfully
        res.status(201).send("UserLogin data successfully created");
    } catch (err) {
        // Log the error and send an error response if any exception occurs
        console.error("Error inserting user login:", err);
        res.status(500).send(`Error inserting user login data: ${err.message || err}`);  // Return a server error response with the error message
    }
};
// Export the doAdmin function for use in other modules
module.exports = { doAdmin };
