
# SpareCraft Parts Hub - Backend

This is the backend server for the SpareCraft Parts Hub, a machine spare parts workshop website.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=5000
   ```
4. Start the server:
   ```
   npm start
   ```
   
   Or for development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/categories` - Get all categories
- `GET /api/spare-parts?category=id` - Get spare parts by category ID
- `GET /api/spare-parts?category=id&search=query` - Search spare parts within a category
- `GET /api/spare-part/:id` - Get details of a specific spare part

## Database Schema

### Categories Table
- id (uuid, primary key)
- name (text)
- description (text)
- image (text, URL)

### Spare Parts Table
- id (uuid, primary key)
- name (text)
- main_image (text, URL)
- additional_images (json, array of URLs)
- part_number (text)
- label (text)
- description (text)
- category_id (uuid, foreign key referencing categories.id)
