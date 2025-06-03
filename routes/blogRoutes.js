import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Get all blog posts
router.get('/posts', async (req, res) => {
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

// Get a single blog post by slug
router.get('/posts/:slug', async (req, res) => {
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

// Create a new blog post
router.post('/posts', async (req, res) => {
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

// Update a blog post
router.put('/posts/:id', async (req, res) => {
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

// Delete a blog post
router.delete('/posts/:id', async (req, res) => {
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

// Get posts by category
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

export default router; 