import { Router } from 'express';
import {
  createNote,
  uploadFileAndExtract,
  processNoteWithAI,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getTags,
  getStats,
} from '../controllers/noteController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import validate from '../middlewares/validationMiddleware.js';
import {
  createNoteSchema,
  updateNoteSchema,
  getNoteSchema,
  deleteNoteSchema,
  processNoteSchema,
  getNotesQuerySchema,
} from '../validations/noteValidation.js';

const router = Router();

router.use(protect);

router.post('/', validate(createNoteSchema), createNote);
router.post('/upload', upload.single('file'), uploadFileAndExtract);
router.post('/:id/process', validate(processNoteSchema), processNoteWithAI);
router.get('/', validate(getNotesQuerySchema), getNotes);
router.get('/tags', getTags);
router.get('/stats', getStats);
router.get('/:id', validate(getNoteSchema), getNoteById);
router.put('/:id', validate(updateNoteSchema), updateNote);
router.delete('/:id', validate(deleteNoteSchema), deleteNote);

export default router;
