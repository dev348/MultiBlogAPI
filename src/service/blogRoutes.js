import express from 'express';
import Blog from '../mongo/model/Blog.js';


const router = express.Router();

// Retrieve a list of blogs with titles and excerpts
router.get('/blogs', async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    try {
      const blogs = await Blog.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .select('title content') // Select only title and content fields
        .lean(); // Convert Mongoose documents to plain JavaScript objects
  
      // Create excerpts for each blog
      const blogsWithExcerpts = blogs.map(blog => {
        const excerpt = blog.content.substring(0, 100); // Extract the first 200 characters as an excerpt
        return {
          _id: blog._id,
          title: blog.title,
          excerpt,
        };
      });
  
      res.json(blogsWithExcerpts);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Retrieve a specific blog by ID
router.get('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new blog
router.post('/blogs', async (req, res) => {
  const { title, content, author, language } = req.body;
  try {
    const newBlog = new Blog({ title, content, author, language });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Search for blogs based on keywords or topics
router.get('/blogs/search', async (req, res) => {
  const { query } = req.query;
  try {
    const blogs = await Blog.find({ $text: { $search: query } });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; // Export the router
