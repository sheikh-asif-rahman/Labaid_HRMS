const sql = require('mssql');

const dbConfig = {
    user: "asif",
    password: "777777",
    server: "DESKTOP-3R24CBA",
    database: "TADB",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true, 
        instancename: "SQLEXPRESS",
    },
    port: 1433,

    // user: "sa",
    // password: "L@b@id#?$%238",
    // server: "103.125.253.241",
    // database: "TADB",
    // options: {
    //     trustServerCertificate: true,
    //     trustedConnection: false,
    //     enableArithAbort: true,
    //     instancename: "SQLEXPRESS",
    //     requestTimeout: 30000, // Increase timeout to 30 seconds

    // },
    // port: 1433,
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
