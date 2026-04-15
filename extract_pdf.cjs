const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = './FJ治安综合系统UI设计规范.pdf';

if (fs.existsSync(pdfPath)) {
    let dataBuffer = fs.readFileSync(pdfPath);
    const parse = typeof pdf === 'function' ? pdf : pdf.default;
    parse(dataBuffer).then(function(data) {
        fs.writeFileSync('./pdf_output.txt', data.text);
        console.log('PDF extracted successfully.');
    }).catch(function(error) {
        console.error('Error parsing PDF:', error);
    });
} else {
    console.error('PDF file not found at:', pdfPath);
}
