const { sql } = require('../config/dbConfig');

// Create a new user login entry
const doAdmin = async (req, res) => {
    try {
        const { UserId, UserName, MobileNo, GroupIds, Password, Status, CreatedBy } = req.body;

        // Validate input
        if (!UserId || !UserName || !MobileNo || !Password || Status === undefined) {
            return res.status(400).send("Required fields are missing.");
        }

        // Get the current date and time
        const createdDate = new Date();
        const updateDate = new Date();

        // Prepare the SQL query to insert data, excluding the 'Id' field
        const query = `
            INSERT INTO dbo.UserLogin (UserId, UserName, MobileNo, GroupIds, Password, Status, CreatedBy, CreatedDate, UpdatedBy, UpdateDate)
            VALUES (@UserId, @UserName, @MobileNo, @GroupIds, @Password, @Status, @CreatedBy, @CreatedDate, @UpdatedBy, @UpdateDate)
        `;

        const request = new sql.Request();
        request.input('UserId', sql.NVarChar, UserId);
        request.input('UserName', sql.NVarChar, UserName);
        request.input('MobileNo', sql.NVarChar, MobileNo);
        request.input('GroupIds', sql.NVarChar, GroupIds || null);
        request.input('Password', sql.NVarChar, Password);
        request.input('Status', sql.Bit, Status);
        request.input('CreatedBy', sql.NVarChar, CreatedBy);
        request.input('CreatedDate', sql.DateTime, createdDate);
        request.input('UpdatedBy', sql.NVarChar, null); // Optional, depending on your use case
        request.input('UpdateDate', sql.DateTime, updateDate);

        // Execute the query
        await request.query(query);

        // Return success response
        res.status(201).send("UserLogin data successfully created");
    } catch (err) {
        console.error("Error inserting user login:", err);
        // Send detailed error response
        res.status(500).send(`Error inserting user login data: ${err.message || err}`);
    }
};

module.exports = { doAdmin };
