import express from 'express';
import BlogPost from '../models/BlogPost.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';
import { upload, handleMulterError } from '../config/fileStorage.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Public routes (no auth required)
router.get('/posts/public', async (req, res) => {
  console.log('GET /api/blog/posts/public - Fetching public posts');
  try {
    const posts = await BlogPost.find({ isPublished: true })
      .sort({ date: -1 })
      .select('title excerpt date slug category featuredImage tags');
    console.log(`Found ${posts.length} public posts`);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching public posts:', error);
    res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
  }
});

// Get a single public blog post by slug
router.get('/posts/:slug/public', async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await BlogPost.findOne({ slug, isPublished: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching public post:', error);
    res.status(500).json({ message: 'Error fetching blog post', error: error.message });
  }
});

// Protected routes (admin only)
// Get all blog posts (admin)
router.get('/posts', verifyAdmin, async (req, res) => {
  console.log('GET /api/blog/posts - Fetching all posts');
  try {
    const posts = await BlogPost.find()
      .sort({ date: -1 })
      .select('title excerpt content date slug category readingTime featuredImage tags isPublished publishedAt');
    console.log(`Found ${posts.length} posts`);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
  }
});

// Get a single blog post by slug (admin)
router.get('/posts/:slug', verifyAdmin, async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await BlogPost.findOne({ slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching blog post', error: error.message });
  }
});

// Create a new blog post (admin)
router.post('/posts', verifyAdmin, async (req, res) => {
  console.log('POST /api/blog/posts - Creating new post');
  try {
    const { 
      title, 
      content, 
      excerpt, 
      isPublished,
      category,
      featuredImage,
      tags,
      date
    } = req.body;
    
    if (!title || !content || !excerpt) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Title, content, and excerpt are required' });
    }

    const post = new BlogPost({
      title,
      content,
      excerpt,
      isPublished: isPublished || false,
      category: category || 'Productivity',
      featuredImage,
      tags: tags || [],
      date: date || new Date()
    });

    await post.save();
    console.log('Post created successfully:', post.title);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'A post with this title already exists' });
    } else {
      res.status(500).json({ message: 'Error creating blog post', error: error.message });
    }
  }
});

// Update a blog post (admin)
router.put('/posts/:id', verifyAdmin, async (req, res) => {
  console.log(`PUT /api/blog/posts/${req.params.id} - Updating post`);
  try {
    const { 
      title, 
      content, 
      excerpt, 
      isPublished,
      category,
      featuredImage,
      tags,
      date,
      publishedAt
    } = req.body;
    
    if (!title || !content || !excerpt) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Title, content, and excerpt are required' });
    }

    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ message: 'Blog post not found' });
    }

    post.title = title;
    post.content = content;
    post.excerpt = excerpt;
    post.isPublished = isPublished;
    post.category = category || post.category;
    post.featuredImage = featuredImage || post.featuredImage;
    post.tags = tags || post.tags;
    post.date = date || post.date;
    
    // Update publishedAt if post is being published
    if (isPublished && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();
    console.log('Post updated successfully:', post.title);
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'A post with this title already exists' });
    } else {
      res.status(500).json({ message: 'Error updating blog post', error: error.message });
    }
  }
});

// Delete a blog post (admin)
router.delete('/posts/:id', verifyAdmin, async (req, res) => {
  console.log(`DELETE /api/blog/posts/${req.params.id} - Deleting post`);
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.log('Post deleted successfully:', post.title);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting blog post', error: error.message });
  }
});

// Get posts by category (public)
router.get('/category/:category', async (req, res) => {
  console.log(`GET /api/blog/category/${req.params.category} - Fetching posts by category`);
  try {
    const posts = await BlogPost.find({ 
      category: req.params.category,
      isPublished: true 
    }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    res.status(500).json({ message: 'Error fetching posts by category', error: error.message });
  }
});

// File upload route
router.post('/upload', verifyAdmin, upload.array('files', 5), async (req, res) => {
  console.log('Upload route hit:', {
    files: req.files,
    body: req.body
  });

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    if (!req.body.postId) {
      // Delete uploaded files if postId is missing
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const post = await BlogPost.findById(req.body.postId);
    if (!post) {
      // Delete uploaded files if post not found
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add new attachments to the post
    const newAttachments = req.files.map(file => ({
      name: file.filename,
      url: `/api/blog/uploads/${file.filename}`,
      type: file.mimetype
    }));

    console.log('Adding attachments:', newAttachments);

    post.attachments = [...(post.attachments || []), ...newAttachments];
    await post.save();

    res.json({
      message: 'Files uploaded successfully',
      attachments: newAttachments
    });
  } catch (error) {
    console.error('Error in upload route:', error);
    // Delete uploaded files if there's an error
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }
    res.status(500).json({ message: 'Error uploading files' });
  }
});

// Delete an attachment
router.delete('/posts/:postId/attachments/:attachmentId', verifyAdmin, async (req, res) => {
  try {
    const { postId, attachmentId } = req.params;
    
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Find the attachment to delete
    const attachment = post.attachments.find(att => att._id.toString() === attachmentId);
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }

    // Delete the file from the filesystem
    const filePath = path.join(process.cwd(), attachment.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove the attachment from the post
    post.attachments = post.attachments.filter(att => att._id.toString() !== attachmentId);
    await post.save();

    res.json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    console.error('Error deleting attachment:', error);
    res.status(500).json({ message: 'Error deleting attachment', error: error.message });
  }
});

// Serve uploaded files
router.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(process.cwd(), 'uploads', filename);
  
  console.log('Serving file:', filename);
  console.log('File path:', filePath);
  
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return res.status(404).json({ message: 'File not found' });
  }

  res.sendFile(filePath);
});

export default router; 