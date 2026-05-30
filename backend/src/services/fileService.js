import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import ApiError from '../utils/apiError.js';

class FileService {
  async extractText(filePath, mimeType) {
    try {
      const buffer = await fs.readFile(filePath);

      if (mimeType === 'application/pdf') {
        const data = await pdfParse(buffer);
        return data.text || '';
      } else if (
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        filePath.endsWith('.docx')
      ) {
        const result = await mammoth.extractRawText({ buffer });
        return result.value || '';
      } else {
        throw new ApiError(400, 'Unsupported file type. Only PDF and DOCX are allowed.');
      }
    } catch (error) {
      console.error(`❌ Text extraction failed: ${error.message}`);
      throw new ApiError(500, `Failed to extract text from document: ${error.message}`);
    }
  }
}

export default new FileService();
