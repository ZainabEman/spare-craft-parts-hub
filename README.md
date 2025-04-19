
# SpareCraft Parts Hub

A machine spare parts workshop website built with HTML, CSS, and vanilla JavaScript for the frontend, and Node.js with Express for the backend. The application connects to a Supabase PostgreSQL database for data storage.

## Project Structure

- **Frontend**: Static HTML, CSS, and vanilla JavaScript
- **Backend**: Node.js and Express.js API server
- **Database**: Supabase (PostgreSQL)

## Features

- Workshop introduction with historical background
- Image gallery and video showcase
- Category browsing
- Detailed spare parts listings
- Part detail pages with image carousel
- Contact form
- Responsive design for all devices
- Dynamic data loading from backend API

## Setup Instructions

### Frontend

1. Place all HTML, CSS, JS, and asset files on your static hosting provider (Netlify, Vercel, etc.)
2. Update the `API_BASE_URL` in `js/main.js` to point to your deployed backend

### Backend

1. Navigate to the `server` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` with your Supabase credentials
4. Start the server:
   ```
   npm start
   ```

### Database

1. Create a new Supabase project
2. Run the SQL commands in `supabase/schema.sql` to set up your database schema and sample data
3. Use the provided Supabase URL and anon key in your backend `.env` file

## API Endpoints

- **GET /api/categories** - Get all categories
- **GET /api/spare-parts?category=id** - Get spare parts by category
- **GET /api/spare-part/:id** - Get details of a specific spare part

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

## Deployment

- Frontend: Deploy to Netlify, Vercel, or any static hosting provider
- Backend: Deploy to Heroku, Railway, Render, or similar service
- Database: Use your Supabase project in production

## Credits

SpareCraft Parts Hub - Created as a demonstration of a full-stack application using HTML, CSS, JavaScript, Node.js, Express, and Supabase.
