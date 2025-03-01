const { sql } = require("../config/dbConfig");

// Approve or Reject Employee
const updatePendingEmployee = async (req, res) => {
    try {
        const { EmployeeId, action, Remark, RejectedBy, CreatedBy } = req.body;

        if (!EmployeeId || !action) {
            return res.status(400).send("Missing required fields.");
        }

        const request = new sql.Request();
        
        if (action === "approve") {
            // Update Employee status to 'active'
            await request.query(`
                UPDATE dbo.Employee
                SET Status = 'active'
                WHERE EmployeeId = '${EmployeeId}'
            `);
            return res.send("Employee approved successfully.");
        } else if (action === "reject") {
            if (!Remark || !RejectedBy || !CreatedBy) {
                return res.status(400).send("Missing required fields for rejection.");
            }

            // Update Employee status to 'inactive' if rejected
            await request.query(`
                UPDATE dbo.Employee
                SET Status = 'inactive'
                WHERE EmployeeId = '${EmployeeId}'
            `);
            
            // Insert rejection details into Notifications table
            await request.query(`
                INSERT INTO dbo.Notifications (EmployeeId, Remark, RejectedBy, CreatedBy, CreatedDate)
                VALUES ('${EmployeeId}', '${Remark}', '${RejectedBy}', '${CreatedBy}', GETDATE())
            `);
            return res.send("Employee rejected successfully.");
        } else {
            return res.status(400).send("Invalid action.");
        }
    } catch (err) {
        console.error("Error updating employee status:", err);
        res.status(500).send("Error updating employee status");
    }
};

module.exports = { updatePendingEmployee };
