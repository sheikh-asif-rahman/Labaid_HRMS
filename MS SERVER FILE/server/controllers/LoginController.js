const { sql } = require("../config/dbConfig");
const crypto = require("crypto"); // Import crypto for hashing

// Login user
const loginUser = async (req, res) => {
    const { UserId, Password } = req.body; // Extract UserId and Password from the request body

    try {
        // Fetch the user by UserId
        const query = `
            SELECT UserId, Password FROM dbo.UserLogin WHERE UserId = @UserId AND Status = '1'
        `;
        const request = new sql.Request();
        request.input("UserId", sql.VarChar, UserId); // Bind UserId to prevent SQL injection

        const result = await request.query(query);

        if (result.recordset.length === 0) {
            return res.status(404).send("No user found"); // UserId does not exist
        }

        // Extract hashed password from database
        const { Password: hashedPassword } = result.recordset[0];

        // Hash the provided password
        const hash = crypto.createHash("sha256").update(Password).digest("hex");

        // Compare the hashed passwords
        if (hash === hashedPassword) {
            res.send("Welcome");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("An error occurred during login");
    }
};

module.exports = { loginUser };
