
// JavaScript for Categories Page

document.addEventListener('DOMContentLoaded', function() {
  // Load all categories
  loadAllCategories();
});

// Load all categories from API
async function loadAllCategories() {
  const categoriesGrid = document.getElementById('categories-grid');
  
  if (!categoriesGrid) return;
  
  try {
    const categories = await fetchData('/categories');
    
    if (!categories || categories.length === 0) {
      showError(categoriesGrid, 'No categories found.');
      return;
    }
    
    // Clear loading indicator
    categoriesGrid.innerHTML = '';
    
    // Render each category
    categories.forEach(category => {
      const categoryCard = createCategoryCard(category);
      categoriesGrid.appendChild(categoryCard);
    });
    
  } catch (error) {
    console.error('Error loading categories:', error);
    showError(categoriesGrid);
  }
}

// Create a category card element
function createCategoryCard(category) {
  const card = createElement('div', ['category-card']);
  
  const imageUrl = category.image || 'assets/images/placeholder.jpg';
  
  card.innerHTML = `
    <div class="category-image">
      <img src="${imageUrl}" alt="${category.name}">
    </div>
    <div class="category-content">
      <h3>${category.name}</h3>
      <p>${category.description || 'No description available.'}</p>
      <a href="parts.html?category=${category.id}" class="btn-secondary">View Parts</a>
    </div>
  `;
  
  return card;
}
