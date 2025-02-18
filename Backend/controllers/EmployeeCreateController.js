const { sql } = require("../config/dbConfig");
const crypto = require('crypto'); // Importing the crypto module

// Function to hash a password using SHA-256
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const employeeCreate = async (req, res) => {
  let transaction; // Declare transaction here
  try {
    let {
      userId,
      user_name,
      branch_id,
      personalPhone,  // Renamed from 'phone' to 'personalPhone'
      officialPhone,  // Renamed from 'official_phone' to 'officialPhone'
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
      createdby,
      image
    } = req.body;

    // Validate required fields
    if (!userId || !user_name || !password || !createdby) {
      return res
        .status(400)
        .json({ message: "userId, user_name, password, and createdby are required" });
    }

    // Clean up string inputs and ensure fields are in the correct type
    userId = userId.trim();
    user_name = user_name.trim();
    branch_id = branch_id ? branch_id.toString().trim() : null;  // Handle as string
    personalPhone = personalPhone ? personalPhone.toString().trim() : null;  // Handle as string
    officialPhone = officialPhone ? officialPhone.toString().trim() : null;  // Handle as string
    department_id = department_id ? department_id.toString().trim() : null;  // Handle as string
    designation_id = designation_id ? designation_id.toString().trim() : null;  // Handle as string
    email = email ? email.trim() : null;
    createdby = createdby.trim();

    // Process image if provided
    let imageBuffer = null;
    if (image) {
      const base64Data = image.includes("base64,") ? image.split("base64,")[1] : image;
      imageBuffer = Buffer.from(base64Data, "base64");
    }

    // Hash the password using SHA-256
    const hashedPassword = hashPassword(password); // Use SHA-256 hashing

    // Employee data to insert into the database
    const employeeData = {
      EmployeeId: userId,
      EmployeeName: user_name,
      BranchId: branch_id,
      PersonalContactNumber: personalPhone,  // Using 'personalPhone'
      OfficalContactNumber: officialPhone,  // Using 'officialPhone'
      DepartmentId: department_id,
      DesignationId: designation_id,
      DateOfJoin: date_of_joining,  // YYYY-MM-DD format
      DateOfResign: date_of_resign,  // Optional
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
      Status: status === true ? 1 : 0,  // Convert to 1 for active
      CreatedBy: createdby,
      Image: imageBuffer
    };

    // User login data (with hashed password)
    const userLoginData = {
      UserId: userId,
      UserName: user_name,
      Password: hashedPassword,  // Store the hashed password
      CreatedBy: createdby
    };

    // Connect to the database and start a transaction
    const pool = await sql.connect();
    transaction = new sql.Transaction(pool); // Start transaction
    await transaction.begin();

    // Insert into the Employee table
    const employeeInsertQuery = `
      INSERT INTO Employee (EmployeeId, EmployeeName, BranchId, PersonalContactNumber, OfficalContactNumber, 
                            DepartmentId, DesignationId, DateOfJoin, DateOfResign, Email, EmployeeType, Gender, 
                            MaritalStatus, BloodGroup, FatherName, MotherName, PresentAddress, PermanentAddress, 
                            NID, Status, CreatedBy, Image)
      VALUES (@EmployeeId, @EmployeeName, @BranchId, @PersonalContactNumber, @OfficalContactNumber, 
              @DepartmentId, @DesignationId, @DateOfJoin, @DateOfResign, @Email, @EmployeeType, @Gender, 
              @MaritalStatus, @BloodGroup, @FatherName, @MotherName, @PresentAddress, @PermanentAddress, 
              @NID, @Status, @CreatedBy, @Image)
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
    employeeRequest.input("Status", sql.Int, employeeData.Status);
    employeeRequest.input("CreatedBy", sql.NVarChar, employeeData.CreatedBy);
    employeeRequest.input("Image", sql.VarBinary, employeeData.Image);

    await employeeRequest.query(employeeInsertQuery);

    // Insert into the UserLogin table with hashed password
    const userLoginInsertQuery = `
      INSERT INTO UserLogin (UserId, UserName, Password, CreatedBy)
      VALUES (@UserId, @UserName, @Password, @CreatedBy)
    `;

    const loginRequest = new sql.Request(transaction);
    loginRequest.input("UserId", sql.NVarChar, userLoginData.UserId);
    loginRequest.input("UserName", sql.NVarChar, userLoginData.UserName);
    loginRequest.input("Password", sql.NVarChar, userLoginData.Password);
    loginRequest.input("CreatedBy", sql.NVarChar, userLoginData.CreatedBy);

    await loginRequest.query(userLoginInsertQuery);

    // Commit the transaction
    await transaction.commit();

    // Success response
    return res.status(201).json({ message: "Employee created successfully" });
  } catch (err) {
    if (transaction) {
      await transaction.rollback(); // Rollback if there's an error
    }
    console.error("Error creating employee:", err);
    return res.status(500).json({ message: "Error creating employee", error: err.message });
  }
};

module.exports = { employeeCreate };
