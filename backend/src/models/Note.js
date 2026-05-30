import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
    },
    originalContent: {
      type: String,
      required: [true, 'Original content is required'],
    },
    extractedText: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    revisionPoints: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    fileUrl: {
      type: String,
      default: '',
    },
    fileType: {
      type: String,
      default: '',
    },
    aiProcessed: {
      type: Boolean,
      default: false,
    },
    wordCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create a text index on title for keyword/phrase search
noteSchema.index({ title: 'text' });

const Note = mongoose.model('Note', noteSchema);
export default Note;
