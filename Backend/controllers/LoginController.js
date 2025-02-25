const { sql } = require("../config/dbConfig");
const crypto = require("crypto"); // Import crypto for hashing

// Login user
const loginUser = async (req, res) => {
    const { UserId, Password } = req.body; // Extract UserId and Password from the request body

    try {
        // Fetch the user by UserId from the UserLogin table, and check status from Employee table
        const query = `
            SELECT ul.UserId, ul.Password, ul.Permission, e.Status 
            FROM dbo.UserLogin ul
            JOIN dbo.Employee e ON e.EmployeeId = ul.UserId
            WHERE ul.UserId = @UserId
        `;
        const request = new sql.Request();
        request.input("UserId", sql.VarChar, UserId); // Bind UserId to prevent SQL injection

        const result = await request.query(query);

        // Log the result from the database
        console.log("Query Result:", result.recordset);

        if (result.recordset.length === 0) {
            console.log("No user found for UserId:", UserId);
            return res.status(404).send("No user found"); // UserId does not exist
        }

        // Extract hashed password, permission, and status data from the result
        const { Password: hashedPassword, Permission, Status } = result.recordset[0];

        // Log extracted data
        console.log("Extracted Data:", { hashedPassword, Permission, Status });

        // If the employee's status is "Inactive" or "Lock", prevent login and return appropriate response
        if (Status === "Inactive" || Status === "Lock") {
            console.log(`Account is ${Status}. UserId:`, UserId);
            return res.status(403).send(`Your account is ${Status}`);
        }

        // Hash the provided password to compare with the stored hashed password
        const hash = crypto.createHash("sha256").update(Password).digest("hex");

        // Log the hashed password comparison
        console.log("Provided Password Hash:", hash);

        // Compare the hashed passwords
        if (hash === hashedPassword) {
            const response = {
                message: "Welcome",
                UserId,
                Permission, // Return Permission data
            };

            // Log the response being sent
            console.log("Login Success Response:", response);

            return res.json(response);
        } else {
            console.log("Invalid credentials for UserId:", UserId);
            return res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).send("An error occurred during login");
    }
};

module.exports = { loginUser };
