const express = require('express');
const path = require('path');
const FileHandler = require('../snappdf_file_handler');
const { ImageToPDFConverter, DocumentToPDFConverter } = require('../snappdf_conversion_logic');
const { pipeline } = require('../snappdf_pipeline');

const app = express();

app.use(express.json());

/**
 * API Endpoint for PDF Conversion
 * Vercel Serverless Function
 */
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

// Fallback for other routes to serve the frontend
app.get('*', (req, res) => {
    res.send('Please access the main index.html file via the Vercel frontend.');
});

module.exports = app;
