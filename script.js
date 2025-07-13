// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.form-submit');
    const formData = new FormData(this);
    
    // Add loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Get form data
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Create mailto link with form data
        const subject = `eXipini Inquiry - ${data.interest}`;
        const body = `
            Name: ${data.name}
            Email: ${data.email}
            Phone: ${data.phone || 'Not provided'}
            Interest: ${data.interest}

            Message:
            ${data.message}
        `;
        
        const mailtoLink = `mailto:hello@exipini.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = 'Message Sent!';
        submitBtn.classList.remove('loading');
        
        setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 3000);
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
    }, 2000);
});

// Product inquiry buttons
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill the form
        setTimeout(() => {
            const interestSelect = document.getElementById('interest');
            const messageTextarea = document.getElementById('message');
            
            // Set interest based on product
            if (productTitle.toLowerCase().includes('traditional')) {
                interestSelect.value = 'traditional';
            } else if (productTitle.toLowerCase().includes('custom') || productTitle.toLowerCase().includes('designer')) {
                interestSelect.value = 'custom';
            }
            
            // Pre-fill message
            messageTextarea.value = `Hi, I'm interested in the ${productTitle}. Could you please provide more details about pricing and availability?`;
            
            // Focus on name field
            document.getElementById('name').focus();
        }, 1000);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .feature, .about-text');
    animatedElements.forEach(el => observer.observe(el));
});

// Enhanced form validation
function validateForm() {
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailRegex.test(emailField.value)) {
        emailField.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    return isValid;
}

// Real-time form validation
contactForm.addEventListener('input', validateForm);

// // Add loading animation for images
// document.addEventListener('DOMContentLoaded', () => {
//     const images = document.querySelectorAll('img');
//     images.forEach(img => {
//         img.addEventListener('load', () => {
//             img.style.opacity = '1';
//         });
//         img.style.opacity = '0';
//         img.style.transition = 'opacity 0.3s ease';
//     });
// });

// Add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: #cc3300;
    color: white;
    font-size: 1.4rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px #735240;
`;

document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// // Hover effects for hero image
// const heroImg = document.querySelector('.hero-img');
// if (heroImg) {
//     heroImg.addEventListener('mouseenter', () => {
//         heroImg.style.opacity = 1;
//         heroImg.style.transform = 'translateY(-10px) scale(1.02)';
//     });
    
//     heroImg.addEventListener('mouseleave', () => {
//         heroImg.style.transform = 'translateY(0) scale(1)';
//     });
// }