import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    default: '📚'
  },
  color: {
    type: String,
    default: '#6366F1' // Indigo color
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
