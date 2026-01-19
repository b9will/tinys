/* ========================================
   Tiny's General Store - Main JS
   ======================================== */

// Store hours (Toronto time)
const hours = {
    weekday: { open: 8, close: 16.5 },  // 8am - 4:30pm
    weekend: { open: 9, close: 16.5 }   // 9am - 4:30pm
};

// Update open/closed status
function updateStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    
    const isWeekend = day === 0 || day === 6;
    const todayHours = isWeekend ? hours.weekend : hours.weekday;
    const isOpen = hour >= todayHours.open && hour < todayHours.close;
    
    const indicator = document.getElementById('statusIndicator');
    const text = document.getElementById('statusText');
    
    if (!indicator || !text) return;
    
    if (isOpen) {
        indicator.classList.remove('closed');
        text.classList.remove('closed');
        text.innerHTML = '<span>Open</span> · Until 4:30pm';
    } else {
        indicator.classList.add('closed');
        text.classList.add('closed');
        const tomorrowOpen = (day === 5 || day === 6) ? '9am' : '8am';
        text.innerHTML = '<span>Closed</span> · Opens ' + tomorrowOpen;
    }
}

// Scroll progress bar
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Hero parallax - subtle, desktop only
function updateParallax() {
    // Disable on mobile
    if (window.innerWidth <= 968) return;
    
    const scrolled = window.scrollY;
    const heroImg = document.getElementById('heroImg');
    if (heroImg && scrolled < window.innerHeight) {
        heroImg.style.transform = 'translateY(' + (scrolled * 0.15) + 'px) scale(1.05)';
    }
}

// Back to top visibility
function updateBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    if (window.scrollY > 500) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
}

// Scroll event listeners
window.addEventListener('scroll', function() {
    updateScrollProgress();
    updateParallax();
    updateBackToTop();
});

// Back to top click
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Reveal animations
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
});

// Ken Burns effect for gallery
const galleryObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.gallery-item').forEach(function(el) {
    galleryObserver.observe(el);
});

// Flip counter animation
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const digit1 = document.getElementById('digit1');
            const digit2 = document.getElementById('digit2');
            
            if (!digit1 || !digit2) return;
            
            // Animate first digit
            setTimeout(function() {
                digit1.classList.add('rolling');
            }, 200);
            
            // Animate second digit - the "roll" from 5 to 6
            setTimeout(function() {
                const num = digit2.querySelector('.flip-number');
                if (num) {
                    num.textContent = '5';
                    digit2.classList.add('rolling');
                    setTimeout(function() {
                        num.textContent = '6';
                    }, 300);
                }
            }, 400);
            
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const flipCounter = document.getElementById('flipCounter');
if (flipCounter) {
    counterObserver.observe(flipCounter);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Initialize
updateStatus();
setInterval(updateStatus, 60000); // Update every minute
updateParallax();
