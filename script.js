// 1. Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.add('scrolled');
    }
});

// 2. Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Cek preference user saat halaman dimuat
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// Event listener saat tombol diklik
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Simpan preferensi ke LocalStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// 3. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
            
            // Trigger counter animation if element has counter
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const updateCounter = () => {
                    const c = +counter.innerText;
                    const increment = target / 100;
                    if (c < target) {
                        counter.innerText = `${Math.ceil(c + increment)}`;
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCounter();
            });
        }
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

// 4. Typing Effect for Hero Section
const roles = ["UI/UX Designer", "Product Manager"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}

// Init typing
setTimeout(type, 1000);

// 5. Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filterValue === 'all' || card.classList.contains(filterValue)) {
                card.style.display = 'flex';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// =========================================
// 6. Expandable Portfolio Cards
// =========================================
const expandButtons = document.querySelectorAll('.toggle-details-btn');

expandButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Mencari elemen kartu proyek terdekat
        const card = this.closest('.portfolio-card');
        
        // Menambah/menghapus class 'expanded'
        card.classList.toggle('expanded');
        
        // Mengubah teks tombol berdasarkan status kartu
        if (card.classList.contains('expanded')) {
            this.innerHTML = 'Hide Details <span class="arrow">↑</span>';
        } else {
            this.innerHTML = 'View Details <span class="arrow">↓</span>';
        }
    });
});