import pdfParse from 'pdf-parse';
import { PDFDocument } from 'pdf-lib';

describe('PDF Parser', () => {
    it('should parse PDF correctly', async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        page.drawText('Hello, world!');
        const pdfBytes = await pdfDoc.save();
        
        const fileBuffer = Buffer.from(pdfBytes);
        const pdfData = await pdfParse(fileBuffer);

        expect(pdfData).toContain('Hello, world!');
    });
});