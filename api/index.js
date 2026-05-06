const express = require('express');
const path = require('path');
const FileHandler = require('../snappdf_file_handler');
const { ImageToPDFConverter, DocumentToPDFConverter } = require('../snappdf_conversion_logic');
const { pipeline } = require('../snappdf_pipeline');

const app = express();

app.use(express.json());

// Vercel's serverless function for API routes
app.post('/api/convert', async (req, res) => {
    try {
        const { files } = req.body; 
        
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files provided for conversion' });
        }

        const result = await pipeline.processFiles(files);
        
        res.status(200).json({
            success: true,
            pdfUrl: result.url,
            message: 'Conversion completed successfully'
        });
    } catch (error) {
        console.error('Conversion Error:', error);
        res.status(500).json({ error: 'Internal Server Error during PDF generation' });
    }
});

// This part is ONLY for internal Vercel routing. 
// The actual frontend is served by Vercel's static hosting from index.html.
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

module.exports = app;
