const sql = require('mssql');

const dbConfig = {
    user: "asif",
    password: "777777",
    server: "DESKTOP-B3L5BCO",
    database: "TADB",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: "SQLEXPRESS",
    },
    port: 1433,
};

// Database connection
const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Connected to the database successfully!");
    } catch (err) {
        console.error("Database connection failed:", err);
        throw err;
    }
};

module.exports = { sql, connectDB };
