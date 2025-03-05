const { sql } = require("../config/dbConfig");

// Save leave record
const leavesave = async (req, res) => {
    try {
        const {
            employee_id, 
            employee_name, 
            created_by, 
            request_reason, 
            start_date, 
            end_date, 
            department_name, 
            designation_name, 
            alternative_person, 
            leave_enjoyed, 
            leave_balance
        } = req.body;

        // Validation checks
        if (!employee_id || !employee_name || !created_by || !start_date || !end_date) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const request = new sql.Request();
        request.input("employee_id", sql.Int, employee_id);
        request.input("employee_name", sql.NVarChar(255), employee_name);
        request.input("created_by", sql.NVarChar(255), created_by);
        request.input("request_reason", sql.NVarChar(500), request_reason || null); // Optional field
        request.input("start_date", sql.Date, start_date);
        request.input("end_date", sql.Date, end_date);
        request.input("department_name", sql.NVarChar(255), department_name || null); // Optional field
        request.input("designation_name", sql.NVarChar(255), designation_name || null); // Optional field
        request.input("alternative_person", sql.NVarChar(255), alternative_person || null); // Optional field
        request.input("leave_enjoyed", sql.Int, leave_enjoyed || 0); // Optional field, default to 0 if not provided
        request.input("leave_balance", sql.Int, leave_balance || 0); // Optional field, default to 0 if not provided

        // Insert query for Leave table
        const insertQuery = `
            INSERT INTO dbo.Leave 
            (employee_id, employee_name, created_by, request_reason, start_date, end_date, 
             department_name, designation_name, alternative_person, leave_enjoyed, leave_balance)
            VALUES
            (@employee_id, @employee_name, @created_by, @request_reason, @start_date, @end_date, 
             @department_name, @designation_name, @alternative_person, @leave_enjoyed, @leave_balance)
        `;

        // Execute insert query
        await request.query(insertQuery);

        return res.status(200).json({ message: "Leave record saved successfully" });
    } catch (error) {
        console.error("Error saving leave record:", error);
        return res.status(500).send("Error saving leave record");
    }
};

module.exports = { leavesave };
