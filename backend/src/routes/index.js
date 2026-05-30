import { Router } from 'express';
import authRoutes from './authRoutes.js';
import noteRoutes from './noteRoutes.js';
import Note from '../models/Note.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/notes', noteRoutes);

router.get('/public-stats', asyncHandler(async (req, res) => {
  const [totalNotes, totalUsers, aiProcessed] = await Promise.all([
    Note.countDocuments({}),
    User.countDocuments({}),
    Note.countDocuments({ aiProcessed: true }).catch(() => 0)
  ]);
  res.status(200).json(new ApiResponse(200, {
    totalNotes,
    totalUsers,
    aiProcessed
  }, 'Public statistics retrieved successfully'));
}));

export default router;
