const express = require('express');
const app = express();
const PORT = 3000;

// Une route simple qui répond au format JSON
app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur mon serveur HTTP !" });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});