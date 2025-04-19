
// Common JavaScript for all pages

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }
});

// API URLs - Change to your actual backend URL when deployed
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch data from API with error handling
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
}

// Format date to readable format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Get URL parameter value
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Create element with classes
function createElement(tag, classes = [], textContent = '') {
  const element = document.createElement(tag);
  
  if (classes.length) {
    element.classList.add(...classes);
  }
  
  if (textContent) {
    element.textContent = textContent;
  }
  
  return element;
}

// Truncate text to a specific length
function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Show error message
function showError(container, message = 'Something went wrong. Please try again later.') {
  container.innerHTML = `
    <div class="error-message">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
      </svg>
      <p>${message}</p>
    </div>
  `;
}
