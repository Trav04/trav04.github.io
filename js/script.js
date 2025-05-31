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
// iPhone class for content management - can be used to highlight specific projects
class iPhoneContentManager {
    constructor() {
        this.screenContent = document.querySelector('.screen-content');
        this.iPhone = document.querySelector('.iphone');
        this.iPhoneContainer = document.querySelector('.iphone-container');
        this.currentContent = 0;
        this.isAutoRotating = true;
        this.rotationInterval = null;
        this.contentOptions = [];
        
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        
        // Define project content for iPhone
        this.contentOptions = [
            {
                title: "Second Brain RAG Model",
                description: "\"LangChain-powered knowledge retrieval system for Obsidian notes\"",
                image: "imgs/obsidian-rag-2100x100.png"
            },
            {
                title: "Very Good Matcha",
                description: "Premium matcha brand with 4,000+ units sold and $8K/month revenue",
                image: "imgs/verygood-100x100.jpg"
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
        
        this.updateContent();
        this.startAutoRotation();
        this.setupProjectHover();
    }
    
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

    
    nextContent() {
        this.currentContent = (this.currentContent + 1) % this.contentOptions.length;
        this.updateContent();
    }
    
    startAutoRotation(interval = 3000) {
        this.stopAutoRotation();
        this.isAutoRotating = true;
        this.rotationInterval = setInterval(() => {
            this.nextContent();
        }, interval);
    }
    
    stopAutoRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
        this.isAutoRotating = false;
    }
    
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
    
    setupProjectHover() {
        const projectTiles = document.querySelectorAll('.project-tile');
        
        projectTiles.forEach(tile => {
            tile.addEventListener('mouseenter', () => {
                const projectId = tile.getAttribute('data-project');
                const projectIndex = this.getProjectIndex(projectId);
                
                if (projectIndex !== -1) {
                    this.stopAutoRotation();
                    this.currentContent = projectIndex;
                    this.updateContent();
                }
            });
            
            tile.addEventListener('mouseleave', () => {
                if (!this.isAutoRotating) {
                    this.startAutoRotation();
                }
            });
        });
    }
    
    getProjectIndex(projectId) {
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

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const iphoneManager = new iPhoneContentManager();
    
    // Initialize modals
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const projectTiles = document.querySelectorAll('.project-tile');
    
    // Open modal when project tile is clicked
    projectTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const projectId = tile.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}-modal`);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal when close button is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // PDF viewer functionality
    const pdfViewer = document.getElementById('pdf-viewer');
    const closePDF = document.getElementById('close-pdf');
    
    closePDF.addEventListener('click', () => {
        pdfViewer.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.openPDF = function() {
        const pdfFrame = document.getElementById('pdf-frame');
        pdfFrame.src = 'path/to/function-generator-docs.pdf';
        pdfViewer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
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