
/**
 * SnapPDF AI - Pipeline Orchestrator
 * Integrates FileHandler, ImageToPDFConverter, and DocumentToPDFConverter.
 */

const FileHandler = require('./snappdf_file_handler');
const { ImageToPDFConverter, DocumentToPDFConverter } = require('./snappdf_conversion_logic');

async function processConversion(file) {
    console.log(`Processing file: ${file.name}...`);

    // 1. File Validation & Routing
    const route = FileHandler.routeFile(file.name);
    if (route === 'UNSUPPORTED') {
        throw new Error(`Unsupported file format: ${file.name}`);
    }

    if (!FileHandler.validateSize(file.size)) {
        throw new Error(`File too large: ${file.name}`);
    }

    // 2. Execution based on route
    if (route === 'CLIENT_IMAGE') {
        console.log("Routing to Client-Side Image Conversion...");
        // Simulate client-side call
        return await ImageToPDFConverter.convertImagesToPDF([{ file, name: file.name }]);
    } else if (route === 'SERVER_DOC') {
        console.log("Routing to Server-Side Document Conversion...");
        // Simulate server-side buffer processing
        const buffer = Buffer.from("MOCK_FILE_CONTENT");
        const extension = file.name.split('.').pop();
        return await DocumentToPDFConverter.convertDocToPDF(buffer, extension);
    }
}

// Export the pipeline
module.exports = { pipeline: { processFiles: async (files) => {
    const results = [];
    for (const file of files) {
        results.push(await processConversion(file));
    }
    return { url: 'https://example.com/generated.pdf', files: results };
} } };
