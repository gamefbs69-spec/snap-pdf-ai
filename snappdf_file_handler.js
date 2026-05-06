
/**
 * SnapPDF AI - File Handler
 * Manages input validation, format routing, and file-handling scripts.
 */

const path = require('path');

const FileHandler = {
    supportedImages: ['jpg', 'jpeg', 'png', 'gif'],
    supportedDocs: ['doc', 'docx', 'ppt', 'pptx', 'txt', 'rtf'],

    /**
     * Determines the conversion route based on file extension.
     * @param {string} fileName - Name of the file to analyze.
     * @returns {string} - 'CLIENT_IMAGE' | 'SERVER_DOC' | 'UNSUPPORTED'
     */
    routeFile(fileName) {
        const ext = path.extname(fileName).toLowerCase().replace('.', '');
        
        if (this.supportedImages.includes(ext)) {
            return 'CLIENT_IMAGE';
        }
        
        if (this.supportedDocs.includes(ext)) {
            return 'SERVER_DOC';
        }
        
        return 'UNSUPPORTED';
    },

    /**
     * Validates file size to prevent server overload.
     * @param {number} size - File size in bytes.
     * @param {number} limit - Max allowed size (default 25MB).
     * @returns {boolean}
     */
    validateSize(size, limit = 25 * 1024 * 1024) {
        return size <= limit;
    }
};

module.exports = FileHandler;
