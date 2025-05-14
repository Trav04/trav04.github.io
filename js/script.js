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