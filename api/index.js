const express = require('express');
const path = require('path');
const FileHandler = require('../snappdf_file_handler');
const { ImageToPDFConverter, DocumentToPDFConverter } = require('../snappdf_conversion_logic');
const { pipeline } = require('../snappdf_pipeline');

const app = express();

app.use(express.json());

// SERVE STATIC FILES (Is se index.html load hoga)
app.use(express.static(path.join(__dirname, '../')));

// API Endpoint for PDF Conversion
app.post('/api/convert', async (req, res) => {
    try {
        const { files } = req.body; 
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files provided' });
        }
        const result = await pipeline.processFiles(files);
        res.status(200).json({ success: true, pdfUrl: result.url });
    } catch (error) {
        res.status(500).json({ error: 'Conversion failed' });
    }
});

// CATCH-ALL ROUTE: Kisi bhi route par index.html dikhao
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = app;
