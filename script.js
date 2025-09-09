// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = {
        track: document.querySelector('.carousel-track'),
        slides: document.querySelectorAll('.video-slide'),
        nextBtn: document.querySelector('.next-btn'),
        prevBtn: document.querySelector('.prev-btn'),
        dots: document.querySelectorAll('.dot'),
        currentSlide: 0,
        
        init() {
            if (!this.track) return; // Exit if carousel doesn't exist
            
            this.showSlide(0);
            this.bindEvents();
        },
        
        bindEvents() {
            this.nextBtn?.addEventListener('click', () => this.nextSlide());
            this.prevBtn?.addEventListener('click', () => this.prevSlide());
            
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Auto-play carousel (optional)
            // setInterval(() => this.nextSlide(), 5000);
        },
        
        showSlide(index) {
            // Remove active class from all slides and dots
            this.slides.forEach(slide => slide.classList.remove('active', 'prev'));
            this.dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            if (this.slides[index]) {
                this.slides[index].classList.add('active');
            }
            if (this.dots[index]) {
                this.dots[index].classList.add('active');
            }
            
            this.currentSlide = index;
        },
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(nextIndex);
        },
        
        prevSlide() {
            const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
            this.showSlide(prevIndex);
        },
        
        goToSlide(index) {
            this.showSlide(index);
        }
    };
    
    // Initialize carousel
    carousel.init();
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    const track = document.querySelector('.carousel-track');
    if (track) {
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    carousel.nextSlide(); // Swipe left - next slide
                } else {
                    carousel.prevSlide(); // Swipe right - previous slide
                }
            }
        }
    }
});