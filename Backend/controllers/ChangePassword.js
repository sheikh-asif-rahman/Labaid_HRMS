const { sql } = require("../config/dbConfig");
const crypto = require('crypto'); // Importing the crypto module

// Function to hash a password using SHA-256
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Change password API
const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  // Check if all required fields are present
  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).send("Missing required fields: userId, currentPassword, newPassword");
  }


  // Ensure that userId is a string
  const trimmedUserId = String(userId).trim();
  // Hash the current and new passwords
  const hashedCurrentPassword = hashPassword(currentPassword);
  const hashedNewPassword = hashPassword(newPassword);

  try {
    // Query to find user by userId and check the current password
    const query = `
      SELECT UserId, Password 
      FROM dbo.UserLogin 
      WHERE UserId = @userId
    `;
    
    const request = new sql.Request();
    request.input('userId', sql.NVarChar, trimmedUserId); // Use trimmed userId (string)
    const result = await request.query(query);

    // Check if user exists
    if (result.recordset.length === 0) {
      console.log("User not found with userId:", trimmedUserId);
      return res.status(404).send("User not found");
    }

    // Retrieve the user record
    const user = result.recordset[0];

    // Check if the hashed current password matches the stored password
    if (user.Password !== hashedCurrentPassword) {
      console.log("Incorrect current password for userId:", trimmedUserId);
      return res.status(401).send("Password not correct");
    }

    // Query to update the password
    const updateQuery = `
      UPDATE dbo.UserLogin
      SET Password = @newPassword
      WHERE UserId = @userId
    `;
    
    request.input('newPassword', sql.NVarChar, hashedNewPassword); // New hashed password input
    const updateResult = await request.query(updateQuery);

    // Check if the password was updated successfully
    if (updateResult.rowsAffected[0] === 0) {
      console.log("Password not updated for userId:", trimmedUserId);
      return res.status(500).send("Failed to update password");
    }

    console.log("Password updated successfully for userId:", trimmedUserId);
    res.status(200).send("Password updated successfully");

  } catch (err) {
    // Log the error and return a generic error message
    console.error("Error updating password:", err);
    res.status(500).send("Error updating password");
  }
};

module.exports = { changePassword };
