import express from "express";
import fs from "fs";
import cors from "cors";
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;
const DB_FILE = "database.json";

app.use(express.json());
app.use(cors());

// čtení uživatelů z databáze
app.get("/users", (req, res) => {
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Chyba při čtení souboru" });

    const users = JSON.parse(data);
    res.json(users);
  });
});

// přidání uživatele do databáze
app.post("/users", (req, res) => {
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Chyba při čtení souboru" });

    let users = JSON.parse(data);
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, name: req.body.name, phone: req.body.phone };

    users.push(newUser);

    fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Chyba při zápisu do souboru" });

      res.json(newUser);
    });
  });
});
// smazaní uživatele podle id
app.delete("/users/:id", (req, res) => {
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Chyba při čtení souboru" });

    let users = JSON.parse(data);
    const userId = parseInt(req.params.id);
    users = users.filter((user) => user.id !== userId);

    fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Chyba při zápisu do souboru" });

      res.json({ message: "Uživatel smazán" });
    });
  });
});

// spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});


