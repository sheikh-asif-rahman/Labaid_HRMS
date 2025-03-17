const { sql } = require("../config/dbConfig");

// Fetch holiday records
const HolidayCalanderLoad = async (req, res) => {
    try {
        const result = await sql.query(
            "SELECT Id, EventDate, EventDetails FROM [dbo].[HolidayCalendar]"
        );
        return res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Error fetching holiday records:", error);
        return res.status(500).send("Error fetching holiday records");
    }
};

module.exports = { HolidayCalanderLoad };
