
// JavaScript for Contact Page

document.addEventListener('DOMContentLoaded', function() {
  // Setup contact form submission
  setupContactForm();
});

// Setup contact form
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');
  
  if (!contactForm || !formResponse) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
      showFormError('Please fill in all required fields.');
      return;
    }
    
    if (!isValidEmail(email)) {
      showFormError('Please enter a valid email address.');
      return;
    }
    
    // In a real application, you would send the form data to your backend here
    // For now, just show a success message
    showFormSuccess('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
  
  // Show form error message
  function showFormError(message) {
    formResponse.className = 'form-response error';
    formResponse.textContent = message;
  }
  
  // Show form success message
  function showFormSuccess(message) {
    formResponse.className = 'form-response success';
    formResponse.textContent = message;
  }
  
  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
