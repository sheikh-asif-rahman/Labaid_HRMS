const { sql } = require('../config/dbConfig');
const crypto = require('crypto');

// Create a new user login entry
const doAdmin = async (req, res) => {
    try {
        const { UserId, UserName, MobileNo, BranchId, Permission, Password, Status, CreatedBy } = req.body;

        // Validate input
        if (!UserId || !UserName || !MobileNo || !Password || Status === undefined) {
            return res.status(400).send("Required fields are missing.");
        }

        // Check if UserId already exists
        const checkQuery = `SELECT COUNT(*) AS count FROM dbo.UserLogin WHERE UserId = @UserId`;
        const request = new sql.Request();
        request.input('UserId', sql.NVarChar, UserId);
        const checkResult = await request.query(checkQuery);

        // If UserId exists, return an error message
        if (checkResult.recordset[0].count > 0) {
            return res.status(400).send("UserId already exists.");
        }

        // Hash the password using crypto
        const hashedPassword = crypto
            .createHash('sha256') // You can use other algorithms like 'sha512', 'md5', etc.
            .update(Password)
            .digest('hex');

        // Get the current date and time
        const createdDate = new Date();
        const updateDate = new Date();

        // Prepare the SQL query to insert data
        const insertQuery = `
            INSERT INTO dbo.UserLogin (UserId, UserName, MobileNo, BranchId, Permission, Password, Status, CreatedBy, CreatedDate, UpdatedBy, UpdateDate)
            VALUES (@UserId, @UserName, @MobileNo, @BranchId, @Permission, @Password, @Status, @CreatedBy, @CreatedDate, @UpdatedBy, @UpdateDate)
        `;

        // Prepare the insert request
        request.input('UserName', sql.NVarChar, UserName);
        request.input('MobileNo', sql.NVarChar, MobileNo);
        request.input('BranchId', sql.NVarChar, BranchId || null);
        request.input('Permission', sql.NVarChar, Permission || null);
        request.input('Password', sql.NVarChar, hashedPassword);
        request.input('Status', sql.Bit, Status);
        request.input('CreatedBy', sql.NVarChar, CreatedBy);
        request.input('CreatedDate', sql.DateTime, createdDate);
        request.input('UpdatedBy', sql.NVarChar, null);
        request.input('UpdateDate', sql.DateTime, updateDate);

        // Execute the insert query
        await request.query(insertQuery);

        // Return success response
        res.status(201).send("UserLogin data successfully created");
    } catch (err) {
        console.error("Error inserting user login:", err);
        res.status(500).send(`Error inserting user login data: ${err.message || err}`);
    }
};

module.exports = { doAdmin };
