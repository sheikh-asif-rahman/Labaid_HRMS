const { sql } = require("../config/dbConfig");

// Add or update holiday record
const HolidayCalendarUpdate = async (req, res) => {
    try {
        const { Id, EventDate, EventDetails, CreatedBy } = req.body;

        if (!EventDate || !EventDetails || !CreatedBy) {
            return res.status(400).send("Missing required fields");
        }

        const pool = await sql.connect();

        if (Id) {
            // If Id is provided, update the existing record
            await pool.request()
                .input("Id", sql.Int, Id)
                .input("EventDate", sql.Date, EventDate)
                .input("EventDetails", sql.NVarChar, EventDetails)
                .input("CreatedBy", sql.NVarChar, CreatedBy)
                .query(`
                    SET IDENTITY_INSERT [dbo].[HolidayCalendar] ON;
                    DELETE FROM [dbo].[HolidayCalendar] WHERE Id = @Id;
                    INSERT INTO [dbo].[HolidayCalendar] (Id, EventDate, EventDetails, CreatedBy)
                    VALUES (@Id, @EventDate, @EventDetails, @CreatedBy);
                    SET IDENTITY_INSERT [dbo].[HolidayCalendar] OFF;
                `);
            return res.status(200).send("Holiday record updated successfully");
        } else {
            // If Id is not provided, let SQL Server handle auto-incrementing the ID
            await pool.request()
                .input("EventDate", sql.Date, EventDate)
                .input("EventDetails", sql.NVarChar, EventDetails)
                .input("CreatedBy", sql.NVarChar, CreatedBy)
                .query(`
                    INSERT INTO [dbo].[HolidayCalendar] (EventDate, EventDetails, CreatedBy)
                    VALUES (@EventDate, @EventDetails, @CreatedBy);
                `);
            return res.status(201).send("New holiday record added successfully");
        }
    } catch (error) {
        console.error("Error updating holiday records:", error);
        return res.status(500).send("Error updating holiday records");
    }
};

module.exports = { HolidayCalendarUpdate };
