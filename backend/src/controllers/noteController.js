import noteService from '../services/noteService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import path from 'path';

export const createNote = asyncHandler(async (req, res) => {
  const note = await noteService.createNote(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, note, 'Note created successfully'));
});

export const uploadFileAndExtract = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded');
  }

  const { path: filePath, mimetype, originalname, filename } = req.file;
  
  const { text, wordCount } = await noteService.extractTextFromFile(filePath, mimetype);
  
  const fileType = mimetype === 'application/pdf' ? 'PDF' : 'DOCX';
  const fileUrl = `/uploads/${filename}`;

  res.status(200).json(new ApiResponse(200, {
    extractedText: text,
    title: path.parse(originalname).name,
    fileUrl,
    fileType,
    wordCount
  }, 'File uploaded and text extracted successfully'));
});

export const processNoteWithAI = asyncHandler(async (req, res) => {
  const note = await noteService.processNoteWithAI(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, note, 'Note processed by AI successfully'));
});

export const getNotes = asyncHandler(async (req, res) => {
  const notesData = await noteService.getNotes(req.user._id, req.query);
  res.status(200).json(new ApiResponse(200, notesData, 'Notes retrieved successfully'));
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await noteService.getNoteById(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, note, 'Note retrieved successfully'));
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await noteService.updateNote(req.params.id, req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, note, 'Note updated successfully'));
});

export const deleteNote = asyncHandler(async (req, res) => {
  await noteService.deleteNote(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, null, 'Note deleted successfully'));
});

export const getTags = asyncHandler(async (req, res) => {
  const tags = await noteService.getTags(req.user._id);
  res.status(200).json(new ApiResponse(200, tags, 'Tags retrieved successfully'));
});

export const getStats = asyncHandler(async (req, res) => {
  const stats = await noteService.getStats(req.user._id);
  res.status(200).json(new ApiResponse(200, stats, 'Statistics retrieved successfully'));
});
