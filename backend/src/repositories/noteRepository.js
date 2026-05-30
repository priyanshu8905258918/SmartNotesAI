import Note from '../models/Note.js';

class NoteRepository {
  async create(noteData) {
    const note = new Note(noteData);
    return note.save();
  }

  async findById(id, userId) {
    return Note.findOne({ _id: id, userId }).lean();
  }

  async findByIdRaw(id, userId) {
    return Note.findOne({ _id: id, userId });
  }

  async update(id, userId, updateData) {
    return Note.findOneAndUpdate(
      { _id: id, userId },
      { $set: updateData },
      { new: true }
    ).lean();
  }

  async delete(id, userId) {
    return Note.findOneAndDelete({ _id: id, userId });
  }

  async findPaginated(userId, { q, tag, aiProcessed, sort = 'newest', page = 1, limit = 10 }) {
    const query = { userId };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { originalContent: { $regex: q, $options: 'i' } }
      ];
    }

    if (tag) {
      query.tags = tag;
    }

    if (aiProcessed !== undefined) {
      query.aiProcessed = aiProcessed;
    }

    let sortObj = { createdAt: -1 };
    if (sort === 'oldest') {
      sortObj = { createdAt: 1 };
    } else if (sort === 'title-asc') {
      sortObj = { title: 1 };
    } else if (sort === 'title-desc') {
      sortObj = { title: -1 };
    }

    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
      Note.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(),
      Note.countDocuments(query),
    ]);

    return { notes, total };
  }

  async getRecentTags(userId) {
    const results = await Note.aggregate([
      { $match: { userId } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } }
    ]);
    return results.map(r => ({ name: r._id, count: r.count }));
  }

  async getStats(userId) {
    const [totalNotes, aiProcessed, uploadedDocs] = await Promise.all([
      Note.countDocuments({ userId }),
      Note.countDocuments({ userId, aiProcessed: true }),
      Note.countDocuments({ userId, fileUrl: { $ne: '' } }),
    ]);

    return {
      totalNotes,
      aiProcessed,
      uploadedDocs,
    };
  }
}

export default new NoteRepository();
