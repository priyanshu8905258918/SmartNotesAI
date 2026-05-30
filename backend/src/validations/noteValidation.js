import { z } from 'zod';

export const createNoteSchema = {
  body: z.object({
    title: z.string().min(1, 'Note title is required').trim(),
    originalContent: z.string().min(1, 'Note content is required'),
    extractedText: z.string().optional(),
    fileUrl: z.string().optional(),
    fileType: z.string().optional(),
  }),
};

export const updateNoteSchema = {
  body: z.object({
    title: z.string().min(1, 'Note title is required').trim().optional(),
    originalContent: z.string().min(1, 'Note content is required').optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid note ID format'),
  }),
};

export const getNoteSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid note ID format'),
  }),
};

export const deleteNoteSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid note ID format'),
  }),
};

export const processNoteSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid note ID format'),
  }),
};

export const getNotesQuerySchema = {
  query: z.object({
    q: z.string().optional(),
    tag: z.string().optional(),
    aiProcessed: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
    sort: z.enum(['newest', 'oldest', 'title-asc', 'title-desc']).default('newest'),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  }),
};
