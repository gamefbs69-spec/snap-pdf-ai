const express = require('express');
const path = require('path');
const FileHandler = require('../snappdf_file_handler');
const { ImageToPDFConverter, DocumentToPDFConverter } = require('../snappdf_conversion_logic');
const { pipeline } = require('../snappdf_pipeline');

const app = express();

// Use a larger limit for Base64 encoded files
app.use(express.json({ limit: '50mb' }));

/**
 * API Endpoint for PDF Conversion
 * Updated to handle Base64 JSON payloads for Vercel stability
 */
app.post('/api/convert', async (req, res) => {
    try {
        const { files } = req.body; 
        
        if (!files || !Array.isArray(files) || files.length === 0) {
            return res.status(400).json({ error: 'No valid files provided for conversion' });
        }

        // The pipeline handles the array of { name, data, size } objects
        const result = await pipeline.processFiles(files);
        
        res.status(200).json({
            success: true,
            pdfUrl: result.url,
            message: 'Conversion completed successfully'
        });
    } catch (error) {
        console.error('Conversion Error:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error during PDF generation' });
    }
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

module.exports = app;
