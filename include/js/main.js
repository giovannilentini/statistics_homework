// Main JavaScript for Statistics Course Blog
// Giovanni Lentini - 1987799

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    init();
});

function init() {
    // Add smooth scrolling to anchor links
    addSmoothScrolling();
    
    // Add homework counter
    updateHomeworkCounter();
    
    // Add animation on scroll
    addScrollAnimations();
}

// Smooth scrolling for anchor links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update homework counter
function updateHomeworkCounter() {
    const homeworkList = document.getElementById('homeworkList');
    if (!homeworkList) return;
    
    const homeworkCards = homeworkList.querySelectorAll('.homework-card');
    const count = homeworkCards.length;
    
    const heading = document.querySelector('.homework-list h2');
    if (heading && count > 0) {
        heading.textContent = `Homework Assignments (${count})`;
    }
}

// Add scroll animations
function addScrollAnimations() {
    const cards = document.querySelectorAll('.homework-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Function to add new homework dynamically (optional)
function addHomework(title, dueDate, description, link) {
    const homeworkList = document.getElementById('homeworkList');
    if (!homeworkList) return;
    
    const card = document.createElement('div');
    card.className = 'homework-card';
    
    card.innerHTML = `
        <h3>${title}</h3>
        <p class="date">Due: ${formatDate(dueDate)}</p>
        <p class="description">${description}</p>
        <a href="src/${link}" class="btn">View Assignment</a>
    `;
    
    homeworkList.appendChild(card);
    updateHomeworkCounter();
}
