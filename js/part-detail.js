
// JavaScript for Part Detail Page

document.addEventListener('DOMContentLoaded', function() {
  // Get part ID from URL parameter
  const partId = getUrlParam('id');
  
  if (!partId) {
    // Redirect to categories page if no part ID is specified
    window.location.href = 'categories.html';
    return;
  }
  
  // Load part details
  loadPartDetails(partId);
});

// Load part details
async function loadPartDetails(partId) {
  const partDetailContent = document.getElementById('part-detail-content');
  
  if (!partDetailContent) return;
  
  try {
    const part = await fetchData(`/spare-part/${partId}`);
    
    if (!part) {
      showError(partDetailContent, 'Part not found.');
      return;
    }
    
    // Update page title and breadcrumb
    document.getElementById('part-title').textContent = part.name;
    document.getElementById('part-breadcrumb').textContent = part.name;
    document.title = `${part.name} | SpareCraft`;
    
    // Load category info for breadcrumb
    loadCategoryInfo(part.category_id);
    
    // Render part details
    renderPartDetails(partDetailContent, part);
    
    // Load related parts
    loadRelatedParts(part.category_id, partId);
    
  } catch (error) {
    console.error('Error loading part details:', error);
    showError(partDetailContent);
  }
}

// Load category info for breadcrumb
async function loadCategoryInfo(categoryId) {
  try {
    const categories = await fetchData('/categories');
    const category = categories.find(cat => cat.id === categoryId);
    
    if (category) {
      // Update category breadcrumb link
      const categoryLink = document.getElementById('category-link');
      categoryLink.textContent = category.name;
      categoryLink.href = `parts.html?category=${categoryId}`;
    }
    
  } catch (error) {
    console.error('Error loading category info:', error);
  }
}

// Render part details
function renderPartDetails(container, part) {
  const additionalImages = part.additional_images || [];
  const allImages = [part.main_image, ...additionalImages].filter(Boolean);
  
  const detailHTML = `
    <div class="part-detail-container">
      <div class="part-images">
        <div class="main-image">
          <img src="${part.main_image || 'assets/images/placeholder.jpg'}" alt="${part.name}" id="main-part-image">
        </div>
        ${allImages.length > 1 ? `
          <div class="image-thumbnails">
            ${allImages.map((img, index) => `
              <div class="image-thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                <img src="${img}" alt="${part.name} view ${index + 1}">
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="part-info">
        <h2>${part.name}</h2>
        <div class="part-specs">
          <div class="spec-item">
            <div class="spec-label">Part Number:</div>
            <div class="spec-value part-number-value">${part.part_number}</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Label:</div>
            <div class="spec-value part-label-value">${part.label}</div>
          </div>
        </div>
        <div class="part-description">
          ${part.description || 'No description available.'}
        </div>
      </div>
    </div>
  `;
  
  container.innerHTML = detailHTML;
  
  // Setup image thumbnail click functionality
  if (allImages.length > 1) {
    const thumbnails = container.querySelectorAll('.image-thumbnail');
    const mainImage = document.getElementById('main-part-image');
    
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        // Update main image
        mainImage.src = this.dataset.image;
        
        // Update active class
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
}

// Load related parts
async function loadRelatedParts(categoryId, currentPartId) {
  const relatedPartsGrid = document.getElementById('related-parts-grid');
  
  if (!relatedPartsGrid) return;
  
  try {
    const parts = await fetchData(`/spare-parts?category=${categoryId}`);
    
    if (!parts || parts.length <= 1) {
      relatedPartsGrid.innerHTML = '<p>No related parts found.</p>';
      return;
    }
    
    // Filter out the current part
    const relatedParts = parts.filter(part => part.id !== currentPartId).slice(0, 4);
    
    if (relatedParts.length === 0) {
      relatedPartsGrid.innerHTML = '<p>No related parts found.</p>';
      return;
    }
    
    // Clear container
    relatedPartsGrid.innerHTML = '';
    
    // Render related parts
    relatedParts.forEach(part => {
      const partCard = createPartCard(part);
      relatedPartsGrid.appendChild(partCard);
    });
    
  } catch (error) {
    console.error('Error loading related parts:', error);
    relatedPartsGrid.innerHTML = '<p>Failed to load related parts.</p>';
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
