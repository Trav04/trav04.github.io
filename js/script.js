/* ================================================================
   PROJECT PAGE - Modal and Project Tile Functionality
   ================================================================ */

// Get all project tiles (clickable project cards)
const projectTiles = document.querySelectorAll('.project-tile');

// Get all modal windows for project details
const modals = document.querySelectorAll('.modal');

// Get all close buttons within modals
const closeBtns = document.querySelectorAll('.close-btn');

/**
 * Add click event listeners to project tiles to open corresponding modals
 */
projectTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        // Get the project ID from the data attribute
        const projectId = tile.getAttribute('data-project');
        
        // Find the corresponding modal using the project ID
        const modal = document.getElementById(`${projectId}-modal`);
        
        if (modal) {
            // Show the modal
            modal.style.display = 'block';
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Log error if modal is not found
            console.error(`Modal with ID "${projectId}-modal" not found.`);
        }
    });
});

/**
 * Add click event listeners to close buttons within modals
 */
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Find the closest modal parent and hide it
        btn.closest('.modal').style.display = 'none';
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    });
});

/**
 * Close modal when clicking outside the modal content area (on the backdrop)
 */
window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        // Check if the clicked target is the modal backdrop (not the content)
        if (event.target === modal) {
            modal.style.display = 'none';
            // Re-enable body scrolling
            document.body.style.overflow = 'auto';
        }
    });
});

/**
 * Close modal when pressing the ESC key
 */
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modals.forEach(modal => {
            // Only close modals that are currently visible
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                // Re-enable body scrolling
                document.body.style.overflow = 'auto';
            }
        });
    }
});

/**
 * Function to open PDF files in a new tab
 * Used specifically for the function generator modal
 */
function openPDF() {
    window.open("imgs/fn-gen-sch.pdf", '_blank');
}

/* ================================================================
    PROJECT PAGE - iPhone Animation and Content Management
   ================================================================ */

/**
 * iPhone Content Manager Class
 * Manages the rotating content display within an iPhone mockup
 * Handles auto-rotation and project highlighting on hover
 */
class iPhoneContentManager {
    constructor() {
        // DOM element references
        this.screenContent = document.querySelector('.screen-content');
        this.iPhone = document.querySelector('.iphone');
        this.iPhoneContainer = document.querySelector('.iphone-container');
        
        // State management
        this.currentContent = 0;           // Index of currently displayed content
        this.isAutoRotating = true;        // Flag for auto-rotation state
        this.rotationInterval = null;      // Interval ID for auto-rotation
        this.contentOptions = [];          // Array of project content
        
        // Initialize the manager
        this.init();
    }
    
    /**
     * Initialize the iPhone content manager
     * Sets up hover effects, content options, and starts auto-rotation
     */
    init() {
        this.setupHoverEffects();
        
        // Define project content for iPhone display
        // Each object represents a different project with title, description, and image
        this.contentOptions = [
            {
                title: "Very Good Matcha",
                description: "Premium matcha brand with 4,000+ units sold and $8K/month revenue",
                image: "imgs/verygood-100x100.jpg"
            },
            {
                title: "Second Brain RAG Model",
                description: "\"LangChain-powered knowledge retrieval system for Obsidian notes\"",
                image: "imgs/obsidian-rag-2100x100.png"
            },
            {
                title: "Market Day Tracker",
                description: "Next.js app with Stripe integration for market day sales tracking",
                image: "imgs/sales_tracker100x100.png"
            },
            {
                title: "Remote Microscope",
                description: "STM32-controlled microscope with XYZ gantry and zoom control",
                image: "imgs/2100x100.png"
            },
            {
                title: "Function Generator",
                description: "Custom waveform generator with 1Hz-1MHz range and Python UI",
                image: "imgs/fn-gen-2100x100.jpg"
            }
        ];
        
        // Initialize content display and start features
        this.updateContent();
        this.startAutoRotation();
        this.setupProjectHover();
    }
    
    /**
     * Update the iPhone screen content with current project information
     * Displays image, title, and description of the current project
     */
    updateContent() {
        if (this.screenContent && this.contentOptions.length > 0) {
            const content = this.contentOptions[this.currentContent];
            this.screenContent.innerHTML = `
                <img src="${content.image}" alt="${content.title}" style="border-radius: 12px;">
                <h3>${content.title}</h3>
                <p>${content.description}</p>
            `;
        }
    }

    /**
     * Move to the next content in the rotation cycle
     * Uses modulo to loop back to beginning when reaching the end
     */
    nextContent() {
        this.currentContent = (this.currentContent + 1) % this.contentOptions.length;
        this.updateContent();
    }
    
    /**
     * Start automatic content rotation
     * @param {number} interval - Time in milliseconds between rotations (default: 3000ms)
     */
    startAutoRotation(interval = 3000) {
        // Stop any existing rotation first
        this.stopAutoRotation();
        this.isAutoRotating = true;
        
        // Set up interval to automatically advance content
        this.rotationInterval = setInterval(() => {
            this.nextContent();
        }, interval);
    }
    
    /**
     * Stop automatic content rotation
     * Clears the interval and updates state flag
     */
    stopAutoRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
        this.isAutoRotating = false;
    }
    
    /**
     * Set up hover effects for the iPhone container
     * Pauses iPhone CSS animation on hover, resumes on mouse leave
     */
    setupHoverEffects() {
        if (this.iPhoneContainer && this.iPhone) {
            // Pause iPhone animation when mouse enters container
            this.iPhoneContainer.addEventListener('mouseenter', () => {
                this.iPhone.style.animationPlayState = 'paused';
            });

            // Resume iPhone animation when mouse leaves container
            this.iPhoneContainer.addEventListener('mouseleave', () => {
                this.iPhone.style.animationPlayState = 'running';
            });
        }
    }
    
    /**
     * Set up project tile hover interactions
     * When hovering over a project tile, display that project's content in iPhone
     */
    setupProjectHover() {
        const projectTiles = document.querySelectorAll('.project-tile');
        
        projectTiles.forEach(tile => {
            // On mouse enter: stop auto-rotation and show hovered project
            tile.addEventListener('mouseenter', () => {
                const projectId = tile.getAttribute('data-project');
                const projectIndex = this.getProjectIndex(projectId);
                
                if (projectIndex !== -1) {
                    this.stopAutoRotation();
                    this.currentContent = projectIndex;
                    this.updateContent();
                }
            });
            
            // On mouse leave: resume auto-rotation if not manually stopped
            tile.addEventListener('mouseleave', () => {
                if (!this.isAutoRotating) {
                    this.startAutoRotation();
                }
            });
        });
    }
    
    /**
     * Get the index of a project in the contentOptions array based on project ID
     * @param {string} projectId - The project identifier from data attribute
     * @returns {number} Index of project in contentOptions array, or -1 if not found
     */
    getProjectIndex(projectId) {
        // Mapping of project IDs to their index in contentOptions array
        const projectMap = {
            "obsidian-rag": 0,
            "matcha": 1,
            "market": 2,
            "microscope": 3,
            "function": 4
        };
        return projectMap[projectId] || -1;
    }
}

/**
 * Initialize all modal and iPhone functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the iPhone content manager
    const iphoneManager = new iPhoneContentManager();
    
    // Get references to modal-related elements
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const projectTiles = document.querySelectorAll('.project-tile');
    
    /**
     * Open modal when project tile is clicked
     * Enhanced version with better error handling
     */
    projectTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const projectId = tile.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}-modal`);
            if (modal) {
                modal.style.display = 'block';
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    /**
     * Close modal when close button is clicked
     */
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
            // Re-enable body scrolling
            document.body.style.overflow = 'auto';
        });
    });
    
    /**
     * Close modal when clicking outside the modal content
     */
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
});

/* ================================================================
    EXPERIENCE PAGE - Accordion Functionality
   ================================================================ */

/**
 * Toggle experience section visibility (accordion behavior)
 * Only one section can be open at a time
 * @param {string} id - The ID of the experience content to toggle
 */
function toggleExperience(id) {
    // Get the content element to toggle
    const content = document.getElementById(id);
    const allContents = document.querySelectorAll('.experience-content');
    const parentItem = content.closest('.experience-item');
    const toggleBtn = parentItem.querySelector('.toggle-btn');
    
    // If the section is already active, don't close it (keeps one section always open)
    if (content.classList.contains('active')) {
        return;
    }
    
    // Close all other experience sections
    allContents.forEach(item => {
        item.classList.remove('active');
        // Reset toggle button text to "+" (closed state)
        const itemBtn = item.closest('.experience-item').querySelector('.toggle-btn');
        itemBtn.textContent = '+';
    });
    
    // Open the selected section
    content.classList.add('active');
    // Change toggle button text to "—" (open state)
    toggleBtn.textContent = '—';
}

/**
 * Initialize experience page with first experience section open
 */
document.addEventListener('DOMContentLoaded', function() {
    const firstExp = document.getElementById('exp1');
    if (firstExp) {
        // Open first experience section by default
        firstExp.classList.add('active');
        // Set first toggle button to open state
        const firstToggleBtn = firstExp.closest('.experience-item').querySelector('.toggle-btn');
        if (firstToggleBtn) {
            firstToggleBtn.textContent = '—';
        }
    }
});

/* ================================================================
   CONTACT PAGE - Form Handling and Validation
   ================================================================ */

/**
 * Contact form functionality with validation and submission handling
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('contactForm');
    const messageContainer = document.getElementById('messageContainer');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    /**
     * Display a message to the user (success or error)
     * @param {string} message - The message text to display
     * @param {string} type - The message type ('success' or 'error') for styling
     */
    function showMessage(message, type) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 5000);
    }

    /**
     * Validate email address format using regex
     * @param {string} email - Email address to validate
     * @returns {boolean} True if email format is valid
     */
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate all form fields and return array of error messages
     * @param {FormData} formData - The form data to validate
     * @returns {Array} Array of validation error messages
     */
    function validateForm(formData) {
        const errors = [];

        // Validate name field
        if (!formData.get('name').trim()) {
            errors.push('Name is required');
        }

        // Validate email field
        if (!formData.get('email').trim()) {
            errors.push('Email is required');
        } else if (!validateEmail(formData.get('email'))) {
            errors.push('Please enter a valid email address');
        }

        // Validate subject field
        if (!formData.get('subject').trim()) {
            errors.push('Subject is required');
        }

        // Validate message field
        if (!formData.get('message').trim()) {
            errors.push('Message is required');
        } else if (formData.get('message').trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        return errors;
    }

    /**
     * Submit form data to server (simulated)
     * @param {FormData} formData - The form data to submit
     * @returns {Promise} Promise that resolves on successful submission
     */
    async function submitForm(formData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate random success/failure for demo purposes
        // In production, this would be an actual API call
        const isSuccess = Math.random() > 0.3; // 70% success rate for demo

        if (isSuccess) {
            return { success: true };
        } else {
            throw new Error('Failed to send message. Please try again.');
        }
    }

    /**
     * Handle form submission with validation and error handling
     */
    if (form) {
        form.addEventListener('submit', async function(e) {
            // Prevent default form submission behavior
            e.preventDefault();

            // Get form data and validate
            const formData = new FormData(form);
            const errors = validateForm(formData);

            // If validation errors exist, show them and return
            if (errors.length > 0) {
                showMessage(errors.join(', '), 'error');
                return;
            }

            // Update button state to show loading
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';

            try {
                // Attempt to submit form
                await submitForm(formData);
                
                // Show success message and reset form
                showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                form.reset();
                
            } catch (error) {
                // Show error message if submission fails
                showMessage(error.message, 'error');
            } finally {
                // Reset button state regardless of outcome
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
            }
        });
    }

    /**
     * Add visual feedback effects to form inputs
     * Creates subtle lift animation on focus/blur
     */
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        // Lift effect on focus
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        // Remove lift effect on blur
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});