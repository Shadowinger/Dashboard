import express from "express";
import fs from "fs/promises"; // Používáme fs.promises pro async operace
import cors from "cors";

const app = express();
const PORT = 5500; // Změněný port, aby se nekřížil s Angular aplikací
const DB_FILE = "database.json";

app.use(express.json());
app.use(cors());

// Zkontroluje existenci databázového souboru a vytvoří ho, pokud chybí
const initializeDatabase = async () => {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, "[]", "utf8");
  }
};

// Čtení uživatelů z databáze
app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Chyba při čtení souboru" });
  }
});

// Přidání uživatele
app.post("/users", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    let users = JSON.parse(data);
    
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, name: req.body.name, phone: req.body.phone };

    users.push(newUser);
    await fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), "utf8");

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Chyba při zápisu do souboru" });
  }
});

// Smazání uživatele podle ID
app.delete("/users/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    let users = JSON.parse(data);
    
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);

    await fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), "utf8");

    res.json({ message: "Uživatel smazán" });
  } catch (error) {
    res.status(500).json({ error: "Chyba při zápisu do souboru" });
  }
});

// Spuštění serveru
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server běží na http://localhost:${PORT}`);
});
