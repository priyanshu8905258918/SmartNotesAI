import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
import ApiError from '../utils/apiError.js';
import { env } from '../config/env.js';

class AuthService {
  generateToken(userId) {
    return jwt.sign({ id: userId }, env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  async signup({ name, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists');
    }

    const user = await userRepository.create({ name, email, password });
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export default new AuthService();
