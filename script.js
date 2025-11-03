// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success message
        alert(`Thank you, ${formData.name}! Your message has been sent successfully. We will get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const navMenu = document.querySelector('.nav-menu');
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// Animate elements on scroll
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe team members and feature items
    document.querySelectorAll('.team-member, .feature-list li').forEach(element => {
        observer.observe(element);
    });
}

// Call animation function after DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);

// Active link highlighting in navigation
window.addEventListener('scroll', function () {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 50) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Feature list interaction
document.querySelectorAll('.feature-list li').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0)';
    });
});

// Smooth transition for feature list
const style = document.createElement('style');
style.textContent = `
    .feature-list li {
        transition: transform 0.3s ease;
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu a.active {
        color: #2d8a7f;
        border-bottom: 2px solid #2d8a7f;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Team member image hover effect
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    member.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Contact form field validation on blur
const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
formFields.forEach(field => {
    field.addEventListener('blur', function () {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ff6b6b';
        } else if (this.id === 'email' && this.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#2d8a7f';
            }
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

// Scroll to top button functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'scrollToTopBtn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #2d8a7f;
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(button);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function () {
        this.style.backgroundColor = '#1f6a63';
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.backgroundColor = '#2d8a7f';
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Print contact information for debugging
console.log('Hovia System & Solution website loaded successfully!');
console.log('Contact: (+66) 97-289-9156');
console.log('Email: sale.hovia@gmail.com');