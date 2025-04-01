import express from "express";
import fs from "fs/promises"; // Using fs.promises for async operations
import cors from "cors";

const app = express();
const PORT = 5500; // Change port for compatibility with frontend
const DB_FILE = "database.json";

app.use(express.json());
app.use(cors());

// Initialize the database by checking if the file exists, and create it if it doesn't
const initializeDatabase = async () => {
  try {
    await fs.access(DB_FILE); // Check if the database file exists
  } catch {
    await fs.writeFile(DB_FILE, "[]", "utf8"); // Create the database file with an empty array
  }
};

// Endpoint to read users from the database
app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8"); // Read the database file
    const users = JSON.parse(data); // Parse the JSON data
    res.json(users); // Return the users as JSON
  } catch (error) {
    res.status(500).json({ error: "Chyba při čtení souboru" }); // Handle read errors
  }
});

// Endpoint to add a new user
app.post("/users", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8"); // Read the database file
    let users = JSON.parse(data); // Parse the JSON data
    
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1; // Generate new user ID
    const newUser = { id: newId, name: req.body.name, phone: req.body.phone }; // Create new user object

    users.push(newUser); // Add new user to the array
    await fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), "utf8"); // Write updated users back to file

    res.json(newUser); // Return the newly created user
  } catch (error) {
    res.status(500).json({ error: "Chyba při zápisu do souboru" }); // Handle write errors
  }
});

// Endpoint to delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8"); // Read the database file
    let users = JSON.parse(data); // Parse the JSON data
    
    const userId = parseInt(req.params.id); // Get user ID from request parameters
    users = users.filter(user => user.id !== userId); // Filter out the user to delete

    await fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), "utf8"); // Write updated users back to file

    res.json({ message: "Uživatel smazán" }); // Confirm deletion
  } catch (error) {
    res.status(500).json({ error: "Chyba při zápisu do souboru" }); // Handle write errors
  }
});

// New endpoint for test data
app.get("/api/data", async (req, res) => {
  try {
    const testData = {
      chart1: { labels: ["A", "B"], values: [1, 2] },
      chart2: { labels: ["C", "D"], values: [3, 4] },
      tableData: [
        { id: 1, procedure: "HYSTEREKTOMIE", doctor: "KRATOCHVÍL J.", patient: "ŠEDÁ K." },
        { id: 2, procedure: "HYSTEREKTOMIE", doctor: "VÍT P.", patient: "NOVOTNÝ A." }
      ]
    };
    console.log("API /api/data bylo zavoláno, posílám data:", testData); // Log the request for test data
    res.setHeader("Content-Type", "application/json"); // Set response content type
    res.json(testData); // Return test data as JSON
  } catch (error) {
    console.error("Chyba při zpracování dat:", error); // Log processing errors
    res.status(500).json({ error: "Chyba při zpracování dat" }); // Handle processing errors
  }
});

// Start the server and initialize the database
app.listen(PORT, async () => {
  await initializeDatabase(); // Ensure the database is initialized
  console.log(`Server běží na http://localhost:${PORT}`); // Log server start
});
