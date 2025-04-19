
// JavaScript for Parts Listing Page

document.addEventListener('DOMContentLoaded', function() {
  // Get category ID from URL parameter
  const categoryId = getUrlParam('category');
  
  if (!categoryId) {
    // Redirect to categories page if no category is specified
    window.location.href = 'categories.html';
    return;
  }
  
  // Load category details and parts
  loadCategoryDetails(categoryId);
  loadCategoryParts(categoryId);
  
  // Setup search functionality
  setupSearch(categoryId);
});

// Load category details
async function loadCategoryDetails(categoryId) {
  try {
    const categories = await fetchData('/categories');
    const category = categories.find(cat => cat.id === categoryId);
    
    if (!category) {
      document.getElementById('category-title').textContent = 'Category Not Found';
      document.getElementById('category-breadcrumb').textContent = 'Unknown';
      return;
    }
    
    // Update page title and breadcrumb
    document.getElementById('category-title').textContent = category.name;
    document.getElementById('category-breadcrumb').textContent = category.name;
    document.title = `${category.name} Parts | SpareCraft`;
    
  } catch (error) {
    console.error('Error loading category details:', error);
    document.getElementById('category-title').textContent = 'Error Loading Category';
    document.getElementById('category-breadcrumb').textContent = 'Error';
  }
}

// Load parts for a specific category
async function loadCategoryParts(categoryId, searchQuery = '') {
  const partsGrid = document.getElementById('parts-grid');
  
  if (!partsGrid) return;
  
  try {
    let endpoint = `/spare-parts?category=${categoryId}`;
    
    if (searchQuery) {
      endpoint += `&search=${encodeURIComponent(searchQuery)}`;
    }
    
    const parts = await fetchData(endpoint);
    
    // Clear loading indicator
    partsGrid.innerHTML = '';
    
    if (!parts || parts.length === 0) {
      partsGrid.innerHTML = `
        <div class="no-results">
          <p>No parts found for this category${searchQuery ? ' matching your search' : ''}.</p>
        </div>
      `;
      return;
    }
    
    // Render each part
    parts.forEach(part => {
      const partCard = createPartCard(part);
      partsGrid.appendChild(partCard);
    });
    
  } catch (error) {
    console.error('Error loading parts:', error);
    showError(partsGrid);
  }
}

// Create a part card element
function createPartCard(part) {
  const card = createElement('div', ['part-card']);
  
  const imageUrl = part.main_image || 'assets/images/placeholder.jpg';
  
  card.innerHTML = `
    <div class="part-image">
      <img src="${imageUrl}" alt="${part.name}">
    </div>
    <div class="part-content">
      <h3>${part.name}</h3>
      <div class="part-meta">
        <span class="part-number">Part #: ${part.part_number}</span>
        <span class="part-label">${part.label}</span>
      </div>
      <a href="part-detail.html?id=${part.id}" class="btn-secondary">View Details</a>
    </div>
  `;
  
  return card;
}

// Setup search functionality
function setupSearch(categoryId) {
  const searchInput = document.getElementById('search-parts');
  const searchBtn = document.getElementById('search-btn');
  
  if (!searchInput || !searchBtn) return;
  
  // Search when button is clicked
  searchBtn.addEventListener('click', function() {
    loadCategoryParts(categoryId, searchInput.value.trim());
  });
  
  // Search when Enter key is pressed
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      loadCategoryParts(categoryId, searchInput.value.trim());
    }
  });
}
