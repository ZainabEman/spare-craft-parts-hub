
// Import required modules
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// API Routes

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get spare parts by category
app.get('/api/spare-parts', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: 'Category ID is required' });
    }
    
    let query = supabase
      .from('spare_parts')
      .select('*')
      .eq('category_id', category);
    
    // Add search functionality if search parameter is provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,part_number.ilike.%${search}%,description.ilike.%${search}%`);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching spare parts:', error);
    res.status(500).json({ error: 'Failed to fetch spare parts' });
  }
});

// Get spare part by ID
app.get('/api/spare-part/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('spare_parts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Spare part not found' });
      }
      throw error;
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching spare part:', error);
    res.status(500).json({ error: 'Failed to fetch spare part' });
  }
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
