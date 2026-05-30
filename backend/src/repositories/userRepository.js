import User from '../models/User.js';

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  async findById(id) {
    return User.findById(id).select('-password').lean();
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }
}

export default new UserRepository();
