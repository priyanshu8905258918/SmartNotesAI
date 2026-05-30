import noteRepository from '../repositories/noteRepository.js';
import fileService from './fileService.js';
import aiService from './aiService.js';
import ApiError from '../utils/apiError.js';

class NoteService {
  countWords(text) {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  async extractTextFromFile(filePath, mimeType) {
    const { text, wordCount } = await fileService.extractText(filePath, mimeType)
      .then(t => ({ text: t, wordCount: this.countWords(t) }));
    return { text, wordCount };
  }

  async createNote(userId, { title, originalContent, fileUrl = '', fileType = '', extractedText = '' }) {
    const wordCount = this.countWords(originalContent || extractedText);
    const note = await noteRepository.create({
      userId,
      title,
      originalContent: originalContent || extractedText,
      extractedText,
      fileUrl,
      fileType,
      wordCount,
      aiProcessed: false,
    });
    return note;
  }

  async processNoteWithAI(id, userId) {
    const note = await noteRepository.findByIdRaw(id, userId);
    if (!note) {
      throw new ApiError(404, 'Note not found');
    }

    const contentToProcess = note.originalContent || note.extractedText;
    if (!contentToProcess || contentToProcess.trim().length === 0) {
      throw new ApiError(400, 'Note has no content to process with AI.');
    }

    const aiOutput = await aiService.processNoteContent(contentToProcess);
    
    note.summary = aiOutput.summary;
    note.revisionPoints = aiOutput.revisionPoints;
    note.tags = aiOutput.tags;
    note.aiProcessed = true;

    await note.save();
    return note.toObject();
  }

  async getNotes(userId, queryParams) {
    return noteRepository.findPaginated(userId, queryParams);
  }

  async getNoteById(id, userId) {
    const note = await noteRepository.findById(id, userId);
    if (!note) {
      throw new ApiError(404, 'Note not found');
    }
    return note;
  }

  async updateNote(id, userId, { title, originalContent }) {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (originalContent !== undefined) {
      updateData.originalContent = originalContent;
      updateData.wordCount = this.countWords(originalContent);
    }
    
    const note = await noteRepository.update(id, userId, updateData);
    if (!note) {
      throw new ApiError(404, 'Note not found');
    }
    return note;
  }

  async deleteNote(id, userId) {
    const note = await noteRepository.delete(id, userId);
    if (!note) {
      throw new ApiError(404, 'Note not found');
    }
    return note;
  }

  async getTags(userId) {
    return noteRepository.getRecentTags(userId);
  }

  async getStats(userId) {
    return noteRepository.getStats(userId);
  }
}

export default new NoteService();
