const { getFnum, setFnum } = require('./sharedState');


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable'); // For parsing multipart/form-data

const app = express();
const port = 3001;
const z = 0;
// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Uploads directory created:', uploadDir);
} else {
    console.log('Uploads directory already exists:', uploadDir);
}

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());

// Create a MySQL connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lol1234567890_", // replace with your actual password
    database: "pet"
});

// Connect to the database
con.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        throw err;
    }
    console.log('Connected to MySQL Database');
});

// Route to handle form submission
app.post('/api/submit', (req, res) => {
    const { email, name, number, dname, d_age, desc, pic, ani_type } = req.body;

    if (!email || !name || !number) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = "INSERT INTO pet_store_table (email_id, name, mob_no, ani_name, ani_age, ani_des, ani_pfp, status, ani_type) VALUES (?,?,?,?,?,?,?,?,?);";
    const values = [email, name, number, dname, d_age, desc, pic, z, ani_type];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }

        res.json({ message: 'Data inserted successfully', result });
    });
});

app.get('/api/users', (req, res) => {
    const value = getFnum(); 
    let sql;
    switch (value) {
        case 1:
            sql = "SELECT * FROM pet_store_table where status = 1;";
            break;
        case 2:
            sql = "SELECT * FROM pet_store_table WHERE LOWER(ani_type) = 'dog' AND status = 1;";
            break;
        case 3:
            sql = "SELECT * FROM pet_store_table WHERE LOWER(ani_type) = 'cat' AND status = 1;";
            break;
        case 4:
            sql = "SELECT * FROM pet_store_table WHERE LOWER(ani_type) = 'rabbit' AND status = 1;";
            break;
        case 5:
            sql = "SELECT * FROM pet_store_table WHERE LOWER(ani_type) = 'snake' AND status = 1;";
            break;
        case 6:
            sql = "SELECT * FROM pet_store_table WHERE LOWER(ani_type) = 'spider' AND status = 1;";
            break;
        case 7:
            sql = "SELECT * FROM pet_store_table WHERE LOWER(ani_type) = 'hamster' AND status = 1;";
            break;
        case 8:
            sql = "SELECT * FROM pet_store_table WHERE LOWER(ani_type) = 'guinea pig' AND status = 1;";
            break;
        default:
            sql = "SELECT * FROM pet_store_table where status = 1;"; 
            break;
    }

    con.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json(results);
    });
});
app.get('/api/adm', (req, res) => {
    const sql1 = "select * from pet_store_table where status=0;";
    con.query(sql1, (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json(results);
    });

});
app.post('/api/set-filter', (req, res) => {
    const { filterValue } = req.body; // Assume filterValue is sent in the request
    if (filterValue < 1 || filterValue > 9) {
        return res.status(400).json({ error: 'Invalid filter value' });
    }

    setFnum(filterValue); // Set the filter value in shared state
    res.json({ message: 'Filter value updated successfully', filterValue });
});

app.post('/api/autho', (req, res) => {
    const { email, pwd } = req.body; 

    if (!email || !pwd) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const sql = "SELECT * FROM autho WHERE un = ? AND pwd = ?"; 
    
    con.query(sql, [email, pwd], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            res.json(results); 
        } else {
            res.status(401).json({ error: 'Invalid email or password' }); 
        }
    });
});


app.post('/api/upload', (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(400).json({ error: 'Error parsing the file' });
        }

        console.log('Uploaded files:', files); // Log the structure of the uploaded files

        const uploadedFile = files['demo[]']; 
        if (!uploadedFile) {
            console.error('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('Uploaded file details:', uploadedFile); // Log details of the uploaded file

        // Ensure properties exist
        if (!uploadedFile.filepath) {
            console.error('Uploaded file does not have a filepath:', uploadedFile);
            return res.status(400).json({ error: 'Uploaded file is missing filepath' });
        }

        if (!uploadedFile.originalFilename) {
            console.error('Uploaded file does not have an originalFilename:', uploadedFile);
            return res.status(400).json({ error: 'Uploaded file is missing originalFilename' });
        }

        // Create a unique file name
        const uniqueFileName = `${Date.now()}-${uploadedFile.originalFilename}`;
        const newFilePath = path.join(uploadDir, uniqueFileName);

        // Move the file to the uploads directory
        fs.rename(uploadedFile.filepath, newFilePath, (err) => {
            if (err) {
                console.error('Error moving the file:', err);
                return res.status(500).json({ error: 'Error saving the file' });
            }

            // Respond with a success message including the file path
            res.json({ message: 'File uploaded successfully', filePath: `/uploads/${uniqueFileName}` });
        });
    });
});
app.post('/api/delete', (req, res) => {
    const { email_id, name, mob_no, ani_name, ani_age, ani_des, ani_type } = req.body;

    console.log('Received delete request for:', req.body); // Log the request data

    const sql = `
        DELETE FROM pet_store_table 
        WHERE email_id = ? AND name = ? AND mob_no = ? AND ani_name = ? AND ani_age = ? AND ani_des = ? AND ani_type = ?;
    `;

    con.query(sql, [email_id, name, mob_no, ani_name, ani_age, ani_des, ani_type], (err, result) => {
        if (err) {
            console.error('Error deleting row:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }

        console.log('Delete result:', result); // Log the result of the query

        if (result.affectedRows === 0) {
            console.warn('No matching record found to delete');
            return res.status(404).json({ message: 'No matching record found to delete' });
        }

        res.json({ message: 'Row deleted successfully', result });
    });
});

app.post('/api/verify', (req, res) => {
    const { email_id, name, mob_no, ani_name, ani_age, ani_des, ani_type } = req.body;

    console.log('Received verify request for:', req.body); // Log the request data

    const sql = `
        UPDATE pet_store_table 
        SET status = 1 
        WHERE email_id = ? AND name = ? AND mob_no = ? AND ani_name = ? AND ani_age = ? AND ani_des = ? AND ani_type = ?;
    `;

    con.query(sql, [email_id, name, mob_no, ani_name, ani_age, ani_des, ani_type], (err, result) => {
        if (err) {
            console.error('Error updating row:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }

        console.log('Update result:', result); // Log the result of the query

        if (result.affectedRows === 0) {
            console.warn('No matching record found to verify');
            return res.status(404).json({ message: 'No matching record found to verify' });
        }

        res.json({ message: 'Row verified successfully', result });
    });
});

app.get('/api/rem', (req, res) => {
    const sql1 = "select * from pet_store_table where status=1;";
    con.query(sql1, (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json(results);
    });

});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
