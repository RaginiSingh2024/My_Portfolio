document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (in a real application, this would be an API call)
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                // Create message object with timestamp
                const messageObj = {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                // Save message to localStorage
                saveMessage(messageObj);
                
                // Reset form
                contactForm.reset();
                
                // Show success message
                showFormMessage('Your message has been sent successfully! An admin will review it soon.', 'success');
                
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Function to save message to localStorage
    function saveMessage(messageObj) {
        // Get existing messages or initialize empty array
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        
        // Add new message to array
        messages.push(messageObj);
        
        // Save updated messages back to localStorage
        localStorage.setItem('contactMessages', JSON.stringify(messages));
    }
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormMessage(message, type) {
        // Check if message container already exists
        let messageContainer = document.querySelector('.form-message');
        
        if (!messageContainer) {
            // Create message container if it doesn't exist
            messageContainer = document.createElement('div');
            messageContainer.className = 'form-message';
            contactForm.appendChild(messageContainer);
        }
        
        // Set message content and style
        messageContainer.textContent = message;
        messageContainer.className = `form-message ${type}`;
        
        // Auto remove message after 5 seconds
        setTimeout(() => {
            messageContainer.remove();
        }, 5000);
    }
});
