/* Project Page - Proejct tiles */ 
// Get all project tiles
const projectTiles = document.querySelectorAll('.project-tile');

// Get all modals
const modals = document.querySelectorAll('.modal');

// Get all close buttons
const closeBtns = document.querySelectorAll('.close-btn');

// Add click event to project tiles
projectTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const projectId = tile.getAttribute('data-project');
        const modal = document.getElementById(`${projectId}-modal`);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        } else {
            console.error(`Modal with ID "${projectId}-modal" not found.`);
        }
    });
});

// Add click event to close buttons
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling again
    });
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling again
        }
    });
});

// Close modal when pressing ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling again
            }
        });
    }
});

// Function to open PDF (used in function generator modal)
function openPDF() {
    window.open('files/fn-gen-sch.pdf', '_blank');
}

/* Projects page - iPhone animation */
// JavaScript for iPhone Content Management
class iPhoneContentManager {
    constructor() {
        this.screenContent = document.querySelector('.screen-content');
        this.iPhone = document.querySelector('.iphone');
        this.iPhoneContainer = document.querySelector('.iphone-container');
        this.currentContent = 0;
        this.isAutoRotating = true;
        this.rotationInterval = null;
        
        // Default content options
        this.contentOptions = null; // No default options
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.startAutoRotation();
    }
    
    // Method to update content options
    setContentOptions(newOptions) {
        this.contentOptions = newOptions;
        this.currentContent = 0;
        this.updateContent();
    }
    
    // Method to add single content item
    addContent(contentItem) {
        this.contentOptions.push(contentItem);
    }
    
    // Method to manually set specific content
    setContent(index) {
        if (index >= 0 && index < this.contentOptions.length) {
            this.currentContent = index;
            this.updateContent();
        }
    }
    
    // Method to update the displayed content
    updateContent() {
        if (this.screenContent && this.contentOptions.length > 0) {
            const content = this.contentOptions[this.currentContent];
            this.screenContent.innerHTML = `<h3>${content.title}</h3><p>${content.subtitle}</p>`;
        }
    }
    
    // Method to go to next content
    nextContent() {
        this.currentContent = (this.currentContent + 1) % this.contentOptions.length;
        this.updateContent();
    }
    
    // Method to start auto rotation
    startAutoRotation(interval = 4000) {
        this.stopAutoRotation();
        this.isAutoRotating = true;
        this.rotationInterval = setInterval(() => {
            this.nextContent();
        }, interval);
    }
    
    // Method to stop auto rotation
    stopAutoRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
        this.isAutoRotating = false;
    }
    
    // Setup hover effects
    setupHoverEffects() {
        if (this.iPhoneContainer && this.iPhone) {
            this.iPhoneContainer.addEventListener('mouseenter', () => {
                this.iPhone.style.animationPlayState = 'paused';
            });

            this.iPhoneContainer.addEventListener('mouseleave', () => {
                this.iPhone.style.animationPlayState = 'running';
            });
        }
    }
    
    // Method to customize screen background
    setScreenBackground(gradient) {
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.style.background = gradient;
        }
    }
    
    // Method to pause/resume spinning
    pauseSpin() {
        if (this.iPhone) {
            this.iPhone.style.animationPlayState = 'paused';
        }
    }
    
    resumeSpin() {
        if (this.iPhone) {
            this.iPhone.style.animationPlayState = 'running';
        }
    }
}

// Initialize iPhone Content Manager
document.addEventListener('DOMContentLoaded', () => {
    const iphoneManager = new iPhoneContentManager();
    
    const contentOptions = [];  // Display content in the phone, can be text or anything
    
    iphoneManager.setContentOptions(contentOptions);
});

/* Experience page */
// Function to toggle experience sections
function toggleExperience(id) {
    const content = document.getElementById(id);
    const allContents = document.querySelectorAll('.experience-content');
    const parentItem = content.closest('.experience-item');
    const toggleBtn = parentItem.querySelector('.toggle-btn');
    
    // If already active, don't close it
    if (content.classList.contains('active')) {
        return;
    }
    
    // Close all sections
    allContents.forEach(item => {
        item.classList.remove('active');
        const itemBtn = item.closest('.experience-item').querySelector('.toggle-btn');
        itemBtn.textContent = '+';
    });
    
    // Open current section
    content.classList.add('active');
    toggleBtn.textContent = '—';
}

// Initialize with first experience open
document.addEventListener('DOMContentLoaded', function() {
    const firstExp = document.getElementById('exp1');
    firstExp.classList.add('active');
    const firstToggleBtn = firstExp.closest('.experience-item').querySelector('.toggle-btn');
    firstToggleBtn.textContent = '—';
});


/* Contact page */
// js/contact.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageContainer = document.getElementById('messageContainer');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    function showMessage(message, type) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 5000);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateForm(formData) {
        const errors = [];

        if (!formData.get('name').trim()) {
            errors.push('Name is required');
        }

        if (!formData.get('email').trim()) {
            errors.push('Email is required');
        } else if (!validateEmail(formData.get('email'))) {
            errors.push('Please enter a valid email address');
        }

        if (!formData.get('subject').trim()) {
            errors.push('Subject is required');
        }

        if (!formData.get('message').trim()) {
            errors.push('Message is required');
        } else if (formData.get('message').trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        return errors;
    }

    async function submitForm(formData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate random success/failure for demo purposes
        const isSuccess = Math.random() > 0.3; // 70% success rate for demo

        if (isSuccess) {
            return { success: true };
        } else {
            throw new Error('Failed to send message. Please try again.');
        }
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const errors = validateForm(formData);

        if (errors.length > 0) {
            showMessage(errors.join(', '), 'error');
            return;
        }

        // Update button state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';

        try {
            await submitForm(formData);
            
            showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
        }
    });

    // Add input animation effects
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});