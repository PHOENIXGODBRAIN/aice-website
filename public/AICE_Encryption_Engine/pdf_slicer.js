const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const { encryptDataNode } = require('./encrypt_node.js');

// Target the renamed master file
const masterPdfPath = path.join(__dirname, 'master_book.pdf');

// MAP YOUR CHAPTERS HERE: 
// Update these page numbers to match the exact start and end pages of your chapters.
// Note: pdf-lib uses 0-based indexing (Page 1 = 0, Page 2 = 1). 
// To make it easy, just type the actual physical page numbers below, and the script adapts automatically.
const chapterMap = [
    { title: 'Chapter_1', startPage: 12, endPage: 28 }, // Example range
    { title: 'Chapter_2', startPage: 29, endPage: 50 }, // Example range
    // Add additional chapters following this exact format
];

async function sliceAndEncrypt() {
    console.log('Initiating visual UI extraction protocol...');
    
    // Load the massive master PDF
    const masterPdfBytes = fs.readFileSync(masterPdfPath);
    const masterPdfDoc = await PDFDocument.load(masterPdfBytes);
    
    for (const chapter of chapterMap) {
        console.log(`Processing ${chapter.title}...`);
        
        // Create a blank PDF for the isolated chapter
        const subDocument = await PDFDocument.create();
        
        // Convert human page numbers to machine index (subtract 1)
        const startIndex = chapter.startPage - 1;
        const endIndex = chapter.endPage - 1;
        
        // Extract the exact page range, maintaining total visual fidelity
        const pageIndices = [];
        for (let i = startIndex; i <= endIndex; i++) {
            pageIndices.push(i);
        }
        
        const copiedPages = await subDocument.copyPages(masterPdfDoc, pageIndices);
        copiedPages.forEach((page) => subDocument.addPage(page));
        
        // Save the isolated chapter as a temporary PDF
        const tempPdfBytes = await subDocument.save();
        const tempPdfPath = path.join(__dirname, `temp_${chapter.title}.pdf`);
        fs.writeFileSync(tempPdfPath, tempPdfBytes);
        
        // Route the temporary PDF directly into the AES-256 cryptographic vault
        const outputFileName = `${chapter.title}_locked.enc`;
        encryptDataNode(tempPdfPath, outputFileName);
        
        // Instantly delete the temporary unencrypted PDF
        fs.unlinkSync(tempPdfPath);
    }
    
    console.log('System Protocol Complete: All visual nodes severed and cryptographically secured.');
}

// Execute the function
sliceAndEncrypt().catch(console.error);