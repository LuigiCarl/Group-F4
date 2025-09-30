// Enhanced website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Scroll Progress Indicator
    const progressBar = document.querySelector('.progress-bar');
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    
    if (burger) {
        burger.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Clone navigation links (exclude buttons)
                const navLinks = nav.querySelectorAll('a:not(.btn):not(.sign-in-link)');
                navLinks.forEach(link => {
                    const mobileLink = link.cloneNode(true);
                    mobileMenu.appendChild(mobileLink);
                });
                
                // Add Sign In link to mobile menu
                const mobileSignIn = document.createElement('a');
                mobileSignIn.href = '#';
                mobileSignIn.textContent = 'Sign In';
                mobileSignIn.addEventListener('click', function(e) {
                    e.preventDefault();
                    openModal('signInModal');
                    mobileMenu.classList.remove('active');
                });
                mobileMenu.appendChild(mobileSignIn);
                
                // Add Sign Up link to mobile menu
                const mobileSignUp = document.createElement('a');
                mobileSignUp.href = '#';
                mobileSignUp.textContent = 'Sign Up';
                mobileSignUp.addEventListener('click', function(e) {
                    e.preventDefault();
                    openModal('signUpModal');
                    mobileMenu.classList.remove('active');
                });
                mobileMenu.appendChild(mobileSignUp);
                
                // Add to document
                document.body.appendChild(mobileMenu);
            }
            
            // Toggle mobile menu
            mobileMenu.classList.toggle('active');
        });
    }

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.emailph').value;
            const message = this.querySelector('.messageph').value;
            
            if (email && message) {
                // Simulate form submission
                const submitBtn = this.querySelector('.btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    }

    // Newsletter subscription
    const subscribeForm = document.querySelector('.subscribe');
    if (subscribeForm) {
        const subscribeBtn = subscribeForm.querySelector('.btn');
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const emailInput = subscribeForm.querySelector('.emailph');
                const email = emailInput.value;
                
                if (email && email.includes('@')) {
                    const originalText = this.textContent;
                    this.textContent = 'Subscribing...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.textContent = 'Subscribed!';
                        setTimeout(() => {
                            this.textContent = originalText;
                            this.disabled = false;
                            emailInput.value = '';
                        }, 2000);
                    }, 1000);
                }
            });
        }
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe team members for staggered animation
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        member.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(member);
    });

    // Observe service items
    const serviceItems = document.querySelectorAll('.services-list li');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Header background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Modal functionality
    const signUpModal = document.getElementById('signUpModal');
    const signInModal = document.getElementById('signInModal');
    const signUpModalBtn = document.getElementById('signUpModalBtn');
    const signInModalBtn = document.getElementById('signInModalBtn');
    
    // Modal triggers
    if (signUpModalBtn) {
        signUpModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('signUpModal');
        });
    }
    
    if (signInModalBtn) {
        signInModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('signInModal');
        });
    }
    
    // Modal switching
    const showSignInBtn = document.getElementById('showSignIn');
    const showSignUpBtn = document.getElementById('showSignUp');
    
    if (showSignInBtn) {
        showSignInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal('signUpModal');
            setTimeout(() => openModal('signInModal'), 150);
        });
    }
    
    if (showSignUpBtn) {
        showSignUpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal('signInModal');
            setTimeout(() => openModal('signUpModal'), 150);
        });
    }
    
    // Modal close buttons
    const signUpClose = document.getElementById('signUpClose');
    const signInClose = document.getElementById('signInClose');
    const signUpOverlay = document.getElementById('signUpOverlay');
    const signInOverlay = document.getElementById('signInOverlay');
    
    if (signUpClose) signUpClose.addEventListener('click', () => closeModal('signUpModal'));
    if (signInClose) signInClose.addEventListener('click', () => closeModal('signInModal'));
    if (signUpOverlay) signUpOverlay.addEventListener('click', () => closeModal('signUpModal'));
    if (signInOverlay) signInOverlay.addEventListener('click', () => closeModal('signInModal'));
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal('signUpModal');
            closeModal('signInModal');
        }
    });
    
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            clearFormErrors(modalId);
        }
    }
    
    function clearFormErrors(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const errors = modal.querySelectorAll('.form-error');
            errors.forEach(error => error.classList.remove('show'));
        }
    }

    // Sign Up Form Validation
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('signUpUsername');
            const email = document.getElementById('signUpEmail');
            const password = document.getElementById('signUpPassword');
            const confirmPassword = document.getElementById('signUpConfirmPassword');
            const terms = document.getElementById('signUpTerms');
            
            clearFormErrors('signUpModal');
            
            let isValid = true;
            
            if (username.value.trim().length < 3) {
                showError('signUpUsernameError', 'Username must be at least 3 characters long');
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError('signUpEmailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (password.value.length < 8) {
                showError('signUpPasswordError', 'Password must be at least 8 characters long');
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password.value)) {
                showError('signUpPasswordError', 'Password must contain uppercase, lowercase, and number');
                isValid = false;
            }
            
            if (password.value !== confirmPassword.value) {
                showError('signUpConfirmPasswordError', 'Passwords do not match');
                isValid = false;
            }
            
            if (!terms.checked) {
                showError('signUpConfirmPasswordError', 'You must agree to the Terms of Service');
                isValid = false;
            }
            
            if (isValid) {
                showSuccessMessage('signUpModal', 'Account Created Successfully!', 'Welcome to Group F4! Check your email for confirmation.');
            }
        });
    }
    
    // Sign In Form Validation
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('signInEmail');
            const password = document.getElementById('signInPassword');
            
            clearFormErrors('signInModal');
            
            let isValid = true;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError('signInEmailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (password.value.length < 1) {
                showError('signInPasswordError', 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                showSuccessMessage('signInModal', 'Welcome Back!', 'You have been successfully signed in.');
            }
        });
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    function showSuccessMessage(modalId, title, message) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <div style="width: 60px; height: 60px; background: var(--gradient-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: white; font-size: 30px;">✓</div>
                    <h3 style="color: var(--primary-color); margin-bottom: 15px; font-size: 1.3rem;">${title}</h3>
                    <p style="color: var(--text-light); margin-bottom: 25px;">${message}</p>
                    <button class="btn modal-btn" onclick="document.getElementById('${modalId}').classList.remove('show'); document.body.style.overflow = '';">Continue</button>
                </div>
            `;
        }
    }

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
});