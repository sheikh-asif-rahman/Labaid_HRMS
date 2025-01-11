const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const config = {
    user: "asif",
    password: "777777",
    server: "DESKTOP-B3L5BCO",
    database: "TADB",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: "SQLEXPRESS"
    },
    port: 1433
};

// Test database connection
sql.connect(config)
    .then(() => {
        console.log("Connected to the database successfully!");
    })
    .catch(err => {
        console.error("Database connection failed:", err);
    });

// API to fetch unique devnm values
app.get('/api/locations', async (req, res) => {
    try {
        const query = `
                SELECT DISTINCT name 
                FROM dbo.device
                ORDER BY name
            `;
        const result = await sql.query(query);
        res.json(result.recordset.map(item => item.name)); // Return unique devnm values
    } catch (err) {
        console.error("Error fetching locations:", err);
        res.status(500).send("Error fetching locations");
    }
});

// API to fetch data based on location, user ID, and date range
app.get('/api/data', async (req, res) => {
    const { location, userId, fromDate, toDate } = req.query;

    try {
        const query = `
                SELECT devdt, devdtedit, user_id, devnm
                FROM dbo.punchlog 
                WHERE devnm = @location
                AND user_id = @userId
                AND CAST(devdt AS DATE) BETWEEN @fromDate AND @toDate
            `;

        const request = new sql.Request();
        request.input('location', sql.NVarChar, location);
        request.input('userId', sql.NVarChar, userId);
        request.input('fromDate', sql.Date, fromDate);
        request.input('toDate', sql.Date, toDate);

        const result = await request.query(query);
        res.json(result.recordset); // Return the fetched data
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});

app.listen(3000, () => {
    console.log("The server has started on port 3000");
});
