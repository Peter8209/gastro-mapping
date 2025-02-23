require("dotenv").config();
const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const mongoose = require("mongoose");
const axios = require("axios");

const optimalizujStolovanie = require("./ai");

const app = express();
const port = process.env.PORT || 5000;

// Pripojenie k MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Model pre uloženie stolovania
const StolovanieSchema = new mongoose.Schema({
    datum: String,
    objednavky: Array,
    optimalizacia: Object
});
const Stolovanie = mongoose.model("Stolovanie", StolovanieSchema);

// Nastavenie uploadu Excel súborov
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ **Upload Excel súboru a uloženie do databázy**
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Uloženie do MongoDB
        const newStolovanie = new Stolovanie({ datum: new Date().toISOString(), objednavky: data });
        await newStolovanie.save();

        res.json({ message: "Excel spracovaný a uložený", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ **AI optimalizácia stolovania**
app.get("/optimalizacia", async (req, res) => {
    try {
        const vysledky = await optimalizujStolovanie();
        res.json({ optimalizacia: vysledky });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ **Odoslanie dát do Power Automate**
app.post("/powerautomate", async (req, res) => {
    try {
        const data = await Stolovanie.find();
        const response = await axios.post(process.env.POWER_AUTOMATE_URL, data);
        res.json({ message: "Dáta odoslané do Power Automate", response: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ **Štart servera**
app.listen(port, () => console.log(`✅ Server beží na http://localhost:${port}`));
