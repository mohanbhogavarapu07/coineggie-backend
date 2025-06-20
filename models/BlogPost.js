import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

const attachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

const relatedPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  readTime: {
    type: Number,
    required: true,
    default: 5
  },
  category: {
    type: String,
    required: true,
    enum: ['Personal Finance', 'Investment', 'Business', 'Technology']
  },
  author: {
    type: authorSchema,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  attachments: [attachmentSchema],
  tags: [{
    type: String,
    trim: true
  }],
  relatedPosts: [relatedPostSchema],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug from title before saving
blogPostSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  // If coverImage is not set but image is, use image as coverImage
  if (!this.coverImage && this.image) {
    this.coverImage = this.image;
  }
  next();
});

// Update the updatedDate timestamp before saving
blogPostSchema.pre('save', function(next) {
  this.updatedDate = Date.now();
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost; 