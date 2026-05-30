import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password').lean();
      if (!req.user) {
        throw new ApiError(401, 'User not found, authentication failed');
      }
      next();
    } catch (error) {
      throw new ApiError(401, 'Not authorized, token failed');
    }
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }
});

export default protect;
