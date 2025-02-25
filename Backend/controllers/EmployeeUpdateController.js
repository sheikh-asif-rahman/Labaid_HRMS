const { sql } = require("../config/dbConfig");
const crypto = require("crypto"); // Importing the crypto module

// Function to hash a password using SHA-256
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

const employeeUpdate = async (req, res) => {
  let transaction; // Declare transaction here
  try {
    let {
      userId,
      user_name,
      branch_id,
      personalPhone,
      officialPhone,
      department_id,
      designation_id,
      date_of_joining,
      date_of_resign,
      email,
      employee_type,
      gender,
      marital_status,
      blood_group,
      fathers_name,
      mothers_name,
      present_address,
      permanent_address,
      nid,
      status,
      password,
      updatedby,
      image,
    } = req.body;

    // Validate required fields
    if (!userId || !user_name || !updatedby) {
      return res.status(400).json({
        message: "userId, user_name, and updatedby are required",
      });
    }

    // Clean up string inputs and ensure fields are in the correct type
    userId = userId.trim();
    user_name = user_name.trim();
    branch_id = branch_id ? branch_id.toString().trim() : null;
    personalPhone = personalPhone ? personalPhone.toString().trim() : null;
    officialPhone = officialPhone ? officialPhone.toString().trim() : null;
    department_id = department_id ? department_id.toString().trim() : null;
    designation_id = designation_id ? designation_id.toString().trim() : null;
    email = email ? email.trim() : null;
    updatedby = updatedby.trim();

    // Process status: Ensure it's "Active", "Inactive", or default to "Lock"
    const validStatuses = ["active", "inactive", "lock"];
    status = status && validStatuses.includes(status.trim()) ? status.trim() : "lock";

    // Process image if provided
    let imageBuffer = null;
    if (image) {
      const base64Data = image.includes("base64,") ? image.split("base64,")[1] : image;
      imageBuffer = Buffer.from(base64Data, "base64");
    }

    // If a password is provided, hash it
    const hashedPassword = password ? hashPassword(password) : null;

    // Employee data to update in the database
    const employeeData = {
      EmployeeId: userId,
      EmployeeName: user_name,
      BranchId: branch_id,
      PersonalContactNumber: personalPhone,
      OfficalContactNumber: officialPhone,
      DepartmentId: department_id,
      DesignationId: designation_id,
      DateOfJoin: date_of_joining,
      DateOfResign: date_of_resign || null,
      Email: email,
      EmployeeType: employee_type,
      Gender: gender,
      MaritalStatus: marital_status,
      BloodGroup: blood_group,
      FatherName: fathers_name,
      MotherName: mothers_name,
      PresentAddress: present_address,
      PermanentAddress: permanent_address,
      NID: nid,
      Status: status, // Now storing "Active", "Inactive", or "Lock"
      UpdatedBy: updatedby,
      Image: imageBuffer,
    };

    // User login data to update (with hashed password if provided)
    const userLoginData = {
      UserId: userId,
      UserName: user_name,
      Password: hashedPassword, // Store the hashed password (if updated)
      UpdatedBy: updatedby,
    };

    // Connect to the database and start a transaction
    const pool = await sql.connect();
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // Update in the Employee table
    const employeeUpdateQuery = `
      UPDATE Employee
      SET 
        EmployeeName = @EmployeeName,
        BranchId = @BranchId,
        PersonalContactNumber = @PersonalContactNumber,
        OfficalContactNumber = @OfficalContactNumber,
        DepartmentId = @DepartmentId,
        DesignationId = @DesignationId,
        DateOfJoin = @DateOfJoin,
        DateOfResign = @DateOfResign,
        Email = @Email,
        EmployeeType = @EmployeeType,
        Gender = @Gender,
        MaritalStatus = @MaritalStatus,
        BloodGroup = @BloodGroup,
        FatherName = @FatherName,
        MotherName = @MotherName,
        PresentAddress = @PresentAddress,
        PermanentAddress = @PermanentAddress,
        NID = @NID,
        Status = @Status,
        UpdatedBy = @UpdatedBy,
        Image = @Image
      WHERE EmployeeId = @EmployeeId;
    `;

    const employeeRequest = new sql.Request(transaction);
    employeeRequest.input("EmployeeId", sql.NVarChar, employeeData.EmployeeId);
    employeeRequest.input("EmployeeName", sql.NVarChar, employeeData.EmployeeName);
    employeeRequest.input("BranchId", sql.NVarChar, employeeData.BranchId);
    employeeRequest.input("PersonalContactNumber", sql.NVarChar, employeeData.PersonalContactNumber);
    employeeRequest.input("OfficalContactNumber", sql.NVarChar, employeeData.OfficalContactNumber);
    employeeRequest.input("DepartmentId", sql.NVarChar, employeeData.DepartmentId);
    employeeRequest.input("DesignationId", sql.NVarChar, employeeData.DesignationId);
    employeeRequest.input("DateOfJoin", sql.Date, employeeData.DateOfJoin);
    employeeRequest.input("DateOfResign", sql.Date, employeeData.DateOfResign || null);
    employeeRequest.input("Email", sql.NVarChar, employeeData.Email);
    employeeRequest.input("EmployeeType", sql.NVarChar, employeeData.EmployeeType);
    employeeRequest.input("Gender", sql.NVarChar, employeeData.Gender);
    employeeRequest.input("MaritalStatus", sql.NVarChar, employeeData.MaritalStatus);
    employeeRequest.input("BloodGroup", sql.NVarChar, employeeData.BloodGroup);
    employeeRequest.input("FatherName", sql.NVarChar, employeeData.FatherName);
    employeeRequest.input("MotherName", sql.NVarChar, employeeData.MotherName);
    employeeRequest.input("PresentAddress", sql.NVarChar, employeeData.PresentAddress);
    employeeRequest.input("PermanentAddress", sql.NVarChar, employeeData.PermanentAddress);
    employeeRequest.input("NID", sql.NVarChar, employeeData.NID);
    employeeRequest.input("Status", sql.NVarChar, employeeData.Status);
    employeeRequest.input("UpdatedBy", sql.NVarChar, employeeData.UpdatedBy);
    employeeRequest.input("Image", sql.VarBinary, employeeData.Image);

    await employeeRequest.query(employeeUpdateQuery);

    // Update in the UserLogin table (if password is provided, update it as well)
    let userLoginUpdateQuery = `
      UPDATE UserLogin
      SET 
        UserName = @UserName,
        UpdatedBy = @UpdatedBy
    `;

    if (hashedPassword) {
      userLoginUpdateQuery += ", Password = @Password";
    }

    userLoginUpdateQuery += " WHERE UserId = @UserId";

    const loginRequest = new sql.Request(transaction);
    loginRequest.input("UserId", sql.NVarChar, userLoginData.UserId);
    loginRequest.input("UserName", sql.NVarChar, userLoginData.UserName);
    loginRequest.input("UpdatedBy", sql.NVarChar, userLoginData.UpdatedBy);
    if (hashedPassword) {
      loginRequest.input("Password", sql.NVarChar, userLoginData.Password);
    }

    await loginRequest.query(userLoginUpdateQuery);

    // Commit the transaction
    await transaction.commit();

    // Success response
    return res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error updating employee:", err);
    return res.status(500).json({ message: "Error updating employee", error: err.message });
  }
};

module.exports = { employeeUpdate };
