const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// SYSTEM CONSTANTS: AES-256-CBC Encryption
const ALGORITHM = 'aes-256-cbc';
const MASTER_KEY = crypto.randomBytes(32); 

function encryptDataNode(inputFilePath, outputFileName) {
    console.log(`Initiating cryptographic lock on: ${inputFilePath}`);

    const rawData = fs.readFileSync(inputFilePath);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(ALGORITHM, MASTER_KEY, iv);
    let encryptedData = cipher.update(rawData);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);
    
    const securePayload = iv.toString('hex') + ':' + encryptedData.toString('hex');
    const outputPath = path.join(__dirname, outputFileName);
    fs.writeFileSync(outputPath, securePayload);
    
    console.log(`SUCCESS: Data node secured and stored as ${outputFileName}`);
}

module.exports = { encryptDataNode };