document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking a link
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Hero section navigation
    const heroSections = document.querySelectorAll('.hero');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    let currentIndex = 0;
    let slideInterval;

    function updateHeroSections() {
        heroSections.forEach((section, index) => {
            section.classList.remove('active', 'prev', 'next');
            if (index === currentIndex) {
                section.classList.add('active');
            } else if (index === (currentIndex - 1 + heroSections.length) % heroSections.length) {
                section.classList.add('prev');
            } else if (index === (currentIndex + 1) % heroSections.length) {
                section.classList.add('next');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % heroSections.length;
        updateHeroSections();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + heroSections.length) % heroSections.length;
        updateHeroSections();
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    // Stop slideshow when user interacts with navigation
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Add event listeners for manual navigation
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            stopSlideshow();
            prevSlide();
        });

        nextButton.addEventListener('click', () => {
            stopSlideshow();
            nextSlide();
        });

        // Initialize the hero sections
        updateHeroSections();
        startSlideshow();
    }

    // Products Page Functionality
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        let scrollInterval;

        function scrollToSlide(index) {
            scrollContainer.scrollTo({
                left: slides[index].offsetLeft,
                behavior: 'smooth'
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            scrollToSlide(currentSlide);
        }

        function startSlideshow() {
            scrollInterval = setInterval(nextSlide, 3000);
        }

        function stopSlideshow() {
            clearInterval(scrollInterval);
        }

        // Start slideshow
        startSlideshow();

        // Navigation buttons
        document.querySelectorAll('.scroll-container + button').forEach(button => {
            button.addEventListener('click', () => {
                stopSlideshow();
                if (button.querySelector('.fa-chevron-right')) {
                    nextSlide();
                } else {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    scrollToSlide(currentSlide);
                }
                startSlideshow();
            });
        });

        // Pause on hover
        scrollContainer.addEventListener('mouseenter', stopSlideshow);
        scrollContainer.addEventListener('mouseleave', startSlideshow);
    }
});