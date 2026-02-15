const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

let universityData = JSON.parse(fs.readFileSync('universityData.json'));

// Get all universities
app.get('/universities', (req, res) => {
    res.json(universityData);
});

// Add a new university
app.post('/universities', (req, res) => {
    const { key, rank, name, location, courseCount, courses } = req.body;

    if (universityData.some(uni => uni.key === key)) {
        return res.status(400).json({ error: "Key already exists" });
    }

    universityData.push({ key, rank, name, location, courseCount, courses });
    fs.writeFileSync('universityData.json', JSON.stringify(universityData, null, 2));

    res.json({ message: "University added successfully" });
});

// Delete a university by key
app.delete('/universities/:key', (req, res) => {
    const key = parseInt(req.params.key);

    universityData = universityData.filter(uni => uni.key !== key);
    fs.writeFileSync('universityData.json', JSON.stringify(universityData, null, 2));

    res.json({ message: "University deleted successfully" });
});

// Find a university by key
app.get('/universities/:key', (req, res) => {
    const key = parseInt(req.params.key);
    const university = universityData.find(uni => uni.key === key);

    if (!university) {
        return res.status(404).json({ error: "University not found" });
    }

    res.json(university);
});

// Server initialization
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
