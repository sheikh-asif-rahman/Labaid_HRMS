const { sql } = require("../config/dbConfig");

const getdesignationlist = async (req, res) => {
    try {
        const { DepartmentId } = req.query; // Get DepartmentId from query params
        console.log(`🔍 Fetching designations for DepartmentId: ${DepartmentId}`);

        if (!DepartmentId) {
            console.log("❌ DepartmentId is required");
            return res.status(400).send("DepartmentId is required");
        }

        // Query to fetch designations based on DepartmentId
        const designationQuery = `
            SELECT Id, DesignationName, DesignationOrder 
            FROM dbo.Designation 
            WHERE DepartmentId = @DepartmentId
        `;

        const request = new sql.Request();
        request.input("DepartmentId", sql.Int, DepartmentId);
        const designationResult = await request.query(designationQuery);

        if (designationResult.recordset.length === 0) {
            console.log("❌ No designations found for given DepartmentId");
            return res.status(404).send("No designations found.");
        }

        console.log("✅ Designations fetched successfully");
        return res.json(designationResult.recordset);
    } catch (err) {
        console.error("🔥 Error fetching designations:", err);
        res.status(500).send("Error fetching designations");
    }
};

module.exports = { getdesignationlist };
